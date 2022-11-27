/**
 * @author Lothaire Guée
 * @description
 *      Traquer un gibier banni. 
 */

const { banLogs } = require("../modules/logs")




/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'guildBanAdd' is emitted.
 * @param guild The guild in which the ban is
 * @param reason The reason for the ban
 * @param user The user this ban applies to
 */
async function execute( guildBan, client ) { 
	banLogs(guildBan, client)
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildBanAdd",
	execute
}