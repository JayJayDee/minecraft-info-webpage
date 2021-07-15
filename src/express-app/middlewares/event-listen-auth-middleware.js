const bearerToken = require('express-bearer-token');

const eventListenAuthMiddleware = ({
	eventListeningKey
} = {}) => [
	bearerToken(),
	(req, _, next) => {

		if (!eventListeningKey) {
			return next();
		}

		// simple-token based authentication here

		next();
	}
];

module.exports = {
	eventListenAuthMiddleware
};
