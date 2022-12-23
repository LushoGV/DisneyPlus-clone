import {createSlice} from '@reduxjs/toolkit'

const initialState:string[] = localStorage.userCart ? JSON.parse(localStorage.userCart) :  []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, actions) => {  
            state.push(actions.payload)   
            localStorage.setItem("userCart", JSON.stringify(state));  
        },
        removeToCart: (state, actions) => {
            const movieFound = state.find(element => element === actions.payload)
            if(movieFound){
                state.splice(state.indexOf(movieFound), 1)     
                localStorage.setItem("userCart", JSON.stringify(state));      
            }
        },
    }
})

export const {addToCart,removeToCart} = cartSlice.actions
export default cartSlice.reducer