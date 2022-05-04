import userEvent from '@testing-library/user-event'

import LogOutButton from '@/components/LogOutButton/LogOutButton'
import { render, screen, waitFor } from '@/utils/testUtils'

const mockRouter = jest.fn()
jest.mock('next/router', () => ({
	useRouter: () => ({
		reload: mockRouter
	})
}))

const mockDispatch = jest.fn()
jest.mock('@/app/hooks', () => ({
	useAppSelector: jest.fn(),
	useAppDispatch: () => mockDispatch
}))
describe('LogOutButton', () => {
	it('should render correctly', async () => {
		render(<LogOutButton />)
		expect(screen.getByText('Log out')).toBeInTheDocument()
		userEvent.click(screen.getByText('Log out'))
		await waitFor(() => {
			expect(mockRouter).toHaveBeenCalledTimes(1)
		})
	})
})
