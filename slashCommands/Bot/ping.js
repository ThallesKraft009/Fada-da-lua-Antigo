const { ApplicationCommandType } = require('discord.js');

//γγ

module.exports = {
	name: 'ping',
	description: "γπ€γVeja o meu ping",
  description_localizations: ({
    'en-US': 'γπ€γSee my ping',
    'pt-BR': 'γπ€γVeja meu ping',
    'es-ES': 'γπ€γver mi latencia'
  }),
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {

    let pingg = Date.now() - interaction.createdTimestamp

    
interaction.reply({
  content: `Ping?`
})

  setTimeout( async() => {
    await interaction.editReply({
      content: `π Pong!\n Gateway Ping:**\`${client.ws.ping}ms\`**\n API Ping: **\`${pingg}\`**`
    })
  }, 1200)

    
	}
}
