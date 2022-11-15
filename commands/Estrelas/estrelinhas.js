const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'estrelinhas',
    aliases: ['estrela'],
    description: "Veja suas estrelas!",
    usage: '',
    category: 'Util',
    cooldown: 5000,
  	userPerms: [''],
	  botPerms: [''],

	run: async (client, message, args) => {

    
let userMention = message.mentions.members.first() || client.users.cache.get(args[0]) || message.author

let user = client.users.cache.get(userMention.id)
    
    let userdb = await client.userdb.findOne({
         userID: user.id
     }) 

      if(!userdb){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: user.id })
     }
    

    if (user === message.author){

      message.reply({
        content: `⭐ | Você tem ${userdb.estrelas} estrelinhas!`
      })
      
    } else {
      
message.reply({
  content: `⭐ | **\`${user.tag}\`** tem ${userdb.estrelas} estrelinhas!`
})
    }

    
	}
};
