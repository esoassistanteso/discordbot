const Files = {};

Files.data = {};
Files.crypto = require('crypto');
Files.dataFiles = [
	'commands.json',
	'events.json',
	'settings.json',
	'players.json',
	'servers.json',
	'serverVars.json',
	'globalVars.json'
];

Files.readData = function(callback) {
	const fs = require('fs');
	const path = require('path');
	let max = this.dataFiles.length;
	let cur = 0;
	for(let i = 0; i < max; i++) {
		const filePath = path.join('../data', this.dataFiles[i]);
		if(!fs.existsSync(filePath)) continue;
		fs.readFile(filePath, function(error, content) {
			const filename = this.dataFiles[i].slice(0, -5);
			let data;
			try {
				if(typeof content !== 'string' && content.toString) content = content.toString();
				data = JSON.parse(content);
			} catch(e) {
				console.error(`There was issue parsing ${this.dataFiles[i]}!`);
				return;
			}
			this.data[filename] = data;
			if(++cur === max) {
				callback();
			}
		}.bind(this));
	}
};

var assert = require('assert');
describe('Data Readable', function() {
  describe('Read all data and check length of commands, events, and players', function() {
     it('should have a command count greater than 1', function() {
		Files.readData(function(){
			assert.equal(Files.data.commands > 1);
			console.log(Files.data.commands.length) ;   
		});    
       
     });
     it('should have an event count greater than 1', function() {
		Files.readData(function(){
			assert.equal(Files.data.events > 1);
			console.log(Files.data.events.length) ;   
		});         
     });
     it('should have a player count greater than 1', function() {
		Files.readData(function(){
			assert.equal(Files.data.players > 1);
			console.log(Files.data.players.length) ;   
		});           
     });
  });

});

