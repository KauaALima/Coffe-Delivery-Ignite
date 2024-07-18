import { ShoppingCart, X } from 'lucide-react'
import { useContext, useState } from 'react'
import { CardContext } from '../../../contexts/CardContextProvider'
import { InputQuantity } from '../../../components/InputQuantity'

interface CardProps {
  id: number
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
  const [isItemAdd, setIsItemAdd] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addItem, removeItem } = useContext(CardContext)

  function addQuantity() {
    setQuantity((state) => state + 1)
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      return setQuantity((state) => state - 1)
    }
  }

  function handleAddItem() {
    addItem({ id: coffee.id, quantity })
    setIsItemAdd(true)
    setQuantity(1)
  }

  function handleRemoveCoffe(id: number) {
    removeItem(id)
  }

  return (
    <div>
      <div className="w-fit flex flex-col items-center justify-center pb-5 px-5 bg-gray-200 rounded-tl-md rounded-tr-[36px] rounded-br-md rounded-bl-[36px]">
        <img src={coffee.image} className="w-[120px] -mt-4" alt={coffee.name} />

        <div className="flex gap-2">
          {coffee.types.map((types) => {
            return (
              <span
                key={types}
                className="font-bold uppercase px-2 py-1 mt-3 text-[10px] text-yellow-300 bg-yellow-100 rounded-full"
              >
                {types}
              </span>
            )
          })}
        </div>

        <strong className="text-xl text-gray-800 mt-4">{coffee.name}</strong>

        <p className="w-[216px] mt-2 text-center text-sm text-gray-600">
          {coffee.description}
        </p>

        <div className="flex gap-6 items-center mt-8 justify-between">
          <span className="text-sm text-gray-700">
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

            {isItemAdd ? (
              <button
                className="p-2 bg-purple-300 text-white rounded-md hover:bg-purple-200 duration-300"
                onClick={() => handleRemoveCoffe(coffee.id)}
              >
                <X size={22} />
              </button>
            ) : (
              <button
                className="p-2 bg-purple-300 text-white rounded-md hover:bg-purple-200 duration-300 "
                onClick={handleAddItem}
              >
                <ShoppingCart size={22} className="fill-white" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
