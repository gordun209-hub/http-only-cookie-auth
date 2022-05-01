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

import { useAppSelector } from '@/app/hooks'
import { PasswordInput } from '@/components/LoginPage'
import LogOutButton from '@/components/LogOutButton/LogOutButton'
import { selectUser } from '@/features/auth/authSlice'
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
	return (
		<Center h='500px'>
			<VStack spacing='4'>
				<InputGroup>
					<Input
						name='email'
						type='text'
						placeholder='Email'
						onChange={handleChange}
					/>
				</InputGroup>
				<LogOutButton />

				<InputGroup>
					<PasswordInput name='password' onChange={handleChange} />
				</InputGroup>
				<Button
					isFullWidth
					colorScheme='green'
					isLoading={isLoading}
					onClick={async () => {
						const user = await login(formState).unwrap()
						localStorage.setItem('user', JSON.stringify(user))
						router.push('/')
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
