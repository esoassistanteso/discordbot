module.exports = function({Bot, DBM, Actions, Files, Events, tempVars, serverVars, globalVars}, client, cache){
	
	try {
		const mongoose = Bot.mongoose = require('mongoose');
        mongoose.connect('mongodb://esodata:esodatabase1@ds235850.mlab.com:35850/heroku_w28d3f0r');
		
			
		const Subscriber = Bot.mongoose.Subscriber = mongoose.model('Subscriber', { serverid: Number, channelid: Number });

		

		//for(var index in Bot.subscribers){ 
			//const subscriber = new Subscriber({ serverid: Bot.subscribers[index].serverid, channelid: Bot.subscribers[index].channelid }); 
			//subscriber.save().then(() => console.log('meow'));
		//}

		//mongoose.Subscriber.update( { serverid : 'Ted' }, { serverid : 'Ted', channelid : 50 }, { upsert : true }, ()=>{

			//console.log("Added subscriber!")	
		//} );
				
		console.log("Database Loaded!")	
	} catch (error) {
		console.error(error.stack ? error.stack : error);
	}
	
}

