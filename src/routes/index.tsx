import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../DefaultLayout/DefaultLayout'
import { Home } from '../pages/Home/Home'
import { Checkout } from '../pages/Checkout/Checckout'
import { Success } from '../pages/Success/Success'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/order/:orderId/success" element={<Success />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
