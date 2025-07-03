'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { MousePointer, Eye, Type, Image, Layout, Navigation, Palette, Smartphone } from 'lucide-react'

interface ComponentInfo {
  id: string
  name: string
  description: string
  whatItDoes: string
  icon: React.ReactNode
  color: string
  position: { x: number; y: number }
  size: { width: number; height: number }
}

const WebsiteMapSection: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null)
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

  const websiteComponents: ComponentInfo[] = [
    {
      id: 'header',
      name: 'Header/Navigation',
      description: 'The top section of your website',
      whatItDoes: 'Contains your logo, main menu, and helps users navigate around your site. Think of it as the reception desk of your digital building.',
      icon: <Navigation className="w-6 h-6" />,
      color: 'bg-moss-500',
      position: { x: 10, y: 10 },
      size: { width: 80, height: 12 }
    },
    {
      id: 'hero',
      name: 'Hero Section',
      description: 'The big attention-grabbing section',
      whatItDoes: 'The first thing visitors see. Usually has a big headline, some compelling text, and a call-to-action button. This is your elevator pitch.',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-clay-500',
      position: { x: 10, y: 25 },
      size: { width: 80, height: 25 }
    },
    {
      id: 'sidebar',
      name: 'Sidebar',
      description: 'The side column (optional)',
      whatItDoes: 'Extra space for widgets, recent posts, contact info, or anything that supports your main content. Not every site needs one.',
      icon: <Layout className="w-6 h-6" />,
      color: 'bg-earth-500',
      position: { x: 70, y: 53 },
      size: { width: 20, height: 35 }
    },
    {
      id: 'content',
      name: 'Main Content',
      description: 'Where the magic happens',
      whatItDoes: 'Your actual content - blog posts, product descriptions, about info, whatever you\'re sharing with the world. This is why people came.',
      icon: <Type className="w-6 h-6" />,
      color: 'bg-moss-600',
      position: { x: 10, y: 53 },
      size: { width: 57, height: 35 }
    },
    {
      id: 'footer',
      name: 'Footer',
      description: 'The bottom section',
      whatItDoes: 'Copyright info, contact details, social links, sitemap. The basement of your website where you put all the important but not-so-sexy stuff.',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'bg-clay-600',
      position: { x: 10, y: 90 },
      size: { width: 80, height: 8 }
    }
  ]

  const designElements = [
    {
      id: 'typography',
      name: 'Typography',
      description: 'The fonts and text styles',
      whatItDoes: 'Makes your text readable and gives personality to your site. Comic Sans is not recommended unless you\'re actually writing comics.',
      icon: <Type className="w-5 h-5" />,
      color: 'text-moss-600'
    },
    {
      id: 'colors',
      name: 'Color Scheme',
      description: 'Your website\'s color palette',
      whatItDoes: 'Sets the mood and makes everything look cohesive. Pro tip: Don\'t use 47 different colors unless you\'re designing a rainbow.',
      icon: <Palette className="w-5 h-5" />,
      color: 'text-clay-600'
    },
    {
      id: 'images',
      name: 'Images & Media',
      description: 'Photos, videos, icons, graphics',
      whatItDoes: 'Makes your site visually interesting and helps tell your story. A picture is worth a thousand words, but don\'t use a thousand pictures.',
      icon: <Image className="w-5 h-5" />,
      color: 'text-earth-600'
    },
    {
      id: 'interactions',
      name: 'Interactions',
      description: 'Hover effects, animations, clicks',
      whatItDoes: 'Makes your site feel alive and responsive. When users click, tap, or hover, things should happen. It\'s like magic, but with code.',
      icon: <MousePointer className="w-5 h-5" />,
      color: 'text-moss-700'
    }
  ]

  return (
    <section id="websitemap" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Website Anatomy 101
          </h2>
          <p className="text-xl text-earth-700 max-w-3xl mx-auto">
            Ever wondered what the fuck all these website parts are called? 
            Hover over the sections below to learn what each piece does.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Website Layout Visualization */}
          <motion.div
            className="card p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-earth-800 mb-6 text-center">
              Interactive Website Layout
            </h3>
            
            <div className="relative bg-gray-50 border-2 border-gray-300 rounded-lg overflow-hidden" style={{ height: '400px' }}>
              {websiteComponents.map((component) => (
                <motion.div
                  key={component.id}
                  className={`absolute cursor-pointer border-2 border-white rounded ${component.color} opacity-80 hover:opacity-100 transition-all duration-300`}
                  style={{
                    left: `${component.position.x}%`,
                    top: `${component.position.y}%`,
                    width: `${component.size.width}%`,
                    height: `${component.size.height}%`,
                  }}
                  onMouseEnter={() => setHoveredComponent(component.id)}
                  onMouseLeave={() => setHoveredComponent(null)}
                  onClick={() => setSelectedComponent(component)}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center text-white">
                      {component.icon}
                      <div className="text-xs font-medium mt-1 hidden sm:block">
                        {component.name}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Label */}
                  {hoveredComponent === component.id && (
                    <motion.div
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {component.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              
              {/* Browser Chrome */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-300 border-b-2 border-gray-400 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="ml-4 text-xs text-gray-600">yourawesome.website</div>
              </div>
            </div>
            
            <p className="text-sm text-earth-600 text-center mt-4">
              Click on any section to learn more about what it does!
            </p>
          </motion.div>

          {/* Component Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {selectedComponent ? (
              <motion.div
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 ${selectedComponent.color} text-white rounded-lg`}>
                    {selectedComponent.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-earth-800">
                    {selectedComponent.name}
                  </h3>
                </div>
                <p className="text-earth-600 mb-4">{selectedComponent.description}</p>
                <div className="bg-earth-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-earth-800 mb-2">What it does:</h4>
                  <p className="text-earth-700">{selectedComponent.whatItDoes}</p>
                </div>
              </motion.div>
            ) : (
              <div className="card p-6 text-center">
                <div className="text-4xl mb-4">👆</div>
                <h3 className="text-xl font-bold text-earth-800 mb-2">
                  Click a section above!
                </h3>
                <p className="text-earth-600">
                  Select any part of the website layout to learn what it does and why you might need it.
                </p>
              </div>
            )}

            {/* Design Elements */}
            <div className="card p-6">
              <h3 className="text-2xl font-bold text-earth-800 mb-6">
                Design Elements That Matter
              </h3>
              <div className="space-y-4">
                {designElements.map((element, index) => (
                  <motion.div
                    key={element.id}
                    className="bg-earth-50 p-4 rounded-lg hover:bg-earth-100 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${element.color}`}>
                        {element.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-earth-800 mb-1">
                          {element.name}
                        </h4>
                        <p className="text-sm text-earth-600 mb-2">{element.description}</p>
                        <p className="text-sm text-earth-700">{element.whatItDoes}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pro Tips */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="card p-8 bg-gradient-to-r from-moss-50 to-clay-50">
            <h3 className="text-2xl font-bold text-gradient text-center mb-6">
              Pro Tips for Website Success 🎯
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <h4 className="font-semibold text-earth-800">Keep it simple</h4>
                    <p className="text-earth-700 text-sm">Clean layouts are easier to navigate and look more professional.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h4 className="font-semibold text-earth-800">Mobile-first thinking</h4>
                    <p className="text-earth-700 text-sm">Most people browse on phones. Make sure your site looks good on small screens.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h4 className="font-semibold text-earth-800">Speed matters</h4>
                    <p className="text-earth-700 text-sm">Slow websites make people leave. Optimize your images and code.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <h4 className="font-semibold text-earth-800">Content is king</h4>
                    <p className="text-earth-700 text-sm">Good design means nothing without good content. Write for humans, not robots.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WebsiteMapSection
