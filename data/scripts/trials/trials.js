let settings = {};

settings["Trials Category Name"] = "Trials";
settings["Signup Channel Name"] = "signup";
settings["Trial Log Channel"] = "trials-log";
settings["Raid"] = "TRIALS";
settings["Trials Category Name"] = "TRIALS";
settings["Trials Category Name"] = "TRIALS";

function hasPermissions(){
    let can_manage_chans = msg.channel.permissionsFor(msg.member).hasPermission("MANAGE_CHANNELS");

    if(can_manage_chans)return true;    
    msg.channel.send("I don't have the manage channels permission!")  
    return false;
}

function inRightChannel(channelName){
    let channel = server.channels.get(settings["Trials Category Name"]);

    if(msg.channel == channel) return true;
    msg.channel.send("Please use the correct channel ")
    return false;
}


function createChannels(){


}

if(hasPermissions()){








}


