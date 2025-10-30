'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, AITool, Review } from '@/lib/supabase'
import { ExternalLink, Heart, Star, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ToolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [tool, setTool] = useState<AITool | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    async function fetchTool() {
      try {
        const { data: toolData, error } = await supabase
          .from('ai_tools')
          .select('*')
          .eq('id', resolvedParams.id)
          .single()

        if (error) throw error
        setTool(toolData)

        await supabase.rpc('increment_tool_views', { tool_id: resolvedParams.id })

        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('*, user:user_id(full_name, avatar_url)')
          .eq('tool_id', resolvedParams.id)
          .order('created_at', { ascending: false })

        setReviews(reviewsData || [])

        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          const { data: favoriteData } = await supabase
            .from('favorites')
            .select('*')
            .eq('tool_id', resolvedParams.id)
            .eq('user_id', session.user.id)
            .single()
          setIsFavorite(!!favoriteData)
        }
      } catch (error) {
        console.error('Error fetching tool:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTool()
  }, [resolvedParams.id])

  const toggleFavorite = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/auth')
      return
    }

    try {
      if (isFavorite) {
        await supabase
          .from('favorites')
          .delete()
          .eq('tool_id', resolvedParams.id)
          .eq('user_id', session.user.id)
        setIsFavorite(false)
      } else {
        await supabase
          .from('favorites')
          .insert({ tool_id: resolvedParams.id, user_id: session.user.id })
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="h-64 bg-muted rounded-xl" />
          <div className="h-96 bg-muted rounded-xl" />
        </div>
      </div>
    )
  }

  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Araç bulunamadı</h1>
        <Link href="/tools" className="text-primary hover:underline">
          Tüm araçları görüntüle
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Geri
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>
              {tool.logo_url && (
                <img src={tool.logo_url} alt={tool.name} className="w-20 h-20 rounded-lg" />
              )}
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-muted-foreground" />
                <span>{tool.views_count} görüntülenme</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                <span>{tool.favorites_count} favori</span>
              </div>
              {tool.average_rating && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{tool.average_rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {tool.features && tool.features.length > 0 && (
              <div className="mb-6">
                <h2 className="font-semibold text-lg mb-3">Özellikler</h2>
                <ul className="space-y-2">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tool.ai_summary && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">AI Özeti</h3>
                <p className="text-sm">{tool.ai_summary}</p>
              </div>
            )}
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="font-semibold text-xl mb-4">Kullanıcı Yorumları</h2>
            {reviews.length === 0 ? (
              <p className="text-muted-foreground">Henüz yorum yapılmamış</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{review.user?.full_name || 'Anonim'}</span>
                    </div>
                    {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 space-y-4">
            <a
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-5 h-5" />
              Websiteyi Ziyaret Et
            </a>

            <button
              onClick={toggleFavorite}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800'
                  : 'hover:bg-accent'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            </button>
          </div>

          {tool.tags && tool.tags.length > 0 && (
            <div className="bg-card border rounded-xl p-6">
              <h3 className="font-semibold mb-3">Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-secondary rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
