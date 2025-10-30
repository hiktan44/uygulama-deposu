'use client'

import { useEffect, useState } from 'react'
import { supabase, AITool } from '@/lib/supabase'
import { ToolCard } from './ToolCard'
import { TrendingUp } from 'lucide-react'

export function PopularTools() {
  const [tools, setTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPopularTools() {
      try {
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .order('views_count', { ascending: false })
          .limit(6)

        if (error) throw error
        setTools(data || [])
      } catch (error) {
        console.error('Error fetching popular tools:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularTools()
  }, [])

  if (loading) {
    return (
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold">Popüler AI Araçları</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold">Popüler AI Araçları</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  )
}
