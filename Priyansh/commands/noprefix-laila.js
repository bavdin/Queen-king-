const fs = require("fs");
module.exports.config = {
	name: "JANNT",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "ARuN", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "Trisha",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("anaya")==0 || event.body.indexOf("Anaya")==0 || event.body.indexOf("ANAYA")==0 || event.body.indexOf("@Zɩɗɗɩ Qʋɘɘŋ")==0) {
		var msg = {
				body: "===𝗝𝗔𝗡𝗡𝗧 𝗕𝗔𝗕𝗬 𝙈𝙀𝙍𝙄 𝙅𝘼𝘼𝙉 𝙃𝘼𝙄=== 😘❤❤😍",
				attachment: fs.createReadStream(__dirname + `/noprefix/anaya.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💘", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
