const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'coletar-madeira',
    aliases: ['rpg-coletar-madeira'],
    description: "Colete blocos de madeira!",
    usage: 'mw!coletar-madeira',
    category: 'Rpg',
    cooldown: 3000,
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
					.setCustomId(`madeira_${message.author.id}`)
					.setLabel(' - Coletar Madeira')
          .setEmoji("🔨")
					.setStyle(ButtonStyle.Secondary)
			);

message.reply({
  content: `${message.author}`,
  embeds: [
    new EmbedBuilder()
    .setDescription(`Para coletar madeira, clique no botão!`)
    .setColor("Blue")
  ],
components: [botao]
})
    
	}
};

  
