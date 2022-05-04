/// <reference types="cypress" />
describe('E2E Tests', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/')

		cy.get('[data-cy="linkToFeed"]').as('feedButton')
		cy.get('[data-cy="signup-link"]').as('signupButton')
		cy.get('[data-cy="loginButton"]').as('loginButton')
		cy.get('[data-cy="linkToFeed"]').as('feedButton')
	})
	afterEach(() => {
		cy.clearCookies()
	})
	it('should display the correctly', () => {
		cy.get('@feedButton').contains('FEED')
		cy.get('@loginButton').contains('Login')
		cy.get('@signupButton').contains('Signup')
	})
	it('should login', () => {
		cy.get('@loginButton').click()
		cy.get('[data-cy="email-input"]').type('gordun209.com')
		cy.get('[data-cy="password-input"]').type('123456')
		cy.get('[data-cy="form-login"]').click()
		cy.url().should('include', '/')
		cy.get('[data-cy="logout-btn"]').contains('Logout')
		cy.get('[data-cy="admin-link"]').contains('Write posts')
	})
})

describe('user actions', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/')
	})

	it('user can go to write posts route and can chage info', () => {
		cy.get('[data-cy="loginButton"]').click()
		cy.get('[data-cy="email-input"]').type('gordun209.com')
		cy.get('[data-cy="password-input"]').type('123456')
		cy.intercept('GET', 'http://localhost:5000/api/me', {
			statusCode: 200,
			body: {
				id: 1,
				email: 'gordun209.com',
				password: '123456',
				name: 'Gordun209',
				createdAt: '2020-01-01T00:00:00.000Z',
				updatedAt: '2020-01-01T00:00:00.000Z'
			}
		})
		cy.intercept(
			{
				method: 'POST',
				url: 'http://localhost:5000/api/login'
			},
			[
				{
					statusCode: 200,
					body: {
						firstName: 'alihan',
						lastName: 'aydin',
						id: '31',
						createdAt: '2020-01-01T00:00:00.000Z',
						updatedAt: '2020-01-01T00:00:00.000Z',
						email: 'gordun209.com',
						password: '123456'
					},

					headers: {
						'set-cookie': ['token=123456789']
					},
					delay: 1000
				}
			]
		)
		cy.intercept('POST', 'http://localhost:5000/api/userInfo', {
			statusCode: 200,
			body: {
				firstName: 'alihan',
				lastName: 'aydin'
			}
		})

		cy.setCookie('TRAX_ACCESS_TOKEN', '123456789')
		cy.get('[data-cy="form-login"]').click()

		cy.url().should('include', '/')
		cy.get('[data-cy="logout-btn"]')
		cy.get('[data-cy="admin-link"]').contains('Write posts').click()
		cy.get('[data-cy="updateInfoBtn"]')
			.click()
			.get('#name')
			.type('test')
			.get('#lastname')
			.type('test')
			.get('form > .chakra-button')
			.click()
		cy.get('[data-cy="logout-btn"]').click()
		cy.url().should('include', '/login')
		cy.get('[data-cy="form-login"]').contains('Login')
	})
})
