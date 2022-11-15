
const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
    name: 'ajuda',
    aliases: ['help'],
    description: "Veja meus comandos!",
    usage: '',
    category: 'Bot',
    cooldown: 5000,
  	userPerms: [''],
	  botPerms: [''],

	run: async (client, message, args) => {


const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId(`help_${message.author.id}`)
					.setPlaceholder('Veja as cartegorias')
					.addOptions(
						{
							label: 'Moderação',
							description: 'Meus comandos de Moderação',
              
							value: '1',
						},
						{
							label: 'RPG',
							description: 'Veja meus comandos de Rpg',

							value: '2',
						},{
              label: "Bot",
              description: "Veja comandos relacionados a eu",
              value: '3'
            },{
              label: "Utilidades",
              description: "Comandos de utilidades",
              value: '4'
            }
					),
			);

  message.reply({ content: `${message.author}`, embeds: [
    new EmbedBuilder()
    .setDescription(`>>> :wuewuewue: Olá ${message.author}, meu nome é **Fada da lua** e eu sou apenas um simples bot desse servidor Incrível! <:colaxao:865742039227564042>

<a:bop:788210473454796861> Sou um bot desenvolvido pelo <@882913524291088384> para o servidor **Mini World Creata em Português** com várias funções, tipo, funções de **(🏓)**Utilidades, de **(🎉)**Mini Games||Principalmente o **Mini RPG**, vai no <#1000553431381065798>!||, de **(👤)**sociais etc...

🎃 Mês do Halloween!! O bot está com várias novidades de Halloween! 😄

1️⃣ **Ajuda no bot**
 Qualquer duvida pergunte no <#751536512453181562> ou chama o desenvolvedor do bot!||<@882913524291088384> ||

**2️⃣ Regras**
Respeite as regras do Servidor <#751536503322181732>, as regras do servidor conta no bot também hein.

3️⃣ **Comandos**
 Por fim, para ver a lista de comandos clica na barra à baixo e clica em uma categoria para ver os comandos da categoria!!`)
    .setColor("#810cec")
    .setThumbnail(`${message.author.displayAvatarURL({ format: 'png' })}`)
  ], components: [row] }).then(msg => {
    const filtro = (i) => 
              i.customId == `help_${message.author.id}`
        
            const coletor = message.channel.createMessageComponentCollector({
              filtro
            });  

            coletor.on('collect', async (collected) => {

              let valor = collected.values[0]
              collected.deferUpdate()

    if (valor === "1"){
      msg.edit({
        content: `${message.author}`,
        embeds: [
          new EmbedBuilder()
          .setThumbnail(`${message.author.displayAvatarURL({ format: 'png' })}`)
          .setTitle(`**Cartegoria: Moderação**`)
          .setDescription(`${getCmd(client, 'Mod')}\n\n${getCmd(client, 'Admin')}`)
          .setColor("Red")
        ]
      })
    }
if (valor === "2"){
  msg.edit({
    content: `${message.author}`,
    embeds: [
      new EmbedBuilder()
      .setThumbnail(`${message.author.displayAvatarURL({ format: 'png' })}`)
      .setTitle(`**Cartegoria: Rpg**`)
      .setDescription(`${getCmd(client, "Rpg")}\n\n${getCmd(client, "Ranks")}`)
      .setColor("Green")
    ]
  })
}
if (valor === "3"){
  msg.edit({
    content: `${message.author}`,
    embeds: [
      new EmbedBuilder()
    .setThumbnail(`${message.author.displayAvatarURL({ format: 'png' })}`)
      .setTitle(`**Cartegoria: Bot**`)
      .setDescription(`${getCmd(client, "Bot")}`)
      .setColor("Blue")
    ]
  })
}
              if (valor === "4"){
  msg.edit({
    content: `${message.author}`,
    embeds: [
      new EmbedBuilder()
      .setThumbnail(`${message.author.displayAvatarURL({ format: 'png' })}`)
      .setTitle(`**Cartegoria: Utilidades**`)
      .setDescription(`${getCmd(client, "Util")}`)
      .setColor("Green")
    ]
  })
}
                
              
            })
  })
	

	}
};

function getCmd(bot, cartegoria){

  let allCommands = bot.commands

let commands = allCommands.filter(command => command.category === cartegoria)

return commands.map(cmd => `> • **${cmd.name}** -  \`${cmd.description}\``).join("\n\n  ")

  
}
