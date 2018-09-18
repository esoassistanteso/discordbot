module.exports = function({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache){
	
	Bot.Custom.Scheduler.Jobs = [];
	
	const path = require("path");

	try {
		Bot.subscribers = require(this.getLocalFile(require("path").join("data", "subscribers.json")))
	} catch (error) {
		// cant find the file, maybe it will create it!
	}
		
	try {
		const CronJob = require('cron').CronJob;
				
		const jobs = [
			new CronJob({
				cronTime: "01 23 * * *",//"0 45 11 ? * MON *", //every two minutes
				onTick: function() {
					const action = require(path.join(process.cwd(),"custom/scripts/schedules/pledge.js"))({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache);
					if(action) action();
				},
				start: false, //don't start immediately
				timeZone: 'America/Los_Angeles'
			}),

			new CronJob({
                cronTime: "03 17 * * FRI", //every two minutes
				onTick: function() {
					const action = require(path.join(process.cwd(),"custom/scripts/schedules/golden.js"))({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache);
					if(action) action();
				},
				start: false, //don't start immediately
				timeZone: 'America/Los_Angeles'
			}),

			new CronJob({
                cronTime: "5 17 * * FRI", //every two minutes
				onTick: function() {
					const action = require(path.join(process.cwd(),"custom/scripts/schedules/luxury.js"))({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache);
					if(action) action();
				},
				start: false, //don't start immediately
				timeZone: 'America/Los_Angeles'
			}),

			new CronJob({
                cronTime: "5 13 * * MON", //every two minutes
				onTick: function() {
					const action = require(path.join(process.cwd(),"custom/scripts/schedules/weekly.js"))({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache);
					if(action) action();
				},
				start: false, //don't start immediately
				timeZone: 'America/Los_Angeles'
			}),
		];

		Bot.Custom.Scheduler.Jobs = jobs;
		
		jobs.forEach(function(job) {
			job.start(); //start the jobs
			console.log("Started Job: " + (job.running ? "Online" : "Offline"))
		});
		console.log("Scheduler Loaded!")	
	} catch (error) {
        if (error) client.channels.get("452341234871173130").send(error.stack ? error.stack : error);
		console.error(error.stack ? error.stack : error);
	}
		
}
