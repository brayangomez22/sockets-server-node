import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import { SERVER_PORT } from '../global/environment';

export default class Server {
	private static _instance: Server;

	public app: express.Application;
	public port: number;
	public io: socketIO.Server;
	private httpServer: http.Server;

	private constructor() {
		this.app = express();
		this.port = SERVER_PORT;
		this.httpServer = new http.Server(this.app);
		this.io = new socketIO.Server(this.httpServer, { cors: { origin: true, credentials: true } });

		this.listenSockets();
	}

	public static get instance() {
		return this._instance || (this._instance = new this());
	}

	private listenSockets() {
		console.log('Listen connections - sockets');

		this.io.on('connection', (client) => {
			console.log('Cliente connect');
		});
	}

	start(callback: Function) {
		this.httpServer.listen(this.port, callback());
	}
}
