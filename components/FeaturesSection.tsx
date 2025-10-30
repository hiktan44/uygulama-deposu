import { Sparkles, Shield, Zap, Users } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Destekli Öneriler',
      description: 'Yapay zeka ile ihtiyaçlarınıza en uygun araçları bulun',
    },
    {
      icon: Shield,
      title: 'Güvenilir İncelemeler',
      description: 'Gerçek kullanıcı deneyimlerine dayalı değerlendirmeler',
    },
    {
      icon: Zap,
      title: 'Güncel İçerik',
      description: 'Her gün güncellenen yeni AI araçları ve özellikleri',
    },
    {
      icon: Users,
      title: 'Topluluk',
      description: 'AI tutkunlarından oluşan aktif bir topluluk',
    },
  ]

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Neden AI Tools Directory?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon
          return (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
