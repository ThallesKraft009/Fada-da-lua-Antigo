const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: "abrir-pacote",
  aliases: [],
  description: "",
    usage: '',
    category: 'Evento',
    cooldown: 5000,
  	userPerms: [''],
	  botPerms: [''],

  run: async(client, message, args) => {

    const userdb = await client.userdb.findOne({
         userID: message.author.id
     }) 

      if(!userdb){
         const newuser = new client.userdb({ userID: message.author.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: message.author.id })
      }

    /*
    figurinhas: {
    total: { type: Number, default: 0 },
    comum: { type: Number, default: 0 },
    incomum: { type: Number, default: 0 },
    raro: { type: Number, default: 0 },
    epico: { type: Number, default: 0 },
    lendario: { type: Number, default: 0 },
  },
    */

    if (userdb.figurinhas.total < 1) return message.reply({
      content: `Você precisa de pelo menos 1 pacote de figurinhas....`
    })

let botaoAbrir = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`figurinhas_${message.author.id}`)
					.setLabel('Abrir pacote de Figurinhas')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
			);

message.reply({
  content: `${message.author} | Abra um pacote apertando no botão!\n> Comum - 50%\n> Incomum -  20%\n> Raro - 15%\n> Épico - 10%\n> Lendário - 5%`,
  components: [botaoAbrir]
})
    
  }
}
