const { Router } = require('express');
const { getServerStatusModule } = require('../server-status');

const pageEndpointsRouter = () => {
	const router = Router();

	router.get('/',
		async (_, res) => {
			const serverStatusFetcher = getServerStatusModule('ServerStatusFetcher');
			const status = await serverStatusFetcher.fetch();
			res.render('index', {
				numPlayers: status.allPlayers.length,
				onlinePlayers: status.onlinePlayers.length
			});
		}
	);

	router.get('/status',
		async (_, res) => {
			const serverStatusFetcher = getServerStatusModule('ServerStatusFetcher');
			const status = await serverStatusFetcher.fetch();
			res.render('status', {
				numPlayers: status.allPlayers.length,
				onlinePlayers: status.onlinePlayers.length
			});
		}
	);

	return router;
};

module.exports = {
	pageEndpointsRouter
};
