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
export type changeUserInfoProps = {
	firstName: string
	lastName: string
}
export type useUserType = LoginResponse | null
const baseUrl = 'http://localhost:5000/'

export const api = createApi({
	keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
	baseQuery: fetchBaseQuery({
		baseUrl,
		credentials: 'include'
	}),

	tagTypes: ['user', 'Post'],
	endpoints: builder => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: credentials => ({
				url: '/api/login',
				method: 'POST',
				body: credentials
			}),
			invalidatesTags: ['user']
		}),
		signup: builder.mutation<LoginResponse, LoginRequest>({
			query: credentials => ({
				url: '/api/signup',
				method: 'POST',
				body: credentials
			}),
			invalidatesTags: ['user']
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
			}),
			providesTags: ['user']
		}),
		changeUserInfo: builder.mutation<LoginResponse, changeUserInfoProps>({
			query: credentials => ({
				url: 'api/userInfo',
				method: 'PUT',
				body: credentials
			}),
			invalidatesTags: ['user']
		})
	})
})
export const {
	useLoginMutation,
	useUseUserQuery,
	useSignupMutation,
	useLogOutMutation,
	useChangeUserInfoMutation
} = api
