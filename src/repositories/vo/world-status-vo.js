
class WorldStatusVO {

	constructor({
		worldUuid,
		worldName,
		worldTime,
		worldType,
		storm,
		thundering
	}) {
		this._worldUuid = worldUuid;
		this._worldName = worldName;
		this._worldTime = worldTime; // 0 ~ 24000, 0 - 12000 -> day, 12000 - 24000 -> night
		this._worldType = worldType; // OVERWORLD | NETHER | THE_END
		this._storm = storm; // boolean
		this._thundering = thundering; // boolean
	}

	static Overworld() {
		return 'OVERWORLD';
	}
	
	static Nether() {
		return 'NETHER';
	}

	static TheEnd() {
		return 'THE_END';
	}

	static fromSeverResponseElement(element) {
		return new ServerPlayerVO({
			uuid: element.uuid,
			nickname: element.displayName
		});
	}

	get worldUuid() {
		return this._worldUuid;
	}
	
	get worldName() {
		return this._worldName;
	}

	get worldTime() {
		return this._worldTime;
	}

	get worldType() {
		return this._worldType;
	}
}

module.exports = {
	WorldStatusVO
};
