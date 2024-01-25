import { Counter } from '@/Counter'
import { FetchData } from '@/FetchData'
import { Home } from '@/Home'

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
]

export default AppRoutes
