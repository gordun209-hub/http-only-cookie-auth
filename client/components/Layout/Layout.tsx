import { useEffect } from 'react'

import { useAppDispatch } from '@/app/hooks'
import { setAuth } from '@/features/auth/authSlice'
import { useUseUserQuery } from '@/services/api'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const { data } = useUseUserQuery()
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (data) {
			dispatch(setAuth({ user: data, isLoggedIn: true }))
		}
	}, [data, dispatch])

	return <>{children}</>
}
export default Layout
