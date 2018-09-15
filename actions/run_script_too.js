module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Run Script Too",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Other Stuff",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
    if(data.title) return `${data.title}`;
	return `${ data.file ? "External File: " + data.file : data.code}`;
},

//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	return ([data.varName, 'Unknown Type']);
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["behavior", "interpretation", "code", "file", "storage", "varName", "title"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions. 
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information, 
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use. 
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels, 
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
    <div id ="wrexdiv" style="width: 550px; height: 350px; overflow-y: scroll;">
        <div>      
            <div style="float: left; width: 45%;">
                End Behavior:<br>
                <select id="behavior" class="round">
                    <option value="0">Call Next Action</option>
                    <option value="1" selected>Do Not Call Next Action</option>
                </select>
            </div>
            <div style="padding-left: 5%; float: left; width: 55%;">
                Interpretation Style:<br>
                <select id="interpretation" class="round">
                    <option value="0">Evaluate Text First</option>
                    <option value="1" selected>Evaluate Text Directly</option>
                </select>
            </div>   
        </div><br><br><br>
        <div id="" style="float: left; width: 60%;">
            Script Name: (shown in the action subtitle)<br>
            <input id="title" class="round" type="text">
        </div><br><br>
        <div> 
            Use External File: (Forward slashes only if using variables)<br>
            <div style="float: left; width: 65%;">     
            <input type="text" name="file" id="file" class="round" placeholder="Click Browse to select file!" style="float: left;"/>
        </div>
        <div style="float: left; width: 40px;">
            <input type="button" value="Browse" class="round" 
                   style="height:28px; width:70px; font-weight: 600; float: left;" onclick="document.getElementById('fileMenu').click()"/>
            <input id="fileMenu" type="file" style="visibility:hidden" accept=".js" onchange="document.getElementById('file').value = this.value;"/>      
        </div>
      </div><br><br><Br>

        <div style="padding-top: 8px;"> 
            Or Use Custom Code:<br>
            <textarea id="code" rows="8" name="is-eval" style="width: 99%; white-space: nowrap; resize: none;"></textarea>
        </div><br>
        <div>
            <div style="float: left; width: 35%;">
                Store In:<br>
                <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
                    ${data.variables[0]}
                </select>
            </div>
            <div id="varNameContainer" style="display: none; float: right; width: 60%;">
                Variable Name:<br>
                <input id="varName" class="round" type="text">
            </div>
        </div>
    `
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
	const {glob, document} = this;
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter, 
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
    const data = cache.actions[cache.index];  

    const path = require("path");
    const fs = require('fs');

    const file = this.evalMessage(data.file, cache);

    let code; 
    
	if(file && fs.existsSync(file)){
		try {
            code = fs.readFileSync(path.normalize(file), "utf8");
            console.log(code ? "Loaded External File: " + path.normalize(file) : "File is empty!");
		} catch (error) {
			console.error(error.stack ? error.stack : error);
		}		
	}else{

        if(data.interpretation === "0") {
            code = this.evalMessage(data.code, cache);
        } else {
            code = data.code;
        }
    }

    const result = this.eval(code, cache);

    const varName = this.evalMessage(data.varName, cache);
    const storage = parseInt(data.storage);
    this.storeValue(result, storage, varName, cache);
    
	if(data.behavior === "0") {
		this.callNextAction(cache);
	}
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
}

}; // End of module