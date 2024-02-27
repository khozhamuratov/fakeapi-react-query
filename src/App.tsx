import { useQuery } from 'react-query'
import CreateUser from './components/createUser'
import { UsersTable } from './components/usersTable'
import userService from './services/user.service'

function App() {
	const { isLoading, data } = useQuery(
		['users'],
		() => userService.getAllUsers(),
		{
			select: ({ data }) => data,
		}
	)

	return (
		<>
			<div className='flex flex-col'>
				<CreateUser />
				<div>
					{isLoading ? (
						<div>Loading...</div>
					) : data?.length ? (
						<UsersTable />
					) : (
						<h1>Data not found!!</h1>
					)}
				</div>
			</div>
		</>
	)
}

export default App
