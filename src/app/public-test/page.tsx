export default function PublicTest() {
  return (
    <html>
      <head>
        <title>Public Test - Kelly For The Win</title>
      </head>
      <body style={{margin: 0, padding: '50px', fontFamily: 'Arial', background: 'linear-gradient(45deg, #purple, #pink)', color: 'white', textAlign: 'center'}}>
        <h1>🎉 SUCCESS! 🎉</h1>
        <h2>Kelly For The Win is LIVE!</h2>
        <p>If you can see this page, the deployment is working perfectly.</p>
        <p>The issue was Vercel's Deployment Protection settings.</p>
        <p>Time: {new Date().toLocaleString()}</p>
      </body>
    </html>
  )
}
