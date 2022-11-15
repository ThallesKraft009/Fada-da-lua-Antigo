const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const time = require("ms");

module.exports = {
    name: 'castigar',
    aliases: ['timeout'],
    description: "Coloque um usuário na Ausência",
    usage: 'mw!castigar <user> <time> <motivo>',
    category: 'Mod',
    cooldown: 3000,
  	userPerms: ['KickMembers'],
	  botPerms: [''],

	run: async (client, message, args) => {

let userMention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let tempoString = args[1]
let motivoString = args.slice(2).join(" ");

  if (!userMention) return message.reply({content: `Mencione ou insira o ID do usuário...\n \`mw!castigar <user> <time> <reason>\``}).then(msg => {
    setTimeout(() => {
      msg.delete()
    }, 15000)
  })

    if (!tempoString) return message.reply({content: `Insira o tempo exemplo: 1s, 1m, 1h, 1d...\n \`mw!castigar <user> <time> <reason>\``}).then(msg => {
    setTimeout(() => {
      msg.delete()
    }, 15000)
  })

    if (motivoString === null) motivoString = "Sem motivo"

    let user = message.guild.members.cache.get(userMention.id);

   let tempo = time(tempoString);

  let motivo = `Punido por ${message.author.tag} --- Motivo: ${motivoString}`;

    let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`timeout_${message.author.id}`)
					.setLabel('Confimar')
          .setEmoji("✅")
					.setStyle(ButtonStyle.Primary)
			);
let usuario = client.users.cache.get(userMention.id);
              message.reply({content: `Você quer castigar o usuário \`${usuario.tag}\` por \`${tempoString}\`?`, components: [botao]}).then(msg => {
                const filter = i => i.customId === `timeout_${message.author.id}` && i.user.id === message.author.id;

const collector = message.channel.createMessageComponentCollector({ filter, time: 50000, max: 1 });

collector.on('collect', async i => {

if (usuario.id === message.author.id){

  msg.edit({
    content: `Você não pode se auto-castigar!`,
  components: []
  }).then(msg => {
    setTimeout(() => {
    msg.delete()
  }, 7000)
  })

} else {
  
	msg.edit({
    content: `✅ | ${usuario.tag} foi castigado por ${tempoString}!`,
    components: []
  }).then(() => {
    user.timeout(tempo, motivo).catch(err => {
      msg.edit({
        content: `Não consegui castigar esse usuário...\`\`\`js
        ${err}
\`\`\``
      })
    })
  })
}
});
              })
    
    
	}
};
