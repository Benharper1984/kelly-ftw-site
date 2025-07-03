'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check, Download, ExternalLink, ChevronRight } from 'lucide-react'

const JumpInSection: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggleStep = (stepNumber: number) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(stepNumber)) {
      newCompleted.delete(stepNumber)
    } else {
      newCompleted.add(stepNumber)
    }
    setCompletedSteps(newCompleted)
  }

  const steps = [
    {
      id: 1,
      title: "Download VS Code",
      description: "Get your coding command center - it's free and doesn't suck",
      action: "Download",
      link: "https://code.visualstudio.com/",
      details: [
        "Go to code.visualstudio.com",
        "Click the big download button",
        "Install like any other app",
        "Don't worry, it won't break your computer"
      ]
    },
    {
      id: 2,
      title: "Create a Project Folder",
      description: "NOT in iCloud or you'll regret it later",
      action: "Create Folder",
      details: [
        "Open Finder (Mac) or File Explorer (Windows)",
        "Navigate to your Desktop or Documents",
        "Right-click and create a new folder",
        "Name it something like 'MyAwesomeWebsite'",
        "⚠️ IMPORTANT: Don't put it in iCloud/OneDrive/Dropbox"
      ]
    },
    {
      id: 3,
      title: "Open Folder in VS Code",
      description: "This is where the magic starts",
      action: "Open VS Code",
      details: [
        "Launch VS Code",
        "Go to File → Open Folder",
        "Select your project folder",
        "VS Code will ask if you trust the folder - say yes"
      ]
    },
    {
      id: 4,
      title: "Install GitHub Copilot",
      description: "Your AI coding buddy that does the heavy lifting",
      action: "Install Extension",
      details: [
        "Click the Extensions icon (4 squares) in VS Code",
        "Search for 'GitHub Copilot'",
        "Install the official GitHub Copilot extension",
        "Sign in with your GitHub account",
        "If you don't have GitHub, create a free account"
      ]
    },
    {
      id: 5,
      title: "Activate Copilot Chat",
      description: "Talk to your AI assistant like you're texting a friend",
      action: "Start Chatting",
      command: "@workspace Create a beautiful landing page for my business",
      details: [
        "Click the chat icon or press Ctrl+Shift+I",
        "Type '@workspace' to give Copilot context",
        "Tell it what you want to build",
        "Use natural language - no coding required!"
      ]
    },
    {
      id: 6,
      title: "Let AI Do The Work",
      description: "Seriously, just sit back and watch the magic happen",
      action: "Copy & Execute",
      command: "Make it responsive and add a contact form",
      details: [
        "Copilot will generate code for you",
        "Copy the code it provides",
        "Create new files as suggested",
        "Follow the instructions - AI will guide you",
        "Ask questions if you're confused"
      ]
    }
  ]

  const samplePrompts = [
    "Create a modern portfolio website with dark mode",
    "Build an e-commerce site for handmade jewelry",
    "Make a blog about sustainable living with a nature theme",
    "Create a restaurant website with online ordering",
    "Build a fitness app landing page with workout videos"
  ]

  return (
    <section id="jumpin" className="min-h-screen py-20 px-4 bg-gradient-moss">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Jump In - Setup Guide
          </h2>
          <p className="text-xl text-earth-700 max-w-3xl mx-auto">
            Follow these steps and you'll be building websites faster than you can say 
            "what the fuck is CSS?" No prior experience needed.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-earth-700">Progress:</span>
              <div className="w-48 bg-earth-200 rounded-full h-2">
                <div
                  className="bg-moss-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-earth-700">
                {completedSteps.size}/{steps.length}
              </span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`card p-6 border-l-4 transition-all duration-300 ${
                completedSteps.has(step.id)
                  ? 'border-l-green-500 bg-green-50/50'
                  : 'border-l-moss-600'
              }`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.button
                      onClick={() => toggleStep(step.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        completedSteps.has(step.id)
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-moss-600 hover:bg-moss-600 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {completedSteps.has(step.id) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-sm font-bold">{step.id}</span>
                      )}
                    </motion.button>
                    
                    <div>
                      <h3 className="text-xl font-bold text-earth-800">{step.title}</h3>
                      <p className="text-earth-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Step Details */}
                  <div className="ml-12 space-y-3">
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <ChevronRight className="w-4 h-4 text-moss-600 mt-0.5 flex-shrink-0" />
                          <span className="text-earth-700">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      {step.link && (
                        <motion.a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{step.action}</span>
                        </motion.a>
                      )}

                      {step.command && (
                        <motion.button
                          onClick={() => copyToClipboard(step.command, `step-${step.id}`)}
                          className="btn-secondary flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {copied === `step-${step.id}` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span>{copied === `step-${step.id}` ? 'Copied!' : 'Copy Command'}</span>
                        </motion.button>
                      )}
                    </div>

                    {step.command && (
                      <div className="bg-earth-100 rounded-lg p-3 font-mono text-sm text-earth-800 mt-3">
                        {step.command}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sample Prompts Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="card p-8">
            <h3 className="text-2xl font-bold text-earth-800 mb-6 text-center">
              🎯 Sample Prompts to Get You Started
            </h3>
            <p className="text-earth-600 text-center mb-8">
              Not sure what to build? Try one of these prompts with your AI assistant:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {samplePrompts.map((prompt, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-clay p-4 rounded-lg hover-glow cursor-pointer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => copyToClipboard(prompt, `prompt-${index}`)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-earth-800 font-medium">{prompt}</span>
                    {copied === `prompt-${index}` ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-earth-600" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-earth-600">
                Click any prompt to copy it, then paste it into your Copilot chat!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Encouragement */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="card p-8 bg-gradient-to-r from-moss-50 to-clay-50">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              You've Got This! 💪
            </h3>
            <p className="text-lg text-earth-700 max-w-2xl mx-auto">
              Remember: Every expert was once a beginner. The only difference between 
              you and a "professional developer" is that they've made more mistakes. 
              Start making yours today!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default JumpInSection
