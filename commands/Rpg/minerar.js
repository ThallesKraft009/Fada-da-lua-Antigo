const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'minerar',
    aliases: ['rpg-minerar'],
    description: "Minere vários minérios!",
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

if (userdb.rpg.d === "Horas" || userdb.rpg.d === "Nether") return message.reply({
  content: `:x: | Você não está em Miras...`
})

    let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${message.author.id}`)
					.setLabel(' - Iniciar')
          .setEmoji("⛏")
					.setStyle(ButtonStyle.Success)
			);

    message.reply({
      content: `⛏ | Vamos minerar!\n> Para iniciar a sua mineração, clique no botão!`,
      components: [botao]
    })
    
	}
};
