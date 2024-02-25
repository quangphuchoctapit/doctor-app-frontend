import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
    value: {
        email: string
        id: string
        role: string
        image: string
        username: string
        gender: string
        balance: number
    }
}

const initState: userState = {
    value: {
        email: '',
        id: '',
        role: '',
        username: '',
        image: '',
        gender: '',
        balance: 0
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        loggedIn: (state, action: PayloadAction<{ balance: number, email: string, id: string, role: string, image: string, username: string, gender: string }>) => {
            const { email, id, role, image, username, gender, balance } = action.payload;
            return {
                ...state,
                value: {
                    ...state.value,
                    email,
                    id,
                    role,
                    image,
                    username,
                    gender,
                    balance
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
        },
        deposit: (state, action: PayloadAction<{ ammount: number }>) => {
            const { ammount } = action.payload;
            return {
                ...state,
                value: {
                    ...state.value,
                    balance: state.value.balance + ammount
                }
            };
        }
    }
})

export const { loggedIn, editImage, deposit } = userSlice.actions
export default userSlice.reducer
