import { Button } from '@chakra-ui/react'

import { useAppDispatch } from '@/app/hooks'
import { setAuth } from '@/features/auth/authSlice'
import { useLogOutMutation } from '@/services/api'

const LogOutButton = () => {
	const [logOut] = useLogOutMutation()
	const dispatch = useAppDispatch()
	const handleClick = async () => {
		await logOut().then(() => {
			dispatch(
				setAuth({
					user: null,
					isLoggedIn: false
				})
			)
		})
	}
	return <Button onClick={handleClick}>Log out</Button>
}
export default LogOutButton
