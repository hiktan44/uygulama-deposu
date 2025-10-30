'use client'

import Link from 'next/link'
import { AITool } from '@/lib/supabase'
import { ExternalLink, Star, Eye, Heart } from 'lucide-react'

interface ToolCardProps {
  tool: AITool
}

export function ToolCard({ tool }: ToolCardProps) {
  const getPricingBadge = (pricing: string) => {
    const colors = {
      free: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      freemium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      paid: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      trial: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    }
    return colors[pricing as keyof typeof colors] || colors.freemium
  }

  const getPricingText = (pricing: string) => {
    const texts = {
      free: 'Ücretsiz',
      freemium: 'Freemium',
      paid: 'Ücretli',
      trial: 'Deneme',
    }
    return texts[pricing as keyof typeof texts] || pricing
  }

  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="group h-full bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${getPricingBadge(tool.pricing_model)}`}>
              {getPricingText(tool.pricing_model)}
            </span>
          </div>
          {tool.logo_url && (
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              <img src={tool.logo_url} alt={tool.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {tool.description}
        </p>

        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tool.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-secondary rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{tool.views_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{tool.favorites_count}</span>
            </div>
            {tool.average_rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{tool.average_rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <ExternalLink className="w-4 h-4 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  )
}
