import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type LoginRequest = {
	password: string
	email: string
}
export type LoginResponse = {
	username: string | null
	password: string | null
	id: number
	email: string
	createdAt: string
	updatedAt: string
}
export type useUserType = LoginResponse | null
const baseUrl = 'http://localhost:5000/'

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl,
		credentials: 'include'
	}),

	endpoints: builder => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: credentials => ({
				url: '/api/login',
				method: 'POST',
				body: credentials
			})
		}),
		signup: builder.mutation<LoginResponse, LoginRequest>({
			query: credentials => ({
				url: '/api/signup',
				method: 'POST',
				body: credentials
			})
		}),
		logOut: builder.mutation<void, void>({
			query: () => ({
				url: '/api/logout',
				method: 'GET'
			})
		}),
		useUser: builder.query<useUserType, void>({
			query: () => ({
				url: `/api/me`,
				method: 'GET'
			})
		})
	})
})
export const {
	useLoginMutation,
	useUseUserQuery,
	useSignupMutation,
	useLogOutMutation,
	useLazyUseUserQuery
} = api
