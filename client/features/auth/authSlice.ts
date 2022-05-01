import { createSlice } from '@reduxjs/toolkit'

import { AppState } from '@/app/store'

type authStateType = {
	isLoggedIn: boolean
	user: {
		id: number
		username: string
		email: string
		createdAt: string
		updatedAt: string
	} | null
}

const initialState: authStateType = {
	isLoggedIn: false,
	user: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state = action.payload
		}
	}
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: AppState) => state.auth.user
