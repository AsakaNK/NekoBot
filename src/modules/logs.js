/**
 * @author 
 * @description
 * 		
 *
 */


/*      AUTHORISATION      */
const { Logs } = require('../files/modules.js');

/*      IMPORTS      */
const { getSetupData } = require("../utils/enmapUtils");
const { EmbedBuilder } = require('discord.js');

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function banLogs(guildBan , client){
    if(Logs == false) return;

    const LOGS_ID = await getSetupData(guildBan.guild.id, "logs")
    if(LOGS_ID == undefined || LOGS_ID == null) return;
    console.log(LOGS_ID)
    const logsChannel = await client.channels.cache.find(channel => channel.id === LOGS_ID)
    console.log(logsChannel)
    const logsEmbed = new EmbedBuilder()
    .setColor(0x2F3136)
    .setTitle(`ceci est un test`)
    
    logsChannel.send({ embeds: [logsEmbed] })

}

module.exports ={
    banLogs,
}