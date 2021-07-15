const { serverStatusMiddleware } = require('./server-status-middleware');
const { eventListenAuthMiddleware } = require('./event-listen-auth-middleware');
const { getConfiguration } = require('../../configurator');

const middlewareInstancesStore = {
	ServerStatus: null,
	EventListenAuth: null
};

const initMiddlewares = (store = middlewareInstancesStore) => {
	const eventListeningKey = getConfiguration('EVENT_LISTENING_KEY');

	store.ServerStatus = serverStatusMiddleware();
	store.EventListenAuth = eventListenAuthMiddleware({
		eventListeningKey
	});
};

const getMiddleware = (key, store = middlewareInstancesStore) => {
	const middlewareInstance = store[key];
	if (!middlewareInstance) {
		throw new Error(`there is no middleware with key: ${key}`);
	}
	return middlewareInstance;
};

module.exports = {
	initMiddlewares,
	getMiddleware
};
