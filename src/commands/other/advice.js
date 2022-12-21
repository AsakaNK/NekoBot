/**
 * @author Luna Nekomimi
 * @description
 *      Contient la commande 'advice'.
 *      conseil the user.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Advice } = require("../../files/modules");
const { advice } = require("../../utils/enmapUtils.js");
/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("advice")
    .setDescription(
        "[Aide] Te donne un conseil super utile pour ta vie"
    )
    .setDefaultPermission(false);

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * 
 * Fonction appelé quand la commande est 'advice'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */

async function execute(interaction) {
    if (Advice == false) {
        await interaction.reply({
            content: "La commande est désactivée. Veillez réesayer plus tard",
            ephemeral: true,
        })
        return;
    }
    
    await interaction.reply({
        content: await advice.randomKey(),
        ephemeral: true,
    });
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};