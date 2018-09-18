module.exports = function({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache){
	
	Bot.Custom.Utility = {};
	Bot.Custom.Database = {};
	Bot.Custom.Scheduler = {};
		
	try {
		Bot.Custom.Utility = require("./scripts/utility")({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache);
		Bot.Custom.Database = require("./scripts/database")({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache);
		Bot.Custom.Scheduler = require("./scripts/scheduler")({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache);
			
		console.log("Custom Files Loaded")	
	} catch (error) {
		console.error(error.stack ? error.stack : error);
	}
	
}

