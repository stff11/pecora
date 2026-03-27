'use client';

import React, { useState } from 'react';
import NewsBar from '../components/newsBar'

export default function Home() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <NewsBar />

      {/* ── NAV ── */}
      <nav>
      <div className="nav-logo">
        <em>Max Dance</em> presenta 
        <br className="mobile-break" /> {/* This is the magic line for breaking neatly on smaller screens */}
        La Pecora Nera
      </div>
        
        {/* Mobile Toggle Button */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#danza" onClick={() => setMenuOpen(false)}>Danza</a></li>
          <li><a href="#attivita" onClick={() => setMenuOpen(false)}>Attività</a></li>
          <li><a href="#orari" onClick={() => setMenuOpen(false)}>Orari</a></li>
          <li><a href="#dove" onClick={() => setMenuOpen(false)}>Dove Siamo</a></li>
          <li><a href="#socio" onClick={() => setMenuOpen(false)}>Diventa Socio</a></li>
          <li><a href="/admin" onClick={() => setMenuOpen(false)} className="admin">Admin</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-photo" />
        <div className="hero-content">
          <p className="hero-subtitle">Max Dance presenta</p>
          <h1 className="hero-title">La Pecora<em>Nera</em></h1>
          <p className="hero-place">Circolo Ricreativo · Porto Torres, Sardegna</p>
          <div className="hero-divider" />
          <p className="hero-lead">
            Danza latinoamericana, giochi di società, buona compagnia e i sapori autentici della Sardegna.
          </p>
          <a href="#danza" className="btn-primary">Scopri le Attività</a>
        </div>
      </section>

      {/* ── DANZA ── */}
      <section id="danza">
        <div className="section-inner">
          <p className="section-label">Il cuore del circolo</p>
          <h2 className="section-title">Max &amp; Angelika<br />vi portano in pista</h2>
          <p className="section-lead">Due insegnanti appassionati, una pista e tanta musica. Le lezioni di danza sudamericana sono il fulcro della vita del circolo.</p>
          <div className="danza-grid">
            <div className="danza-text">
              <h3>Lezioni per tutti i livelli</h3>
              <p>Max e Angelika accolgono principianti assoluti e ballerini esperti con uguale entusiasmo. Il loro metodo combina tecnica rigorosa e un'atmosfera festosa, tipica della cultura latinoamericana.</p>
              <p>Ogni lezione si trasforma in un'occasione di socialità: nuove amicizie, risate e la soddisfazione di imparare qualcosa di bello insieme.</p>
              <div className="teacher-badges">
                <span className="badge">Max – Insegnante</span>
                <span className="badge">Angelika – Insegnante</span>
                <span className="badge">Tutti i livelli</span>
              </div>
            </div>
            <div className="dance-card-visual">
              <ul className="dance-styles">
                <li>Salsa</li>
                <li>Bachata</li>
                <li>Tango</li>
                <li>&amp; altro ancora</li>
              </ul>
              <div className="schedule-tag">Martedì &amp; Giovedì</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATTIVITÀ ── */}
      <section id="attivita">
        <div className="section-inner">
          <p className="section-label">Ogni giorno qualcosa di speciale</p>
          <h2 className="section-title">Le Attività del Circolo</h2>
          <p className="section-lead">Oltre alla danza, il circolo offre una ricca programmazione settimanale per tutti i gusti.</p>
          <div className="attivita-grid">
            <div className="act-card">
              <div className="act-icon">💃</div>
              <p className="act-day">Martedì &amp; Giovedì</p>
              <h3>Danza Sudamericana</h3>
              <p>Salsa, bachata, tango e molto altro con Max e Angelika. Lezioni aperte a tutti, dall'assoluto principiante al ballerino navigato.</p>
              <p className="act-organizer">Con Max &amp; Angelika</p>
            </div>
            <div className="act-card">
              <div className="act-icon">🎱</div>
              <p className="act-day">Mercoledì</p>
              <h3>Torneo di Boccette</h3>
              <p>Ogni mercoledì si sfidano i campioni del biliardo. Un torneo amichevole ma competitivo che tiene banco fino a tardi.</p>
              <p className="act-organizer">Con Davide &amp; Gianluca</p>
            </div>
            <div className="act-card">
              <div className="act-icon">♟️</div>
              <p className="act-day">Sabato</p>
              <h3>Scacchi</h3>
              <p>Per i cultori del gioco più antico del mondo. Partite casual, sfide aperte e una comunità di appassionati in continua crescita.</p>
              <p className="act-organizer">Con Sarah &amp; Fabio</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONVIVIALITÀ ── */}
      <section id="convivialita">
        <div className="section-inner">
          <p className="section-label" style={{ color: 'var(--oro-light)' }}>Dopo ogni attività</p>
          <h2 className="section-title">🍷 Momenti di Convivialità</h2>
          <p className="section-lead" style={{ color: 'rgba(245,237,224,.75)' }}>
            Le attività del circolo non finiscono sulla pista o al tavolo da gioco. Si prolungano a tavola, tra sapori veri e compagnia autentica.
          </p>
          <div className="conv-grid">
            <div className="conv-item">
              <div className="icon">🍽️</div>
              <h4>Pasti Caldi</h4>
              <p>Cucina genuina preparata con cura, riservata ai soci del circolo. Il meglio della tradizione gastronomica locale.</p>
            </div>
            <div className="conv-item">
              <div className="icon">🍷</div>
              <h4>Vino Locale</h4>
              <p>Una selezione di vini sardi da accompagnare ogni momento. Dal Cannonau al Vermentino, la Sardegna nel bicchiere.</p>
            </div>
            <div className="conv-item">
              <div className="icon">🥂</div>
              <h4>Aperitivi &amp; Buffet</h4>
              <p>Prima delle attività o a fine serata, aperitivi e piccoli buffet creano l'atmosfera giusta per fare nuove conoscenze.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ORARI ── */}
      <section id="orari">
        <div className="section-inner">
          <p className="section-label">Programmazione settimanale</p>
          <h2 className="section-title">Quando Ci Troviamo</h2>
          <h3>Da Lunedì a Sabato 11-22</h3>
          <table className="orari-table">
            <thead>
              <tr>
                <th>Giorno</th>
                <th>Attività</th>
                <th>Responsabili</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Lunedì</td>
                <td>↣ Freccette</td>
                <td>Sarah &amp; Fabio</td>
              </tr>
              <tr className="highlight-row">
                <td>Martedì</td>
                <td>💃 Danza sudamericana (salsa, bachata, tango…)</td>
                <td>Max &amp; Angelika</td>
              </tr>
              <tr>
                <td>Mercoledì</td>
                <td>🎱 Torneo di boccette al biliardo</td>
                <td>Davide &amp; Gianluca</td>
              </tr>
              <tr className="highlight-row">
                <td>Giovedì</td>
                <td>💃 Danza sudamericana (salsa, bachata, tango…)</td>
                <td>Max &amp; Angelika</td>
              </tr>
              <tr>
                <td>Sabato</td>
                <td>♟️ Torneo di scacchi</td>
                <td>Gianluca &amp; Max</td>
              </tr>
              <tr className="giorno-chiuso">
                <td>Domenica</td>
                <td colSpan={2}>Chiuso – ci riposiamo per ricominciare!</td>
              </tr>
            </tbody>
          </table>
          <p className="riservato">
            * Attività, pasti e bibite, riservati ai soli soci del circolo.
          </p>
        </div>
      </section>

      {/* ── DOVE ── */}
      <section id="dove">
        <div className="section-inner">
          <p className="section-label">Come raggiungerci</p>
          <h2 className="section-title">Dove Siamo</h2>
          <div className="dove-grid">
            <div className="dove-info">
              <h3>La Pecora Nera</h3>
              <p><strong>Indirizzo:</strong> Via Lussu, Porto Torres (SS)</p>
              <p><strong>Tipo:</strong> Circolo ricreativo privato</p>
              <p style={{ marginTop: '1.2rem', fontStyle: 'italic', color: 'var(--grigio)' }}>
                Il circolo è riservato ai soci. Per informazioni su come diventare socio, contattaci o vieni a trovarci durante le attività.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <a
                  href="https://www.google.com/maps/place/La+Pecora+Nera/@40.834095,8.4138498,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: '.78rem' }}
                >
                  Apri in Google Maps
                </a>
              </div>
            </div>
            <div className="dove-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1640.6!2d8.4112695!3d40.834095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12dc866b5e82a69f%3A0xcefcd50a8fe32e95!2sLa+Pecora+Nera!5e0!3m2!1sit!2sit!4v1711000000000"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa La Pecora Nera Porto Torres"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIO ── */}
      <section id="socio">
        <div className="section-inner">
          <p className="section-label" style={{ color: 'var(--oro)' }}>Vuoi far parte della famiglia?</p>
          <h2 className="section-title">Diventa Socio</h2>
          <p className="section-lead">
            Il circolo La Pecora Nera è una comunità aperta a chiunque voglia condividere passioni, imparare qualcosa di nuovo e godersi la buona compagnia.
          </p>
          <a href="mailto:info@lapecoranera.it" className="btn-primary">Contattaci per Info</a>
          <p className="socio-note">
            Le attività, la cucina e tutti i servizi del circolo sono riservati esclusivamente ai soci regolarmente iscritti, nel rispetto delle normative sui circoli ricreativi.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <p>Max Dance presenta La Pecora Nera – Porto Torres</p>
        <p>© {currentYear}</p>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <div id="admin-panel"><button title="WhatsApp"><a href="https://wa.me/39336885288" class="whatsapp-float" target="_blank"><svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg></a></button></div>

    </>
  )
}
