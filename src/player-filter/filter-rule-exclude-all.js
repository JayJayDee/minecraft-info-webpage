const { ServerPlayerVO } = require('../repositories/vo/server-player');
const { BasePlayerFilter } = require('./base-filter');

class ExcludeAllFilterRule extends BasePlayerFilter {

	constructor({
		player
	}) {
		super();
		this._player = player;
		if (player instanceof ServerPlayerVO === false) {
			throw new Error('the player must be instance of ServerPlayerVO');
		}
	}

	async filter() {
		if (this.player.nickname.includes('-bot')) {
			return false;
		}
		return true;
	}
}

module.exports = {
	ExcludeAllFilterRule
};
