const { getConfiguration } = require('../configurator');
const { DefaultMinecraftAPIRequester } = require('./default-mc-api-requester');

const mcApiRequesterInstances = {
	Default: null
};

const initMcApiRequester = (store = mcApiRequesterInstances) => {
	const minecraftRestHost = getConfiguration('MINECRAFT_REST_HOST');

	store.Default = new DefaultMinecraftAPIRequester({
		minecraftRestHost
	});
};

const getMcApiRequester = (key = 'Default', store = mcApiRequesterInstances) => {
	const instance = store[key];
	if (!instance) {
		throw new Error(`there is no apiRequester instance for key: ${key}`);
	}
	return instance;
};

module.exports = {
	initMcApiRequester,
	getMcApiRequester
};
