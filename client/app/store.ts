import { configureStore } from '@reduxjs/toolkit'

import authSlice from '@/features/auth/authSlice'
import counterReducer from '@/features/counter/counterSlice'
import { api } from '@/services/api'

export const makeStore = () =>
	configureStore({
		reducer: {
			counter: counterReducer,
			[api.reducerPath]: api.reducer,
			auth: authSlice
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(api.middleware)
	})

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
