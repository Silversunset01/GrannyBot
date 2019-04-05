const config = require("../config.json");
exports.run = (client, message) => {
    if (message.author.bot) return;

    //link censoring
    if (message.content.includes("https://discord.gg/")){
        message.delete().catch(console.error);

        message.author.send(`Hey! I have deleted your discord invite link from ${message.channel}. If you believe this is in error please contact staff.`).catch(console.error);
    };

    //chat censoring
    var censorList = config.censoredWords;
    var myMsg = message.content.toLowerCase();
    for (c in censorList) {
        if (myMsg.includes(censorList[c])){
            message.delete().catch(console.error);
            message.author.send(`I have deleted your message from ${message.channel}, if you believe this is in error please contact staff.\n**Your Message:**\n ${message.content}`).catch(console.error);
        }
    };
   
};