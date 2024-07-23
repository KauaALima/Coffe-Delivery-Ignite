import { Trash2 } from 'lucide-react'
import { InputQuantity } from './InputQuantity'
import { useContext } from 'react'
import { CardContext } from '../../contexts/CardContextProvider'

interface CoffeCardProps {
  itemId: string
  img: string
  title: string
  price: string
  quantity: number
}

export function CoffeCard({
  itemId,
  img,
  title,
  price,
  quantity,
}: CoffeCardProps) {
  const { removeItem } = useContext(CardContext)

  function handleRemoveCoffe(id: string) {
    removeItem(id)
  }
  return (
    <div className="flex w-full gap-5">
      <img src={img} alt="" className="w-16 h-16" />
      <div className="flex w-full flex-col gap-2">
        <div className="flex justify-between ">
          <span className="text-base text-gray-800">{title}</span>
          <span className="text-base font-bold">R$ {price}</span>
        </div>

        <div className="flex gap-2">
          <InputQuantity quantity={quantity} />
          <button
            className="flex items-center gap-1 text-xs text-gray-700 bg-gray-400 p-2 rounded-md"
            onClick={() => handleRemoveCoffe(itemId)}
          >
            <Trash2 className="text-purple-200 w-4" />
            REMOVER
          </button>
        </div>
      </div>
    </div>
  )
}
