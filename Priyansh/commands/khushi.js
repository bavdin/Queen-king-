const fs = require("fs");
module.exports.config = {
  name: "jannat",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "FAIZ ANSARI", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "haniya",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("JANNAT")==0 || event.body.indexOf("jannat")==0 || event.body.indexOf("jant")==0 || event.body.indexOf("Jannt")==0) {
    var msg = {
        body: "❤️𝐘𝐄 𝐋𝐎 𝐉𝐀𝐍𝐍𝐀𝐓 𝐉𝐈 𝐀𝐀 𝐆𝐀𝐈🙈",
        attachment: fs.createReadStream(__dirname + `/cache/khusi.`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙆‍♀️JANNAT", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
