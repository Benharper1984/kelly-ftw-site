export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-8">Kelly For The Win</h1>
          <h2 className="text-2xl mb-8">Build Websites Without The Bullshit</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Learn to create your own websites using VSCode and GitHub Copilot. 
            No coding experience required, just AI and attitude.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🧠 Mind Map</h3>
              <p>Visualize your learning journey</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🚀 Jump In</h3>
              <p>Get started immediately</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🗺️ Website Map</h3>
              <p>Navigate your options</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🛠️ Prompting Tools</h3>
              <p>Master AI assistance</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🗄️ Supabase Guide</h3>
              <p>Database made simple</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">✅ Success</h3>
              <p>You're seeing this = it works!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
