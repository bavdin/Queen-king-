 const fs = require("fs");
module.exports.config = {
	name: "Aaryan",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Aaryan", 
	description: "no prefix",
	commandCategory: "No command marks needed",
	usages: "...",
    cooldowns: 100, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("owner") ||
     react.includes("Owner") ||
     react.includes("faraz") || 
react.includes("FARAZ")) {
		var msg = {
				body: "★𝗢𝘄𝗻𝗲𝗿 + 𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗛𝗲𝗿𝗲★\n\n✦ ཫ༄𒁍⃝𝐅𝐀𝐑𝐀𝐙✦\n\n https://www.facebook.com\n\n☞★★᭄𝗖𝗿𝗲𝗱𝗶𝘁'𝘀 :  ཫ༄𒁍⃝𝐅𝐀𝐑𝐀𝐙🪽✦`🥀🦋",
				attachment: fs.createReadStream(__dirname + `/`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🦋", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

    }
