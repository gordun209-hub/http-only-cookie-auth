/* eslint-disable react/hook-use-state */
/* eslint-disable @typescript-eslint/no-unused-vars */
import userEvent from '@testing-library/user-event'
import _ from 'lodash'
import React, { useState } from 'react'

import { PasswordInput } from '@/components/index'
import { cleanup, render, screen, waitFor } from '@/utils/testUtils'

type Props = {
	name: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
describe('PasswordInput component', () => {
	const Wrapper = () => {
		const [_formState, setFormState] = useState({
			email: '',
			password: ''
		})

		const handleChange = ({
			target: { name, value }
		}: React.ChangeEvent<HTMLInputElement>) =>
			setFormState(prev => ({ ...prev, [name]: value }))
		return <PasswordInput name='password' onChange={handleChange} />
	}

	it('can hide form when button pressed', async () => {
		render(<Wrapper />)
		await userEvent.click(screen.getByRole('button'))
		expect(screen.getByRole('textbox')).toBeInTheDocument()
		await userEvent.click(screen.getByRole('button'))
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
	})

	it('can write textboxed properly', async () => {
		render(<Wrapper />)
		await userEvent.type(screen.getByPlaceholderText(/enter password/i), 'test')
		expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue('test')
		await waitFor(async () => {
			await userEvent.click(screen.getByRole('button'))
			expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue('test')
		})
	})
})
