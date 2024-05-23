
import dynamic from 'next/dynamic'
import BestSellers from '@/components/ui/BestSellers'
import NewArrivals from '@/components/ui/NewArrivals'
import Categories from '@/components/other/Categories'
import Subscription from '@/components/ui/Subscription'
import FeaturedProducts from '@/components/other/FeaturedProducts'


const ReactCarousal = dynamic(() => import('@/components/other/ReactCarousal'), {
  loading: () => <p>Loading...</p>,
})

export default function Home() {


  return (<>
    <main className="">
      <ReactCarousal />
      <FeaturedProducts />
      <Categories />
      
      <BestSellers />
      <NewArrivals />
      <Subscription />
    </main>
  </>
  )
}
