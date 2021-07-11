const { Router } = require('express');
const { shuffle } = require('lodash');
const { getServerStatusModule } = require('../server-status');
const { serverStatusMiddleware } = require('./middlewares/server-status-middleware');

const pageEndpointsRouter = () => {
	const router = Router();

	router.get('/', [
		serverStatusMiddleware(),
		async (req, res) => {
			const statusFetcher = getServerStatusModule('ServerStatusFetcher');
			const ghostsTop5 = await statusFetcher.playtimeRanks({
				take: 5
			});

			const frontPictures= [
				'carousel-01.png',
				'carousel-02.png',
				'carousel-03.png',
				'carousel-04.png'
			];
			const frontPicture = shuffle(frontPictures)[0];

			const catchphrases = [
				'우리는 짓는다 건물을',
				'우리는 캔다 철광석을',
				'우리는 굽는다 벽돌을',
				'우리는 캔다 다이아몬드를',
				'우리는 깐다 철도레일을',
				'우리는 만든다 철곡괭이를'
			];
			const catchphrase = shuffle(catchphrases)[0];

			res.render('index', {
				... req.serverStatus,
				ghostsTop5,
				catchphrase,
				frontPicture
			});
		}
	]);

	router.get('/status', [
		serverStatusMiddleware(),
		async (req, res) => {
			const statusFetcher = getServerStatusModule('ServerStatusFetcher');
			const allRanks = await statusFetcher.playtimeRanks();

			res.render('status', {
				... req.serverStatus,
				allRanks
			});
		}
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

	router.get('/project/rail', [
		serverStatusMiddleware(),
		async (req, res) =>
			res.render('project-rail', {
				... req.serverStatus
			})
	]);

	router.get('/project/waterhouse', [
		serverStatusMiddleware(),
		async (req, res) =>
			res.render('project-waterhouse', {
				... req.serverStatus
			})
	]);

	return router;
};

module.exports = {
	pageEndpointsRouter
};
