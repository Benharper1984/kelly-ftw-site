'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react'

interface Node {
  id: string
  label: string
  category: string
  description: string
  children?: Node[]
  expanded?: boolean
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

const MindMapSection: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoomBehavior, setZoomBehavior] = useState<any>(null)

  const mindMapData: { [key: string]: Node } = {
    possibilities: {
      id: 'root',
      label: 'Endless Possibilities',
      category: 'root',
      description: 'The universe of what you can build with code',
      children: [
        {
          id: 'websites',
          label: 'Websites',
          category: 'web',
          description: 'From blogs to e-commerce empires',
          children: [
            { id: 'portfolio', label: 'Portfolio Sites', category: 'web', description: 'Show off your badass work' },
            { id: 'ecommerce', label: 'E-commerce', category: 'web', description: 'Sell shit online and make bank' },
            { id: 'blogs', label: 'Blogs & CMS', category: 'web', description: 'Share your thoughts with the world' }
          ]
        },
        {
          id: 'apps',
          label: 'Mobile Apps',
          category: 'mobile',
          description: 'Apps that people actually want to use',
          children: [
            { id: 'social', label: 'Social Apps', category: 'mobile', description: 'Connect people, create communities' },
            { id: 'productivity', label: 'Productivity', category: 'mobile', description: 'Help people get shit done' },
            { id: 'games', label: 'Games', category: 'mobile', description: 'Fun and addictive experiences' }
          ]
        },
        {
          id: 'ai',
          label: 'AI Solutions',
          category: 'ai',
          description: 'The future is intelligent',
          children: [
            { id: 'chatbots', label: 'Chatbots', category: 'ai', description: 'Conversational AI interfaces' },
            { id: 'automation', label: 'Automation', category: 'ai', description: 'Smart workflow solutions' },
            { id: 'analysis', label: 'Data Analysis', category: 'ai', description: 'Extract insights from chaos' }
          ]
        },
        {
          id: 'tools',
          label: 'Dev Tools',
          category: 'tools',
          description: 'Build the tools that build everything else',
          children: [
            { id: 'vscode', label: 'VS Code', category: 'tools', description: 'Your coding command center' },
            { id: 'github', label: 'GitHub', category: 'tools', description: 'Version control and collaboration' },
            { id: 'supabase', label: 'Supabase', category: 'tools', description: 'Backend as a service - no server bullshit' }
          ]
        }
      ]
    }
  }

  const [currentMap, setCurrentMap] = useState<'possibilities'>('possibilities')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; content: string }>({
    visible: false,
    x: 0,
    y: 0,
    content: ''
  })

  // Enhanced zoom control functions with better boundaries and smooth transitions
  const handleZoomIn = () => {
    if (svgRef.current && zoomBehavior) {
      const svg = d3.select(svgRef.current)
      svg.transition().duration(400).ease(d3.easeQuadOut).call(zoomBehavior.scaleBy, 1.3)
    }
  }

  const handleZoomOut = () => {
    if (svgRef.current && zoomBehavior) {
      const svg = d3.select(svgRef.current)
      svg.transition().duration(400).ease(d3.easeQuadOut).call(zoomBehavior.scaleBy, 0.77)
    }
  }

  const handleResetZoom = () => {
    if (svgRef.current && zoomBehavior) {
      const svg = d3.select(svgRef.current)
      const container = containerRef.current!
      const width = container.clientWidth
      const height = 700
      svg.transition().duration(750).ease(d3.easeQuadOut).call(
        zoomBehavior.transform,
        d3.zoomIdentity.translate(width * 0.1, height * 0.1).scale(0.75)
      )
    }
  }

  const handleFitToScreen = () => {
    if (svgRef.current && zoomBehavior) {
      const svg = d3.select(svgRef.current)
      const container = containerRef.current!
      const width = container.clientWidth
      const height = 700
      
      // Calculate optimal zoom to fit all visible nodes
      const rootNode = mindMapData[currentMap]
      const nodes = flattenNodes(rootNode, expandedNodes)
      
      if (nodes.length > 1) {
        const padding = 100
        const xExtent = d3.extent(nodes, (d: any) => d.x || 0) as [number, number]
        const yExtent = d3.extent(nodes, (d: any) => d.y || 0) as [number, number]
        
        const contentWidth = (xExtent[1] - xExtent[0]) || width
        const contentHeight = (yExtent[1] - yExtent[0]) || height
        
        const scaleX = (width - padding * 2) / contentWidth
        const scaleY = (height - padding * 2) / contentHeight
        const scale = Math.min(scaleX, scaleY, 1.2) // Cap max zoom
        
        const centerX = (xExtent[0] + xExtent[1]) / 2
        const centerY = (yExtent[0] + yExtent[1]) / 2
        
        const translateX = width / 2 - scale * centerX
        const translateY = height / 2 - scale * centerY
        
        svg.transition().duration(750).ease(d3.easeQuadOut).call(
          zoomBehavior.transform,
          d3.zoomIdentity.translate(translateX, translateY).scale(scale)
        )
      } else {
        // Default fit if no nodes positioned yet
        svg.transition().duration(750).ease(d3.easeQuadOut).call(
          zoomBehavior.transform,
          d3.zoomIdentity.translate(width * 0.05, height * 0.05).scale(0.85)
        )
      }
    }
  }

  // Enhanced text wrapping function with better sizing
  const wrapText = (text: any, width: number, maxLines: number = 3) => {
    text.each(function(this: SVGTextElement, d: any) {
      const textElement = d3.select(this)
      const words = textElement.text().split(/\s+/).reverse()
      let word
      let line: string[] = []
      let lineNumber = 0
      const lineHeight = 1.2
      const y = textElement.attr('y') || 0
      const dy = parseFloat(textElement.attr('dy') || '0')
      
      // Clear existing text
      textElement.text(null)
      
      let tspan = textElement.append('tspan')
        .attr('x', 0)
        .attr('y', y)
        .attr('dy', dy + 'em')
      
      while (word = words.pop()) {
        line.push(word)
        tspan.text(line.join(' '))
        
        // Check if we exceed width or max lines
        if ((tspan.node() as any)?.getComputedTextLength() > width) {
          line.pop()
          tspan.text(line.join(' '))
          
          if (lineNumber >= maxLines - 1) {
            // Truncate with ellipsis if too many lines
            const currentText = tspan.text()
            if (currentText.length > 10) {
              tspan.text(currentText.substring(0, 10) + '...')
            }
            break
          }
          
          line = [word]
          tspan = textElement.append('tspan')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
            .text(word)
        }
      }
      
      // Center multi-line text vertically
      if (lineNumber > 0) {
        const totalHeight = lineNumber * lineHeight
        textElement.selectAll('tspan')
          .attr('dy', (d, i) => (i === 0 ? dy - (totalHeight / 2) : lineHeight) + 'em')
      }
    })
  }

  const showTooltip = (event: any, content: string) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (containerRect) {
      setTooltip({
        visible: true,
        x: event.clientX - containerRect.left + 10,
        y: event.clientY - containerRect.top - 10,
        content
      })
    }
  }

  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, visible: false }))
  }

  // Helper function to calculate node radius
  const getNodeRadius = (node: any, rootId: string) => {
    if (node.id === rootId) return 45
    if (node.children && node.children.length > 0) return 32
    return 22
  }

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const container = containerRef.current
    const svg = d3.select(svgRef.current)
    const width = container.clientWidth
    const height = 700

    svg.selectAll('*').remove()
    svg.attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height)

    const g = svg.append('g')

    // Enhanced zoom behavior with better constraints (setup without node references)
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 8])
      .filter((event) => {
        // Allow all zoom events but prevent default on wheel to avoid page scroll
        if (event.type === 'wheel') {
          event.preventDefault()
        }
        return true
      })
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)
    setZoomBehavior(zoom)

    // Set initial zoom to show full map with better positioning
    svg.call(zoom.transform, d3.zoomIdentity.translate(width * 0.1, height * 0.1).scale(0.75))

    // Prepare data with better initial positioning
    const rootNode = mindMapData[currentMap]
    const nodes = flattenNodes(rootNode, expandedNodes)
    const links = createLinks(nodes)

    // Set better initial positions to prevent overlapping
    nodes.forEach((node, i) => {
      if (node.id === rootNode.id) {
        node.x = width / 2
        node.y = height / 2
      } else if (!node.x || !node.y) {
        // Position child nodes in a circle around their parent
        const angle = (i * 2 * Math.PI) / Math.max(nodes.length - 1, 1)
        const radius = node.children ? 200 : 300
        node.x = width / 2 + Math.cos(angle) * radius
        node.y = height / 2 + Math.sin(angle) * radius
      }
    })

    // Create gradient definitions
    const defs = svg.append('defs')
    
    const gradients = [
      { id: 'root-gradient', colors: ['#667eea', '#764ba2'] },
      { id: 'web-gradient', colors: ['#f093fb', '#f5576c'] },
      { id: 'mobile-gradient', colors: ['#4facfe', '#00f2fe'] },
      { id: 'ai-gradient', colors: ['#43e97b', '#38f9d7'] },
      { id: 'tools-gradient', colors: ['#fa709a', '#fee140'] }
    ]

    gradients.forEach(grad => {
      const gradient = defs.append('radialGradient')
        .attr('id', grad.id)
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%')
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', grad.colors[0])
        .attr('stop-opacity', 0.9)
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', grad.colors[1])
        .attr('stop-opacity', 0.7)
    })

    // Enhanced force simulation with better parameters
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance((d: any) => {
        const sourceIsRoot = d.source.id === rootNode.id
        const targetHasChildren = d.target.children && d.target.children.length > 0
        
        // Dynamic distance based on content and hierarchy
        if (sourceIsRoot) return 200
        if (targetHasChildren) return 150
        return 120
      }).strength(0.8))
      .force('charge', d3.forceManyBody().strength((d: any) => {
        if (d.id === rootNode.id) return -1500
        if (d.children) return -800
        return -400
      }))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => {
        // Dynamic collision radius based on text content
        const baseRadius = getNodeRadius(d, rootNode.id)
        const textLength = d.label.length
        const lineCount = Math.ceil(textLength / 12) // Estimate lines
        return Math.max(baseRadius + 5, baseRadius + (lineCount * 8))
      }).strength(0.9))
      .force('radial', d3.forceRadial((d: any) => {
        if (d.id === rootNode.id) return 0
        if (d.children) return 240
        return 360
      }, width / 2, height / 2).strength(0.15))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05))

    // Create enhanced links
    const link = g.append('g')
      .selectAll('path')
      .data(links)
      .enter().append('path')
      .attr('fill', 'none')
      .attr('stroke', (d: any) => d.target.id === rootNode.id ? '#667eea' : '#cbd5e0')
      .attr('stroke-width', (d: any) => d.target.id === rootNode.id ? 4 : 2)
      .attr('opacity', 0.6)
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))')

    // Create node groups
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    // Add circles with improved dynamic sizing
    node.append('circle')
      .attr('r', (d: any) => getNodeRadius(d, rootNode.id))
      .attr('fill', (d: any) => `url(#${d.category}-gradient)`)
      .attr('stroke', '#fff')
      .attr('stroke-width', (d: any) => d.id === rootNode.id ? 4 : 3)
      .style('filter', 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))')
      .style('transition', 'all 0.3s ease')

    // Add expansion indicators for nodes with children
    node.filter((d: any) => d.children && d.children.length > 0)
      .append('circle')
      .attr('r', 8)
      .attr('cx', (d: any) => getNodeRadius(d, rootNode.id) * 0.7)
      .attr('cy', (d: any) => -getNodeRadius(d, rootNode.id) * 0.7)
      .attr('fill', (d: any) => expandedNodes.has(d.id) ? '#ef4444' : '#10b981')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))')
      .style('transition', 'all 0.3s ease')

    node.filter((d: any) => d.children && d.children.length > 0)
      .append('text')
      .attr('x', (d: any) => getNodeRadius(d, rootNode.id) * 0.7)
      .attr('y', (d: any) => -getNodeRadius(d, rootNode.id) * 0.7 + 4)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#fff')
      .style('pointer-events', 'none')
      .text((d: any) => expandedNodes.has(d.id) ? '−' : '+')

    // Add improved labels with dynamic sizing
    const labels = node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', (d: any) => {
        if (d.id === rootNode.id) return '16px'
        if (d.children) return '13px'
        return '11px'
      })
      .attr('font-weight', (d: any) => d.id === rootNode.id ? 'bold' : '600')
      .attr('fill', '#fff')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 1px 3px rgba(0,0,0,0.5)')
      .text((d: any) => d.label)

    // Apply intelligent text wrapping with dynamic constraints
    labels.each(function(d: any) {
      const radius = getNodeRadius(d, rootNode.id)
      const maxWidth = radius * 1.8
      const maxLines = d.id === rootNode.id ? 2 : (d.children ? 2 : 3)
      d3.select(this).call(wrapText, maxWidth, maxLines)
    })

    // Enhanced interaction handlers with smooth animations
    node.on('click', (event, d: any) => {
      event.stopPropagation()
      if (d.children) {
        const newExpanded = new Set(expandedNodes)
        if (newExpanded.has(d.id)) {
          newExpanded.delete(d.id)
        } else {
          newExpanded.add(d.id)
        }
        
        // Add a brief highlight animation
        d3.select(event.currentTarget)
          .select('circle')
          .transition()
          .duration(150)
          .attr('r', getNodeRadius(d, rootNode.id) * 1.3)
          .transition()
          .duration(150)
          .attr('r', getNodeRadius(d, rootNode.id))
        
        setExpandedNodes(newExpanded)
      }
    })

    node.on('mouseover', function(event, d: any) {
      const circle = d3.select(this).select('circle')
      const baseRadius = getNodeRadius(d, rootNode.id)
      
      circle
        .transition()
        .duration(200)
        .attr('r', baseRadius * 1.15)
        .style('filter', 'drop-shadow(0 6px 20px rgba(0,0,0,0.3))')
      
      // Highlight connected elements with better visual feedback
      link
        .transition()
        .duration(200)
        .attr('opacity', (l: any) => 
          l.source === d || l.target === d ? 1 : 0.15
        )
        .attr('stroke-width', (l: any) => 
          l.source === d || l.target === d ? (l.target.id === rootNode.id ? 6 : 4) : 1
        )
      
      // Enhance connected nodes
      node
        .transition()
        .duration(200)
        .style('opacity', (n: any) => {
          const isConnected = links.some((l: any) => 
            (l.source === d && l.target === n) || 
            (l.target === d && l.source === n) ||
            n === d
          )
          return isConnected ? 1 : 0.4
        })
      
      showTooltip(event, d.description)
    })
    .on('mouseout', function(event, d: any) {
      const circle = d3.select(this).select('circle')
      const baseRadius = getNodeRadius(d, rootNode.id)
      
      circle
        .transition()
        .duration(200)
        .attr('r', baseRadius)
        .style('filter', 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))')
      
      link
        .transition()
        .duration(200)
        .attr('opacity', 0.6)
        .attr('stroke-width', (d: any) => d.target.id === rootNode.id ? 4 : 2)
      
      node
        .transition()
        .duration(200)
        .style('opacity', 1)
      
      hideTooltip()
    })

    // Enhanced simulation with better positioning and smoother updates
    simulation.on('tick', () => {
      // Constrain nodes to viewport with dynamic padding
      nodes.forEach((d: any) => {
        const radius = getNodeRadius(d, rootNode.id)
        const padding = 40
        d.x = Math.max(radius + padding, Math.min(width - radius - padding, d.x))
        d.y = Math.max(radius + padding, Math.min(height - radius - padding, d.y))
      })

      // Update links with smoother curved paths
      link.attr('d', (d: any) => {
        const dx = d.target.x - d.source.x
        const dy = d.target.y - d.source.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Adaptive curve based on distance
        const dr = Math.min(distance * 0.3, 80)
        const sweepFlag = dx > dy ? 1 : 0
        
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,${sweepFlag} ${d.target.x},${d.target.y}`
      })

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })

    // Add enhanced zoom functionality after nodes and links are created
    zoom.on('zoom', (event) => {
      g.attr('transform', event.transform)
      
      // Update node visibility based on zoom level
      const scale = event.transform.k
      node.selectAll('text')
        .style('opacity', scale < 0.3 ? 0 : Math.min(1, (scale - 0.2) * 2))
      
      // Adjust stroke width based on zoom
      link.attr('stroke-width', (d: any) => {
        const baseWidth = d.target.id === rootNode.id ? 4 : 2
        return Math.max(0.5, baseWidth / Math.sqrt(scale))
      })
    })

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

  }, [currentMap, expandedNodes])

  const flattenNodes = (root: Node, expanded: Set<string>): Node[] => {
    const nodes: Node[] = [root]
    
    const addChildren = (node: Node) => {
      if (node.children && expanded.has(node.id)) {
        node.children.forEach(child => {
          nodes.push(child)
          addChildren(child)
        })
      }
    }
    
    addChildren(root)
    return nodes
  }

  const createLinks = (nodes: Node[]) => {
    const links: any[] = []
    const nodeMap = new Map(nodes.map(node => [node.id, node]))
    
    nodes.forEach(node => {
      if (node.children && expandedNodes.has(node.id)) {
        node.children.forEach(child => {
          if (nodeMap.has(child.id)) {
            links.push({
              source: node.id,
              target: child.id
            })
          }
        })
      }
    })
    
    return links
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
            Explore the vast universe of possibilities. Click on nodes to expand them and discover what you can build!
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
            onClick={handleResetZoom}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </button>
          <button
            onClick={handleFitToScreen}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
          >
            <Maximize size={20} />
            <span>Fit Screen</span>
          </button>
        </motion.div>

        {/* Mind Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={containerRef}
          className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden"
          style={{ height: '700px' }}
        >
          <svg
            ref={svgRef}
            className="w-full h-full cursor-move"
          />
          
          {/* Tooltip */}
          {tooltip.visible && (
            <div
              className="absolute z-50 bg-black/90 text-white px-3 py-2 rounded-lg text-sm max-w-xs pointer-events-none border border-white/20"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: 'translateY(-100%)'
              }}
            >
              {tooltip.content}
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
            💡 <strong>Click</strong> nodes with + to expand • <strong>Drag</strong> to move • <strong>Hover</strong> for details • <strong>Scroll/Pinch</strong> to zoom
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default MindMapSection
