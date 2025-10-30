'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase, AITool, Category } from '@/lib/supabase'
import { ToolCard } from '@/components/ToolCard'
import { Search } from 'lucide-react'

function ToolsPageContent() {
  const searchParams = useSearchParams()
  const [tools, setTools] = useState<AITool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedPricing, setSelectedPricing] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .order('name')
        setCategories(categoriesData || [])

        let query = supabase.from('ai_tools').select('*')

        if (searchQuery) {
          query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
        }

        if (selectedCategory) {
          const category = categoriesData?.find(c => c.slug === selectedCategory)
          if (category) {
            query = query.eq('category_id', category.id)
          }
        }

        if (selectedPricing) {
          query = query.eq('pricing_model', selectedPricing)
        }

        query = query.order('views_count', { ascending: false })

        const { data, error } = await query

        if (error) throw error
        setTools(data || [])
      } catch (error) {
        console.error('Error fetching tools:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchQuery, selectedCategory, selectedPricing])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Araçları Katalogu</h1>
        <p className="text-muted-foreground">{tools.length} araç bulundu</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Araç ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={selectedPricing}
          onChange={(e) => setSelectedPricing(e.target.value)}
          className="px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Tüm Fiyatlandırmalar</option>
          <option value="free">Ücretsiz</option>
          <option value="freemium">Freemium</option>
          <option value="paid">Ücretli</option>
          <option value="trial">Deneme</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : tools.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">Araç bulunamadı</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>}>
      <ToolsPageContent />
    </Suspense>
  )
}
