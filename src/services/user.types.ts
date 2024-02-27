export interface IUsers {
	id: number
	email: string
	password: string
	name: string
	role: string
	avatar: string
}

export interface ICreateUser extends Omit<IUsers, 'id' | 'role'> {}
export interface IUpdateUser extends Omit<IUsers, 'id' | 'role' | 'password'> {}
