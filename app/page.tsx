import { HeroSection } from '@/components/HeroSection'
import { PopularTools } from '@/components/PopularTools'
import { CategoriesGrid } from '@/components/CategoriesGrid'
import { FeaturesSection } from '@/components/FeaturesSection'

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <PopularTools />
      <CategoriesGrid />
      <FeaturesSection />
    </div>
  )
}
