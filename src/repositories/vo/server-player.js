
class ServerPlayerVO {

	constructor({
		uuid,
		nickname
	}) {
		this._uuid = uuid;
		this._nickname = nickname;
	}

	get uuid() {
		return this._uuid;
	}

	get nickname() {
		return this._nickname;
	}

	static fromSeverResponseElement(element) {
		return new ServerPlayerVO({
			uuid: element.uuid,
			nickname: element.displayName
		});
	}
}

module.exports = {
	ServerPlayerVO
};
