import { produce } from 'immer'
import { ActionsTypes, Actions } from './actions'
import type { NewAddressFormData } from '../../pages/Checkout/Checckout'

export interface Item {
  id: string
  quantity: number
}

export interface Order extends NewAddressFormData {
  id: number
  items: Item[]
}

interface CartState {
  cart: Item[]
  orders: Order[]
}

export function cartReducer(state: CartState, action: Actions) {
  switch (action.type) {
    case ActionsTypes.ADD_NEW_CART:
      return produce(state, (draft) => {
        const teste = draft.cart.find(
          (item) => item.id === action.payload.item.id,
        )

        if (teste) {
          // eslint-disable-next-line no-unused-expressions
          teste.quantity >= action.payload.item.quantity
        } else {
          draft.cart.push(action.payload.item)
        }
      })

    case ActionsTypes.REMOVE_CART:
      return produce(state, (draft) => {
        const tr = draft.cart.findIndex(
          (item) => item.id === action.payload.itemId,
        )
        draft.cart.splice(tr, 1)
      })

    case ActionsTypes.CHECKOUT_CART:
      return produce(state, (draft) => {
        const newcard = {
          id: new Date().getTime(),
          items: state.cart,
          ...action.payload.order,
        }

        draft.orders.push(newcard)
        draft.cart = []

        action.payload.callback(`/order/${newcard.id}/success`)
      })

    default:
      return state
  }
}
