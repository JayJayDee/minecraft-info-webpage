const { BasePlayerFilter } = require('./base-filter');

class ExcludeTelegramFilterRule extends BasePlayerFilter {

	constructor() {
		super();
	}

	async filter() {
		return true;
	}
}

module.exports = {
	ExcludeTelegramFilterRule
};
