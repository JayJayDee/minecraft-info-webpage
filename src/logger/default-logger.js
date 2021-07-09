
class DefaultLogger {

	constructor(moduleName) {
		this._moduleName = moduleName;
	}

	debug(...payload) {
		const prefix = this._moduleName ? `[dbg/${this._moduleName}]` : '[dbg]';
		console.log(... [
				prefix,
				...payload
			]
		);
	}

	error(...payload) {
		const prefix = this._moduleName ? `[err/${this._moduleName}]` : '[err]';
		console.log(... [
				prefix,
				...payload
			]
		);
	}

	info(...payload) {
		const prefix = this._moduleName ? `[inf/${this._moduleName}]` : '[inf]';
		console.log(... [
				prefix,
				...payload
			]
		);
	}
}

module.exports = {
	DefaultLogger
};
