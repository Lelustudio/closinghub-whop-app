export default function SimplePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FF4500 0%, #000000 50%, #FF4500 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)',
        padding: '2rem',
        borderRadius: '25px',
        color: 'white',
        textAlign: 'center',
        maxWidth: '400px',
        border: '1px solid #374151'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉 App Déployée !</h1>
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
          Votre application Whop est maintenant en ligne et fonctionnelle !
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a 
            href="/closer/create-profile" 
            style={{
              background: 'linear-gradient(90deg, #8CFF8E 0%, #00FF04 45%, #0FBF0F 100%)',
              color: 'black',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Formulaire Closer
          </a>
          <a 
            href="/entreprise/create-offer" 
            style={{
              background: 'linear-gradient(90deg, #8CFF8E 0%, #00FF04 45%, #0FBF0F 100%)',
              color: 'black',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Formulaire Entreprise
          </a>
        </div>
      </div>
    </div>
  );
}
