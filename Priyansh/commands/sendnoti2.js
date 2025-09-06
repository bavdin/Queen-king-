const axios = require("axios");
const { createReadStream, unlinkSync } = require("fs");
const { resolve } = require("path");

module.exports.config = {
  name: "sendnoti2",
  version: "1.1.0",
  hasPermssion: 2,
  credits: "SHANKAR",
  description: "Sends a message to all groups and can only be done by the admin.",
  usePrefix: false,
  commandCategory: "message",
  usages: "[Text]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const threadList = await api.getThreadList(25, null, ["INBOX"]);
  let sentCount = 0;
  const custom = args.join(" ");
  let imageAttachment = null;


  if (event.type === "message_reply" && event.attachments.length > 0) {
    imageAttachment = event.attachments[0].url;
  }

  async function sendMessage(thread) {
    try {

      const textMessage = `𝙉𝙊𝙏𝙄𝘾𝙀 𝙁𝙍𝙊𝙈 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 
 ━━━━━━━━━━━━━━━━━━━━━━━━━
『𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙚𝙧 𝙉𝙖𝙢𝙚𝙙』: ཫ༄𒁍⃝𝙁𝘼𝙍𝘼𝙕
 ━━━━━━━━━━━━━━━━━━━━━━━━━
 『𝗡𝗼𝘁𝗶𝗰𝗲』${custom}`;

      await api.sendMessage(textMessage, thread.threadID);
      sentCount++;

      if (imageAttachment) {

        const imageStream = await axios.get(imageAttachment, { responseType: "stream" });
        api.sendMessage({ attachment: imageStream.data }, thread.threadID);
      }
      const content = `Notification from Developer reygie: ${custom}`;
      const languageToSay = "tl";
      const pathFemale = resolve(__dirname, "cache", `${thread.threadID}_female.mp3`);


      await global.utils.downloadFile(
        `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
          content
        )}&tl=${languageToSay}&client=tw-ob&idx=1`,
        pathFemale
      );
      api.sendMessage(
        { attachment: createReadStream(pathFemale) },
        thread.threadID,
        () => unlinkSync(pathFemale)
      );
    } catch (error) {
      console.error("Error sending a message:", error);
    }
  }

  for (const thread of threadList) {
    if (sentCount >= 20) {
      break;
    }
    if (thread.isGroup && thread.name != thread.threadID && thread.threadID != event.threadID) {
      await sendMessage(thread);
    }
  }

  if (sentCount > 0) {
    api.sendMessage(`› Sent the notification successfully.`, event.threadID);
  } else {
    api.sendMessage("› No eligible group threads found to send the message to.", event.threadID);
  }
};
