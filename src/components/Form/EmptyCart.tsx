import { ShoppingCartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export function EmptyCart() {
  return (
    <div className="text-center bg-gray-200 p-10 mt-4 space-y-6 rounded-tr-[44px] rounded-tl-md rounded-bl-[44px] rounded-br-md dark:bg-gray-900">
      <strong className="text-2xl dark:text-gray-500">
        O seu carrinho está vazio.
      </strong>
      <p className="dark:text-gray-400">
        Deseja olhar outros produtos similares?
      </p>

      <Link
        to="/"
        className="w-full flex gap-3 items-center justify-center text-white text-sm font-bold uppercase py-3 bg-yellow-200 rounded-md"
      >
        <ShoppingCartIcon fill="white" to={'/'} />
        Continuar comprando
      </Link>
    </div>
  )
}
