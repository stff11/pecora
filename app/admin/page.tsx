import { cookies } from 'next/headers';
import { neon } from '@neondatabase/serverless';
import { login, createAnnouncement, toggleAnnouncement, deleteAnnouncement } from '../actions';

export default async function AdminPage() {
  const isAuth = (await cookies()).get("admin_session")?.value === "true";

  // ── LOGIN VIEW ──
  if (!isAuth) {
    return (
      <div className="login-screen">
        <div className="login-box">
          <h1>Admin Login</h1>
          <p>Area riservata ai gestori del circolo</p>
          <form action={login}>
            <div className="form-group">
              <label>Password di Accesso</label>
              <input name="password" type="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-admin primary" style={{ width: '100%', marginTop: '1rem' }}>
              Entra nel Pannello
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sql = neon(process.env.DATABASE_URL!);
  const announcements = await sql`SELECT * FROM announcements ORDER BY created_at DESC`;

  // ── DASHBOARD VIEW ──
  return (
    <div className="admin-page">
      <div className="admin-inner">
        
        <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1>Manager</h1>
            <p>Gestione avvisi e bacheca digitale</p>
          </div>
          <a href="/" className="btn-admin ghost" style={{ textDecoration: 'none', fontSize: '0.7rem' }}>
            Torna al Sito →
          </a>
        </header>

        {/* Create New Announcement */}
        <section className="admin-card" style={{ padding: '0', border: 'none', background: 'transparent' }}>
          <div className="admin-card">
            <h2>Nuovo Annuncio</h2>
            <form action={createAnnouncement}>
              <div className="form-group">
                <label>Messaggio della bacheca</label>
                <textarea 
                  name="message" 
                  placeholder="Esempio: Stasera torneo di boccette posticipato alle 21:30..." 
                  required 
                />
              </div>
              <button type="submit" className="btn-admin primary">Pubblica Messaggio</button>
            </form>
          </div>
        </section>

        {/* Message Library */}
        <div className="admin-card">
          <h2>Cronologia Messaggi</h2>
          <div className="announcement-list">
            {announcements.map((msg) => (
              <div key={msg.id} className="announcement-row">
                <div className="ann-meta">
                  <div className={`ann-status ${msg.active ? 'active' : 'inactive'}`} style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
                    {msg.active ? 'Visibile' : 'Nascosto'}
                  </div>
                  <p className="msg">{msg.message}</p>
                  <div className="details">
                    ID: {msg.id} • {new Date(msg.created_at).toLocaleDateString('it-IT')}
                  </div>
                </div>

                <div className="ann-actions">
                  <form action={toggleAnnouncement.bind(null, msg.id, msg.active)}>
                    <button type="submit" className="btn-admin ghost" style={{ minWidth: '100px' }}>
                      {msg.active ? 'Disattiva' : 'Attiva'}
                    </button>
                  </form>
                  <form action={deleteAnnouncement.bind(null, msg.id)}>
                    <button type="submit" className="btn-admin danger">Elimina</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}