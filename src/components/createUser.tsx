import {
	Button,
	Notification,
	SimpleGrid,
	TextInput,
	Title,
	rem,
} from '@mantine/core'
import '@mantine/core/styles.css'
import { IconCheck } from '@tabler/icons-react'
import { SyntheticEvent, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import userService from '../services/user.service'

const CreateUser = () => {
	const [title, setTitle] = useState('')
	const [email, setEmail] = useState('')
	const [created, setCreated] = useState(false)
	const [ava, setAva] = useState('')
	const { refetch } = useQuery(['users'], () => userService.getAllUsers(), {
		select: ({ data }) => data,
	})

	const { mutate } = useMutation(
		['craeteUser'],
		(name: string) => userService.createUser(name, email, ava),
		{
			async onSuccess() {
				setTitle('')
				setAva('')
				setEmail('')
				setCreated(true)
				await refetch()
				setCreated(false)
			},
		}
	)

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault()
		mutate(title)
	}

	return (
		<form className='flex flex-col items-center' onSubmit={submitHandler}>
			{created && (
				<Notification
					className='absolute top-[10%] right-[10%]'
					icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
					withCloseButton={false}
					color='green'
				>
					User created succesfully!!
				</Notification>
			)}

			<Title order={2} size='h1' fw={900} ta='center'>
				Create User
			</Title>

			<SimpleGrid cols={{ base: 1, sm: 2 }} mt='xl'>
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
				<Button bg={'black'} type='submit' mt={25}>
					Craete User
				</Button>
			</SimpleGrid>
		</form>
	)
}

export default CreateUser
