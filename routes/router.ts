import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

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

export default router;
