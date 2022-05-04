import {
	Button,
	Center,
	Divider,
	Input,
	InputGroup,
	VStack
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { PasswordInput } from '@/components/index'
import { selectUser, setAuth } from '@/features/auth/authSlice'
import { useLoginMutation } from '@/services/api'

const LoginPage = () => {
	const user = useAppSelector(selectUser)
	const router = useRouter()
	const [login, { isLoading }] = useLoginMutation()

	if (user) {
		router.push('/')
	}
	const [formState, setFormState] = useState({
		email: '',
		password: ''
	})

	const handleChange = ({
		target: { name, value }
	}: React.ChangeEvent<HTMLInputElement>) =>
		setFormState(prev => ({ ...prev, [name]: value }))
	const dispatch = useAppDispatch()

	return (
		<Center className='bg-black' h='500px'>
			<VStack spacing='4'>
				<InputGroup>
					<Input
						name='email'
						data-cy='email-input'
						type='text'
						placeholder='Email'
						onChange={handleChange}
					/>
				</InputGroup>

				<InputGroup>
					<PasswordInput name='password' onChange={handleChange} />
				</InputGroup>
				<Button
					width={'100%'}
					colorScheme='green'
					isLoading={isLoading}
					data-cy={'form-login'}
					onClick={async () => {
						const user = await login(formState).unwrap()
						dispatch(setAuth(user))
						await router.push('/')
					}}
				>
					Login
				</Button>
				<Divider />
			</VStack>
		</Center>
	)
}

export default LoginPage
