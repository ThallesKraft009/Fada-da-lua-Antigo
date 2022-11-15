const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'usar-fornalha',
    aliases: [''],
    description: "Transforme blocos de minérios em minérios!",
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

    let total = args.join(" ");

    let numero = Number(`${total}`)

  if (!numero) return message.reply({
    content: `:x: | Você não especificou a quantidade de minérios a serem transformados...`
  }).then(msg => {
    setTimeout(() => {
      msg.delete()
    }, 7500)
  })
    

    if (userdb.rpg.minerios.carvao < numero) return message.reply({content: `Você não tem **\`${numero}\`** carvões!`}).then(msg => {
    setTimeout(() => {
      msg.delete()
    }, 7500)
  })

if (userdb.rpg.item.fornalha === null) return message.reply({content: `:x: | Você não tem uma fornalha!`}).then(msg => {
    setTimeout(() => {
      msg.delete()
    }, 7500)
  })

if (userdb.rpg.item.fornalha === "titanio"){
  await db.set(`fornalha_${message.author.id}`, `${numero}`)

  let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`assarCobre_${message.author.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Success),
    new ButtonBuilder()
					.setCustomId(`assarFerro_${message.author.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Success),
    new ButtonBuilder()
					.setCustomId(`assarTitanio_${message.author.id}`)
					.setLabel('Titanio')
					.setStyle(ButtonStyle.Success)
    )

  message.reply({
    content: `Qual minério você quer fundir?`,
    components: [botao]
  })
}

    
if (userdb.rpg.item.fornalha === "ferro"){
  await db.set(`fornalha_${message.author.id}`, `${numero}`)

  let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`assarCobre_${message.author.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Success),
    new ButtonBuilder()
					.setCustomId(`assarFerro_${message.author.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Success),
    new ButtonBuilder()
					.setCustomId(`assarTitanio_${message.author.id}`)
					.setLabel('Titanio')
					.setStyle(ButtonStyle.Success)
    )

  message.reply({
    content: `Qual minério você quer fundir?`,
    components: [botao]
  })
}


    

if (userdb.rpg.item.fornalha === "cobre"){
  await db.set(`fornalha_${message.author.id}`, `${numero}`)

  let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`assarCobre_${message.author.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Success),
    new ButtonBuilder()
					.setCustomId(`assarFerro_${message.author.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Success)
    )

  message.reply({
    content: `Qual minério você quer fundir?`,
    components: [botao]
  })
}
    
    if (userdb.rpg.item.fornalha === "pedra"){
//await db.set(`fornalha_${message.author.id}`, numero)

if (userdb.rpg.mineriosBloco.cobre < numero) return message.reply({content: `:x: | Você não tem tudo isso de blocos de cobre!`}).then(msg => {
    setTimeout(() => {
      msg.delete()
    }, 7500)
  })

  message.reply({content: `${message.author} | Aguarde 30s...estou transformando os blocos em minérios...`}).then(msg => {
    setTimeout( async() => {
      msg.reply({content: `${message.author} foram transformados ${numero} em minérios de cobre!`})


await client.userdb.updateOne({
         userID: message.author.id
     }, { $set: {
         "rpg.minerios.cobre": userdb.rpg.minerios.cobre + numero,
  "rpg.mineriosBloco.cobre": userdb.rpg.mineriosBloco.cobre - numero,
         }
        })
      
    }, 30000)
  })


}

        
	}
};
