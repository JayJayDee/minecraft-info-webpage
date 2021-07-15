const { Router, json } = require('express');
const { getMiddleware } = require('./middlewares');

const eventListeningRouter = ({
	logger
} = {}) => {
	const router = Router();
	router.use(json());

	router.post('/listen', [
		getMiddleware('EventListenAuth'),
		async (req, res) => {
			logger.debug(JSON.stringify(req.body));
			res.status(200).json({});
		}
	]);

	return router;
};

module.exports = {
	eventListeningRouter
};
