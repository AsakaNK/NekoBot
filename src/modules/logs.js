/**
 * @author 
 * @description
 * 		les logs pour savoir tout ce qu'on fait sur le serveur
 *
 */


/*      AUTHORISATION      */
const { Logs } = require('../files/modules.js');

/*      IMPORTS      */
const { getSetupData } = require("../utils/enmapUtils");
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function banLogs(guildBan , client){
    if(Logs == false) return;

    const LOGS_ID = await getSetupData(guildBan.guild.id, "logs")
    if(LOGS_ID == undefined || LOGS_ID == null) return;
    const logsChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)
    const logsBanEmbed = new EmbedBuilder()
    .setColor(0xFF0000)
    .setAuthor({ name: guildBan.user.tag, iconURL: guildBan.user.avatarURL() })
    .setDescription( `${guildBan.user.tag} a été bannis de Neko Paradise`)
    .setTimestamp()
    .addFields({name: "Date :", value: `<t:${Date.now().toString().slice(0,-3)}:R>` });

    guildBan = await guildBan.fetch({force: true})
    if(guildBan.reason != undefined){
        logsBanEmbed.addFields({name: 'Raison :', value: guildBan.reason })
    }

    logsChannel.send({ embeds: [logsBanEmbed] })

}

async function kickLogs(member, client){
    if(Logs == false) return;

    const LOGS_ID = await getSetupData(member.guild.id, "logs")
    if(LOGS_ID == undefined || LOGS_ID == null) return;
    const logsChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)
   
    const logsKickEmbed = new EmbedBuilder()
    .setColor(0x2F3136)
    .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL() })
    .setDescription( `${member.user.tag} a quitté Neko Paradise`)
    .setTimestamp()
    .addFields({name: "Date :", value: `<t:${Date.now().toString().slice(0,-3)}:R>` });


    logsChannel.send({ embeds: [logsKickEmbed] })

}

async function newMemberLogs(member, client){
    if(Logs == false) return;

    const LOGS_ID = await getSetupData(member.guild.id, "logs")
    if(LOGS_ID == undefined || LOGS_ID == null) return;
    const logsChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)
   
    const logsNewMemberEmbed = new EmbedBuilder()
    .setColor(0x00FF00)
    .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL() })
    .setDescription( `${member.user.tag} a rejoint Neko Paradise`)
    .setTimestamp()
    .addFields({name: "Date :", value: `<t:${Date.now().toString().slice(0,-3)}:R>` });


    logsChannel.send({ embeds: [logsNewMemberEmbed] })

    // fichier userEntries 
    const path = process.cwd() + "/files/userEntries.log"
    const memberLine = `${member.id} - ${new Date()} (${Date.now()})\n`;
    const startingFile =
    "╭――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――╮\n" +
    "|   ID MEMBER      |                   DATE                                            (timestamp)   |\n" +
    "╰――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――╯\n\n";
    var fs = require('fs');

    if (fs.existsSync(path)) {
        fs.appendFile(process.cwd() + "/files/userEntries.log", `${memberLine}\n`, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    
    }else {
        fs.appendFile(process.cwd() + "/files/userEntries.log", `${startingFile}\n${memberLine}`, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file has been created!");
        }); 
    }
   
}


module.exports ={
    banLogs,
    kickLogs,
    newMemberLogs,
}