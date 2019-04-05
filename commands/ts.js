exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    //msg.channel.send("Test command!").catch(console.error);    

    var gameUser = "@Testingsunset";
    var gameName = "Minecraft";
    var gameDetails = "Not real! Just testing something";
    var gameURL = "https://www.twitch.tv/silverstesting";

    //msg.channel.send(`**<:twitch:549289944883920896> ${gameUser} is now streaming!** <:twitch:549289944883920896>\n${gameName}\n${gameDetails}\n${gameURL}\n <@&549314930839519232>`).catch(console.error);
        

    var embed = new Discord.RichEmbed()
        .setColor(0x6441A4)
        .setTimestamp()
        .setDescription(`**<:twitch:549289944883920896> ${msg.author} is now streaming!** <:twitch:549289944883920896>`)	
        .addField(`**User**`,gameUser, true)
        .addField(`**Game**`,gameName,true)
        .addField(`**Info**`,gameDetails,false)
    msg.channel.send({embed}).catch(console.error);
    setTimeout(() => {
        msg.channel.send("<@&549314930839519232>\n" + gameURL).catch(console.error);
    }, 1000);
    
};

exports.help = {
    name: "ts",
    category: "Admins",
    description: "Test Command..for testing",
    usage: "ts",
    example: "",
    status: "Ready"
};