import Layout from '@/components/Layout/Layout'
import { render, screen } from '@/utils/testUtils'

const mockDispatch = jest.fn()
jest.mock('@/app/hooks', () => ({
	useAppSelector: jest.fn(),
	useAppDispatch: () => mockDispatch
}))

afterEach(() => {
	jest.clearAllMocks()
})

describe('Layout', () => {
	it('when there is user not logged in', async () => {
		render(<Layout />)

		const FEED = await screen.findByText('FEED')
		expect(FEED).toBeInTheDocument()
		expect(mockDispatch).toHaveBeenCalledTimes(2)
		expect(mockDispatch).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'auth/setAuth',
				payload: null
			})
		)
	})
})
