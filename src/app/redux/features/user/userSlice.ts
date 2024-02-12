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
        }
    }
})

export const { loggedIn } = userSlice.actions
export default userSlice.reducer
