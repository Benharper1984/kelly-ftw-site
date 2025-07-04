'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'welcome', label: 'Welcome', emoji: '🌟' },
    { id: 'mindmap', label: 'Mind Map', emoji: '🧠' },
    { id: 'permaculture', label: 'Permaculture', emoji: '🌱' },
    { id: 'jumpin', label: 'Jump In', emoji: '🚀' },
    { id: 'websitemap', label: 'Website Map', emoji: '🗺️' },
    { id: 'prompting', label: 'Prompting Tools', emoji: '🎯' },
    { id: 'supabase', label: 'Supabase Guide', emoji: '💾' },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-earth-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('welcome')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">👑</span>
            <span className="font-bold text-xl text-gradient">Kelly For The Win</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeSection === item.id
                    ? 'bg-moss-600 text-white shadow-lg'
                    : 'text-earth-700 hover:bg-moss-50 hover:text-moss-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-moss-50 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <motion.div
                  className="w-full h-0.5 bg-earth-700"
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                />
                <motion.div
                  className="w-full h-0.5 bg-earth-700"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                />
                <motion.div
                  className="w-full h-0.5 bg-earth-700"
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-earth-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-3 mb-2 ${
                  activeSection === item.id
                    ? 'bg-moss-600 text-white'
                    : 'text-earth-700 hover:bg-moss-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navigation
