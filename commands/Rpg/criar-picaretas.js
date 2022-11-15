const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'criar-picareta',
    aliases: ['rpg-criar-picareta'],
    description: "Crie picaretas!",
    usage: '',
    category: 'Rpg',
    cooldown: 5000,
  	userPerms: [''],
	  botPerms: [''],

	run: async (client, message, args) => {
        
const userdb = await client.userdb.findOne({
         userID: message.author.id
     }) 

      if(!userdb){
         const newuser = new client.userdb({ userID: message.author.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: message.author.id })
     }

   let uid = userdb.uid;
    if (uid === null) return message.reply({content: `Você não salvou seu uid, salve utilizando \`mw!set-uid\`!`}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 7000)
    })

    if (userdb.rpg.mundoStatus === false) return message.reply({content: `Você precisa criar um mundo!`}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 7000)
    })

    let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`picaretaPedra_${message.author.id}`)
					.setLabel('Pedra')
					.setStyle(ButtonStyle.Secondary),
new ButtonBuilder()
					.setCustomId(`picaretaCobre_${message.author.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
					.setCustomId(`picaretaFerro_${message.author.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Secondary),
new ButtonBuilder()
					.setCustomId(`picaretaTitanio_${message.author.id}`)
					.setLabel('Titanio')
					.setStyle(ButtonStyle.Secondary),

			);

message.reply({
  content: `${message.author} | Qual picareta você quer criar?`,
  components: [botao]
})

    
	}
};
