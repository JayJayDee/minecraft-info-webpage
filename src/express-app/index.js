const express = require('express');
const { join } = require('path');

const { pageEndpointsRouter } = require('./page-endpoints');

const initExpressApp = () => {
	const app = express();
	app.set('view engine', 'ejs');
	app.set('views', join(__dirname, '..', 'views'));
	app.use('/assets', express.static('assets'));
	app.use('/', pageEndpointsRouter());
	return app;
};

module.exports = {
	initExpressApp
};
