import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // ? Ambil data dari payload
      const {id, title, price, thumbnail} = action.payload

      // ? Cek apakah sudah ada di keranjang
      const isExist = state.items.find(item => item.id == id)
      if(isExist) {
        return {
          ...state,
          items: state.items.map(
            item => item.id == id ? {...item, quantity: item.quantity + 1} : item
          )
        }
      } else {
        const newItem = {
          id,
          title,
          price,
          thumbnail,
          quantity: 1
        }
        return {
          ...state,
          items: [...state.items, newItem]
        }
      }
    },
    decrementQty: (state, action) => {
      return {
        ...state,
        items: state.items.map(
          item => item.id == action.payload.id ? {...item, quantity: item.quantity - 1} : item
        )
      }
    },
    removeItem: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      }
    }
  }
})

export const { addToCart, decrementQty, removeItem } = cartSlice.actions
export default cartSlice.reducer