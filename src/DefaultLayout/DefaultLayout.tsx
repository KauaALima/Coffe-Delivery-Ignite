import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'

export function DefaultLayout() {
  return (
    <div>
      <div className="p-3 sm:px-12 sm:pb-12 2xl:px-40 2xl:pb-10">
        <Header />
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  )
}
