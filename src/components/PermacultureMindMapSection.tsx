'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import { Play, RotateCcw, Leaf } from 'lucide-react'

interface PermacultureNode {
  name: string
  description: string
  children?: PermacultureNode[]
}

interface NodePosition {
  x: number
  y: number
  data: PermacultureNode
  isCenter: boolean
  color?: string
}

const PermacultureMindMapSection: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; content: string; title: string }>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
    title: ''
  })

  // Permaculture coding data structure
  const permacultureData: PermacultureNode = {
    name: "Permaculture\nCoding Hub",
    description: "Technology solutions for sustainable agriculture and regenerative practices",
    children: [
      {
        name: "Farm\nManagement",
        description: "Digital tools for crop planning, soil monitoring, and harvest tracking systems"
      },
      {
        name: "Business\nSystems", 
        description: "Customer management, financial tracking, and CSA operations automation"
      },
      {
        name: "Web\nPresence",
        description: "Websites, online stores, and digital marketing tools for sustainable businesses"
      },
      {
        name: "Data &\nAnalytics",
        description: "Yield optimization, customer insights, and predictive modeling for agriculture"
      },
      {
        name: "Automation\n& IoT",
        description: "Smart irrigation, sensors, and automated monitoring systems for farms"
      },
      {
        name: "Income\nStreams",
        description: "Digital products, courses, and passive revenue opportunities for farmers"
      }
    ]
  }

  // Earth-tone colors for each category
  const colors = [
    "#8BC34A", // Farm - Light Green
    "#4CAF50", // Business - Green  
    "#FF9800", // Web - Orange
    "#2196F3", // Data - Blue
    "#9C27B0", // Automation - Purple
    "#FFD700"  // Income - Gold
  ]

  const showTooltip = (event: any, title: string, content: string) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (containerRect) {
      setTooltip({
        visible: true,
        x: event.clientX - containerRect.left + 15,
        y: event.clientY - containerRect.top - 15,
        content,
        title
      })
    }
  }

  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, visible: false }))
  }

  const getPositions = (width: number, height: number): NodePosition[] => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.28
    const angleStep = (2 * Math.PI) / (permacultureData.children?.length || 1)
    
    const positions: NodePosition[] = [{
      x: centerX,
      y: centerY,
      data: permacultureData,
      isCenter: true
    }]

    permacultureData.children?.forEach((child, i) => {
      const angle = i * angleStep - Math.PI / 2 // Start from top
      positions.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        data: child,
        isCenter: false,
        color: colors[i]
      })
    })

    return positions
  }

  const drawMindMap = () => {
    if (!svgRef.current || !containerRef.current) return

    const container = containerRef.current
    const svg = d3.select(svgRef.current)
    const width = container.clientWidth
    const height = 600
    const centerX = width / 2
    const centerY = height / 2

    svg.attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height)

    const positions = getPositions(width, height)

    // Draw links first (so they appear behind nodes)
    if (isExpanded) {
      const links = svg.selectAll('.perm-link')
        .data(positions.slice(1)) // Exclude center node

      links.enter()
        .append('line')
        .attr('class', 'perm-link')
        .attr('x1', centerX)
        .attr('y1', centerY)
        .attr('x2', centerX)
        .attr('y2', centerY)
        .style('opacity', 0)
        .style('stroke', 'rgba(255,255,255,0.8)')
        .style('stroke-width', 3)
        .merge(links as any)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr('x2', (d: any) => d.x)
        .attr('y2', (d: any) => d.y)
        .style('opacity', 0.9)

      links.exit()
        .transition()
        .duration(500)
        .style('opacity', 0)
        .remove()
    } else {
      svg.selectAll('.perm-link')
        .transition()
        .duration(500)
        .style('opacity', 0)
        .remove()
    }

    // Draw nodes
    const nodes = svg.selectAll('.perm-node')
      .data(positions)

    const nodeEnter = nodes.enter()
      .append('g')
      .attr('class', (d: any) => d.isCenter ? 'perm-node perm-center-node' : 'perm-node')
      .attr('transform', `translate(${centerX}, ${centerY})`)
      .style('opacity', 0)
      .style('cursor', 'pointer')
      .on('click', function(event, d: any) {
        if (d.isCenter) {
          handleExpand()
        }
      })
      .on('mouseover', function(event, d: any) {
        showTooltip(event, d.data.name.replace('\n', ' '), d.data.description)
        
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', (d: any) => d.isCenter ? 55 : 40)
          .style('filter', 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))')
      })
      .on('mouseout', function() {
        hideTooltip()
        
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', (d: any) => d.isCenter ? 50 : 35)
          .style('filter', 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))')
      })

    // Add circles with gradients
    nodeEnter.append('circle')
      .attr('class', 'perm-node-circle')
      .attr('r', 0)
      .style('fill', (d: any) => d.isCenter ? '#8BC34A' : d.color)
      .style('stroke', '#ffffff')
      .style('stroke-width', 3)
      .style('filter', 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))')

    // Add text with multi-line support
    const textGroups = nodeEnter.append('text')
      .attr('class', 'perm-node-text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '0px')
      .style('font-weight', '600')
      .style('fill', 'white')
      .style('text-shadow', '2px 2px 4px rgba(0,0,0,0.8)')
      .style('pointer-events', 'none')

    textGroups.each(function(d: any) {
      const text = d3.select(this)
      const lines = d.data.name.split('\n')
      lines.forEach((line: string, i: number) => {
        text.append('tspan')
          .attr('x', 0)
          .attr('dy', i === 0 ? '-0.3em' : '1.2em')
          .text(line)
      })
    })

    // Animate entrance
    nodeEnter
      .transition()
      .duration(800)
      .delay((d: any, i) => d.isCenter ? 0 : i * 150)
      .style('opacity', 1)
      .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`)

    nodeEnter.select('circle')
      .transition()
      .duration(800)
      .delay((d: any, i) => d.isCenter ? 0 : i * 150)
      .attr('r', (d: any) => d.isCenter ? 50 : 35)

    nodeEnter.select('text')
      .transition()
      .duration(800)
      .delay((d: any, i) => d.isCenter ? 0 : i * 150)
      .style('font-size', (d: any) => d.isCenter ? '16px' : '12px')

    // Update existing nodes
    nodes.merge(nodeEnter as any)
      .transition()
      .duration(1000)
      .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`)

    // Add pulsing animation to center node
    if (isExpanded) {
      svg.select('.perm-center-node circle')
        .style('animation', 'none') // Reset animation
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .style('transform', 'scale(1.05)')
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .style('transform', 'scale(1)')
        .on('end', function repeat() {
          d3.select(this)
            .transition()
            .duration(1500)
            .ease(d3.easeLinear)
            .style('transform', 'scale(1.05)')
            .transition()
            .duration(1500)
            .ease(d3.easeLinear)
            .style('transform', 'scale(1)')
            .on('end', repeat)
        })
    }
  }

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleReset = () => {
    setIsExpanded(false)
    if (svgRef.current) {
      d3.select(svgRef.current).selectAll('*').remove()
    }
  }

  useEffect(() => {
    drawMindMap()
  }, [isExpanded])

  useEffect(() => {
    // Auto-expand after 2 seconds on first load
    const timer = setTimeout(() => {
      setIsExpanded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="permaculture" className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-700 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-400/20 to-green-600/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Permaculture</span> Coding
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how technology can support sustainable agriculture and regenerative practices. Build tools that help heal the earth! 🌱
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={handleExpand}
            className="flex items-center gap-2 px-6 py-3 bg-green-500/30 backdrop-blur-sm text-white rounded-lg hover:bg-green-500/50 transition-all duration-300 border border-green-400/30"
          >
            {isExpanded ? <RotateCcw size={20} /> : <Play size={20} />}
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500/30 backdrop-blur-sm text-white rounded-lg hover:bg-emerald-500/50 transition-all duration-300 border border-emerald-400/30"
          >
            <Leaf size={20} />
            <span>Reset</span>
          </button>
        </motion.div>

        {/* Mind Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={containerRef}
          className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden"
          style={{ height: '600px' }}
        >
          <svg
            ref={svgRef}
            className="w-full h-full"
          />
          
          {/* Tooltip */}
          {tooltip.visible && (
            <div
              className="absolute z-50 bg-black/90 text-white px-4 py-3 rounded-lg text-sm max-w-xs pointer-events-none border-2 border-green-400/60 shadow-lg"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: 'translateY(-100%)'
              }}
            >
              <div className="font-bold text-green-400 mb-2">{tooltip.title}</div>
              <div>{tooltip.content}</div>
            </div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-300 text-lg">
            🌱 <strong>Click</strong> the center to expand • <strong>Hover</strong> for details • <strong>Discover</strong> sustainable tech solutions
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default PermacultureMindMapSection
