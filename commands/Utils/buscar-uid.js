const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'uid',
    aliases: ['rpg-uid-buscar'],
    description: "Veja o UID de alguém",
    usage: '',
    category: 'Util',
    cooldown: 5000,
  	userPerms: [''],
	  botPerms: [''],

	run: async (client, message, args) => {

    let userMention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if (!userMention) return message.reply({content: `:x: | Você não mencionou ou inseriu o ID de algum usuário...`}).then(msg => {
  setTimeout(() => {
    msg.delete()
  }, 7000)
})
    
    let user = client.users.cache.get(userMention.id)

const userdb = await client.userdb.findOne({
         userID: user.id
     }) 

      if(!userdb){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: user.id })
     }


if (userdb.uid === null){
   message.reply({
     content: `Não achei o uid de **\`${user.username}\`** <:Sad_cat3:757603353311182898>`
   })
} else {
  message.reply({
    content: `O uid de **\`${user.username}\`** é **\`${userdb.uid}\`**!`
  })
}


	}
};
