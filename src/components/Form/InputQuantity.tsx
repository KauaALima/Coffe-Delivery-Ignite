import { Minus, Plus } from 'lucide-react'

interface InputQuantityProps {
  quantity?: number
  handleItemIncrement?: () => void
  handleItemDecrement?: () => void
}

export function InputQuantity({
  quantity,
  handleItemIncrement,
  handleItemDecrement,
}: InputQuantityProps) {
  return (
    <div className="flex items-center gap-1 text-purple-200 bg-gray-400 p-2 rounded-md">
      <button onClick={handleItemDecrement}>
        <Minus size={16} />
      </button>
      <span className="w-4 text-center text-base text-gray-900">
        {quantity || 1}
      </span>
      <button onClick={handleItemIncrement}>
        <Plus size={16} />
      </button>
    </div>
  )
}
