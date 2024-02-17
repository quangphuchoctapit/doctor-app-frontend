import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
    value: {
        email: string
        id: string
        role: string
        image: string
        username: string
        gender: string
    }
}

const initState: userState = {
    value: {
        email: '',
        id: '',
        role: '',
        username: '',
        image: '',
        gender: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        loggedIn: (state, action: PayloadAction<{ email: string, id: string, role: string, image: string, username: string, gender: string }>) => {
            const { email, id, role, image, username, gender } = action.payload;
            return {
                ...state,
                value: {
                    ...state.value,
                    email,
                    id,
                    role,
                    image,
                    username,
                    gender
                }
            };
        },
        editImage: (state, action: PayloadAction<{ id: string, image: string }>) => {
            const { id, image } = action.payload;
            return {
                ...state,
                value: {
                    ...state.value,
                    id,
                    image
                }
            };
        }
    }
})

export const { loggedIn, editImage } = userSlice.actions
export default userSlice.reducer
