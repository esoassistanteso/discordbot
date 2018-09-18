module.exports = function({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache){
	
	
	try {
		// this run script allows a loop to run another event/command and send it to each subscriber
		let id = "szXdb" // this is the command or event id
		let sync = true; // true is probally best, async or sync
        let subscriptionlog_channel_id = "452113413158600714"; // id of the channel where the bot can log subs

		//--------------- shouldn't need to change anything below here -----

		let actions;
		const allData = Files.data.commands.concat(Files.data.events);
		for (let i = 0; i < allData.length; i++) {
			if (allData[i] && allData[i]._id === id) {
				actions = allData[i].actions;
				break;
			}
		}

		if (Bot.subscribers.length > -1) {
			client.channels.get(subscriptionlog_channel_id).send("Sending data to " + ( Bot.subscribers.length)+ "subscribers...");

			for (var i = 0; i < Bot.subscribers.length; i++) {
				(function(i) {
					setTimeout(function() {
						let channelid = Bot.subscribers[i].channelid;
						let serverid = Bot.subscribers[i].serverid;

						client.channels.get(subscriptionlog_channel_id).send(""+channelid);

						// set variables						
						// can also set them before this run script!
						Actions.storeValue(client.channels.get(channelid) || cache.channel, 1, "chan", cache);

						const act = actions[0];
						if (act && Actions.exists(act.name)) {

							const cache2 = {
								actions: actions,
								index: 0,
								temp: cache.temp,
								server: client.guilds.get(serverid),
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
					}, 2000 * i);
				})(i);
			}
		}
	} catch (error) {
		console.error(error.stack ? error.stack : error);
	}
	
}

