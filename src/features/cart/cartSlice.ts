import {createSlice} from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        getCart: (state) => {
            return state;
        },
        addToCart: (state, actions) => {
            state: [...state, actions.payload]
        },
        removeToCart: (state, actions) => {
            state: state.filter(element => element !== actions.payload)
        },
    }
})

export const {getCart,addToCart,removeToCart} = cartSlice.actions
export default cartSlice.reducer