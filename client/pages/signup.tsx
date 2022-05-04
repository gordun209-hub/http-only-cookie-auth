import {
	Box,
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
import { useSignupMutation } from '@/services/api'

const LoginPage = () => {
	const router = useRouter()
	const user = useAppSelector(selectUser)
	const [signup, { isLoading }] = useSignupMutation()
	const dispatch = useAppDispatch()
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
	return (
		<Center h='500px'>
			<VStack spacing='4'>
				<Box>Hint: enter anything, or leave it blank and hit login</Box>
				<InputGroup>
					<Input
						data-cy={'email-input'}
						name='email'
						type='text'
						placeholder='Email'
						onChange={handleChange}
					/>
				</InputGroup>

				<InputGroup>
					<PasswordInput name='password' onChange={handleChange} />
				</InputGroup>
				<Button
					data-cy={'form-signup'}
					colorScheme='green'
					isLoading={isLoading}
					onClick={async () => {
						const user = await signup(formState).unwrap()
						dispatch(setAuth(user))
						await router.push('/')
					}}
				>
					Signup
				</Button>
				<Divider />
			</VStack>
		</Center>
	)
}

export default LoginPage
