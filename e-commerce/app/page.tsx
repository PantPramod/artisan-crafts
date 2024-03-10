
import dynamic from 'next/dynamic'
import ProductList from '../components/other/ProductList'
import ButtonGroups from '@/components/other/ButtonGroups'
import BestSellers from '@/components/ui/BestSellers'
import NewArrivals from '@/components/ui/NewArrivals'
import Categories from '@/components/other/Categories'
import Subscription from '@/components/ui/Subscription'


const ReactCarousal = dynamic(() => import('@/components/other/ReactCarousal'), {
  loading: () => <p>Loading...</p>,
})

export default function Home() {


  return (<>
    <main className="">
      <ReactCarousal />
      <ButtonGroups />
      <ProductList />
      <Categories />
      <BestSellers />
      <NewArrivals />
      <Subscription />
    </main>
  </>
  )
}
