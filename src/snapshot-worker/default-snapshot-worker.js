
class DefaultSnapshotWorker {

	constructor({
		s3Stream,
		logger
	}) {
		this._s3Stream = s3Stream;
		this._logger = logger;
	}

	async start() {

	}
}

module.exports = {
	DefaultSnapshotWorker
};
