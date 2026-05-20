import { HomeFold } from '../components/sections/HomeFold'
import { Catalog } from '../components/catalog/Catalog'
import { HowItWorks } from '../components/sections/HowItWorks'

export function HomePage() {
  return (
    <>
      <HomeFold />
      <Catalog />
      <HowItWorks />
    </>
  )
}
