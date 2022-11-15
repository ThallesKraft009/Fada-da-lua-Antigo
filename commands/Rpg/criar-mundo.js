const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'criar-mundo',
    aliases: ['iniciar-rpg'],
    description: "Inicie seu mundo Rpg!",
    usage: 'mw!criar-mundo <nome>',
    category: 'RPG',
    cooldown: 3000,
  	userPerms: [''],
	  botPerms: [''],

	run: async (client, message, args) => {
        
let mundo = args.join(" ");

    if (!mundo) return message.reply({content: `Você não inseriu o nome de seu mundo...`}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 7000)
    })

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

    if (userdb.rpg.mundoStatus === true) return message.reply({content: `Você já tem 1 mundo criado!`}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 7000)
    })

          let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`roleta_${message.author.id}`)
					.setLabel('Roleta')
          .setEmoji("🎁")
					.setStyle(ButtonStyle.Primary)
			);

await client.userdb.updateOne({
         userID: message.author.id
     }, { $set: {
         "rpg.mundo": mundo,
         "rpg.mundoStatus": true
         }
        })
            
      message.reply({
        content: `Seu mundo foi criado! Aperte o botão "Roleta" para receber 1 item inicial aleatoriamente!`,
        components: [botao]
      }).then(msg => {
        const filter = i => i.customId === `roleta_${message.author.id}` && i.user.id === message.author.id;

const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });

collector.on('collect', async i => {


let premios = ["Madeiras", "Madeiras", "Pedras", "Madeiras", "Rochas", "Gravetos"];
  let sorteio_number = Math.floor(Math.random() * 2) + 35

  let database = ``;
  if (premios === "Madeiras") database = `rpg.blocos.madeira`;
  if (premios === "Pedras") database = `rpg.blocos.pedra`;
  if (premios === "Gravetos") database = `rpg.item.graveto`;


  await client.userdb.updateOne({
         userID: message.author.id
     }, { $set: {
         database: sorteio_number
         }
        })

let sorteio_item = premios[Math.floor(Math.random() * premios.length)];
  
  msg.reply({content: `Girando a roleta!`}).then(roleta => {
    setTimeout(() => {
      roleta.edit({content: `${message.author} Parabéns! Como item inicial, Você ganhou ${sorteio_number} ${sorteio_item}!`})
    })
  })
});
      })
    }
   
};
