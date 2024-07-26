import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'

export function DefaultLayout() {
  return (
    <div>
      <div className="px-40 pb-10 ">
        <Header />
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  )
}
