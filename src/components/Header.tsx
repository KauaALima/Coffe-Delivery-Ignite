import { NavLink } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import { ShoppingCart, MapPin } from 'lucide-react'
import { useContext } from 'react'
import { CardContext } from '../contexts/CardContextProvider'

export function Header() {
  const { cart } = useContext(CardContext)

  const cartDisable = cart.length === 0
  return (
    <header className="flex justify-between py-8 items-center">
      <NavLink to="/">
        <img src={Logo} alt="Coffee Delivery" />
      </NavLink>
      <div className="flex gap-3 items-center">
        <span className="flex justify-center items-center text-sm text-purple-300 gap-1 bg-purple-100 p-2 rounded-md">
          <MapPin size={22} />
          Fortaleza. CE
        </span>
        <NavLink
          to="/Checkout"
          className="relative bg-yellow-100 text-yellow-300 p-2 rounded-md aria-disabled:opacity-70 aria-disabled:cursor-not-allowed"
          aria-disabled={cartDisable}
        >
          <ShoppingCart size={22} className="fill-yellow-300" />
          {cart.length >= 1 && (
            <span className=" absolute -top-2 -right-2 bg-yellow-300 w-5 h-5 pt-0.5 text-center text-xs text-white rounded-full">
              {cart.length}
            </span>
          )}
        </NavLink>
      </div>
    </header>
  )
}
