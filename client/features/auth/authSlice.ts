import { createSlice } from '@reduxjs/toolkit'

import { AppState } from '@/app/store'

type authStateType = {
	user: {
		id: number
		firstName: string
		lastName: string
		username: string
		email: string
		createdAt: string
		updatedAt: string
	} | null
}

const initialState: authStateType = {
	user: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.user = action.payload
		}
	}
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: AppState) => state.auth.user
