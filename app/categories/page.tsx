'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, Category } from '@/lib/supabase'
import {
  MessageSquare,
  Image as ImageIcon,
  Code,
  Music,
  Video,
  FileText,
  Zap,
  Database,
  LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  'message-square': MessageSquare,
  'image': ImageIcon,
  'code': Code,
  'music': Music,
  'video': Video,
  'file-text': FileText,
  'zap': Zap,
  'database': Database,
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name')

        if (error) throw error
        setCategories(data || [])
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-12 w-64 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Kategoriler</h1>
        <p className="text-muted-foreground">
          İhtiyacınıza göre AI araçlarını kategorilere göre keşfedin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = iconMap[category.icon_name] || MessageSquare
          return (
            <Link
              key={category.id}
              href={`/tools?category=${category.slug}`}
              className="group bg-card border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <div className="text-sm font-medium text-primary">
                    {category.tools_count} araç
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
