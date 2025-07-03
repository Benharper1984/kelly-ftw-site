'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check, ExternalLink, Database, Shield, Code, Zap, Users, Globe } from 'lucide-react'

const SupabaseGuideSection: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('intro')

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const codeExamples = {
    install: 'npm install @supabase/supabase-js',
    init: `import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)`,
    
    insert: `// Add a new user to your database
const { data, error } = await supabase
  .from('users')
  .insert([
    { name: 'Kelly', email: 'kelly@awesome.com', role: 'admin' }
  ])`,
  
    select: `// Get all users from your database
const { data: users, error } = await supabase
  .from('users')
  .select('*')`,
  
    auth: `// Sign up a new user
const { data, error } = await supabase.auth.signUp({
  email: 'kelly@example.com',
  password: 'secure-password'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'kelly@example.com',
  password: 'secure-password'
})`
  }

  const features = [
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Database',
      description: 'PostgreSQL database that scales with your needs',
      whatItDoes: 'Store your website data - user profiles, blog posts, products, whatever you need. No SQL knowledge required to get started.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Authentication',
      description: 'User signup, login, and password management',
      whatItDoes: 'Let users create accounts and log in securely. Handles all the complex security stuff so you don\'t have to.'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Real-time',
      description: 'Live updates without page refreshes',
      whatItDoes: 'Changes appear instantly across all connected users. Like Google Docs but for your website data.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Edge Functions',
      description: 'Server-side code that runs close to users',
      whatItDoes: 'Backend logic without managing servers. Handle payments, send emails, process data - all in the cloud.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Row Level Security',
      description: 'Control who can see and edit what',
      whatItDoes: 'Users can only access their own data. Built-in privacy and security without the headaches.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global CDN',
      description: 'Fast loading times worldwide',
      whatItDoes: 'Your website loads quickly for users anywhere in the world. No need to worry about server locations.'
    }
  ]

  const tabs = [
    { id: 'intro', label: 'What is Supabase?' },
    { id: 'setup', label: 'Getting Started' },
    { id: 'database', label: 'Database Basics' },
    { id: 'auth', label: 'User Authentication' },
    { id: 'examples', label: 'Code Examples' }
  ]

  return (
    <section id="supabase" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Supabase Guide
          </h2>
          <p className="text-xl text-earth-700 max-w-3xl mx-auto">
            What the fuck is Supabase? It's your backend without the bullshit. 
            Database, authentication, and APIs - all handled for you.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 mr-2 mb-2 ${
                  activeTab === tab.id
                    ? 'bg-moss-600 text-white shadow-lg'
                    : 'text-earth-700 hover:bg-moss-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'intro' && (
            <div className="space-y-8">
              {/* What is Supabase */}
              <div className="card p-8">
                <h3 className="text-3xl font-bold text-earth-800 mb-6 text-center">
                  Supabase: Your Backend Bestie 🚀
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-moss-700 mb-4">The Simple Explanation</h4>
                    <p className="text-earth-700 leading-relaxed mb-4">
                      Think of Supabase as a magic box that handles all the behind-the-scenes stuff 
                      your website needs. User accounts, data storage, file uploads - it's all there, 
                      ready to use.
                    </p>
                    <p className="text-earth-700 leading-relaxed">
                      Instead of building and managing your own servers (which is a pain in the ass), 
                      you just connect to Supabase and it handles everything for you.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-clay-700 mb-4">Why You'll Love It</h4>
                    <ul className="space-y-2 text-earth-700">
                      <li>• <strong>Free to start:</strong> No credit card required</li>
                      <li>• <strong>No server management:</strong> They handle the tech stuff</li>
                      <li>• <strong>Real-time updates:</strong> Changes happen instantly</li>
                      <li>• <strong>Built-in security:</strong> Your data is protected</li>
                      <li>• <strong>Scales with you:</strong> Grows as your site gets popular</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="card p-6 hover-glow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-moss-600 mb-4">{feature.icon}</div>
                    <h4 className="text-xl font-bold text-earth-800 mb-2">{feature.title}</h4>
                    <p className="text-earth-600 mb-3">{feature.description}</p>
                    <p className="text-sm text-earth-700">{feature.whatItDoes}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'setup' && (
            <div className="space-y-8">
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-earth-800 mb-6">Getting Started with Supabase</h3>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-moss-600 pl-6">
                    <h4 className="font-semibold text-earth-800 mb-2">Step 1: Create Your Account</h4>
                    <p className="text-earth-700 mb-3">
                      Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" 
                      className="text-moss-600 hover:underline">supabase.com</a> and sign up. 
                      It's free and takes about 30 seconds.
                    </p>
                  </div>

                  <div className="border-l-4 border-clay-600 pl-6">
                    <h4 className="font-semibold text-earth-800 mb-2">Step 2: Create a New Project</h4>
                    <p className="text-earth-700 mb-3">
                      Click "New Project" and give it a name. Choose a password for your database 
                      (write it down somewhere safe!).
                    </p>
                  </div>

                  <div className="border-l-4 border-earth-600 pl-6">
                    <h4 className="font-semibold text-earth-800 mb-2">Step 3: Get Your Keys</h4>
                    <p className="text-earth-700 mb-3">
                      In your project dashboard, go to Settings → API. You'll see your URL and API keys. 
                      These are like the address and password for your backend.
                    </p>
                  </div>

                  <div className="border-l-4 border-moss-600 pl-6">
                    <h4 className="font-semibold text-earth-800 mb-2">Step 4: Install in Your Project</h4>
                    <p className="text-earth-700 mb-3">
                      In VS Code, open your terminal and run this command:
                    </p>
                    <div className="bg-earth-100 p-4 rounded-lg font-mono text-sm flex items-center justify-between">
                      <code>{codeExamples.install}</code>
                      <button
                        onClick={() => copyToClipboard(codeExamples.install, 'install')}
                        className="ml-4 p-2 bg-moss-600 text-white rounded hover:bg-moss-700 transition-colors"
                      >
                        {copied === 'install' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-8">
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-earth-800 mb-6">Database Basics (No SQL Needed!)</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-moss-700 mb-4">Think of Tables Like Spreadsheets</h4>
                    <p className="text-earth-700 mb-4">
                      Your database is just a collection of tables, and each table is like a Google Sheet:
                    </p>
                    <ul className="space-y-2 text-earth-700">
                      <li>• <strong>Rows:</strong> Individual records (like a user or blog post)</li>
                      <li>• <strong>Columns:</strong> Properties (name, email, created_date)</li>
                      <li>• <strong>Primary Key:</strong> Unique ID for each row</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-clay-700 mb-4">Common Table Examples</h4>
                    <div className="space-y-3">
                      <div className="bg-earth-50 p-3 rounded">
                        <strong>users:</strong> id, email, name, created_at
                      </div>
                      <div className="bg-earth-50 p-3 rounded">
                        <strong>posts:</strong> id, title, content, author_id
                      </div>
                      <div className="bg-earth-50 p-3 rounded">
                        <strong>products:</strong> id, name, price, description
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-earth-800 mb-4">Creating Tables</h4>
                  <p className="text-earth-700 mb-4">
                    In your Supabase dashboard, go to the Table Editor. Click "Create a new table" 
                    and add your columns. Supabase will generate the SQL for you!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'auth' && (
            <div className="space-y-8">
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-earth-800 mb-6">User Authentication Made Simple</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-moss-700 mb-3">What Authentication Gives You</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ul className="space-y-2 text-earth-700">
                        <li>• User signup and login</li>
                        <li>• Password reset via email</li>
                        <li>• Social logins (Google, GitHub, etc.)</li>
                        <li>• Session management</li>
                      </ul>
                      <ul className="space-y-2 text-earth-700">
                        <li>• Email confirmation</li>
                        <li>• User profiles</li>
                        <li>• Protected pages/content</li>
                        <li>• Secure user data</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-clay-700 mb-3">Enable Authentication</h4>
                    <p className="text-earth-700 mb-4">
                      In your Supabase dashboard, go to Authentication → Settings. 
                      Enable email auth and configure your site URL. That's it!
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-earth-800 mb-3">Basic Auth Code</h4>
                    <div className="bg-earth-100 p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
                        <code>{codeExamples.auth}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(codeExamples.auth, 'auth')}
                        className="mt-3 px-4 py-2 bg-moss-600 text-white rounded hover:bg-moss-700 transition-colors flex items-center space-x-2"
                      >
                        {copied === 'auth' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copied === 'auth' ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-8">
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-earth-800 mb-6">Code Examples You Can Actually Use</h3>
                
                <div className="space-y-8">
                  {/* Initialize Supabase */}
                  <div>
                    <h4 className="font-semibold text-moss-700 mb-3">1. Initialize Supabase in Your Project</h4>
                    <p className="text-earth-700 mb-3">Create a file called `supabase.js` in your project:</p>
                    <div className="bg-earth-100 p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
                        <code>{codeExamples.init}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(codeExamples.init, 'init')}
                        className="mt-3 px-4 py-2 bg-moss-600 text-white rounded hover:bg-moss-700 transition-colors flex items-center space-x-2"
                      >
                        {copied === 'init' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copied === 'init' ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Insert Data */}
                  <div>
                    <h4 className="font-semibold text-clay-700 mb-3">2. Add Data to Your Database</h4>
                    <div className="bg-earth-100 p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
                        <code>{codeExamples.insert}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(codeExamples.insert, 'insert')}
                        className="mt-3 px-4 py-2 bg-clay-600 text-white rounded hover:bg-clay-700 transition-colors flex items-center space-x-2"
                      >
                        {copied === 'insert' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copied === 'insert' ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Select Data */}
                  <div>
                    <h4 className="font-semibold text-earth-700 mb-3">3. Get Data from Your Database</h4>
                    <div className="bg-earth-100 p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
                        <code>{codeExamples.select}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(codeExamples.select, 'select')}
                        className="mt-3 px-4 py-2 bg-earth-600 text-white rounded hover:bg-earth-700 transition-colors flex items-center space-x-2"
                      >
                        {copied === 'select' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copied === 'select' ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="card p-8 bg-gradient-to-r from-moss-50 to-clay-50">
                <h3 className="text-2xl font-bold text-gradient text-center mb-6">
                  Ready to Dive Deeper? 🤿
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-earth-800 mb-3">Helpful Resources</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" 
                           className="text-moss-600 hover:underline flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Official Supabase Docs
                        </a>
                      </li>
                      <li>
                        <a href="https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs" 
                           target="_blank" rel="noopener noreferrer" 
                           className="text-moss-600 hover:underline flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Next.js Tutorial
                        </a>
                      </li>
                      <li>
                        <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" 
                           className="text-moss-600 hover:underline flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Your Supabase Dashboard
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-earth-800 mb-3">Pro Tips</h4>
                    <ul className="space-y-2 text-earth-700 text-sm">
                      <li>• Start with a simple table and build up</li>
                      <li>• Use Row Level Security for user data</li>
                      <li>• Test your auth flow thoroughly</li>
                      <li>• Keep your API keys secure</li>
                      <li>• Join the Supabase Discord for help</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default SupabaseGuideSection
