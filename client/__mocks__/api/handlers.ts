import { rest } from 'msw'
import { cookie } from 'msw/lib/types/context'
export const handlers = [
	rest.get('http://localhost:5000/api/me', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				email: '',
				createdAt: '',
				updatedAt: ''
			})
		)
	}),
	rest.put('http://localhost:5000/api/userInfo', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				firstname: 'testfirstname',
				lastname: 'testlastname'
			})
		)
	}),
	rest.post('http://localhost:5000/api/login', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				email: '',
				createdAt: '',
				updatedAt: ''
			})
		)
	}),
	rest.post('http://localhost:5000/api/signup', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				email: '',
				createdAt: '',
				updatedAt: ''
			})
		)
	}),
	rest.get('http://localhost:5000/api/logout', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				email: '',
				createdAt: '',
				updatedAt: ''
			})
		)
	})
]
