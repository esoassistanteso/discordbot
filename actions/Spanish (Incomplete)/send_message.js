//---------------------------------------------------------------------
// This is a translation of "send_message.js"
//
// Only the parts used by the editor need to be provided.
// "action" and "mod" can be removed if desired and have no effect on the bot if modified.
//---------------------------------------------------------------------

module.exports = {

//---------------------------------------------------------------------
// Action Name
//---------------------------------------------------------------------

name: "Enviar Mensaje",

//---------------------------------------------------------------------
// Action Section
//---------------------------------------------------------------------

section: "Mensajería",

//---------------------------------------------------------------------
// Action Subtitle
//---------------------------------------------------------------------

subtitle: function(data) {
	const channels = ['Mismo Canal', 'Autor del Comando', 'Usuario Mencionado', 'Canal Mencionado', 'Canal por Defecto', 'Variable Temporal', 'Variable Servidor', 'Variable Global'];
	return `${channels[parseInt(data.channel)]}: "${data.message.replace(/[\n\r]+/, '')}"`;
},

//---------------------------------------------------------------------
// Action Storage Function
//---------------------------------------------------------------------

variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	return ([data.varName2, 'Mensaje']);
},

//---------------------------------------------------------------------
// Action Fields
//
// DO NOT CHANGE THESE
//---------------------------------------------------------------------

fields: ["channel", "varName", "message", "storage", "varName2"],

//---------------------------------------------------------------------
// Command HTML
//
// TRANSLATE VISIBLE PARTS
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
<div>
	<div style="float: left; width: 35%;">
		Enviar a:<br>
		<select id="channel" class="round" onchange="glob.sendTargetChange(this, 'varNameContainer')">
			${data.sendTargets[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
		Nombre de la Variable:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div style="padding-top: 8px;">
	Mensaje:<br>
	<textarea id="message" rows="9" placeholder="Insert message here..." style="width: 99%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
</div><br>
<div>
	<div style="float: left; width: 35%;">
		Almacenar en:<br>
		<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer2')">
			${data.variables[0]}
		</select>
	</div>
	<div id="varNameContainer2" style="display: none; float: right; width: 60%;">
		Nombre de la Variable:<br>
		<input id="varName2" class="round" type="text">
	</div>
</div>`;
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// DO NOT CHANGE THIS
//---------------------------------------------------------------------

init: function() {
	const {glob, document} = this;

	glob.sendTargetChange(document.getElementById('channel'), 'varNameContainer');
	glob.variableChange(document.getElementById('storage'), 'varNameContainer2');
}

}; // End of module