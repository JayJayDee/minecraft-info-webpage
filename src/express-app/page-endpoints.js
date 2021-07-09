const { Router } = require('express');
const { getServerStatusModule } = require('../server-status');
const { serverStatusMiddleware } = require('./middlewares/server-status-middleware');

const pageEndpointsRouter = () => {
	const router = Router();

	router.get('/', [
		serverStatusMiddleware(),
		async (req, res) =>
			res.render('index', {
				... req.serverStatus
			})
	]);

	router.get('/status', [
		serverStatusMiddleware(),
		async (req, res) =>
			res.render('status', {
				... req.serverStatus
			})
	]);

	router.get('/guide', [
		serverStatusMiddleware(),
		async (req, res) =>
			res.render('guide', {
				... req.serverStatus
			})
	]);

	router.get('/village', [
		serverStatusMiddleware(),
		async (req, res) =>
			res.render('village', {
				... req.serverStatus
			})
	]);

	return router;
};

module.exports = {
	pageEndpointsRouter
};
