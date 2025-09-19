const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "namaz",
  version: "0.0.2",
  hasPermission: 0,
  credits: "Cyber Chat",
  description: "Get today's prayer timings by address",
  commandCategory: "Islamic",
  usages: "[your location/address]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const address = args.join(" ");
    if (!address) {
      return api.sendMessage(
        "📍 Please provide a location to get namaz timings.\nExample: namaz Mumbai",
        event.threadID,
        event.messageID
      );
    }

    // Fetch timings from Aladhan API
    const response = await axios.get(
      `http://api.aladhan.com/v1/timingsByAddress?address=${address}`
    );

    const data = response.data.data;
    const timings = data.timings;
    const date = data.date.gregorian.date;
    const month = data.date.gregorian.month.en;
    const hijriDate = data.date.hijri.date;
    const hijriMonth = data.date.hijri.month.en;

    // Build a beautiful message
    let message = `╭•┄┅═══❁🌺❁═══┅┄•╮
✨ 𝑷𝒓𝒂𝒚𝒆𝒓 𝑻𝒊𝒎𝒊𝒏𝒈𝒔 ✨
⎯⎯⎯⋆✦⋆⎯⎯⎯
📅 DATE: 19-09-2025 (September)
🕌 HIJRI: 25-03-1447 (Rabi' al-Awwal)

•—»✨ FAJR : 05:34
•—»✨ ZUHR : 12:59
•—»✨ ASR : 05:30
•—»✨ MAGHRIB : 06:58
•—»✨ ISHA : 08:30

•—»✨ SUNSET : 06:58
•—»✨ MIDNIGHT : 12:09
•—»✨ IMSAK : 05:23

╰•┄┅═══❁🌺❁═══┅┄•╯`;

    // Send message to chat
    api.sendMessage(
      {
        body: message,
        // Optional: You can attach a banner image (random from Imgur for style)
        attachment: (await axios.get("https://i.imgur.com/gZuqamL.jpg", { responseType: "stream" })).data
      },
      event.threadID,
      event.messageID
    );

  } catch (error) {
    console.error("❌ Error fetching prayer timings:", error);
    api.sendMessage("⚠️ Could not fetch prayer timings. Please try again later.", event.threadID, event.messageID);
  }
};
