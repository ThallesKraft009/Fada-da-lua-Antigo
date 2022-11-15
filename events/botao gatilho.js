const client = require('..')
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const Discord = require("discord.js");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;


if (interaction.customId === `jogador_${interaction.user.id}`){


  interaction.reply({
    embeds: [
      new EmbedBuilder()
      .setDescription(` • Veja os eventos de jogadores abaixo e para saber a explicação, use o comando abaixo.\n\n${getGatilho(client, "Gatilho-Evento-Jogador")}`)
      .setAuthor({ name: `${interaction.user.tag}`, iconURL: `  ${interaction.user.displayAvatarURL({ format: 'png' })}`})
    .setColor("Blue")
    ],
      ephemeral: true
  })
}


  
if (interaction.customId === `eventos_${interaction.user.id}`) {


let botao1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`munndo_${interaction.user.id}`)
					.setLabel('Mundo')
					.setStyle(ButtonStyle.Secondary)
.setDisabled(true),
  new ButtonBuilder()
  .setCustomId(`logicaDoJogo_${interaction.user.id}`)
					.setLabel('Logica do jogo')
					.setStyle(ButtonStyle.Secondary)
  .setDisabled(true),
new ButtonBuilder()

  .setCustomId(`jogador_${interaction.user.id}`)
					.setLabel('Jogador')
					.setStyle(ButtonStyle.Secondary),
			);


let botao2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`criatura_${interaction.user.id}`)
					.setLabel('Criatura')
					.setStyle(ButtonStyle.Secondary)
  .setDisabled(true),
  new ButtonBuilder()
  .setCustomId(`bloco_${interaction.user.id}`)
					.setLabel('Bloco')
					.setStyle(ButtonStyle.Secondary)
  .setDisabled(true),
new ButtonBuilder()

  .setCustomId(`item_${interaction.user.id}`)
					.setLabel('Item')
					.setStyle(ButtonStyle.Secondary)
  .setDisabled(true)
			);

  let botao3 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`efeitoEspecial_${interaction.user.id}`)
					.setLabel('Efeito Especial')
					.setStyle(ButtonStyle.Secondary)
    .setDisabled(true),
  new ButtonBuilder()
  .setCustomId(`receita_${interaction.user.id}`)
					.setLabel('Receita')
					.setStyle(ButtonStyle.Secondary)
    .setDisabled(true),
new ButtonBuilder()

  .setCustomId(`fundir_${interaction.user.id}`)
					.setLabel('Fundir')
					.setStyle(ButtonStyle.Secondary)
    .setDisabled(true)
			);
  
  //let botoes = [botao1, botao2];

interaction.reply({
  content: `Qual a cartegoria de eventos?`,
  components: [botao1, botao2, botao3],
  ephemeral: true
})

  
}
})


function getGatilho(bot, cartegoria){

  let gatilhos = bot.commands

let commands = gatilhos.filter(command => command.category === cartegoria)

return commands.map(cmd => `**__${cmd.gatilho}__** = \`mw!${cmd.aliases}\``).join("\n\n  ")

  
}
