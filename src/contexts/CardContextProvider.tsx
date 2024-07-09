import { createContext, ReactNode, useState } from 'react'

interface Item {
  id: number
  quantity: number
}

interface CardContextType {
  cart: Item[]
  addItem: (item: Item) => void
}

export const CardContext = createContext({} as CardContextType)

interface CardContextsProviderProps {
  children: ReactNode
}

export function CardContextsProvider({ children }: CardContextsProviderProps) {
  const [cart, setCart] = useState<Item[]>([])

  function addItem(item: Item) {
    const newCard: Item = {
      id: item.id,
      quantity: item.quantity,
    }

    setCart((state) => [...state, newCard])
  }

  return (
    <CardContext.Provider value={{ cart, addItem }}>
      {children}
    </CardContext.Provider>
  )
}
