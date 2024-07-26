import { NavLink } from 'react-router-dom'
import { ShoppingCart, MapPin, Sun, Moon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { CardContext } from '../contexts/CardContextProvider'
import Logo from '../assets/Logo.svg'

export function Header() {
  const { cart } = useContext(CardContext)

  const cartDisable = cart.length === 0

  const [theme, setThema] = useState('light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleTheme = () => {
    setThema(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <header className="flex justify-between py-8 items-center">
      <div className="flex gap-5">
        <NavLink to="/">
          <img src={Logo} alt="Coffee Delivery" />
        </NavLink>
        <button onClick={handleTheme}>
          {theme === 'light' ? (
            <Sun size={29} />
          ) : (
            <Moon size={29} className="dark:text-gray-200" />
          )}
        </button>
      </div>
      <div className="flex gap-3 items-center">
        <span className="flex justify-center items-center text-sm text-purple-300 gap-1 bg-purple-100 p-2 rounded-md">
          <MapPin size={22} />
          Fortaleza. CE
        </span>
        <NavLink
          to="/Checkout"
          className="relative bg-yellow-100 text-yellow-300 p-2 rounded-md aria-disabled:opacity-70 "
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
