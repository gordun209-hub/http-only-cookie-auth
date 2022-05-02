import { Box, Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setAuth } from '@/features/auth/authSlice'
import { useUseUserQuery } from '@/services/api'

import LogOutButton from '../LogOutButton/LogOutButton'

const Layout = () => {
	const user = useAppSelector(state => state.auth.user)
	const dispatch = useAppDispatch()
	const { data, isLoading } = useUseUserQuery()
	useEffect(() => {
		dispatch(setAuth(data))
	}, [data, dispatch])
	if (isLoading) {
		return null
	}
	return (
		<>
			<Flex w={'100%'}>
				<Flex>
					<Link passHref href='/'>
						<Button>FEED</Button>
					</Link>
					{data ? (
						<Box w={'100%'} justifySelf='end'>
							<Link passHref href='/admin'>
								<Button justifySelf={'end'}>Write posts</Button>
							</Link>
							<LogOutButton />
						</Box>
					) : (
						<Box>
							<Button>
								<Link passHref href='/login'>
									Login
								</Link>
							</Button>
							<Button>
								<Link href='/signup'>
									<a>Signup</a>
								</Link>
							</Button>
						</Box>
					)}
				</Flex>
			</Flex>
		</>
	)
}
export default Layout
