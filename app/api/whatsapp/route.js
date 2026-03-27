import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'
import twilio from 'twilio'

/**
 * Twilio WhatsApp Webhook
 *
 * Configure your Twilio WhatsApp number webhook URL to:
 *   POST https://yourdomain.com/api/whatsapp
 *
 * How it works:
 *  1. Admin sends a WhatsApp message to the Twilio number
 *  2. Twilio forwards it here as a POST with form-encoded body
 *  3. We validate the Twilio signature, then store the message in Neon DB
 *  4. The message becomes active immediately in the NewsBar banner
 *
 * Commands (send via WhatsApp to control):
 *  - Any text → stored as a new active announcement
 *  - "DELETE <id>" → deactivates announcement with that ID
 *  - "LIST" → replies with all active announcements + IDs
 */

async function sendReply(to, body) {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  await client.messages.create({
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to,
    body,
  })
}

export async function POST(request) {
  try {
    // ── Validate Twilio signature ──
    const twilioSignature = request.headers.get('x-twilio-signature') || ''
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/whatsapp`

    const rawBody = await request.text()
    const params  = Object.fromEntries(new URLSearchParams(rawBody))

    const isValid = twilio.validateRequest(
      process.env.TWILIO_AUTH_TOKEN,
      twilioSignature,
      url,
      params,
    )

    if (!isValid) {
      console.warn('Invalid Twilio signature')
      return new NextResponse('Forbidden', { status: 403 })
    }

    const from = params.From    // e.g. "whatsapp:+393331234567"
    const body = (params.Body || '').trim()

    const sql = neon(process.env.DATABASE_URL)
    const cmd = body.toUpperCase()

    // ── LIST command ──
    if (cmd === 'LIST') {
      const rows = await sql`
        SELECT 
          id, 
          message, 
          active, 
          TO_CHAR(created_at, 'DD/MM/YY HH24:MI') as formatted_date
        FROM announcements 
        ORDER BY created_at DESC 
    `
      if (rows.length === 0) {
        await sendReply(from, '📋 Nessun annuncio nel database.')
      } else {
        const list = rows.map(r => `[${r.id}] ${r.active ? '✅' : '❌'} ${r.message}`).join('\n')
        await sendReply(from, `📋 Ultimi annunci:\n\n${list}`)
      }
      return new NextResponse('', { status: 200 })
    }

    // ── DELETE <id> command ──
    if (cmd.startsWith('DELETE ')) {
      const id = parseInt(cmd.replace('DELETE ', ''), 10)
      if (isNaN(id)) {
        await sendReply(from, '⚠️ Formato: DELETE 42')
        return new NextResponse('', { status: 200 })
      }
      await sql`UPDATE announcements SET active = false WHERE id = ${id}`
      await sendReply(from, `✅ Annuncio #${id} disattivato.`)
      return new NextResponse('', { status: 200 })
    }

    // ── Default: store as new announcement ──
    const senderName = from.replace('whatsapp:', '')
    await sql`
      INSERT INTO announcements (message, "from", active)
      VALUES (${body}, ${senderName}, true)
    `
    await sendReply(from, `✅ Annuncio pubblicato!\n\n"${body}"\n\nInvia LIST per vedere tutti gli annunci o DELETE <id> per rimuoverne uno.`)

    return new NextResponse('', { status: 200 })
  } catch (err) {
    console.error('WhatsApp webhook error:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
