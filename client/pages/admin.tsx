import { Box, Button, Center, Container, Text } from '@chakra-ui/react'
import { useState } from 'react'

import { useAppSelector } from '@/app/hooks'
import ChangeUserInfoForm from '@/components/ChangeUserInfoForm/ChangeUserInfoForm'
import { selectUser } from '@/features/auth/authSlice'

const AdminPage = () => {
	const [open, setOpen] = useState<boolean>(false)
	const user = useAppSelector(selectUser)
	return (
		<Container>
			<Box>
				<Center>
					<Text fontSize={'2xl'}>Admin page</Text>
				</Center>
				<Box>
					<>
						<ChangeUserInfoForm user={user} open={open} setOpen={setOpen} />
					</>
				</Box>
			</Box>
		</Container>
	)
}
export default AdminPage
