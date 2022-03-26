import { User } from './user';

export class UsersList {
	private usersList: User[] = [];

	constructor() {}

	public addUser(user: User) {
		this.usersList.push(user);
		return user;
	}

	public updateNameUser(id: string, name: string) {
		for (let user of this.usersList) {
			if (user.id === id) {
				user.name = name;
				break;
			}
		}
	}

	public getUsersList() {
		return this.getUsersList;
	}

	public getUser(id: string) {
		return this.usersList.find((user) => user.id === id);
	}

	public getUsersByRoom(room: string) {
		return this.usersList.filter((user) => user.room === room);
	}

	public deleteUser(id: string) {
		const tempUser = this.getUser(id);
		this.usersList = this.usersList.filter((user) => user.id !== id);
		return tempUser;
	}
}
