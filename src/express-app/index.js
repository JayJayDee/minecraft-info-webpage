const express = require('express');

const initExpressApp = () => {
	const app = express();
	app.set('view engine', 'ejs');
	return app;
};

module.exports = {
	initExpressApp
};
