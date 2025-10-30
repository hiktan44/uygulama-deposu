# Vercel Deployment Talimatları

## Hızlı Deploy Adımları

### 1. Vercel Hesabı

[Vercel](https://vercel.com)'de ücretsiz bir hesap oluşturun veya mevcut hesabınızla giriş yapın.

### 2. Import Project

1. Vercel Dashboard'da **"Add New..."** → **"Project"** seçeneğine tıklayın
2. Git provider'ınızı seçin (GitHub önerilir)
3. Bu repository'yi seçin

### 3. Configure Project

**Framework Preset**: Next.js (otomatik algılanır)

**Root Directory**: `./` (varsayılan)

**Build Command**: `next build` (varsayılan)

**Output Directory**: `.next` (varsayılan)

### 4. Environment Variables

Aşağıdaki environment variable'ları ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL=https://vauqclymhvuuuzojkdef.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdXFjbHltaHZ1dXV6b2prZGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTk4MzQsImV4cCI6MjA2OTUzNTgzNH0.QIOqRLmEcyc_eK0uupSQaENE9sJp9wvAbuXRw1GFl5k
```

### 5. Deploy

**"Deploy"** butonuna tıklayın!

Vercel otomatik olarak:
- Dependencies'leri yükleyecek
- Projeyi build edecek
- Production URL'i oluşturacak

### 6. OAuth Redirect URLs

Deployment tamamlandıktan sonra, Supabase Dashboard'da OAuth redirect URL'lerini güncelleyin:

1. Supabase Dashboard → Authentication → URL Configuration
2. **Redirect URLs** bölümüne ekleyin:
   ```
   https://your-project-name.vercel.app/auth/callback
   ```
3. **Site URL**: `https://your-project-name.vercel.app`

## Sonraki Deploymentlar

Her git push otomatik olarak yeni bir deployment tetikler. Main branch production'a deploy edilir.

## Troubleshooting

### Build Hatası

- Environment variables'ların doğru girildiğinden emin olun
- Build logs'u kontrol edin

### OAuth Çalışmıyor

- Supabase redirect URLs'lerini kontrol edin
- Environment variables'ları doğrulayın

### Database Bağlantı Hatası

- Supabase project URL'i doğrulayın
- Anon key'in doğru olduğundan emin olun

## Önemli Notlar

- İlk deployment 2-3 dakika sürebilir
- Her commit otomatik preview deployment oluşturur
- Main branch her zaman production URL'inde yayınlanır
