'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import WelcomeSection from '@/components/WelcomeSection'
import MarkmapMindMapSection from '@/components/MarkmapMindMapSection'
import JumpInSection from '@/components/JumpInSection'
import WebsiteMapSection from '@/components/WebsiteMapSection'
import PromptingToolsSection from '@/components/PromptingToolsSection'
import SupabaseGuideSection from '@/components/SupabaseGuideSection'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [activeSection, setActiveSection] = useState('welcome')

  return (
    <div className="min-h-screen">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <WelcomeSection />
          <MarkmapMindMapSection />
          <JumpInSection />
          <WebsiteMapSection />
          <PromptingToolsSection />
          <SupabaseGuideSection />
        </motion.div>
      </main>
    </div>
  )
}
