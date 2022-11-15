const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');

const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'vender',
    aliases: [''],
    description: "Venda Itens por MiniMoeda",
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
    let money = Number(`${total}`);

  if (!money) return message.reply({content: `:x: | Você precisa especificar quantos itens quer vender.`}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 7000)
    })

    //



await db.set(`trocar_${message.author.id}`, `${money}`)


        let botao = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
					.setCustomId(`trocarMadeira_${message.author.id}`)
					.setLabel('Madeira')
					.setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
					.setCustomId(`trocarPedra_${message.author.id}`)
					.setLabel('Pedra')
					.setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
					.setCustomId(`trocarCobre_${message.author.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
					.setCustomId(`trocarFerro_${message.author.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
					.setCustomId(`trocarTitanio_${message.author.id}`)
					.setLabel('Titanio')
					.setStyle(ButtonStyle.Secondary)
			);

const img = new AttachmentBuilder("https://cdn.discordapp.com/attachments/1028756005556846632/1037360264229687316/kmc_20221102_103400.jpg", {name: 'vender.png'}) 
    
    message.reply({
      content: `💎 | ${message.author}`,
      components: [botao],
      files: [img]
    })
	}
};
