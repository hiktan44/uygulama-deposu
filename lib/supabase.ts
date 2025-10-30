import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface AITool {
  id: string
  name: string
  description: string
  website_url: string
  logo_url?: string
  category_id: string
  pricing_model: 'free' | 'freemium' | 'paid' | 'trial'
  tags: string[]
  features: string[]
  ai_summary?: string
  views_count: number
  favorites_count: number
  average_rating?: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon_name: string
  slug: string
  tools_count: number
  created_at: string
}

export interface Review {
  id: string
  tool_id: string
  user_id: string
  rating: number
  comment?: string
  created_at: string
  user?: {
    full_name: string
    avatar_url?: string
  }
}
