"use server"

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const sql = neon(process.env.DATABASE_URL!);

export async function login(formData: FormData) {
  const password = formData.get("password");
  if (password === process.env.ADMIN_PASSWORD) {
    (await cookies()).set("admin_session", "true", { 
      httpOnly: true, 
      secure: true,
      maxAge: 60 * 60 * 24 
    });
  }
  // Remove the "return { success... }" lines. 
  // Next.js will simply re-render the page, and the cookie check will pass.
  revalidatePath('/admin'); 
}

export async function createAnnouncement(formData: FormData) {
  const message = formData.get("message") as string;
  await sql`INSERT INTO announcements (message, active, from) VALUES (${message}, true, Admin)`;
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function toggleAnnouncement(id: number, currentState: boolean) {
  await sql`
    UPDATE announcements 
    SET active = ${!currentState} 
    WHERE id = ${id}
  `;
  revalidatePath('/'); // Refresh the homepage banner
  revalidatePath('/admin'); // Refresh this page
}

export async function deleteAnnouncement(id: number) {
  await sql`DELETE FROM announcements WHERE id = ${id}`;
  revalidatePath('/');
  revalidatePath('/admin');
}