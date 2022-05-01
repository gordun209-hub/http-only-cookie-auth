import { useAppSelector } from '@/app/hooks'

const AdminPage = () => {
	const userEmail = useAppSelector(state => state.auth.user?.email)
	return <div>{userEmail}</div>
}
export default AdminPage
