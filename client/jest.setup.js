// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
// import AbortController from 'abort-controller'
import { fetch, Headers, Request, Response } from 'cross-fetch'
import { server } from './__mocks__/api/server'
// Used for __tests__/testing-library.js
import AbortController from 'abort-controller'
import '@testing-library/jest-dom/extend-expect'
// Learn more: https://github.com/testing-library/jest-dom
global.fetch = fetch
global.Headers = Headers
global.Request = Request
global.Response = Response
global.AbortController = AbortController

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())
