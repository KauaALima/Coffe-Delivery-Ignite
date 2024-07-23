import { ShoppingCartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export function EmptyCart() {
  return (
    <div className="text-center bg-gray-200 p-10 mt-4 space-y-6 rounded-tr-[44px] rounded-tl-md rounded-bl-[44px] rounded-br-md">
      <strong className="text-2xl">O seu carrinho está vazio.</strong>
      <p>Deseja olhar outros produtos similares?</p>

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
