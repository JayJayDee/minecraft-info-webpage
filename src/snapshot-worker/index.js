const { getLogger } = require('../logger');
const { DefaultSnapshotWorker } = require('./default-snapshot-worker');

const snapshotWorkerInstanceStore = {
	Default: null
};

const initSnapshotWorker = (store = snapshotWorkerInstanceStore) => {
	const logger = getLogger('snapshot-worker');
	store.Default = new DefaultSnapshotWorker({
		logger
	});
	logger.info('snapShotWorker is ready');
};

const getSnapshotWorker = (key = 'Default', store = snapshotWorkerInstanceStore) => {
	const instance = store[key];
	if (!instance) {
		throw new Error('the snapshotWorker instance not have been initialized');
	}
	return instance;
};

module.exports = {
	initSnapshotWorker,
	getSnapshotWorker
};
