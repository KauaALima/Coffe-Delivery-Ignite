import { createContext, ReactNode, useReducer } from 'react'
import { cartReducer, Item, Order } from '../reducers/cart/reducer'

import {
  addItemAction,
  checkoutAction,
  removeItemAction,
  icrementQuantityAction,
  decrementQuantityAction,
} from '../reducers/cart/actions'
import { NewAddressFormData } from '../pages/Checkout/Checckout'
import type { NavigateFunction } from 'react-router-dom'

interface CardContextType {
  cart: Item[]
  orders: Order[]
  addItem: (item: Item) => void
  removeItem: (itemId: Item['id']) => void
  icrementItem: (itemId: Item['id']) => void
  decrementItem: (itemId: Item['id']) => void
  checkout: (order: NewAddressFormData, navi: NavigateFunction) => void
}

export const CardContext = createContext({} as CardContextType)

interface CardContextsProviderProps {
  children: ReactNode
}

export function CardContextsProvider({ children }: CardContextsProviderProps) {
  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: [],
    orders: [],
  })

  const { cart, orders } = cartState

  function addItem(item: Item) {
    dispatch(addItemAction(item))
  }

  function icrementItem(itemId: Item['id']) {
    dispatch(icrementQuantityAction(itemId))
  }

  function decrementItem(itemId: Item['id']) {
    dispatch(decrementQuantityAction(itemId))
  }

  function removeItem(itemId: Item['id']) {
    dispatch(removeItemAction(itemId))
  }

  function checkout(order: NewAddressFormData, nave: NavigateFunction) {
    dispatch(checkoutAction(order, nave))
  }

  return (
    <CardContext.Provider
      value={{
        cart,
        orders,
        addItem,
        removeItem,
        checkout,
        decrementItem,
        icrementItem,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}
