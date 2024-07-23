import { NavigateFunction } from 'react-router-dom'
import type { NewAddressFormData } from '../../pages/Checkout/Checckout'
import { Item } from './reducer'

export enum ActionsTypes {
  ADD_NEW_CART = 'ADD_NEW_CART',
  REMOVE_CART = 'REMOVE_CART',
  CHECKOUT_CART = 'CHECKOUT_CART',
}

export type Actions =
  | {
      type: ActionsTypes.ADD_NEW_CART
      payload: {
        item: Item
      }
    }
  | {
      type: ActionsTypes.REMOVE_CART
      payload: {
        itemId: Item['id']
      }
    }
  | {
      type: ActionsTypes.CHECKOUT_CART
      payload: {
        order: NewAddressFormData
        callback: NavigateFunction
      }
    }

export function addItemAction(item: Item) {
  return {
    type: ActionsTypes.ADD_NEW_CART,
    payload: {
      item,
    },
  } satisfies Actions
}

export function removeItemAction(itemId: Item['id']) {
  return {
    type: ActionsTypes.REMOVE_CART,
    payload: {
      itemId,
    },
  } satisfies Actions
}

export function checkoutAction(
  order: NewAddressFormData,
  callback: NavigateFunction,
) {
  return {
    type: ActionsTypes.CHECKOUT_CART,
    payload: {
      order,
      callback,
    },
  } satisfies Actions
}
