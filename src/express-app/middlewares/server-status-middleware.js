const { getServerStatusModule } = require('../../server-status');

const serverStatusMiddleware = () =>
	async (req, _, next) => {
		const serverStatusFetcher = getServerStatusModule('ServerStatusFetcher');
		const { allPlayers, onlinePlayers } = await serverStatusFetcher.fetch();
		req.serverStatus = {
			allPlayers,
			onlinePlayers,
			numOnlinePlayers: onlinePlayers.length,
			numAllPlayers: allPlayers.length
		};
		next();
	};

module.exports = {
	serverStatusMiddleware
};
