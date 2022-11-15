const { EmbedBuilder } = require('discord.js');
module.exports = {

    name: 'say',
    aliases: ['falar'],
    description: "Faça eu falar!",
    usage: 'mw!say <texto>',
    category: 'Bot',
    cooldown: 3000,
	userPerms: ['ManageMessages'],
	botPerms: ['ManageMessages'],

	run: async (client, message, args) => {
        let msg = args.join(" ");
    let msg2 = args.slice(1).join(" ");
    let chat = message.mentions.channels.first() || client.channels.cache.get(args[0]);
    let descricao = args.slice(3).join(" ");
    let cor = args[2];
    let tipo = args[1];

    
if (!chat){

    if (!msg) return message.reply({
      content: `Você não especificou a sua mensagem.`
    }).then(msg3 => {
      setTimeout(() => {
        msg3.delete()
      }, 6000)
    })

    message.delete()
    message.channel.send({content: `${msg}`})
	} else {

if (!msg2) return message.reply({
      content: `Você não especificou a sua mensagem.`
    }).then(msg4 => {
      setTimeout(() => {
        msg4.delete()
      }, 6000)
    })

message.react("✅")

if (tipo === "embed"){
  chat.send({
    embeds: [
      new EmbedBuilder()
      .setDescription(`${descricao}`)
      .setColor(`${cor}`)
    ]
  })
} else {

    chat.send({content: `${msg2}`})
  }
}

    
  }
};
