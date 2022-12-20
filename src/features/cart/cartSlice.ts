import {createSlice} from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        getMovies: (state) => {
            return state;
        },
        addMovie: (state, actions) => {
            
        }
    }
})

export const {getMovies,addMovie} = cartSlice.actions
export default cartSlice.reducer