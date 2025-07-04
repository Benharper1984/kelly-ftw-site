'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'
import { RotateCcw, Download, ZoomIn, ZoomOut } from 'lucide-react'

const MarkmapMindMapSection: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const mmRef = useRef<Markmap | null>(null)

  // Combined mind map content in Markdown format
  const mindmapContent = `
# Kelly For The Win - Learning Journey

## 🌟 Endless Possibilities
### 💻 Websites & Web Apps
- Portfolio Sites
  - Show off your badass work
  - Personal branding
  - Client showcases
- E-commerce Stores
  - Sell products online
  - Payment integration
  - Inventory management
- Blogs & Content Sites
  - Share your thoughts
  - Build an audience
  - Monetize content
- SaaS Applications
  - Subscription models
  - User management
  - API integrations

### 📱 Mobile Applications
- Native iOS/Android Apps
  - React Native
  - Flutter
  - Swift/Kotlin
- Progressive Web Apps (PWA)
  - Offline functionality
  - Push notifications
  - App-like experience
- Cross-platform Solutions
  - Code once, deploy everywhere
  - Consistent user experience

### 🤖 AI & Automation
- Chatbots & Virtual Assistants
  - Customer service automation
  - Lead generation
  - FAQ handling
- Machine Learning Models
  - Predictive analytics
  - Image recognition
  - Natural language processing
- Workflow Automation
  - Task scheduling
  - Data processing
  - Integration pipelines

### 🛠️ Developer Tools
- VS Code Extensions
  - Custom functionality
  - Productivity boosters
  - Team collaboration
- GitHub Workflows
  - CI/CD pipelines
  - Automated testing
  - Code quality checks
- API Development
  - RESTful services
  - GraphQL endpoints
  - Microservices

## 🌱 Sustainable Tech Solutions
### 🚜 Farm Management Systems
- Crop Planning Software
  - Seasonal scheduling
  - Yield optimization
  - Resource allocation
- Soil Monitoring Tools
  - pH tracking
  - Nutrient analysis
  - Moisture sensors
- Harvest Tracking
  - Inventory management
  - Quality control
  - Distribution planning

### 💼 Agricultural Business Tools
- Customer Relationship Management
  - CSA member management
  - Communication systems
  - Subscription handling
- Financial Tracking
  - Expense monitoring
  - Revenue analysis
  - Tax preparation
- Supply Chain Management
  - Vendor relationships
  - Order processing
  - Logistics coordination

### 🌐 Digital Presence for Farms
- Farm Websites
  - Story telling
  - Product showcases
  - Online ordering
- Social Media Management
  - Content scheduling
  - Community building
  - Brand awareness
- E-commerce Integration
  - Online farm store
  - Subscription boxes
  - Marketplace presence

### 📊 Data & Analytics
- Yield Optimization
  - Performance metrics
  - Predictive modeling
  - Resource efficiency
- Weather Integration
  - Forecast planning
  - Risk assessment
  - Climate adaptation
- Market Analysis
  - Price tracking
  - Demand forecasting
  - Competitive intelligence

### 🔧 IoT & Automation
- Smart Irrigation Systems
  - Automated watering
  - Water conservation
  - Remote monitoring
- Environmental Sensors
  - Temperature tracking
  - Humidity monitoring
  - Air quality measurement
- Livestock Monitoring
  - Health tracking
  - Feeding automation
  - Location monitoring

### 💰 Digital Income Streams
- Online Courses
  - Farming techniques
  - Sustainable practices
  - Business development
- Digital Products
  - E-books and guides
  - Planning templates
  - Software tools
- Consulting Services
  - Virtual consultations
  - System implementations
  - Training programs

## 🚀 Getting Started
### 🛠️ Essential Tools
- VS Code
  - Your coding command center
  - Extensions and themes
  - Integrated terminal
- GitHub
  - Version control
  - Collaboration
  - Portfolio hosting
- Node.js & npm
  - Package management
  - Build tools
  - Development server

### 📚 Learning Path
- HTML & CSS Basics
  - Structure and styling
  - Responsive design
  - Modern layouts
- JavaScript Fundamentals
  - Programming concepts
  - DOM manipulation
  - API interactions
- React & Next.js
  - Component-based development
  - State management
  - Full-stack applications
- Database Integration
  - Supabase
  - PostgreSQL
  - Real-time updates

### 🎯 Project Ideas
- Personal Portfolio
- Blog or Documentation Site
- Todo List Application
- Weather Dashboard
- Recipe Manager
- Farm Management System
- Community Platform
- E-commerce Store
`

  useEffect(() => {
    if (!svgRef.current) return

    const transformer = new Transformer()
    const { root } = transformer.transform(mindmapContent)
    
    const mm = Markmap.create(svgRef.current, {
      autoFit: true,
      color: (node: any) => {
        // Custom color scheme based on depth and content
        if (node.depth === 0) return '#667eea' // Root - purple
        if (node.depth === 1) {
          // Main categories - different colors
          if (node.content.includes('Possibilities')) return '#f093fb'
          if (node.content.includes('Sustainable')) return '#43e97b'
          if (node.content.includes('Getting Started')) return '#4facfe'
          return '#fa709a'
        }
        if (node.depth === 2) return '#ffeaa7' // Subcategories - yellow
        return '#74b9ff' // Details - blue
      },
      duration: 800,
      maxWidth: 300,
      spacingVertical: 8,
      spacingHorizontal: 120,
      fitRatio: 0.95,
      paddingX: 8,
    }, root)

    mmRef.current = mm
    
    // Auto-fit after initial render
    setTimeout(() => {
      mm.fit()
    }, 100)

    return () => {
      mm.destroy()
    }
  }, [])

  const handleZoomIn = () => {
    if (mmRef.current) {
      mmRef.current.rescale(1.3)
    }
  }

  const handleZoomOut = () => {
    if (mmRef.current) {
      mmRef.current.rescale(0.7)
    }
  }

  const handleReset = () => {
    if (mmRef.current) {
      mmRef.current.fit()
    }
  }

  const handleDownload = () => {
    if (svgRef.current) {
      const svgData = new XMLSerializer().serializeToString(svgRef.current)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        
        const link = document.createElement('a')
        link.download = 'kelly-ftw-mindmap.png'
        link.href = canvas.toDataURL()
        link.click()
      }
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

  return (
    <section id="mindmap" className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-red-600/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-bold text-white mb-6">
            Your Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the complete universe of possibilities - from web development to sustainable agriculture tech. Your coding adventure starts here! 🚀
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-4 mb-8 flex-wrap"
        >
          <button
            onClick={handleZoomIn}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
          >
            <ZoomIn size={20} />
            <span>Zoom In</span>
          </button>
          <button
            onClick={handleZoomOut}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
          >
            <ZoomOut size={20} />
            <span>Zoom Out</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
          >
            <RotateCcw size={20} />
            <span>Reset View</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
          >
            <Download size={20} />
            <span>Download</span>
          </button>
        </motion.div>

        {/* Mind Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden"
          style={{ height: '700px' }}
        >
          <svg
            ref={svgRef}
            className="w-full h-full"
            style={{ background: 'transparent' }}
          />
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-300 text-lg">
            🧠 <strong>Click</strong> nodes to expand/collapse • <strong>Drag</strong> to pan • <strong>Scroll</strong> to zoom • <strong>Explore</strong> all the possibilities!
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default MarkmapMindMapSection
