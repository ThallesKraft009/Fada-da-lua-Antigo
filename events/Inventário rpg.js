const Discord = require("discord.js");

const client = require('..');

const Canvas = require("canvas");

const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const { registerFont } = require('canvas')
registerFont('././mw.ttf', { family: 'mw' })



client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;

  const userdb = await client.userdb.findOne({
         userID: interaction.user.id
     }) 

      if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id})
        await  newuser.save();
         
         userdb = client.userdb.findOne({ userID: interaction.user.id })
     }

  if (interaction.customId === `status_${interaction.user.id}`){
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


await interaction.deferUpdate();

    interaction.editReply({
      content: `🗡 | Status de ${interaction.user}`,
      files: [attachment],
      embeds: []
    })
    
  }



  if (interaction.customId === `minerios_${interaction.user.id}`){

await interaction.deferUpdate();
  
            let carvao = userdb.rpg.minerios.carvao;
      let cobre = userdb.rpg.minerios.cobre;
    let ferro = userdb.rpg.minerios.ferro;
    let titanio = userdb.rpg.minerios.titanio;

    /*
    mineriosBloco: {
      cobre: { type: Number, default: 0},
      ferro: { type: Number, default: 0},
      titanio: { type: Number, default: 0}
    },
    */
let cobreBloco = userdb.rpg.mineriosBloco.cobre;
let ferroBloco = userdb.rpg.mineriosBloco.ferro;
let titanioBloco = userdb.rpg.mineriosBloco.titanio;


let canvas = Canvas.createCanvas(700, 420)
    let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/1028756005556846632/1036264044790812692/20221030_095824.jpg`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(carvao)}`, 150, 120, 70, 70);

    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(cobreBloco)}`, 150, 180, 70, 70);

    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(cobre)}`, 460, 120, 70, 70);

    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(ferroBloco)}`, 150, 240, 70, 70);

ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(ferro)}`, 460, 180, 70, 70);
                            
    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(titanioBloco)}`, 150, 297, 70, 70);

    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(titanio)}`, 460, 240, 70, 70);

    ctx.save()
//210, 130
    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'minerios.png'}) 

    interaction.editReply({
      content: `💎 | Minérios de ${interaction.user}`,
      files: [attachment],
      embeds: []
    })
    
  }

  if (interaction.customId === `blocos_${interaction.user.id}`){

      let madeira = userdb.rpg.blocos.madeira;
     let pedra = userdb.rpg.blocos.pedra;
let comida = userdb.rpg.item.comida;
let graveto = userdb.rpg.item.graveto;

    let canvas = Canvas.createCanvas(700, 420)
    let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/1028756005556846632/1037369770745532447/kmc_20221102_111140.jpg`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(madeira)}`, 140, 130, 70, 70);

    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(comida)}`, 140, 230, 70, 70);

          ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(pedra)}`, 470, 127, 70, 70);

    ctx.font = '25px mw';
    ctx.fillStyle = '#faf9f6';
 ctx.fillText(`${numero(graveto)}`, 470, 230, 70, 70);
    
    ctx.save()

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'blocos.png'}) 

    await interaction.deferUpdate();

    interaction.editReply({
      content: `🌍 | ${interaction.user}`,
      embeds: [],
      files: [attachment]
    })
    
  }

      if (interaction.customId === `invP_${interaction.user.id}`){

let pedra = userdb.rpg.picaretas.pedra;
  if (pedra < 1) pedra = `Picareta de Pedra: :x:`;
  if (pedra > 1) pedra = `Picareta de Pedra: ✅\nDurabilidade: **\`${userdb.rpg.picaretas.pedra}\`**\n`;

let cobre = userdb.rpg.picaretas.cobre;
  if (cobre < 1) cobre = `Picareta de Cobre: :x:`;
  if (cobre > 1) cobre = `Picareta de Cobre: ✅\nDurabilidade: **\`${userdb.rpg.picaretas.cobre}\`**\n`;

let ferro = userdb.rpg.picaretas.ferro;
  if (ferro < 1) ferro = `Picareta de Ferro: :x:`;
  if (ferro > 1) ferro = `Picareta de Ferro: ✅\nDurabilidade: **\`${userdb.rpg.picaretas.ferro}\`**\n`;

  let titanio = userdb.rpg.picaretas.titanio;
  if (titanio < 1) titanio = `Picareta de Titânio: :x:`;
  if (titanio > 1) titanio = `Picareta de Titânio: ✅\nDurabilidade: **\`${userdb.rpg.picaretas.titanio}\`**\n`;

        await interaction.deferUpdate();

    interaction.editReply({
      content: `🌍 | ${interaction.user}`,
      files: [],
      embeds: [
        new EmbedBuilder()

        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `  ${interaction.user.displayAvatarURL({ format: 'png' })}`})
        .setDescription(`${pedra}\n${cobre}\n${ferro}\n${titanio}`)
        .setColor("Blue")
      ]
    })
        
      }

});
//

function numero(number)
{
    number = number.toFixed(2) + '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        //x1 = x1.replace(rgx, '$1' + '$2');
      x1 = x1.replace(rgx, '$1' + ',' + '$2');     
    }
    return x1 + x2;
}
