import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useAppDispatch } from '@/app/hooks'
import { setAuth } from '@/features/auth/authSlice'
import { useLogOutMutation } from '@/services/api'

const LogOutButton = () => {
	const [logOut] = useLogOutMutation()
	const router = useRouter()
	const dispatch = useAppDispatch()
	const handleClick = () => {
		logOut().then(() => {
			dispatch(
				setAuth({
					user: null,
					isLoggedIn: false
				})
			)
			router.reload()
		})
	}
	return <Button onClick={handleClick}>Log out</Button>
}
export default LogOutButton
