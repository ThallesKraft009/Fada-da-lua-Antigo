const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'ban',
    aliases: ['banir'],
    description: "Banir alguém",
    usage: '',
    category: 'Mod',
    cooldown: 3000,
  	userPerms: ['BanMembers'],
	  botPerms: ['BanMembers'],

	run: async (client, message, args) => {
        
let userMention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

let motivoString = args.slice(1).join(" ");

if (!userMention) return message.reply({
  content: `Você não mencionou ou inseriu o ID do usuário.. `
}).then(msg => {
  setTimeout(() => {
    msg.delete()
  }, 7000)
})



if (motivoString === null) motivoString = "Não definido";

    let motivo = `Banido por ${message.author.tag} - Motivo: ${motivoString}`;

    let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`ban_${message.author.id}`)
					.setLabel('Confimar')
          .setEmoji("✅")
					.setStyle(ButtonStyle.Primary)
			);

    let user = message.guild.members.cache.get(userMention.id);

    let usuario = client.users.cache.get(userMention.id);

    message.reply({
      content: `Você quer realmente banir o usuário **\`${usuario.tag}\`**?`,
      components: [botao]
    }).then(msg => {
      const filter = i => i.customId === `ban_${message.author.id}` && i.user.id === message.author.id;

const collector = message.channel.createMessageComponentCollector({ filter, time: 50000, max: 1 });

collector.on('collect', async i => {

  if (usuario.id === message.author.id){
    msg.edit({
      content: `Você não pode se auto-banir!`,
      components: []
    }).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 7000)
    })
  } else {
  
	msg.edit({
    content: `✅ | ${usuario.tag} foi banido!`,
    components: []
  }).then(() => {
    user.ban({ reason: motivo }).catch(err => {
      msg.edit({
        content: `Não conseguir banir o usuário  ${usuario.tag}...\`\`\`js
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
