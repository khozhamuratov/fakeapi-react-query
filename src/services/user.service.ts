import axios from 'axios'
import { ICreateUser, IUpdateUser, IUsers } from './user.types'

class userService {
	private URL = 'https://api.escuelajs.co/api/v1/users'

	async getAllUsers() {
		return axios.get<IUsers[]>(`${this.URL}`)
	}

	async getById(id: number) {
		return axios.get<IUsers>(`${this.URL}/${id}`)
	}

	async createUser(name: string, email: string, avatar: string) {
		return axios.post<any, any, ICreateUser>(this.URL, {
			name: name,
			email: email,
			password: '1234',
			avatar: avatar,
		})
	}

	async deleteUser(id: number) {
		return axios.delete<IUsers>(`${this.URL}/${id}`)
	}

	async updateUser(id: number, name: string, email: string, avatar: string) {
		return axios.put<any, any, IUpdateUser>(`${this.URL}/${id}`, {
			name: name,
			email: email,
			avatar: avatar,
		})
	}
}

export default new userService()
