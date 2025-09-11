const axios = global.nodemodule["axios"];
const fs = global.nodemodule["fs-extra"];

module.exports.config = {
  name: "pairv",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Anup Kumar",
  description: "Pairing",
  commandCategory: "Love",
  usages: "pair",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, Threads, Users }) {
  try {
    const { participantIDs } = (await Threads.getData(event.threadID)).threadInfo;
    const botID = api.getCurrentUserID();
    const listUserID = participantIDs.filter(ID => ID !== botID && ID !== event.senderID);
    const pairID = listUserID[Math.floor(Math.random() * listUserID.length)];
    const loveRate = Math.floor(Math.random() * 101);

    const senderName = (await Users.getData(event.senderID)).name;
    const pairName = (await Users.getData(pairID)).name;

    const arrayTag = [
      { id: event.senderID, tag: senderName },
      { id: pairID, tag: pairName }
    ];

    // Fetch avatars
    const avt1 = (await axios.get(`https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    const avt2 = (await axios.get(`https://graph.facebook.com/${pairID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    const loveGif = (await axios.get("https://i.imgur.com/MBETCWy.gif", { responseType: "arraybuffer" })).data;

    // Save files
    fs.writeFileSync(__dirname + "/cache/avt1.png", Buffer.from(avt1, "utf-8"));
    fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(avt2, "utf-8"));
    fs.writeFileSync(__dirname + "/cache/love.gif", Buffer.from(loveGif, "utf-8"));

    // Message phrases
    const phrases = [
      "𝑲𝒚𝒂 𝒕𝒖𝒎𝒏𝒆 𝒌𝒉𝒂𝒏𝒂 𝒌𝒉𝒂𝒚𝒂 𝒅𝒆𝒂𝒓 💝🥀",
      "𝑺𝒂𝒃𝒔𝒆 𝒂𝒄𝒉𝒉𝒊 𝒋𝒐𝒅𝒊",
      "𝑷𝒂𝒈𝒂𝒍 𝒉𝒐 𝒕𝒖𝒎 𝒅𝒐𝒏𝒐 ❤️",
      "𝑳𝒐 𝒎𝒊𝒍 𝒈𝒚𝒆 𝒑𝒚𝒂𝒓 𝒘𝒂𝒍𝒆 ❤️",
      "𝑭𝒖𝒍𝒍 𝒔𝒆𝒕𝒕𝒊𝒏𝒈 𝒉𝒐 𝒈𝒚𝒊 😍",
      "𝑷𝒂𝒊𝒓 𝒐𝒇 𝒕𝒉𝒆 𝒅𝒂𝒚 💞",
      "𝑱𝒂𝒐 𝒃𝒆𝒅𝒓𝒐𝒐𝒎 𝒎 𝒎𝒐𝒋 𝒌𝒓𝒐 😏"
      // ... you can add more
    ];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    // Compose and send the message
    const attachments = [
      fs.createReadStream(__dirname + "/cache/avt1.png"),
      fs.createReadStream(__dirname + "/cache/love.gif"),
      fs.createReadStream(__dirname + "/cache/avt2.png")
    ];

    const message = {
      body: `🥰 𝐏𝐀𝐈𝐑𝐈𝐍𝐆! 🍒\n\n💙🅂🆄︎🄲🅲︎🄴🆂︎🅂🅵︎🅄🅻︎❤️\n\n𝐋𝐨 𝐌𝐢𝐥 𝐠𝐲𝐢 𝐀𝐚𝐩𝐤𝐢 𝐒𝐞𝐭𝐭𝐢𝐧𝐠\n\n💕 𝗟𝗼𝘃𝗲💝𝗥𝗮𝘁𝗶𝗼: ${loveRate}%\n\n${senderName} 💓 ${pairName}\n\n👉 ${randomPhrase}\n\n© - ཫ༄𒁍⃝𝐅𝐀𝐑𝐀𝐙`,
      mentions: arrayTag,
      attachment: attachments
    };

    return api.sendMessage(message, event.threadID, event.messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage("⚠️ Error occurred while pairing.", event.threadID, event.messageID);
  }
};
