const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'criar-gravetos',
    aliases: ['rpg-criar-gravetos'],
    description: "Crie gravetos",
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

let quantidadeA = args.join(" ");

    if (!quantidadeA) return message.reply({content: `Você precisa especificar a quantidade de gravetos que você quer criar...`}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 7500)
    })

    if (userdb.rpg.mundoStatus === false) return message.reply({content: `Você precisa criar um mundo!`}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 7000)
    })
    

    let quantidade = Number(quantidadeA) + 1

    if (userdb.rpg.blocos.madeira < quantidade) {
      message.reply({
        content: `:x: | Você não tem **\`${quantidade - 1}\`** blocos de madeiras para criar **\`${quantidade}\`** gravetos!`
      })
    } else {

      await client.userdb.updateOne({
         userID: message.author.id
     }, { $set: {
       "rpg.blocos.madeira": userdb.rpg.blocos.madeira - quantidade - 1,
        "rpg.item.graveto": userdb.rpg.item.graveto + quantidade
         }
        })


      message.reply({
        content: `<:YAY:753572428449448086> | Você criou **\`${quantidade}\`** gravetos!!`
      })
    }
    
	}
};
