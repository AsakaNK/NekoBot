/**
 * @author Lothaire Guée
 * @description
 *      Add a thread on each channel if the channel is allowed/present in the database
 *      in order to create a comments section on each message.
 */


/*      AUTHORISATION      */
const { Proposition } = require('../files/modules.js');


/*      IMPORTS      */
const { getSetupData } = require('../utils/enmapUtils');
const { EmbedBuilder } = require('discord.js');

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
async function proposition(message) {
    if (Proposition == false) return;
    if (message.author.bot) return;
    const PROPOSITION_ID = await getSetupData(message.channel.id, "proposition")
    if (PROPOSITION_ID != message.channel.id) return
    
    const exampleEmbed = new EmbedBuilder()
        .setColor(0x2F3136)
        .setTitle(`proposition de "${message.author.tag}"`)
        .addFields({ name: "Votes : ", value: '`✅` oui\n`⚪` neutre\n`❌` non', inline: true},
            { name: 'Proposition de : ', value: `<@${message.author.id}>`,inline: true })
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
        .setDescription(message.content)
        .setTimestamp()
        .setFooter({ text: 'NekoBot', iconURL: message.client.user.avatarURL(),  });
    
    message.channel.send({ embeds: [exampleEmbed] }).then(msg => {
        msg.react('✅')
        msg.react('⚪')
        msg.react('❌')
        msg.startThread({
            name: "Thread pour débattre.", //sur la proposition de " + message.author.username,
            autoArchiveDuration: 1440,
        });
    })
    message.delete()
    
}

module.exports = {
    proposition,
}