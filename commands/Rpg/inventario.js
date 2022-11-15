const Discord = require("discord.js");

const Canvas = require("canvas");

const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const { registerFont } = require('canvas')
registerFont('././mw.ttf', { family: 'mw' })

module.exports = {
    name: 'inventario',
    aliases: ['inventário', 'status-rpg', 'minerios', 'itens'], 
    description: "Veja seu Inventário!",
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

  let vida = userdb.rpg.status.vida;
  let fome = userdb.rpg.status.fome;
  let xp = userdb.rpg.status.xp;
  let level = userdb.rpg.status.level;
  let moeda = userdb.rpg.money;


let canvas = Canvas.createCanvas(700, 420)
    let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/1028756005556846632/1036316112461238353/Screenshot_20221030-132505_Mini_World.jpg`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${vida}/100`, 210, 120, 70, 70);

    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${fome}/100`, 477, 120, 70, 70);

    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${xp}`, 200, 200, 70, 70);

  ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${level}`, 468, 200, 70, 70);

                                 
ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(moeda)}`, 200, 270, 70, 70);
    

    ctx.save()
//210, 130
    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'status.png'}) 
        

    let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
.setCustomId(`status_${message.author.id}`)
					.setLabel('Status')
					.setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
.setCustomId(`minerios_${message.author.id}`)
					.setLabel('Minerios')
					.setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
.setCustomId(`invP_${message.author.id}`)
					.setLabel('Picaretas')
					.setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
.setCustomId(`blocos_${message.author.id}`)
					.setLabel('Blocos e Itens')
					.setStyle(ButtonStyle.Secondary)
			);
//invP_
message.reply({
  content: `🗡 | Status de ${message.author}`,
  files: [attachment],
  components: [botao]
})

    
	}
};


function numero(number)
{
    number = number.toFixed(2) + '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
