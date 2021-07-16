const { Router, json } = require('express');
const { getEventProducer } = require('../event-producers');
const { getMiddleware } = require('./middlewares');

const eventListeningRouter = ({
	logger
} = {}) => {
	const router = Router();
	router.use(json());

	router.post('/listen', [
		getMiddleware('EventListenAuth'),
		async (req, res) => {
			const eventProducer = getEventProducer('PlayerEvent');
			eventProducer.produce(req.body);
			res.status(200).json({});
		}
	]);

	return router;
};

module.exports = {
	eventListeningRouter
};
