import { createSlice } from '@reduxjs/toolkit'
import jwtdecode from 'jwt-decode'


export const todoSlice = createSlice({
    name: 'cookie',
    initialState: {
        userId: '',
    },
    reducers: {
        searchToken: (state, action) => {
            const token = localStorage.getItem('token');
            if (token) {
                const decode = jwtdecode(token)
                state.userId = decode._id
            }
        }
    }
})


export const { searchToken } = todoSlice.actions;

export default todoSlice.reducer;
