const fs = require('fs');
const chalk = require('colors');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')

const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Slash Commands', 'Status').setBorder('|', '=', "0", "0")

const config = require("../configs/config.json")
  const TOKEN = config.token;
const CLIENT_ID = config.client_id;


const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = (client) => {
	const slashCommands = []; 

	fs.readdirSync('./slashCommands/').forEach(async dir => {
		const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

		for(const file of files) {
				const slashCommand = require(`../slashCommands/${dir}/${file}`);
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
description_localizations: slashCommand.description_localizations,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
					default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
					default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
				});
			
				if(slashCommand.name) {
						client.slashCommands.set(slashCommand.name, slashCommand)
						table.addRow(file.split('.js')[0], '✅')
				} else {
						table.addRow(file.split('.js')[0], '⛔')
				}
		}
		
	});
	console.log(chalk.red(table.toString()));

	(async () => {
			try {

        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
	.then(() => console.log(chalk.blue('SlashCommands deletados!')))
	.catch(console.error)


				await rest.put(
	client.config.GUILD_ID ?
					Routes.applicationGuildCommands(CLIENT_ID, client.config.GUILD_ID) :
				
					Routes.applicationCommands(CLIENT_ID), 
					{ body: slashCommands }
      );
				console.log(chalk.yellow('Slash Commands registrados!'))
			} catch (a){
    console.log(a)
  }
  
})();
};
