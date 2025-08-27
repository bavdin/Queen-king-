const fs = require("fs");
module.exports.config = {
	name: "french",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "French",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("French")==0 || event.body.indexOf("FRENCH")==0 || event.body.indexOf("french")==0 || event.body.indexOf(".french")==0) {
		var msg = {
				body: "💝 YE LO BABY FRENCH KHAO🍟\n\n(-𝐌𝐚𝐝𝐞 𝐁𝐲 ཫ༄𒁍⃝𝐅𝐀𝐑𝐀𝐙❤️-)",
				attachment: 
fs.createReadStream(__dirname + `/cache/French.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🍟", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
