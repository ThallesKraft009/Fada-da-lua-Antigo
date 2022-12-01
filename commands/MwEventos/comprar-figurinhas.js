const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: "comprar-figurinhas",
  aliases: [],
  description: "",
    usage: '',
    category: 'Evento',
    cooldown: 60000,
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

    if (userdb.rpg.money < 500) return message.reply({
      content: `Você ter 500 mini moedas...`
    })

let botaoAbrir = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`comprar1_${message.author.id}`)
					.setLabel('Comprar 1')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`comprar2_${message.author.id}`)
					.setLabel('Comprar 5')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`comprar3_${message.author.id}`)
					.setLabel('Comprar 10')
					.setStyle(ButtonStyle.Secondary)
          .setDisabled(false)
			);

message.reply({
  content: `${message.author} | Quantas figurinhas você quer comprar?`,
  components: [botaoAbrir]
})
    
  }
                                            }
