import { Box, Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setAuth } from '@/features/auth/authSlice'
import { useLogOutMutation, useUseUserQuery } from '@/services/api'

import LogOutButton from '../LogOutButton/LogOutButton'

const Layout = () => {
	const user = useAppSelector(state => state.auth.user)
	const [logOut] = useLogOutMutation()
	const dispatch = useAppDispatch()
	const { data, isLoading, isFetching } = useUseUserQuery()
	useEffect(() => {
		dispatch(setAuth(data))
	}, [data, dispatch])

	return (
		<>
			<Flex w={'100%'}>
				<Flex w={'100%'}>
					<Link passHref href='/'>
						<Button className='btn-logo'>FEED</Button>
					</Link>
					{user ? (
						<Box w={'100%'} justifySelf='end'>
							<Link passHref href='/admin'>
								<Button justifySelf={'end'} className='btn-blue'>
									Write posts
								</Button>
							</Link>
							<LogOutButton />
						</Box>
					) : (
						<Link passHref href='/login'>
							<Button className='btn-blue'>Log in</Button>
						</Link>
					)}
				</Flex>
			</Flex>
		</>
	)
}
export default Layout
