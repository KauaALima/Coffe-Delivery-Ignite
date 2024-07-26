import { ShoppingCart } from 'lucide-react'
import { useContext, useState } from 'react'
import { CardContext } from '../../contexts/CardContextProvider'
import { InputQuantity } from '../Form/InputQuantity'
import { Bounce, toast } from 'react-toastify'

interface CardProps {
  id: string
  image: string
  types: string[]
  name: string
  description: string
  value: number
}

interface DataCoffeeProps {
  coffee: CardProps
}

export function Card({ coffee }: DataCoffeeProps) {
  const [quantity, setQuantity] = useState(0)
  const { addItem } = useContext(CardContext)
  const notify = () =>
    toast.success('Café adicionado com sucesso', {
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

  function addQuantity() {
    setQuantity((state) => state + 1)
  }

  function decreaseQuantity() {
    if (quantity > 0) {
      return setQuantity((state) => state - 1)
    }
  }

  function handleAddItem() {
    if (quantity !== 0) {
      addItem({ id: coffee.id, quantity })
    }
    notify()
    setQuantity(0)
  }

  return (
    <div>
      <div className="w-fit flex flex-col items-center justify-center pb-5 px-5 bg-gray-200 rounded-tl-md rounded-tr-[36px] rounded-br-md rounded-bl-[36px] dark:bg-gray-900">
        <img src={coffee.image} className="w-[120px] -mt-4" alt={coffee.name} />

        <div className="flex gap-2">
          {coffee.types.map((types) => {
            return (
              <span
                key={types}
                className="font-bold uppercase px-2 py-1 mt-3 text-[10px] text-yellow-300 bg-yellow-100 rounded-full dark:bg-yellow-300 dark:text-yellow-100"
              >
                {types}
              </span>
            )
          })}
        </div>

        <strong className="text-xl text-gray-800 mt-4 dark:text-gray-400">
          {coffee.name}
        </strong>

        <p className="w-[216px] mt-2 text-center text-sm text-gray-600 dark:text-gray-200">
          {coffee.description}
        </p>

        <div className="flex gap-6 items-center mt-8 justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            R$
            <strong className="font-extrabold text-2xl ml-1">
              {coffee.value.toFixed(2)}
            </strong>
          </span>

          <div className="flex gap-2 items-center ">
            <InputQuantity
              quantity={quantity}
              handleItemIncrement={addQuantity}
              handleItemDecrement={decreaseQuantity}
            />

            <button
              disabled={quantity === 0}
              className="p-2 bg-purple-300 text-white rounded-md hover:bg-purple-200 duration-300 disabled:opacity-30 "
              onClick={handleAddItem}
            >
              <ShoppingCart size={22} className="fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
