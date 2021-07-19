const { getConfiguration } = require('../configurator');
const { getLogger } = require('../logger');

const initSnapshotWorker = () => {
	const enableSnapshotWorker = getConfiguration('ENABLE_SNAPSHOT_WORKER');
	const logger = getLogger('snapshot-worker');
	
	if (!enableSnapshotWorker) {
		logger.info('snapShotWorker is DISABLED -> ENABLE_SNAPSHOT_WORKER env-variable is not set');
		return;
	}

	logger.info('snapShotWorker is enabled and ready');
};

module.exports = {
	initSnapshotWorker
};
