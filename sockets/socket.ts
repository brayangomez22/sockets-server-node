import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsersList } from '../classes/users-list';
import { User } from '../classes/user';
import { Map } from '../classes/map';
import { Marker } from '../classes/marker';

// CHAT
export const usersOnline = new UsersList();

export const connectClient = (client: Socket) => {
	const user = new User(client.id);
	usersOnline.addUser(user);
};

export const disconnect = (client: Socket, io: socketIO.Server) => {
	client.on('disconnect', () => {
		usersOnline.deleteUser(client.id);
		io.emit('online-users', usersOnline.getUsersList());
	});
};

export const message = (client: Socket, io: socketIO.Server) => {
	client.on('message', (payload: { from: string; message: string }) => io.emit('new-message', payload));
};

export const login = (client: Socket, io: socketIO.Server) => {
	client.on('login', (payload: { name: string }, callback: Function) => {
		usersOnline.updateNameUser(client.id, payload.name);
		io.emit('online-users', usersOnline.getUsersList());
		callback({
			ok: true,
			msg: `The user with the name: ${payload.name} was configured successfully`,
		});
	});
};

export const sendOnlineUsers = (client: Socket, io: socketIO.Server) => {
	client.on('get-online-users', () => io.to(client.id).emit('online-users', usersOnline.getUsersList()));
};

// MAP
export const map = new Map();

export const mapSockets = (client: Socket) => {
	client.on('new-marker', (marker: Marker) => {
		map.addMarker(marker);
		client.broadcast.emit('new-marker', marker);
	});

	client.on('delete-marker', (id: string) => {
		map.deleteMarker(id);
		client.broadcast.emit('delete-marker', id);
	});

	client.on('move-marker', (payload: Marker) => {
		map.moveMarker(payload);
		client.broadcast.emit('move-marker', payload);
	});
};
