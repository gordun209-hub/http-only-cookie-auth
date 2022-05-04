/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/export */
import { ChakraProvider } from '@chakra-ui/react'
import { configureStore } from '@reduxjs/toolkit'
import { render as rtlRender } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

// Import your own reducer
import authReducer from '@/features/auth/authSlice'
import { api } from '@/services/api'

import theme from '../theme'

function render(
	ui: JSX.Element,
	{
		store = configureStore({
			reducer: {
				auth: authReducer,
				[api.reducerPath]: api.reducer
			},
			middleware: getDefaultMiddleware => [
				...getDefaultMiddleware(),
				api.middleware
			]
		})
	} = {}
) {
	const Wrapper = ({ children }: { children: React.ReactNode }) => {
		return (
			<Provider store={store}>
				<ChakraProvider resetCSS theme={theme}>
					{children}
				</ChakraProvider>
			</Provider>
		)
	}
	return rtlRender(ui, { wrapper: Wrapper })
}
export * from '@testing-library/react'
// override render method
export { render }
