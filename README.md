# AI Tools Directory

Next.js 15 ile geliştirilmiş kapsamlı AI araçları keşif platformu.

## Özellikler

- ✨ Modern ve responsive tasarım
- 🌓 Dark/Light tema desteği
- 🔍 Gelişmiş arama ve filtreleme
- 📊 Kategorilere göre AI araçları
- ⭐ Favori araçlar sistemi
- 👤 Kullanıcı dashboard'u
- 🔐 Google ve GitHub OAuth entegrasyonu
- 💾 Supabase backend

## Teknolojiler

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Icons**: Lucide React
- **Authentication**: Supabase Auth UI

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
pnpm install
# veya
npm install
```

2. `.env.local` dosyasını oluşturun:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Development server'ı başlatın:
```bash
pnpm dev
# veya
npm run dev
```

4. Browser'da açın: `http://localhost:3000`

## Vercel'e Deploy

### Option 1: Vercel Dashboard (Önerilen)

1. [Vercel Dashboard](https://vercel.com/new)'a gidin
2. "Import Project" seçeneğini tıklayın
3. Git repository'nizi bağlayın
4. Environment Variables ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. "Deploy" butonuna tıklayın

### Option 2: Vercel CLI

```bash
# Vercel CLI'ı global olarak yükleyin
npm i -g vercel

# Vercel'e login olun
vercel login

# Projeyi deploy edin
vercel

# Production deploy
vercel --prod
```

## Supabase Setup

Proje zaten yapılandırılmış Supabase backend ile geliyor:

- **Database**: 8 tablo (users, categories, ai_tools, favorites, reviews, vb.)
- **Edge Functions**: AI önerileri, otomatik kategorizasyon
- **RLS Policies**: Güvenli veri erişimi

## Proje Yapısı

```
ai-tools-directory/
├── app/                      # Next.js App Router
│   ├── auth/                 # Authentication pages
│   ├── tools/                # Tools catalog & detail
│   ├── dashboard/            # User dashboard
│   ├── categories/           # Categories page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ToolCard.tsx
│   ├── ThemeProvider.tsx
│   └── ...
├── lib/                      # Utilities
│   └── supabase.ts           # Supabase client & types
└── public/                   # Static assets
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key |

## License

MIT
