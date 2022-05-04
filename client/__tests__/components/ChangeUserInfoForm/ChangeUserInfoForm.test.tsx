import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import ChangeUserInfoForm from '@/components/ChangeUserInfoForm/ChangeUserInfoForm'
import { User } from '@/types/index'
import { render, screen, waitFor } from '@/utils/testUtils'

describe('ChangeUserInfoForm', () => {
	const userWithInfo = {
		id: 1,
		name: 'John Doe',
		email: 'jondoe.com',
		firstName: 'John',
		lastName: 'Doe',
		updatedAt: '2020-01-01T00:00:00.000Z',
		createdAt: '2020-01-01T00:00:00.000Z',
		username: 'johndoe'
	}
	const userWithoutInfo = {
		id: 1,
		name: '',
		email: 'jondoe.com',
		firstName: '',
		lastName: '',
		updatedAt: '2020-01-01T00:00:00.000Z',
		createdAt: '2020-01-01T00:00:00.000Z',
		username: 'johndoe'
	}
	const Wrapper = ({ info }: { info: User }) => {
		const [open, setOpen] = useState(false)
		return <ChangeUserInfoForm user={info} open={open} setOpen={setOpen} />
	}
	it('should give error when form is invalid', async () => {
		render(<Wrapper info={userWithoutInfo} />)

		expect(screen.getByText('setInfo')).toBeInTheDocument()
		await userEvent.click(screen.getByText('setInfo'))
		expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
		await userEvent.type(
			screen.getByRole('textbox', { name: /first name/i }),
			'Joh'
		)
		await userEvent.type(
			screen.getByRole('textbox', { name: /lastname/i }),
			'Doe'
		)
		expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
			'Joh'
		)
		expect(screen.getByRole('textbox', { name: /lastname/i })).toHaveValue(
			'Doe'
		)
		await userEvent.click(screen.getByRole('button', { name: /submit/i }))
		await waitFor(() => {
			expect(screen.getByText('Minimum length should be 4')).toBeInTheDocument()
		})
	})
	it('should display updateInfo button when user has lastName and firstName', () => {
		render(<Wrapper info={userWithInfo} />)
		expect(screen.getByText('updateInfo')).toBeInTheDocument()
	})
	it('can change user info', async () => {
		render(<Wrapper info={userWithoutInfo} />)
		expect(screen.getByText('setInfo')).toBeInTheDocument()
		const group = screen.queryByRole('group')
		await userEvent.click(screen.getByText('setInfo'))
		await userEvent.type(
			screen.getByRole('textbox', { name: /first name/i }),
			'John'
		)
		await userEvent.type(
			screen.getByRole('textbox', { name: /lastname/i }),
			'Doess'
		)
		await userEvent.click(screen.getByRole('button', { name: /submit/i }))
		expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue(
			'John'
		)
		expect(group).not.toBeInTheDocument()
	})
})
