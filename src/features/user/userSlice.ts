import {createSlice} from '@reduxjs/toolkit'

const initialState = localStorage.user ? JSON.parse(localStorage.user) : {
    name: "my perfil",
    image: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/7AF80638BF5375882B663D6B7613A431D7E5513ECE97A6BB6512F6FD22EC69B4/scale?width=300&aspectRatio=1.00&format=png"
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.name = action.payload.name
            state.image = action.payload.image
        }
    }
})

export const {updateUserData} = userSlice.actions
export default userSlice.reducer