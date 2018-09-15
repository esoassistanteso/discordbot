const questions = [
    () => askQuestion({
        question:"Name for the Main Trials Category? ",  //(required)
        default: "TRIALS",       // optional
        validate:  validate  // optional
    }),
    () => askQuestion({
        question:"How about the Signup channel?",  
        default:"signups", 
        validate:  validate
    }),
    () => askQuestion({
        question:"And the logs channel name?", 
        default:"logs", 
        validate:  validate
    })       
];   


function validate(answer, length){
    if(length <= 2){ 
        msg.channel.send("That answer failed verification: " + answer); 
        return false; 
    } 
    msg.channel.send("That answer passed verification: " + answer); 
    return true;
}

global.askQuestion = function(options){
    return new Promise(function(resolve, reject){
        let question = options.question || "";
        if(!question) reject("You must provide a question!");
        try {                    
            let def = options.default || "";
            let filters = options.filters || false;
            let validate = options. validate || false;

            let collector = new DiscordJS.MessageCollector(msg.channel, message => message.author.id == member.id, { max: 1});
            collector.on('collect', (message) => {    
                if(message.content){
                    let answer = message.content || "";

                    let out = answer;
                    if(answer == "def") {
                        out = def;
                        if(filters) filters.push(out);
                    }

                    let checkAnswer =  validate ? validate(out, out.split("").length) : true;  
                    let filter = (filters && filters.length > 0 ) ? filters.includes(out) : true;

                    if(out == "quit"){                        
                        reject("Canceled The Question.");
                    }else if(checkAnswer && filter && out){              
                        resolve(out);     
                    }else{
                        askQuestion({
                            question: question, 
                            default: def, 
                            filters: filters,
                            check: validate
                        }).then(resolve);
                    }
                }                 
            });   
            msg.channel.send(question +( def ? `(Default: ${def} (enter 'def' for default))` : ""));       
        } catch (error) {
            reject(error);
        }           
    }); 
}

function series(tasks) {
	var len = tasks.length;
	var i = 0;
	var results = [];
	return new Promise(function (resolve, reject) {
		var doTask = function doTask(i) {
			return tasks[i]().then(function (resolved) {
				i++;
				results.push(resolved);
				if (i < len) {
					return doTask(i);
				} else {
					return resolve(results);
				}
			});
		};
		doTask(i);
	});
}

series(questions).then(res => msg.channel.send(res)).catch(res => msg.channel.send(res));
