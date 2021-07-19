
const loadMandatory = (key, env = process.env) => {
	const value = env[key];
	if (!value) {
		throw new Error(`mandatory variable not supplied, key: ${key}`);
	}
	return value;
};

const loadOptional = (key, defaultValue, env = process.env) => {
	const value = env[key];
	if (!value) {
		return defaultValue;
	}
	return value;
}

const configurationStore = {
	HTTP_PORT: null,
	MINECRAFT_REST_HOST: null,
	MYSQL_HOST: null,
	MYSQL_PORT: null,
	MYSQL_USER: null,
	MYSQL_PASSWORD: null,
	MYSQL_DATABASE: null,
	TG_TOKEN: null,
	EVENT_LISTENING_KEY: null,
	ENABLE_MOCK_STATUS_FETCHER: null,
	ENABLE_CRONTAB_TRIGGER: null,
	ENABLE_EVENT_RECORDER: null,
	
	SNAPSHOT_AWS_ACCESS_KEY_ID: null,
	SNAPSHOT_AWS_SECRET_ACCESS_KEY: null,
	SNAPSHOT_AWS_BUCKET_NAME: null,
	SNAPSHOT_MINECRAFT_PATH: null
};

const initConfigurations = (store = configurationStore) => {
	store.HTTP_PORT = loadMandatory('HTTP_PORT');
	store.MINECRAFT_REST_HOST = loadMandatory('MINECRAFT_REST_HOST');
	store.MYSQL_HOST = loadMandatory('MYSQL_HOST');
	store.MYSQL_PORT = loadMandatory('MYSQL_PORT');
	store.MYSQL_USER = loadMandatory('MYSQL_USER');
	store.MYSQL_PASSWORD = loadMandatory('MYSQL_PASSWORD');
	store.MYSQL_DATABASE = loadMandatory('MYSQL_DATABASE');
	store.TG_TOKEN = loadOptional('TG_TOKEN', null);

	store.EVENT_LISTENING_KEY = loadOptional('EVENT_LISTENING_KEY', null);
	store.ENABLE_MOCK_STATUS_FETCHER = loadOptional('ENABLE_MOCK_STATUS_FETCHER', null);
	store.ENABLE_CRONTAB_TRIGGER = loadOptional('ENABLE_CRONTAB_TRIGGER', null);
	store.ENABLE_EVENT_RECORDER = loadOptional('ENABLE_EVENT_RECORDER', null);

	store.SNAPSHOT_AWS_ACCESS_KEY_ID = loadOptional('SNAPSHOT_AWS_ACCESS_KEY_ID', null);
	store.SNAPSHOT_AWS_SECRET_ACCESS_KEY = loadOptional('SNAPSHOT_AWS_SECRET_ACCESS_KEY', null);
	store.SNAPSHOT_AWS_BUCKET_NAME = loadOptional('SNAPSHOT_AWS_BUCKET_NAME', null);
	store.SNAPSHOT_MINECRAFT_PATH = loadOptional('SNAPSHOT_MINECRAFT_PATH', null);
};

const getConfiguration = (key, store = configurationStore) => {
	const value = store[key];
	if (value === undefined) {
		throw new Error(`configuration not found for key: ${key}`);
	}
	return value;
};

module.exports = {
	initConfigurations,
	getConfiguration
};
