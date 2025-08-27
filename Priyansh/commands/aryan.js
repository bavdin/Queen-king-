const fs = require("fs");
module.exports.config = {
	name: "gabbar",
    version: "1.0.1",
	hasPermssion: 2,
	credits: "VanHung - Fixed by LTD", 
	description: "hihi",
	commandCategory: "no prefix",
	usages: "🙂",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("gabbar")==0 || event.body.indexOf("GABBAR")==0 || event.body.indexOf("pglu")==0 || event.body.indexOf("gabr")==0) {
		var msg = {
				body: "BOSS BUSSY HAIN ABHI WAIT KRO FREE HOTY AJYEGY MA UNKO BATA DUGA K AP NY YAD KYA BOSS KO🙂🌍🌸",
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("🙂", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
