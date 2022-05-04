import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useChangeUserInfoMutation } from '@/services/api'
import type { changeUserInfoFormProps, Inputs } from '@/types/index'

const ChangeUserInfoForm = ({
	open,
	setOpen,
	user
}: changeUserInfoFormProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<Inputs>()
	const setOrUpdateUser =
		user?.lastName || user?.firstName ? 'updateInfo' : 'setInfo'
	const [changeUserInfo, { isLoading }] = useChangeUserInfoMutation()
	const onSubmit: SubmitHandler<Inputs> = data =>
		changeUserInfo({
			firstName: data.firstname,
			lastName: data.lastname
		}).then(() => setOpen(false))
	return (
		<>
			<Button data-cy={'updateInfoBtn'} onClick={() => setOpen(!open)}>
				{setOrUpdateUser}
			</Button>
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
					<Button mt={4} colorScheme='teal' isLoading={isLoading} type='submit'>
						Submit
					</Button>
				</form>
			)}
		</>
	)
}
export default ChangeUserInfoForm
