const { createWriteStream, createReadStream, unlink } = require('fs');
const { DateTime } = require('luxon');
const { createGzip } = require('zlib');

class DefaultSnapshotWorker {

	constructor({
		mcApiRequester,
		s3Stream,
		s3BucketName,
		logger,
		minecraftPath,
		archiver
	}) {
		this._mcApiRequester = mcApiRequester;
		this._s3Stream = s3Stream;
		this._s3BucketName = s3BucketName;
		this._logger = logger;
		this._minecraftPath = minecraftPath;
		this._archiver = archiver;
	}

	async start() {
		const fileName = this._generateFileName();

		// 0. broadcast
		await this._mcApiRequester.requestBroadcast(
			'[SYSTEM] 서버의 가용성을 위해 마인크래프트 현재 월드 전체를 클라우드에 백업합니다. 좀 버벅거려도 양해부탁드려요..'
		);

		// 1. zip minecraft-directory
		this._logger.info(`archiving started: ${fileName}`);
		await this._zipAndWait(fileName);
		this._logger.info(`archiving completed: ${fileName}`);

		// 2. upload 7zip snapshot to S3 bucket
		this._logger.info(`uploading to s3 started, bucketPath: ${this._s3BucketName}/${fileName}`);
		await this._uploadS3ViaStream(fileName);
		this._logger.info('uploading completed');

		// 3. cleanup
		await this._cleanUp(fileName);

		// TODO: insert bucketKey, fileName into DB

		// TODO: delete latest snapshot when the number of objects are larger than 5

		await this._mcApiRequester.requestBroadcast(
			'[SYSTEM] 마인크래프트 현재 월드 전체를 클라우드에 백업 완료하였습니다. 오늘도 무사히!'
		);
	}

	_generateFileName() {
		const now = DateTime.now().setZone('Asia/Seoul');
		return `${now.toISODate()}.zip`;
	}

	_zipAndWait(fileName) {
		return new Promise((resolve, reject) => {
			const archive = this._archiver('zip');
			const output = createWriteStream(fileName);

			archive.directory(this._minecraftPath);
			archive.pipe(output);
			archive.on('error', reject);
			archive.finalize();
			output.on('close', resolve);
		});
	}

	_uploadS3ViaStream(fileName) {
		return new Promise((resolve, reject) => {
			const stream = createReadStream(fileName);
			const compress = createGzip();
			const upload = this._s3Stream.upload({
				Bucket: this._s3BucketName,
				Key: fileName
			});

			upload.maxPartSize(20971520);
			upload.concurrentParts(5);
			upload.on('error', reject);
			upload.on('part', ({ receivedSize, uploadedSize }) =>
				this._logger.info(`uploading ... (${receivedSize}/${uploadedSize})`));
			upload.on('uploaded', resolve);
			stream.pipe(compress).pipe(upload);
		});
	}

	_cleanUp(fileName) {
		return new Promise((resolve, reject) => {
			unlink(fileName, (err) => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	}
}

module.exports = {
	DefaultSnapshotWorker
};
