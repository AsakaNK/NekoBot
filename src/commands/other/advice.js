/**
 * @author Luna Nekomimi
 * @description
 *      Contient la commande 'advice'.
 *      conseil the user.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Advice } = require("../../files/modules");

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
            content: "Cheh t'es nul",
            ephemeral: true,
        })
        return;
    }
    let advice = ["Tu veux des neko ? Viens sur Neko Paradise", "azerty", "uiop"];
    let randomValue = Math.floor(Math.random() * advice.length);

    await interaction.reply({

        content: advice[randomValue],
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