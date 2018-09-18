module.exports = function({
    Bot,
    DBM,
    Actions,
    Files,
    Events,
    tempVars,
    serverVars,
    globalVars
}, client, cache) {


    Actions.callActionById = function(id, sync, cache){


		let actions;
		const allData = Files.data.commands.concat(Files.data.events);
		for (let i = 0; i < allData.length; i++) {
			if (allData[i] && allData[i]._id === id) {
				actions = allData[i].actions;
				break;
			}
		}
		if (!actions) {
			Actions.callNextAction(cache);
		}

		const act = actions[0];
		if (act && Actions.exists(act.name)) {
			const cache2 = {
				actions: actions,
				index: 0,
				temp: cache.temp,
				server: cache.server,
				msg: (cache.msg || null)
			}
			if (sync === true) {
				cache2.callback = function() {
					Actions.callNextAction(cache);
				};
				Actions[act.name](cache2);
			} else {
				Actions[act.name](cache2);
				Actions.callNextAction(cache);
			}
		}	
	}
}


