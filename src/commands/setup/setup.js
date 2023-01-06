/* eslint-disable no-case-declarations */
/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'setup'.
 *      Allow admin to setup the JSON configuration file.
 */

/*      IMPORTS      */
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
    setupMemes,
    setupThread,
    setupWelcome,
    setupProposition,
    setupLogs,
} = require("../../utils/enmapUtils");

/*      AUTHORISATION      */
const { Setup } = require("../../files/modules.js");
const { client } = require("../../main");
const { PermissionFlagsBits } = require("discord.js");

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("setup")
    .setDescription("[setup] Setup une fonctionnalité du bot sur ce serveur.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
        subcommand
            .setName("memes")
            .setDescription(
                "Définir/Supprimer ce channel autorisable pour les memes."
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("thread")
            .setDescription("Définir ce channel autorisable pour les threads.")
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("welcome")
            .setDescription(
                "Définir/Supprimer le channel pour les bienvenus. (Il ne peut n'y en avoir qu'un)"
            )
    )
    .addSubcommand((subcommand) =>
    subcommand
        .setName("proposition")
        .setDescription(
            "Définir/Supprimer le channel pour les propositions. (Il ne peut n'y en avoir qu'un)"
        )
    )
    .addSubcommand((subcommand) =>
    subcommand
        .setName("logs")
        .setDescription(
        "Définir/Supprimer le channel pour les Logs. (Il ne peut n'y en avoir qu'un)"
        )
    )   


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    if (Setup == false) return;

    switch (interaction.options._subcommand) {
        case "memes":
            if (setupMemes.get(interaction.channel.id) === undefined) {
                setupMemes.set(interaction.channel.id, interaction.guild.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> ajouté à la liste des channels memes !`,
                    ephemeral: true,
                });
            } else {
                setupMemes.delete(interaction.channel.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> supprimé de la liste des channels memes !`,
                    ephemeral: true,
                });
            }
            break;
        case "thread":
            if (setupThread.get(interaction.channel.id) === undefined) {
                setupThread.set(interaction.channel.id, interaction.guild.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> ajouté à la liste des channels thread !`,
                    ephemeral: true,
                });
            } else {
                setupThread.delete(interaction.channel.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> supprimé de la liste des channels thread !`,
                    ephemeral: true,
                });
            }
            break;
        case "welcome":
            if (setupWelcome.get(interaction.guild.id) === undefined) {
                setupWelcome.set(interaction.guild.id, interaction.channel.id);
                await interaction.reply({
                    content: `Channel pour les bienvenus ajouté au serveur dans <#${interaction.channel.id}> !`,
                    ephemeral: true,
                });
            } else {
                setupWelcome.delete(interaction.guild.id);
                await interaction.reply({
                    content: `Channel pour les bienvenus supprimé du serveur !`,
                    ephemeral: true,
                });
            }
            break;
        case "proposition":
            if (setupProposition.get(interaction.channel.id) === undefined) {
                setupProposition.set(interaction.channel.id, interaction.guild.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> ajouté à la liste du channel proposition !`,
                    ephemeral: true,
                });
            } else {
                setupProposition.delete(interaction.channel.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> supprimé de la liste du channel proposition !`,
                    ephemeral: true,
                });
            }
            break;
        case "logs":
            if (setupLogs.get(interaction.guild.id) === undefined) {
                 setupLogs.set(interaction.guild.id, interaction.channel.id);
                 await interaction.reply({
                     content: `Channel pour les logs ajouté au serveur dans <#${interaction.channel.id}> !`,
                     ephemeral: true,
                });
            } else {
                 setupLogs.delete(interaction.guild.id);
                await interaction.reply({
                    content: `Channel pour les logs supprimé du serveur !`,
                    ephemeral: true,
                 });
            }
            break;
    }
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
