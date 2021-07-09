const { DefaultLogger } = require('./default-logger');

const getLogger = (moduleName) =>
	new DefaultLogger(moduleName);

module.exports = {
	getLogger
};
