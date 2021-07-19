const { S3 } = require('aws-sdk');
const S3StreamInit = require('s3-upload-stream');

const { getConfiguration } = require('../configurator');
const { getLogger } = require('../logger');
const { DefaultSnapshotWorker } = require('./default-snapshot-worker');

const snapshotWorkerInstanceStore = {
	Default: null
};

const initSnapshotWorker = (store = snapshotWorkerInstanceStore) => {
	const logger = getLogger('snapshot-worker');

	const awsAccessKeyId = getConfiguration('SNAPSHOT_AWS_ACCESS_KEY_ID');
	const awsSecretAccessKey = getConfiguration('SNAPSHOT_AWS_SECRET_ACCESS_KEY');
	const bucketName = getConfiguration('SNAPSHOT_AWS_BUCKET_NAME');

	if (!awsAccessKeyId) {
		throw new Error('SNAPSHOT_AWS_ACCESS_KEY_ID required to init SnapshotWorker');
	}
	if (!awsSecretAccessKey) {
		throw new Error('SNAPSHOT_AWS_SECRET_ACCESS_KEY required to init SnapshotWorker');
	}
	if (!bucketName) {
		throw new Error('SNAPSHOT_AWS_BUCKET_NAME required to init SnapshotWorker');
	}

	const s3 = new S3({
		accessKeyId: awsAccessKeyId,
		secretAccessKey: awsSecretAccessKey,
		region: 'ap-northeast-2'
	});

	const s3Stream = S3StreamInit(s3);

	if (!store.Default) {
		store.Default = new DefaultSnapshotWorker({
			logger,
			s3Stream
		});
	}
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
