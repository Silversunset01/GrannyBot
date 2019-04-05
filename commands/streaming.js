exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    if (msg.member.roles.find(r => r.name == config.streamRole)) {
        var sType = args.slice(0,1);
        var role = msg.guild.roles.find(r => r.name == config.liveRole);
        
        if (sType == "start") {
            var announcement = args.slice(1,args.length).join(" ");
            //add the now live role
            msg.member.addRole(role);
            
            //post in the streaming channel
            client.channels.find(c => c.name == config.streamChannel).send(`**<:twitch:549289944883920896> ${msg.author} is now streaming!** <:twitch:549289944883920896>\n${announcement}\n <@&549314930839519232>`).catch(console.error);
            
            //var embed = new Discord.RichEmbed()
            //    .setColor(0x6441A4)
            //    .setTimestamp()
            //    .setDescription(`**<:twitch:549289944883920896> ${msg.author} is now streaming!** <:twitch:549289944883920896>\n${announcement}`)	
            //client.channels.find(c => c.name == config.streamChannel).send({embed}).catch(console.error);    
        } else if (sType == "end") {
            //remove the now live role
            msg.member.removeRole(role);

            //delete from the streaming channel
            var myChannel = client.channels.find(c => c.name == config.streamChannel);
            myChannel.fetchMessages({limit: 100})
            .then ((messages) => {
                var amt = 10;     
                var filtered = messages.filter(m => m.content.includes(msg.author)).array().slice(0, amt);     
                myChannel.bulkDelete(filtered).then(messages => console.log(`deleted ${messages.size} messages`)).catch(console.error);        
            }).catch(console.error); 
        } else {
            msg.channel.send("Please use `" + config.prefix + "streaming start <text>` or `" + config.prefix + "streaming end`").catch(console.error);
        }
    }
};

exports.help = {
    name: "streaming",
    category: "Gaming",
    description: "Makes a post in the #streaming channel for streamers!",
    usage: "streaming <text>",
    example: "",
    status: "Ready"
};