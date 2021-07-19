const { WellKnownTopics } = require('../well-known-topics');
const { BaseJob } = require('./base-job');

class SnapshotBackupMidnightJob extends BaseJob {

	constructor({
		snapshotWorker,
		logger
	}) {
		super();
		this._snapshotWorker = snapshotWorker;
		this._logger = logger;
	}

	topicName() {
		return WellKnownTopics.TIME_EVERYDAY_MIDNIGHT();
	}

	async execute() {
		this._logger.info('snapshotWorker job start');
		await this._snapshotWorker.start();
		this._logger.info('snapshotWorker job completed');
	}
}

module.exports = {
	SnapshotBackupMidnightJob
};
