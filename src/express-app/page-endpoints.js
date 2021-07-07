const { Router } = require('express');

const pageEndpointsRouter = () => {
	const router = Router();

	router.get('/',
		(_, res) => res.render('index')
	);

	return router;
};

module.exports = {
	pageEndpointsRouter
};
