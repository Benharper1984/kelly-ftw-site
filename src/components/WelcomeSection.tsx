'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const WelcomeSection: React.FC = () => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const welcomeText = "Do you need a bunch of money and coding experience to build a website? Fuck No! You can AI do it and then take all the credit without it coming back for vengence, maybe....."

  return (
    <section id="welcome" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Hero Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gradient mb-8"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            Kelly For The Win
          </motion.h1>

          {/* Main Message */}
          <motion.div
            className="card p-8 md:p-12 max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.p
              className="text-xl md:text-2xl leading-relaxed text-earth-800 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {welcomeText}
            </motion.p>
            
            <motion.button
              onClick={() => copyToClipboard(welcomeText)}
              className="mt-6 inline-flex items-center space-x-2 px-4 py-2 bg-clay-100 hover:bg-clay-200 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm">{copied ? 'Copied!' : 'Copy Quote'}</span>
            </motion.button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div
              className="card p-6 hover-glow"
              whileHover={{ y: -10, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">🚫💰</div>
              <h3 className="text-xl font-bold text-moss-700 mb-2">No Money Needed</h3>
              <p className="text-earth-700">Free tools, free knowledge, zero bullshit fees</p>
            </motion.div>

            <motion.div
              className="card p-6 hover-glow"
              whileHover={{ y: -10, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">🤖✨</div>
              <h3 className="text-xl font-bold text-moss-700 mb-2">AI Does The Work</h3>
              <p className="text-earth-700">Let the machines code while you take the credit</p>
            </motion.div>

            <motion.div
              className="card p-6 hover-glow"
              whileHover={{ y: -10, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">👑💪</div>
              <h3 className="text-xl font-bold text-moss-700 mb-2">You're The Boss</h3>
              <p className="text-earth-700">Build your vision without hiring anyone</p>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.button
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('mindmap')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Let's Fucking Go! 🚀
            </motion.button>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-moss-300 rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WelcomeSection
