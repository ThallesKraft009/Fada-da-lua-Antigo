const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');

const { QuickDB } = require("quick.db");
const db = new QuickDB();

const tempo = require("ms");

module.exports = {
    name: 'explorar',
    aliases: [''],
    description: "Explore o mundo Rpg!",
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
					.setCustomId(`explorar_${message.author.id}`)
					.setLabel('Iniciar Exploração')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false)
			);

    let status = await db.get(`e_${message.author.id}`);

  if (status === "sim") return message.reply({
    content: `:x: | Você já está em uma aventura!`
  })

    
const img = new AttachmentBuilder("https://cdn.discordapp.com/attachments/893663610138685460/1037091539744202823/kmc_20221101_164457.jpg", {name: 'aventura.png'}) 
        
message.reply({content: `<a:Doguinhu:795105130311712829> | ${message.author}`, files: [img], components: [botao]})
        
      
    
	}
};
