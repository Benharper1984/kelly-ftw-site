'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check, ArrowRight, ArrowLeft, Sparkles, Target, Palette, Zap } from 'lucide-react'

interface SurveyQuestion {
  id: string
  question: string
  type: 'single' | 'multiple' | 'text'
  options?: string[]
  placeholder?: string
}

interface SurveyAnswers {
  [key: string]: string | string[]
}

const PromptingToolsSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<SurveyAnswers>({})
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const surveyQuestions: SurveyQuestion[] = [
    {
      id: 'purpose',
      question: 'What kind of website do you want to build?',
      type: 'single',
      options: [
        'Portfolio to show off my work',
        'Blog to share my thoughts',
        'E-commerce store to sell products',
        'Business website for my company',
        'Landing page for a service',
        'Community/forum site',
        'Personal brand website',
        'Event or wedding website'
      ]
    },
    {
      id: 'industry',
      question: 'What industry or niche are you in?',
      type: 'single',
      options: [
        'Creative (art, photography, design)',
        'Health & wellness',
        'Technology & software',
        'Food & beverage',
        'Fashion & beauty',
        'Fitness & sports',
        'Education & coaching',
        'Real estate',
        'Finance & consulting',
        'Travel & hospitality',
        'Other/Multiple'
      ]
    },
    {
      id: 'style',
      question: 'What vibe are you going for?',
      type: 'single',
      options: [
        'Clean & minimalist',
        'Bold & colorful',
        'Dark & mysterious',
        'Warm & friendly',
        'Professional & corporate',
        'Artistic & creative',
        'Modern & techy',
        'Vintage & nostalgic'
      ]
    },
    {
      id: 'features',
      question: 'What features do you definitely need? (Select all that apply)',
      type: 'multiple',
      options: [
        'Contact form',
        'Photo gallery',
        'Blog section',
        'Online store/shopping cart',
        'Appointment booking',
        'User accounts/login',
        'Search functionality',
        'Social media integration',
        'Newsletter signup',
        'Video backgrounds',
        'Live chat',
        'Payment processing'
      ]
    },
    {
      id: 'colors',
      question: 'Any specific colors or themes you love?',
      type: 'text',
      placeholder: 'e.g., earthy tones, bright blues, black and gold, nature-inspired...'
    },
    {
      id: 'inspiration',
      question: 'Describe your dream website in a few words',
      type: 'text',
      placeholder: 'e.g., "Instagram meets Etsy for handmade jewelry" or "Netflix but for cooking tutorials"'
    }
  ]

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const nextStep = () => {
    if (currentStep < surveyQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      generatePrompt()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePrompt = () => {
    const purpose = answers.purpose as string
    const industry = answers.industry as string
    const style = answers.style as string
    const features = answers.features as string[]
    const colors = answers.colors as string
    const inspiration = answers.inspiration as string

    let prompt = `Create a ${style?.toLowerCase()} website for ${purpose?.toLowerCase()}`
    
    if (industry && industry !== 'Other/Multiple') {
      prompt += ` in the ${industry.toLowerCase()} industry`
    }
    
    prompt += '.'
    
    if (inspiration) {
      prompt += ` The concept is: ${inspiration}.`
    }
    
    if (colors) {
      prompt += ` Use ${colors} for the color scheme.`
    }
    
    if (features && features.length > 0) {
      prompt += ` Include these features: ${features.join(', ').toLowerCase()}.`
    }
    
    prompt += ' Make it responsive, accessible, and optimized for mobile devices. Use modern web technologies and best practices. Add hover effects and smooth animations to enhance user experience.'

    setGeneratedPrompt(prompt)
    setShowResults(true)
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetSurvey = () => {
    setCurrentStep(0)
    setAnswers({})
    setGeneratedPrompt('')
    setShowResults(false)
    setCopied(false)
  }

  const currentQuestion = surveyQuestions[currentStep]
  const progress = ((currentStep + 1) / surveyQuestions.length) * 100

  if (showResults) {
    return (
      <section id="prompting" className="min-h-screen py-20 px-4 bg-gradient-clay">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Your Custom Prompt is Ready! 🎉
            </h2>
            <p className="text-xl text-earth-700">
              Copy this prompt and paste it into your Copilot chat to get started
            </p>
          </motion.div>

          <motion.div
            className="card p-8 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-earth-800 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-moss-600" />
                Your Generated Prompt
              </h3>
              <motion.button
                onClick={copyPrompt}
                className="btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
              </motion.button>
            </div>
            
            <div className="bg-earth-50 p-6 rounded-lg border border-earth-200">
              <p className="text-earth-800 leading-relaxed font-medium">
                {generatedPrompt}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="card p-6">
              <h4 className="font-bold text-earth-800 mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-moss-600" />
                Next Steps
              </h4>
              <ol className="space-y-2 text-earth-700">
                <li>1. Open VS Code with your project folder</li>
                <li>2. Start a new Copilot chat</li>
                <li>3. Type "@workspace" and paste your prompt</li>
                <li>4. Let AI build your website!</li>
                <li>5. Ask follow-up questions to refine it</li>
              </ol>
            </div>
            
            <div className="card p-6">
              <h4 className="font-bold text-earth-800 mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-clay-600" />
                Pro Tips
              </h4>
              <ul className="space-y-2 text-earth-700">
                <li>• Be specific about what you want</li>
                <li>• Ask for explanations if confused</li>
                <li>• Request changes one at a time</li>
                <li>• Save your work frequently</li>
                <li>• Don't be afraid to experiment!</li>
              </ul>
            </div>
          </motion.div>

          <div className="text-center">
            <motion.button
              onClick={resetSurvey}
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Another Prompt
            </motion.button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="prompting" className="min-h-screen py-20 px-4 bg-gradient-clay">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Prompting Tools
          </h2>
          <p className="text-xl text-earth-700 max-w-3xl mx-auto">
            Not sure how to tell AI what you want? This survey will create the perfect 
            prompt for your dream website. No tech knowledge required!
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-earth-700">
              Question {currentStep + 1} of {surveyQuestions.length}
            </span>
            <span className="text-sm font-medium text-earth-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-earth-200 rounded-full h-2">
            <motion.div
              className="bg-moss-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="card p-8 mb-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-earth-800 mb-6">
              {currentQuestion.question}
            </h3>

            {currentQuestion.type === 'single' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(currentQuestion.id, option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                      answers[currentQuestion.id] === option
                        ? 'border-moss-600 bg-moss-50 text-moss-800'
                        : 'border-earth-200 hover:border-moss-300 hover:bg-moss-25'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multiple' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = (answers[currentQuestion.id] as string[] || []).includes(option)
                  return (
                    <motion.button
                      key={index}
                      onClick={() => {
                        const currentAnswers = (answers[currentQuestion.id] as string[]) || []
                        if (isSelected) {
                          handleAnswer(currentQuestion.id, currentAnswers.filter(a => a !== option))
                        } else {
                          handleAnswer(currentQuestion.id, [...currentAnswers, option])
                        }
                      }}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-moss-600 bg-moss-50 text-moss-800'
                          : 'border-earth-200 hover:border-moss-300 hover:bg-moss-25'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 mr-3 border-2 rounded ${
                          isSelected ? 'bg-moss-600 border-moss-600' : 'border-earth-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        {option}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            )}

            {currentQuestion.type === 'text' && (
              <textarea
                value={(answers[currentQuestion.id] as string) || ''}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full p-4 border-2 border-earth-200 rounded-lg focus:border-moss-600 focus:outline-none resize-none h-32"
                rows={4}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-clay-500 hover:bg-clay-600 text-white hover:shadow-lg'
            }`}
            whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
            whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            onClick={nextStep}
            disabled={!answers[currentQuestion.id] || (currentQuestion.type === 'multiple' && (answers[currentQuestion.id] as string[] || []).length === 0)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              !answers[currentQuestion.id] || (currentQuestion.type === 'multiple' && (answers[currentQuestion.id] as string[] || []).length === 0)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-moss-600 hover:bg-moss-700 text-white hover:shadow-lg'
            }`}
            whileHover={answers[currentQuestion.id] ? { scale: 1.05 } : {}}
            whileTap={answers[currentQuestion.id] ? { scale: 0.95 } : {}}
          >
            <span>{currentStep === surveyQuestions.length - 1 ? 'Generate Prompt' : 'Next'}</span>
            {currentStep === surveyQuestions.length - 1 ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default PromptingToolsSection
