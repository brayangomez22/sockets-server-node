import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { map, usersOnline } from '../sockets/socket';
import { GraphData } from '../classes/graph';
import { GraphBarData } from '../classes/graph-bar';

const router = Router();

// MAP
router.get('/map', (req: Request, res: Response) => {
	res.json(map.getMarkers());
});

// GRAPHS
const graph = new GraphData();
const graphBar = new GraphBarData();

router.get('/graph-bar', (req: Request, res: Response) => {
	res.json(graphBar.getGraphBarData());
});

router.post('/graph-bar', (req: Request, res: Response) => {
	const option = req.body.option;
	const units = Number(req.body.units);

	graphBar.increaseValueGraphBar(option, units);

	const server = Server.instance;
	server.io.emit('graphic-bar-change', graphBar.getGraphBarData());

	res.json(graphBar.getGraphBarData());
});

router.get('/graph', (req: Request, res: Response) => {
	res.json(graph.getGraphData());
});

router.post('/graph', (req: Request, res: Response) => {
	const label = req.body.label;
	const units = Number(req.body.units);

	graph.increaseValue(label, units);

	const server = Server.instance;
	server.io.emit('graphic-change', graph.getGraphData());

	res.json(graph.getGraphData());
});

// CHAT
router.get('/messages', (req: Request, res: Response) => {
	res.json({
		ok: true,
		message: 'get ok',
	});
});

router.post('/messages', (req: Request, res: Response) => {
	const message = req.body.message;
	const from = req.body.from;

	const payload = {
		message,
		from,
	};

	const server = Server.instance;
	server.io.emit('new-message', payload);

	res.json({
		ok: true,
		message,
		from,
	});
});

router.post('/messages/:id', (req: Request, res: Response) => {
	const message = req.body.message;
	const from = req.body.from;
	const id = req.params.id;

	const payload = {
		from,
		message,
	};

	const server = Server.instance;
	server.io.in(id).emit('private-message', payload);

	res.json({
		ok: true,
		message,
		from,
		id,
	});
});

router.get('/messages/:id', (req: Request, res: Response) => {
	const id = req.params.id;

	res.json({
		ok: true,
		id,
	});
});

router.get('/users', (req: Request, res: Response) => {
	const server = Server.instance;

	server.io
		.allSockets()
		.then((clients) => {
			res.json({
				ok: true,
				clients: Array.from(clients),
			});
		})
		.catch((err) => {
			res.json({
				ok: false,
				err,
			});
		});
});

router.get('/users/detail', (req: Request, res: Response) => {
	res.json({
		ok: true,
		clients: usersOnline.getUsersList(),
	});
});

export default router;
