import { Router, Request, Response } from 'express';

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
