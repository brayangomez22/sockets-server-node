import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsersList } from '../classes/users-list';
import { User } from '../classes/user';

export const usersOnline = new UsersList();

export const connectClient = (client: Socket) => {
	const user = new User(client.id);
	usersOnline.addUser(user);
};

export const disconnect = (client: Socket) => {
	client.on('disconnect', () => {
		usersOnline.deleteUser(client.id);
	});
};

export const message = (client: Socket, io: socketIO.Server) => {
	client.on('message', (payload: { from: string; message: string }) => {
		io.emit('new-message', payload);
	});
};

export const login = (client: Socket, io: socketIO.Server) => {
	client.on('login', (payload: { name: string }, callback: Function) => {
		usersOnline.updateNameUser(client.id, payload.name);
		callback({
			ok: true,
			msg: `The user with the name: ${payload.name} was configured successfully`,
		});
	});
};
