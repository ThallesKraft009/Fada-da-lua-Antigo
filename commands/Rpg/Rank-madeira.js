const Discord = require("discord.js")
const Canvas = require("canvas")
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { registerFont } = require('canvas')
registerFont('././osvaldo.ttf', { family: 'osvaldo' })

module.exports = {
  name: "rank-madeira",
  aliases: [''],
    description: "Veja o rank de madeira",
    usage: '',
    category: 'Ranks',
    cooldown: 5000,
  	userPerms: [''],
	  botPerms: [''],
  
  run: async (client, message, args) =>{

    let usersDB = await client.userdb.find({})
    usersDB.sort((a,b) => b.rpg.blocos.madeira - a.rpg.blocos.madeira)
    usersDB = usersDB.slice(0,5)
    
    const canvas = Canvas.createCanvas(800, 600)
    const ctx = canvas.getContext("2d")
        
    const serverIcon = await Canvas.loadImage(message.guild.iconURL({ forceStatic: true, extension: "png", size: 1024 }))
    ctx.drawImage(serverIcon, 515, -102.5, 285, 285)
    
    const background = await Canvas.loadImage("https://i.imgur.com/wIiuWJP.png")
    ctx.drawImage(background, 0, 75, canvas.width, canvas.height)

    const layout = await Canvas.loadImage("https://i.imgur.com/RCBNEMa.png")
    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

    ctx.font = '33px osvaldo';
    ctx.fillStyle = '#F8F8F8';
    ctx.fillText(`${message.guild.name}`, 265 - message.guild.name.length * 8, 50)
    
    for(let i = 0; i < usersDB.length; i++){

    const user = await client.users.fetch(usersDB[i].userID)
     
    const cordenada = i * 105
    ctx.save()

    ctx.font = '40px osvaldo';
    ctx.fillStyle = '#F8F8F8';
    ctx.fillText(`${user.username}`, 290, cordenada + 115)
    ctx.font = '32px osvaldo';
    ctx.fillText(`${usersDB[i].rpg.blocos.madeira} madeiras`, 300, cordenada + 150)
    ctx.font = '24px osvaldo';
    ctx.fillText(`ID: ${user.id}`, 310, cordenada + 175)
     
    ctx.beginPath(); 
    ctx.moveTo(0, cordenada + 75);
    ctx.lineTo(265, cordenada + 75);
    ctx.lineTo(285, cordenada + 180);
    ctx.lineTo(0, cordenada + 180);
    ctx.lineTo(0, cordenada + 75);
    ctx.closePath(); 
    ctx.clip();

    const userAvatar = await Canvas.loadImage(`${user.displayAvatarURL({ forceStatic:true, extension: "png", size: 1024})}`) 
    ctx.drawImage(userAvatar, 0, cordenada, 285, 285)
    ctx.restore()
     }

let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`proximaPg_2_${message.author.id}`)
  .setEmoji("▶️")
					.setStyle(ButtonStyle.Secondary),
			);

message.reply({content: `<a:bop:788210473454796861>  | Carregando..`}).then(msg => {
    
    setTimeout(() => {
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'rankMadeira.png'}) 
    msg.edit({ content: `${message.author}`, files: [attachment], components: [botao] })
                    }, 1500)
  })
   }
}
