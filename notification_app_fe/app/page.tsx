'use client';

import Link from 'next/link';

export default function Home() {
  const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#333'
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    listStyle: 'none',
    padding: 0
  };

  const linkStyle: React.CSSProperties = {
    padding: '1rem 2rem',
    backgroundColor: '#1976d2',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Notifications Application</h1>
      <nav>
        <ul style={navStyle}>
          <li>
            <Link href="/all-notifications" style={linkStyle}>
              All Notifications
            </Link>
          </li>
          <li>
            <Link href="/priority-notifications" style={linkStyle}>
              Priority Notifications
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
