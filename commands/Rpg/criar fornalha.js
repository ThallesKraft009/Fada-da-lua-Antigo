const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'criar-fornalha',
    aliases: ['rpg-criar-fornalha'],
    description: "Crie uma fornalha de pedra!",
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

if (userdb.rpg.item.fornalha === null){
    if (userdb.rpg.blocos.pedra < 10) return message.reply({content: `:x: | Você precisa ter pelo menos 10 rochas/pedras para criar uma fornalha!`}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 7000)
    })


  message.reply({
    content: `✅ | Fornalha criada! Para fundir minérios, use **\`mw!usar-fornalha\`**!`
  })

    await client.userdb.updateOne({
         userID: message.author.id
     }, { $set: {
         "rpg.item.fornalha": "pedra",
         "rpg.blocos.pedra": userdb.rpg.blocos.pedra - 10
         }
        })
  } else {
  message.reply({content: "Você já tem 1 fornalha!"})
  }
    
	}
};
