import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'

const PasswordInput = ({
	name,
	onChange
}: {
	name: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	return (
		<InputGroup size='md'>
			<Input
				pr='4.5rem'
				type={show ? 'text' : 'password'}
				placeholder='Enter password'
				name={name}
				onChange={onChange}
			/>
			<InputRightElement width='4.5rem'>
				<Button h='1.75rem' size='sm' onClick={handleClick}>
					{show ? 'Hide' : 'Show'}
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}

export default PasswordInput
