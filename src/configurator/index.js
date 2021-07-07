
const loadMandatory = (key, env = process.env) => {
	const value = env[key];
	if (!value) {
		throw new Error(`mandatory variable not supplied, key: ${key}`);
	}
	return value;
};

const configurationStore = {
	HTTP_PORT: null,
	MINECRAFT_REST_HOST: null
};

const initConfigurations = (store = configurationStore) => {
	store.HTTP_PORT = loadMandatory('HTTP_PORT');
	store.MINECRAFT_REST_HOST = loadMandatory('MINECRAFT_REST_HOST');
};

const getConfiguration = (key, store = configurationStore) => {
	const value = store[key];
	if (!value) {
		throw new Error(`configuration not found for key: ${key}`);
	}
	return value;
};

module.exports = {
	initConfigurations,
	getConfiguration
};
