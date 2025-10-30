'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, AITool } from '@/lib/supabase'
import { ToolCard } from '@/components/ToolCard'
import { Heart, User } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [favorites, setFavorites] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'favorites' | 'profile'>('favorites')

  useEffect(() => {
    async function loadUserData() {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth')
        return
      }

      setUser(session.user)

      try {
        const { data: favoritesData, error } = await supabase
          .from('favorites')
          .select('tool:ai_tools(*)')
          .eq('user_id', session.user.id)

        if (error) throw error

        const tools = favoritesData?.map(f => f.tool).filter(Boolean) || []
        setFavorites(tools as AITool[])
      } catch (error) {
        console.error('Error loading favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Hoş geldiniz, {user?.email}
        </p>
      </div>

      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'favorites'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Favorilerim
          </div>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'profile'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profilim
          </div>
        </button>
      </div>

      {activeTab === 'favorites' && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Favori Araçlarım</h2>
          {favorites.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-xl">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-4">Henüz favori aracınız yok</p>
              <button
                onClick={() => router.push('/tools')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Araçları Keşfet
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">Profil Bilgileri</h2>
          <div className="bg-card border rounded-xl p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">E-posta</label>
              <p className="mt-1 text-lg">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Üyelik Tarihi</label>
              <p className="mt-1 text-lg">
                {new Date(user?.created_at).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">İstatistikler</label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Favoriler</p>
                  <p className="text-2xl font-bold">{favorites.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
