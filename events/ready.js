﻿const config = require("../config.json");
exports.run = (client) => {
    var now = new Date().toLocaleString("en-US", {timeZone: "America/New_York", timeZoneName: "short", weekday: "short", month: "long", day: "2-digit", year: "numeric", hour: '2-digit', minute:'2-digit'});
  
    client.user.setActivity("for " + config.prefix + "help", {type: 'WATCHING'});
    client.channels.find(c => c.name == config.restartLogs).send(`🔄 bot has restarted @ ${now}`);
  
    console.log(`Bot is ready @ ${now}`);
};