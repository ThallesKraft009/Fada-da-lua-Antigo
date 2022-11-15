const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'set-uid',
    aliases: ['rpg-uid'],
    description: "Salve seu Uid",
    usage: '',
    category: 'Util',
    cooldown: 5000,
  	userPerms: [''],
	  botPerms: [''],

	run: async (client, message, args) => {
        
let uidMsg = args.join(" ");

    if (!uidMsg) return message.reply({
      content: `Você não inseriu o uid...`
    })

    let uid = Number(uidMsg);

const userdb = await client.userdb.findOne({
         userID: message.author.id
     }) 

      if(!userdb){
         const newuser = new client.userdb({ userID: message.author.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: message.author.id })
     }


await client.userdb.updateOne({
         userID: message.author.id
     }, { $set: {
         "uid": uid
         }
        })

message.reply({
  content: `<a:bop:788210473454796861> | Uid salvo para \`${uid}\``
})


	}
};
