'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'

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

  const mindMapData: { [key: string]: Node } = {
    possibilities: {
      id: 'root',
      label: 'Endless Possibilities with Coding',
      category: 'root',
      description: 'The universe of what you can build',
      children: [
        {
          id: 'websites',
          label: 'Websites',
          category: 'web',
          description: 'From blogs to e-commerce empires',
          children: [
            { id: 'portfolio', label: 'Portfolio Sites', category: 'web', description: 'Show off your badass work' },
            { id: 'ecommerce', label: 'E-commerce', category: 'web', description: 'Sell shit online and make bank' },
            { id: 'blogs', label: 'Blogs', category: 'web', description: 'Share your thoughts with the world' }
          ]
        },
        {
          id: 'apps',
          label: 'Mobile Apps',
          category: 'mobile',
          description: 'Apps that people actually want to use',
          children: [
            { id: 'social', label: 'Social Apps', category: 'mobile', description: 'Connect people, create communities' },
            { id: 'productivity', label: 'Productivity Tools', category: 'mobile', description: 'Help people get shit done' },
            { id: 'games', label: 'Games', category: 'mobile', description: 'Fun and addictive experiences' }
          ]
        },
        {
          id: 'automation',
          label: 'Automation',
          category: 'tools',
          description: 'Let computers do the boring stuff',
          children: [
            { id: 'scraping', label: 'Data Scraping', category: 'tools', description: 'Gather data from anywhere' },
            { id: 'bots', label: 'Chatbots', category: 'tools', description: 'AI assistants that actually help' },
            { id: 'workflows', label: 'Workflows', category: 'tools', description: 'Automate repetitive tasks' }
          ]
        }
      ]
    },
    tech: {
      id: 'tech-root',
      label: 'Tech Stack Overview',
      category: 'root',
      description: 'The tools that make the magic happen',
      children: [
        {
          id: 'frontend',
          label: 'Frontend',
          category: 'frontend',
          description: 'What users see and interact with',
          children: [
            { id: 'html', label: 'HTML', category: 'frontend', description: 'The skeleton of your website' },
            { id: 'css', label: 'CSS', category: 'frontend', description: 'Make it look fucking gorgeous' },
            { id: 'javascript', label: 'JavaScript', category: 'frontend', description: 'Make it interactive and dynamic' },
            { id: 'react', label: 'React', category: 'frontend', description: 'Build complex UIs like a pro' }
          ]
        },
        {
          id: 'backend',
          label: 'Backend',
          category: 'backend',
          description: 'The behind-the-scenes magic',
          children: [
            { id: 'nodejs', label: 'Node.js', category: 'backend', description: 'JavaScript on the server' },
            { id: 'python', label: 'Python', category: 'backend', description: 'Simple, powerful, versatile' },
            { id: 'databases', label: 'Databases', category: 'backend', description: 'Store and manage your data' }
          ]
        },
        {
          id: 'tools',
          label: 'Development Tools',
          category: 'tools',
          description: 'Your coding arsenal',
          children: [
            { id: 'vscode', label: 'VS Code', category: 'tools', description: 'Your coding command center' },
            { id: 'github', label: 'GitHub', category: 'tools', description: 'Version control and collaboration' },
            { id: 'supabase', label: 'Supabase', category: 'tools', description: 'Backend as a service - no server bullshit' }
          ]
        }
      ]
    }
  }

  const [currentMap, setCurrentMap] = useState<'possibilities' | 'tech'>('possibilities')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const container = containerRef.current
    const svg = d3.select(svgRef.current)
    const width = container.clientWidth
    const height = 600

    svg.selectAll('*').remove()

    const g = svg.append('g')

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Prepare data
    const rootNode = mindMapData[currentMap]
    const nodes = flattenNodes(rootNode, expandedNodes)
    const links = createLinks(nodes)

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40))

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#9ca979')
      .attr('stroke-width', 2)
      .attr('opacity', 0.6)

    // Create nodes
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    // Add circles to nodes
    node.append('circle')
      .attr('r', (d: any) => d.id === rootNode.id ? 30 : (d.children ? 20 : 15))
      .attr('fill', (d: any) => getNodeColor(d.category))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))')

    // Add labels
    node.append('text')
      .text((d: any) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('font-size', (d: any) => d.id === rootNode.id ? '14px' : '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#2d3748')
      .style('pointer-events', 'none')

    // Add click handler
    node.on('click', (event, d: any) => {
      if (d.children) {
        const newExpanded = new Set(expandedNodes)
        if (newExpanded.has(d.id)) {
          newExpanded.delete(d.id)
        } else {
          newExpanded.add(d.id)
        }
        setExpandedNodes(newExpanded)
      }
    })

    // Add hover effects
    node.on('mouseover', function(event, d: any) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', (d.id === rootNode.id ? 35 : (d.children ? 25 : 20)))
        .style('filter', 'drop-shadow(0 6px 12px rgba(0,0,0,0.2))')
      
      // Show description tooltip
      showTooltip(event, d.description)
    })
    .on('mouseout', function(event, d: any) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', (d.id === rootNode.id ? 30 : (d.children ? 20 : 15)))
        .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))')
      
      hideTooltip()
    })

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
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
    const nodeMap = new Map(nodes.map(n => [n.id, n]))
    
    nodes.forEach(node => {
      if (node.children && expandedNodes.has(node.id)) {
        node.children.forEach(child => {
          if (nodeMap.has(child.id)) {
            links.push({ source: node.id, target: child.id })
          }
        })
      }
    })
    
    return links
  }

  const getNodeColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      root: '#667144',
      web: '#bc7d37',
      mobile: '#819159',
      tools: '#997f66',
      frontend: '#dbb786',
      backend: '#b8c59f',
      default: '#c6b4a3'
    }
    return colors[category] || colors.default
  }

  const showTooltip = (event: any, text: string) => {
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0,0,0,0.8)')
      .style('color', 'white')
      .style('padding', '8px 12px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('max-width', '200px')
      .style('z-index', '1000')
      .style('opacity', 0)
      .text(text)

    tooltip.transition()
      .duration(200)
      .style('opacity', 1)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 10) + 'px')
  }

  const hideTooltip = () => {
    d3.selectAll('.tooltip').remove()
  }

  return (
    <section id="mindmap" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Interactive Mind Maps
          </h2>
          <p className="text-xl text-earth-700 max-w-3xl mx-auto">
            Explore the endless possibilities of coding or dive into the tech stack. 
            Click nodes to expand them and see what the fuck each thing actually does.
          </p>
        </motion.div>

        {/* Map Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
            <button
              onClick={() => setCurrentMap('possibilities')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentMap === 'possibilities'
                  ? 'bg-moss-600 text-white shadow-lg'
                  : 'text-earth-700 hover:bg-moss-50'
              }`}
            >
              🌟 Endless Possibilities
            </button>
            <button
              onClick={() => setCurrentMap('tech')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ml-2 ${
                currentMap === 'tech'
                  ? 'bg-moss-600 text-white shadow-lg'
                  : 'text-earth-700 hover:bg-moss-50'
              }`}
            >
              🛠️ Tech Stack
            </button>
          </div>
        </div>

        {/* Mind Map Container */}
        <motion.div
          className="card p-4 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div ref={containerRef} className="w-full">
            <svg
              ref={svgRef}
              width="100%"
              height="600"
              className="border border-earth-200 rounded-lg"
            ></svg>
          </div>
          
          <div className="mt-4 text-center text-sm text-earth-600">
            <p>💡 <strong>Tip:</strong> Click nodes with children to expand them. Drag nodes around to explore. Scroll to zoom.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MindMapSection
