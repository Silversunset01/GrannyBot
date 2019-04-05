const Discord = require("discord.js");
const config = require("../config.json");
//const streamers = require("../streamers.json");

exports.run = (client, oldMember, newMember) => {
    if (newMember.bot) return;
    if (!newMember.roles.find(r => r.name == config.streamRole)) return;

    //Test if user is streaming
    if (!newMember.presence.game) {
        var isStreaming = "no";
    } else {
        if (newMember.presence.game.type == "1") {
            var isStreaming = "yes";
        } else {
            var isStreaming = "no";
        }
    }

    if (isStreaming == "yes") {
        //add the live role to the user
        var role = client.guilds.find(i => i.id == config.botGuild).roles.find(r => r.name == config.liveRole);
        newMember.addRole(role);

        //announce in the streaming channel
        var gameUser = newMember;
        var gameName = newMember.presence.game.name;
        var gameURL = newMember.presence.game.url;
        var gameDetails = newMember.presence.game.details;
        client.channels.find(c => c.name == config.streamChannel).send(`**<:twitch:549289944883920896> ${gameUser} is now streaming!** <:twitch:549289944883920896>\n${gameName}\n${gameDetails}\n${gameURL}\n <@&549314930839519232>`).catch(console.error);
        
    } else if (isStreaming == "no") {
        if (newMember.roles.find(r => r.name == config.liveRole)) {
            //remove the now live role
            var role = client.guilds.find(i => i.id == config.botGuild).roles.find(r => r.name == config.liveRole);
            newMember.removeRole(role);

            //delete from the streaming channel
            var myChannel = client.channels.find(c => c.name == config.streamChannel);
            myChannel.fetchMessages({limit: 100})
            .then ((messages) => {
                var amt = 10;     
                var filtered = messages.filter(m => m.content.includes(newMember)).array().slice(0, amt);     
                myChannel.bulkDelete(filtered).then(messages => console.log(`deleted ${messages.size} messages`)).catch(console.error);        
            }).catch(console.error); 
        }
    }






    //var guild = "549272573444096040";
    //if (newMember.presence.game.type == "1") {
    //    //add the live role to the user
    //    var role = client.guilds.find(i => i.id == guild).roles.find(r => r.name == config.liveRole);
    //    newMember.addRole(role);

        //announce in the streaming channel
    //    var gameUser = newMember;
    //    var gameName = newMember.presence.game.name;
    //    var gameURL = newMember.presence.game.url;
    //    var gameDetails = newMember.presence.game.details;
        
    //    client.channels.find(c => c.name == "announcements").send(`**<:twitch:549289944883920896> ${gameUser} is now streaming!** <:twitch:549289944883920896>\n${gameName}\n${gameDetails}\n${gameURL}\n <@&549314930839519232>`).catch(console.error);

        //client.channels.find(c => c.name == config.streamChannel).send(`**<:twitch:549289944883920896> ${gameUser} is now streaming!** <:twitch:549289944883920896>\n${gameName}\n${gameDetails}\n${gameURL}\n <@&549314930839519232>`).catch(console.error);
    //} else if (newMember.presence.game.type != "1") {
         //remove the now live role
    //     var role = client.guilds.find(i => i.id == guild).roles.find(r => r.name == config.liveRole);
    //     newMember.removeRole(role);

         //delete from the streaming channel
   //      var myChannel = client.channels.find(c => c.name == "announcements");
         //var myChannel = client.channels.find(c => c.name == config.streamChannel);
    //     myChannel.fetchMessages({limit: 100})
    ///     .then ((messages) => {
    //         var amt = 10;     
    //         var filtered = messages.filter(m => m.content.includes(newMember)).array().slice(0, amt);     
    //         myChannel.bulkDelete(filtered).then(messages => console.log(`deleted ${messages.size} messages`)).catch(console.error);        
    //     }).catch(console.error); 
    //}

};
