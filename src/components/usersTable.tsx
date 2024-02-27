import {
	ActionIcon,
	Anchor,
	Avatar,
	Badge,
	Button,
	Group,
	Notification,
	Table,
	Text,
	TextInput,
	rem,
} from '@mantine/core'
import '@mantine/core/styles.css'
import { IconCheck, IconPencil, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import userService from '../services/user.service'

export function UsersTable() {
	const [update, setUpdate] = useState(false)
	const [deleted, setDeleted] = useState(false)
	const [updated, setUpdated] = useState(false)
	const [ava, setAva] = useState('')
	const [title, setTitle] = useState('')
	const [email, setEmail] = useState('')
	const [id, setId] = useState(0)
	const { data, refetch } = useQuery(
		['users'],
		() => userService.getAllUsers(),
		{
			select: ({ data }) => data,
		}
	)

	const mutation = useMutation(
		['deleteUser'],
		(id: number) => userService.deleteUser(id),
		{
			async onSuccess() {
				setDeleted(true)
				await refetch()
				setDeleted(false)
			},
		}
	)

	const updateMutation = useMutation(
		['updateUser'],
		(id: number) => userService.updateUser(id, title, email, ava),
		{
			async onSuccess() {
				setUpdated(true)
				setTitle('')
				setEmail('')
				setAva('')
				setUpdate(false)
				await refetch()
				setUpdated(false)
			},
		}
	)

	const handleDelete = (id: number) => {
		mutation.mutate(id)
	}

	const updateUser = (id: number) => {
		console.log('ss')
		updateMutation.mutate(id)
	}

	const handleUpdate = (id: number) => {
		setId(id)
		setUpdate(true)
	}

	return (
		<Table.ScrollContainer maw={1000} mx={'auto'} minWidth={200}>
			{updated && (
				<Notification
					className='absolute right-0'
					icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
					withCloseButton={false}
					color='green'
				>
					User updated succesfully!!
				</Notification>
			)}
			{deleted && (
				<Notification
					className='absolute right-0'
					icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
					withCloseButton={false}
					color='green'
				>
					User deleted succesfully!!
				</Notification>
			)}
			{update && (
				<div className='flex flex-col justify-center items-center mt-5 mb-5'>
					<h1 className='text-[24px] font-sans font-bold'>Update user</h1>
					<div className='flex flex-col items-center justify-center'>
						<form onSubmit={() => updateUser(id)} className='flex gap-5'>
							<TextInput
								label='Name'
								placeholder='Your name'
								name='name'
								variant='filled'
								value={title}
								onChange={e => setTitle(e.target.value)}
								required
							/>
							<TextInput
								label='Email'
								placeholder='example@gmail.com'
								name='email'
								variant='filled'
								value={email}
								required
								onChange={e => setEmail(e.target.value)}
							/>
							<TextInput
								label='Avatar'
								placeholder='Source Ava'
								required
								name='avatar'
								variant='filled'
								value={ava}
								onChange={e => setAva(e.target.value)}
							/>
						</form>
						<Button
							onClick={() => updateUser(id)}
							bg={'black'}
							type='submit'
							mt={25}
						>
							Update User
						</Button>
					</div>
				</div>
			)}
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Users</Table.Th>
						<Table.Th>Role</Table.Th>
						<Table.Th>Email</Table.Th>
						<Table.Th />
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{data?.map(item => (
						<Table.Tr key={item.id}>
							<Table.Td>
								<Group gap='10px'>
									<Avatar size={'md'} src={item.avatar} radius={50} />
									<Text fz='sm' fw={500}>
										{item.name}
									</Text>
								</Group>
							</Table.Td>
							<Table.Td>
								<Badge variant='light'>{item.role}</Badge>
							</Table.Td>
							<Table.Td>
								<Anchor component='button' size='sm'>
									{item.email}
								</Anchor>
							</Table.Td>
							<Table.Td>
								<Group gap={0} justify='flex'>
									<ActionIcon
										onClick={() => handleUpdate(item.id)}
										variant='subtle'
										color='gray'
									>
										<IconPencil
											style={{ width: rem(16), height: rem(16) }}
											stroke={1.5}
										/>
									</ActionIcon>
									<ActionIcon
										onClick={() => handleDelete(item.id)}
										variant='subtle'
										color='red'
									>
										<IconTrash
											style={{ width: rem(16), height: rem(16) }}
											stroke={1.5}
										/>
									</ActionIcon>
								</Group>
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	)
}
