import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  try {
    const announcements = await sql`
      SELECT id, message, created_at
      FROM announcements
      WHERE active = true
      ORDER BY created_at DESC
      LIMIT 3
    `;

    return Response.json(announcements);
  } catch (error) {
    console.error('Failed to fetch announcements:', error);
    return Response.json([], { status: 500 });
  }
}