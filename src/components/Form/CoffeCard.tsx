import { Trash2 } from 'lucide-react'
import { InputQuantity } from './InputQuantity'
import { useContext } from 'react'
import { CardContext } from '../../contexts/CardContextProvider'
import { toast, Bounce } from 'react-toastify'

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
  const { removeItem, icrementItem, decrementItem } = useContext(CardContext)
  const notify = () =>
    toast.info('Café removido com sucesso', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })

  function incrementQunatity(itemId: string) {
    icrementItem(itemId)
  }

  function decrementQuantity(itemId: string) {
    decrementItem(itemId)
  }

  function handleRemoveCoffe(id: string) {
    removeItem(id)
    notify()
  }
  return (
    <div className="flex w-full gap-5">
      <img src={img} alt="" className="w-16 h-16" />
      <div className="flex w-full flex-col gap-2">
        <div className="flex justify-between ">
          <span className="text-base text-gray-800 dark:text-gray-400">
            {title}
          </span>
          <span className="text-base font-bold dark:text-gray-300">
            R$ {price}
          </span>
        </div>

        <div className="flex gap-2">
          <InputQuantity
            quantity={quantity}
            handleItemIncrement={() => incrementQunatity(itemId)}
            handleItemDecrement={() => decrementQuantity(itemId)}
          />
          <button
            className="flex items-center gap-1 text-xs text-gray-700 bg-gray-400 p-2 rounded-md dark:bg-gray-800 dark:text-gray-300"
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
