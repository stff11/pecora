'use client'

import { useEffect, useState, useRef } from 'react'

export default function NewsBar() {
  const [messages, setMessages] = useState([])
  const [paused,   setPaused]   = useState(false)
  const trackRef = useRef(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/announcements', { cache: 'no-store' })
        const data = await res.json()
        if (data.length > 0) setMessages(data)
      } catch {
        // silently keep defaults
      }
    }
    load()
    // refresh every 5 minutes
    const interval = setInterval(load, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const defaults = [
    'Chiusi la Domenica',
  ]

  const items = messages.length > 0 ? messages.map(m => m.message) : defaults

  if (items.length === 0) return null

  // duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div
      className="news-bar"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Notizie del circolo"
    >
      <div
        ref={trackRef}
        className="news-track"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {doubled.map((msg, i) => (
          <span key={i} className="news-item">
            {msg}
          </span>
        ))}
      </div>

      <style jsx>{`
        .news-bar {
          background: var(--vino);
          color: var(--oro-light);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          letter-spacing: .06em;
          padding: 10px 0;
          overflow: hidden;
          position: relative;
          z-index: 100;
          min-height: 38px;
          cursor: default;
        }
        .news-track {
          display: flex;
          animation: scroll-left 35s linear infinite;
          white-space: nowrap;
          width: max-content;
        }
        .news-item {
          padding: 0 2.5rem;
        }
        .news-item::after {
          content: ' ✦ ';
          color: var(--oro);
          margin: 0 .8rem;
        }
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
