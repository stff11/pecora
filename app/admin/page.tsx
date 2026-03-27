import { cookies } from 'next/headers';
import { neon } from '@neondatabase/serverless';
import { login, createAnnouncement, toggleAnnouncement, deleteAnnouncement } from '../actions';

export default async function AdminPage() {
  const isAuth = (await cookies()).get("admin_session")?.value === "true";

  if (!isAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form action={login} className="p-8 bg-white rounded shadow-md w-80 text-center">
          <h1 className="mb-4 text-xl font-bold">Admin Login</h1>
          <input name="password" type="password" placeholder="Password" className="w-full p-2 border mb-4 rounded" required />
          <button type="submit" className="w-full bg-black text-white p-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  const sql = neon(process.env.DATABASE_URL!);
  const announcements = await sql`SELECT * FROM announcements ORDER BY created_at DESC`;

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manager</h1>
        <a href="/" className="text-blue-500 hover:underline">View Site →</a>
      </div>

      {/* Post New Form */}
      <section className="mb-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
        <h2 className="text-lg font-semibold mb-3">Create New Announcement</h2>
        <form action={createAnnouncement} className="flex gap-2">
          <input name="message" placeholder="Type a new event message..." className="flex-1 p-3 border rounded-lg" required />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Post</button>
        </form>
      </section>

      {/* List of Messages */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Message Library</h2>
        {announcements.map((msg) => (
          <div key={msg.id} className="border p-5 rounded-xl flex items-center justify-between bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1">
              <p className={`text-lg ${!msg.active ? 'text-gray-400 italic' : 'text-gray-900 font-medium'}`}>
                {msg.message}
              </p>
              <div className="flex gap-4 mt-1">
                <span className="text-xs text-gray-400">ID: {msg.id}</span>
                <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex gap-2 ml-6">
              <form action={toggleAnnouncement.bind(null, msg.id, msg.active)}>
                <button className={`w-28 py-2 rounded-lg text-sm font-bold transition-colors ${msg.active ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}>
                  {msg.active ? 'Disable' : 'Enable'}
                </button>
              </form>
              <form action={deleteAnnouncement.bind(null, msg.id)}>
                <button className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-100">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}