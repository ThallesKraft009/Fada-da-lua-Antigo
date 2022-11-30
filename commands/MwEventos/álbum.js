const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');

const { QuickDB } = require("quick.db");
const db = new QuickDB();

const tempo = require("ms");

module.exports = {
    name: 'album',
    aliases: [''],
    description: "",
    usage: '',
    category: '',
    cooldown: 5000,
  	userPerms: [''],
	  botPerms: [''],

	run: async (client, message, args) => {
        



    let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`figurinhasComum_${message.author.id}`)
					.setLabel('Comum')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
      new ButtonBuilder()
					.setCustomId(`figurinhasIncomum_${message.author.id}`)
					.setLabel('Incomum')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
      new ButtonBuilder()
					.setCustomId(`figurinhasRaro_${message.author.id}`)
					.setLabel('Raro')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
      new ButtonBuilder()
					.setCustomId(`figurinhasEpico_${message.author.id}`)
					.setLabel('Epico')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
      new ButtonBuilder()
					.setCustomId(`figurinhasLendadio_${message.author.id}`)
					.setLabel('Lendario')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
			);

    
message.reply({content: `<a:Doguinhu:795105130311712829> | Quais tipo de figurinhas você quer ver?`, components: [botao]})
        
    
	}
};
