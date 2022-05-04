import { Box, Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect } from 'react'

import { useAppDispatch } from '@/app/hooks'
import { setAuth } from '@/features/auth/authSlice'
import { useUseUserQuery } from '@/services/api'

import LogOutButton from '../LogOutButton/LogOutButton'

const Layout = () => {
	const dispatch = useAppDispatch()
	const { data, isLoading } = useUseUserQuery()
	useEffect(() => {
		dispatch(setAuth(data || null))
	}, [data, dispatch])
	if (isLoading) {
		return null
	}
	return (
		<>
			<Flex w={'100%'} data-cy={'layoutContainer'}>
				<Flex>
					<Link passHref href='/'>
						<Button data-cy={'linkToFeed'}>FEED</Button>
					</Link>
					{data ? (
						<Box data-cy={'link-to-admin-box'} w={'100%'} justifySelf='end'>
							<Link passHref href='/admin'>
								<Button data-cy={'admin-link'} justifySelf={'end'}>
									Write posts
								</Button>
							</Link>
							<LogOutButton />
						</Box>
					) : (
						<Box data-cy={'login/signup-links-container'}>
							<Button data-cy={'loginButton'}>
								<Link passHref data-cy={'login-link'} href='/login'>
									Login
								</Link>
							</Button>
							<Link passHref href='/signup'>
								<Button data-cy={'signup-link'}>Signup</Button>
							</Link>
						</Box>
					)}
				</Flex>
			</Flex>
		</>
	)
}
export default Layout
