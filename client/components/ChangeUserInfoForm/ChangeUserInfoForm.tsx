import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
	firstname: string
	lastname: string
}
type User = {
	id: number
	username: string
	firstName: string
	lastName: string
	email: string
	createdAt: string
	updatedAt: string
} | null
const ChangeUserInfoForm = ({
	open,
	setOpen,
	user
}: {
	open: boolean
	setOpen: (open: boolean) => void
	user: User
}) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm<Inputs>()
	const setOrUpdateUser =
		user?.lastName || user?.firstName ? 'updateInfo' : 'setInfo'
	const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

	return (
		<>
			<Button onClick={() => setOpen(!open)}>{setOrUpdateUser}</Button>
			{open && (
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl isInvalid={!!errors.firstname}>
						<FormLabel htmlFor='name'>First name</FormLabel>
						<Input
							id='name'
							placeholder='name'
							{...register('firstname', {
								required: 'This is required',
								minLength: { value: 4, message: 'Minimum length should be 4' }
							})}
						/>
						<FormLabel htmlFor='lastname'>lastname</FormLabel>

						<Input
							id='lastname'
							placeholder='lastname'
							{...register('lastname', {
								required: 'This is required',
								minLength: { value: 4, message: 'Minimum length should be 4' }
							})}
						/>
						<FormErrorMessage>
							{errors.lastname && errors.lastname.message}
						</FormErrorMessage>
					</FormControl>
					<Button
						mt={4}
						colorScheme='teal'
						isLoading={isSubmitting}
						type='submit'
					>
						Submit
					</Button>
				</form>
			)}
		</>
	)
}
export default ChangeUserInfoForm
