const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'update',
    aliases: [''],
    description: "Atualize suas habilidades",
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
					.setCustomId(`updateFornalha_${message.author.id}`)
					.setLabel('Fornalha')
					.setStyle(ButtonStyle.Secondary),
new ButtonBuilder()
					.setCustomId(`updateMadeira_${message.author.id}`)
					.setLabel('Coletas')
					.setStyle(ButtonStyle.Secondary)

			);

message.reply({
  content: `Aumente o nível dos sistemas RPG!`,
        components: [botao]
})

    

    
	}
};
