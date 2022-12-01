const client = require("..");

const Discord = require("discord.js")
const Canvas = require("canvas")
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { registerFont } = require('canvas')
registerFont('././mw.ttf', { family: 'mw' })

const { QuickDB } = require("quick.db");
const db = new QuickDB();


client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;

const botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`figurinhasComum_${interaction.user.id}`)
					.setLabel('Comum')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
      new ButtonBuilder()
					.setCustomId(`figurinhasIncomum_${interaction.user.id}`)
					.setLabel('Incomum')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
      new ButtonBuilder()
					.setCustomId(`figurinhasRaro_${interaction.user.id}`)
					.setLabel('Raro')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
      new ButtonBuilder()
					.setCustomId(`figurinhasEpico_${interaction.user.id}`)
					.setLabel('Epico')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
      new ButtonBuilder()
					.setCustomId(`figurinhasLendadio_${interaction.user.id}`)
					.setLabel('Lendario')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
			);

  if (interaction.customId === `comprar1_${interaction.user.id}`){

    let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     }) 

      if(!userdb){
         let newuser = new client.userdb({ userID: interaction.user.id})
        await  newuser.save();
         
         userdb = client.userdb.findOne({ userID: interaction.user.id })
      }

await interaction.deferUpdate()

  if (userdb.rpg.money < 500) return interaction.reply({
    content: `Você não tem 500 mini moedas!`,
    ephemeral: true
  })

    
    

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.money": userdb.rpg.money - 500,
         "figurinhas.total": userdb.figurinhas.total + 1
         }
        })

  interaction.editReply({
    content: `Você comprou 1 figurinha!`,
    components: []
  })

  }

    if (interaction.customId === `comprar2_${interaction.user.id}`){

    let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     }) 

      if(!userdb){
         let newuser = new client.userdb({ userID: interaction.user.id})
        await  newuser.save();
         
         userdb = client.userdb.findOne({ userID: interaction.user.id })
      }

await interaction.deferUpdate()

  if (userdb.rpg.money < 2500) return interaction.reply({
    content: `Você não tem 2500 mini moedas!`,
    ephemeral: true
  })

    
    

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.money": userdb.rpg.money - 2500,
         "figurinhas.total": userdb.figurinhas.total + 5
         }
        })

  interaction.editReply({
    content: `Você comprou 5 figurinha!`,
    components: []
  })

  }

    if (interaction.customId === `comprar3_${interaction.user.id}`){

    let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     }) 

      if(!userdb){
         let newuser = new client.userdb({ userID: interaction.user.id})
        await  newuser.save();
         
         userdb = client.userdb.findOne({ userID: interaction.user.id })
      }

await interaction.deferUpdate()

  if (userdb.rpg.money < 5000) return interaction.reply({
    content: `Você não tem 5000 mini moedas!`,
    ephemeral: true
  })

    
    

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.money": userdb.rpg.money - 5000,
         "figurinhas.total": userdb.figurinhas.total + 10
         }
        })

  interaction.editReply({
    content: `Você comprou 10 figurinha!`,
    components: []
  })

    }

if (interaction.customId === `figurinhas_${interaction.user.id}`){

  await interaction.deferUpdate()

let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     }) 

      if(!userdb){
         let newuser = new client.userdb({ userID: interaction.user.id})
        await  newuser.save();
         
         userdb = client.userdb.findOne({ userID: interaction.user.id })
      }
  
let comum = ["Popo", "Christopher", "Eva", "Fluttershy", "Garçonete Doce", "Gata corrida", "Joey", "Lancelot", "Mecha meow", "Lynn", "Lilith", "Mini Beat", "Mini T", "Ninja sapo", "Ninja vermelho", "Raul", "Rose", "Zhanlang"];

let incomum = ["Abóbora", "Arell", "Capitão Teach", "Christopher", "Fluttershy", "Fluttershy", "Jinyi", "Kaka", "Lucas", "Mary", "Mecha meow", "Sakura"];

let raro = ["Assassin An", "Assassin Li",  "Fluttershy", "Erlang", "Gata corrida", "Mary mapa"];

let epico = ["Carol", "Ellie", "Fada evoluída", "Fada da Lua", "Kaka", "Lancelot espada", "Sakura", "Transformers azul", "Transformers vermelho", "Vovô", "Xiaolou"];

let lendario = ["Eva", "Fada evoluída", "Fada da lua evoluída", "Lilith com efeito", "Misra"];

let random = ["comum","incomum","comum","incomum","comum","incomum","comum","comum","incomum","comum","incomum","comum","comum","raro","comum", "raro","comum", "raro", "comum","epico", "epico", "lendario","comum","comum"];




let escolha = random[Math.floor(Math.random() * random.length)];
  

if (escolha === `comum`){
  let figurinha = comum[Math.floor(Math.random() * comum.length)];

  await db.set(interaction.user.id + "-" + escolha + "-" + figurinha, true)

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "figurinhas.total": userdb.figurinhas.total - 1,
  "figurinhas.comum": userdb.figurinhas.comum + 1
         }
        })

return interaction.editReply({
  content: `${interaction.user} você conseguiu uma figurinha **Comum** que é __${figurinha}__`,
  components: []
})

}

if (escolha === `incomum`){
    let figurinha = incomum[Math.floor(Math.random() * incomum.length)];

  await db.set(interaction.user.id + "-" + escolha + "-" + figurinha, true)

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "figurinhas.total": userdb.figurinhas.total - 1,
  "figurinhas.incomum": userdb.figurinhas.incomum + 1
         }
        })
  
return interaction.editReply({
  content: `${interaction.user} você conseguiu uma figurinha **Incomum** que é __${figurinha}__`,
  components: []
})
}
if (escolha === `raro`){
     let figurinha = raro[Math.floor(Math.random() * raro.length)];

  await db.set(interaction.user.id + "-" + escolha + "-" + figurinha, true)

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "figurinhas.total": userdb.figurinhas.total - 1,
  "figurinhas.raro": userdb.figurinhas.raro + 1
         }
        })

return interaction.editReply({
  content: `${interaction.user} você conseguiu uma figurinha **Raro** que é __${figurinha}__`,
  components: []
})
}
if (escolha === `epico`){
       let figurinha = epico[Math.floor(Math.random() * epico.length)];


  await db.set(interaction.user.id + "-" + escolha + "-" + figurinha, true)

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "figurinhas.total": userdb.figurinhas.total - 1,
  "figurinhas.epico": userdb.figurinhas.epico + 1
         }
        })
  
return interaction.editReply({
  content: `${interaction.user} você conseguiu uma figurinha **Épico** que é __${figurinha}__`,
  components: []
})
}
if (escolha === `lendario`){
  let figurinha = lendario[Math.floor(Math.random() * lendario.length)];

await db.set(interaction.user.id + "-" + escolha + "-" + figurinha, true)

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "figurinhas.total": userdb.figurinhas.total - 1,
  "figurinhas.lendario": userdb.figurinhas.lendario + 1
         }
        })
         
return interaction.editReply({
  content: `${interaction.user} você conseguiu uma figurinha **Lendário** que é __${figurinha}__`,
  components: []
})
}
}

  if (interaction.customId === `figurinhasComum_${interaction.user.id}` || interaction.customId === `comum1_${interaction.user.id}`){
    await interaction.deferUpdate()

    let figurinha1 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1046067799619027034/1_1.png");

  let figurinha1v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Popo")

    let figurinha2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1046078917221564446/21_1.png");

  let figurinha2v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Christopher")

    let figurinha3 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047198179768139847/9_1.png");

  let figurinha3v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Eva")


let figurinha4 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047199217069854910/23_1.png");

  let figurinha4v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Fluttershy")

    let figurinha5 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047199610306842645/15_1.png");

  let figurinha5v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Garçonete Doce")

    let figurinha6 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047199939173826590/16_1.png");

  let figurinha6v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Gata corrida")


 let canvas = Canvas.createCanvas(700, 450)
let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911729113801293845/1045337163446898800/image-3.png`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

ctx.strokeStyle = '#0099ff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	

   if (figurinha1v === true) ctx.drawImage(figurinha1, 120, 125, 118, 135);



    if (figurinha2v === true) ctx.drawImage(figurinha2, 290, 125, 118, 135);

    if (figurinha3v === true) ctx.drawImage(figurinha3, 460, 125, 118, 135);

    if (figurinha4v === true) ctx.drawImage(figurinha4, 120, 290, 118, 135);

    if (figurinha5v === true)  ctx.drawImage(figurinha5, 290, 290, 118, 135);

if (figurinha6v === true) ctx.drawImage(figurinha6, 460, 290, 118, 135);

	ctx.beginPath();

	ctx.arc(120, 120, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	
  
ctx.save()

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'album.png'}) 

  
let pg = new ActionRowBuilder().addComponents(
      
  new ButtonBuilder()
					.setCustomId(`comum1_${interaction.user.id}`)
					.setLabel('1')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true),
  new ButtonBuilder()
					.setCustomId(`comum2_${interaction.user.id}`)
					.setLabel('2')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`comum3_${interaction.user.id}`)
					.setLabel('3')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  )


   interaction.editReply({ content: `${interaction.user}`, files: [attachment], components: [pg] })
    
  }






    if (interaction.customId === `comum2_${interaction.user.id}`){
    await interaction.deferUpdate()

    let figurinha1 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047210962333225000/20_1.png");

  let figurinha1v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Joey")

    let figurinha2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047211400625401906/12_1.png");

  let figurinha2v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Lancelot")

    let figurinha3 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047211763411726356/8_1.png");

  let figurinha3v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Lilith")


let figurinha4 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047212145118543922/22_1.png");

  let figurinha4v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Lynn")

    let figurinha5 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047212463998910636/7_1.png");

  let figurinha5v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Mecha meow")

    let figurinha6 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047212834372718702/19_1.png");

  let figurinha6v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Mini Beat")


 let canvas = Canvas.createCanvas(700, 450)
let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911729113801293845/1045337163446898800/image-3.png`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

ctx.strokeStyle = '#0099ff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	

   if (figurinha1v === true) ctx.drawImage(figurinha1, 120, 125, 118, 135);



    if (figurinha2v === true) ctx.drawImage(figurinha2, 290, 125, 118, 135);

    if (figurinha3v === true) ctx.drawImage(figurinha3, 460, 125, 118, 135);

    if (figurinha4v === true) ctx.drawImage(figurinha4, 120, 290, 118, 135);

    if (figurinha5v === true)  ctx.drawImage(figurinha5, 290, 290, 118, 135);

if (figurinha6v === true) ctx.drawImage(figurinha6, 460, 290, 118, 135);

	ctx.beginPath();

	ctx.arc(120, 120, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	
  
ctx.save()

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'album.png'}) 

  
let pg = new ActionRowBuilder().addComponents(
      
  new ButtonBuilder()
					.setCustomId(`comum1_${interaction.user.id}`)
					.setLabel('1')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`comum2_${interaction.user.id}`)
					.setLabel('2')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true),
  new ButtonBuilder()
					.setCustomId(`comum3_${interaction.user.id}`)
					.setLabel('3')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  )


   interaction.editReply({ content: `${interaction.user}`, files: [attachment], components: [pg] })
    
  }






  if (interaction.customId === `comum3_${interaction.user.id}`){
    await interaction.deferUpdate()

    let figurinha1 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047214799093772288/6.png");

  let figurinha1v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Mini T")

    let figurinha2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047215132415103087/5.png");

  let figurinha2v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Ninja sapo")

    let figurinha3 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047215403836903444/10.png");

  let figurinha3v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Ninja vermelho")


let figurinha4 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047215660612198400/13.png");

  let figurinha4v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Raul")

    let figurinha5 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047215909405741096/17.png");

  let figurinha5v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Rose")

    let figurinha6 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047216330924892292/2.png");

  let figurinha6v = await db.get(interaction.user.id + "-" + "comum" + "-" + "Zhanlang")


 let canvas = Canvas.createCanvas(700, 450)
let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911729113801293845/1045337163446898800/image-3.png`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

ctx.strokeStyle = '#0099ff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	

   if (figurinha1v === true) ctx.drawImage(figurinha1, 120, 125, 118, 135);



    if (figurinha2v === true) ctx.drawImage(figurinha2, 290, 125, 118, 135);

    if (figurinha3v === true) ctx.drawImage(figurinha3, 460, 125, 118, 135);

    if (figurinha4v === true) ctx.drawImage(figurinha4, 120, 290, 118, 135);

    if (figurinha5v === true)  ctx.drawImage(figurinha5, 290, 290, 118, 135);

if (figurinha6v === true) ctx.drawImage(figurinha6, 460, 290, 118, 135);

	ctx.beginPath();

	ctx.arc(120, 120, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	
  
ctx.save()

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'album.png'}) 

  
let pg = new ActionRowBuilder().addComponents(
      
  new ButtonBuilder()
					.setCustomId(`comum1_${interaction.user.id}`)
					.setLabel('1')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`comum2_${interaction.user.id}`)
					.setLabel('2')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`comum3_${interaction.user.id}`)
					.setLabel('3')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true),
  new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  )


   interaction.editReply({ content: `${interaction.user}`, files: [attachment], components: [pg] })
    
      }




                                             
if (interaction.customId === `voltar_${interaction.user.id}`){
  await interaction.deferUpdate()

  interaction.editReply({
    content: `<a:Doguinhu:795105130311712829> | Quais tipo de figurinhas você quer ver?`,
    components: [botao],
    files: []
  })
}




    if (interaction.customId === `figurinhasIncomum_${interaction.user.id}` || interaction.customId === `incomum1_${interaction.user.id}`){
    await interaction.deferUpdate()

    let figurinha1 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047219909358276711/43.png");

  let figurinha1v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Abóbora")

    let figurinha2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047220195690807296/42.png");

  let figurinha2v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Arell")

    let figurinha3 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047220458707234847/34.png");

  let figurinha3v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Capitão Teach")


let figurinha4 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047220815332122745/25.png");

  let figurinha4v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Christopher")

    let figurinha5 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047221351603249212/36.png");

  let figurinha5v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Fluttershy")

    let figurinha6 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047221617354358865/35.png");

  let figurinha6v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Fluttershy")


 let canvas = Canvas.createCanvas(700, 450)
let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911729113801293845/1045337163446898800/image-3.png`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

ctx.strokeStyle = '#0099ff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	

   if (figurinha1v === true) ctx.drawImage(figurinha1, 120, 125, 118, 135);



    if (figurinha2v === true) ctx.drawImage(figurinha2, 290, 125, 118, 135);

    if (figurinha3v === true) ctx.drawImage(figurinha3, 460, 125, 118, 135);

    if (figurinha4v === true) ctx.drawImage(figurinha4, 120, 290, 118, 135);

    if (figurinha5v === true)  ctx.drawImage(figurinha5, 290, 290, 118, 135);

if (figurinha6v === true) ctx.drawImage(figurinha6, 460, 290, 118, 135);

	ctx.beginPath();

	ctx.arc(120, 120, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	
  
ctx.save()

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'album.png'}) 

  
let pg = new ActionRowBuilder().addComponents(
      
  new ButtonBuilder()
					.setCustomId(`incomum1_${interaction.user.id}`)
					.setLabel('1')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true),
  new ButtonBuilder()
					.setCustomId(`incomum2_${interaction.user.id}`)
					.setLabel('2')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  
  new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  )


   interaction.editReply({ content: `${interaction.user}`, files: [attachment], components: [pg] })
    
      }






      if (interaction.customId === `incomum2_${interaction.user.id}`){
    await interaction.deferUpdate()

    let figurinha1 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047222547038613554/39.png");

  let figurinha1v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Jinyi")

    let figurinha2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047234471050612776/37.png");

  let figurinha2v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Kaka")

    let figurinha3 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047234840350691461/30.png");

  let figurinha3v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Lucas")


let figurinha4 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047235164310351972/26.png");

  let figurinha4v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Mary")

    let figurinha5 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047235501834371082/33.png");

  let figurinha5v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Mecha meow")

    let figurinha6 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047235821637484675/41.png");

  let figurinha6v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "Sakura")


 let canvas = Canvas.createCanvas(700, 450)
let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911729113801293845/1045337163446898800/image-3.png`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

ctx.strokeStyle = '#0099ff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	

   if (figurinha1v === true) ctx.drawImage(figurinha1, 120, 125, 118, 135);



    if (figurinha2v === true) ctx.drawImage(figurinha2, 290, 125, 118, 135);

    if (figurinha3v === true) ctx.drawImage(figurinha3, 460, 125, 118, 135);

    if (figurinha4v === true) ctx.drawImage(figurinha4, 120, 290, 118, 135);

    if (figurinha5v === true)  ctx.drawImage(figurinha5, 290, 290, 118, 135);

if (figurinha6v === true) ctx.drawImage(figurinha6, 460, 290, 118, 135);

	ctx.beginPath();

	ctx.arc(120, 120, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	
  
ctx.save()

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'album.png'}) 

  
let pg = new ActionRowBuilder().addComponents(
      
  new ButtonBuilder()
					.setCustomId(`incomum1_${interaction.user.id}`)
					.setLabel('1')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`incomum2_${interaction.user.id}`)
					.setLabel('2')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true),
  new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  )


   interaction.editReply({ content: `${interaction.user}`, files: [attachment], components: [pg] })
    
      }






      if (interaction.customId === `figurinhasRaro_${interaction.user.id}` || interaction.customId === `raro1_${interaction.user.id}`){
    await interaction.deferUpdate()

    let figurinha1 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047662103017824256/44.png");

  let figurinha1v = await db.get(interaction.user.id + "-" + "raro" + "-" + "Assassin An")

    let figurinha2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047662475006455918/45.png");

  let figurinha2v = await db.get(interaction.user.id + "-" + "raro" + "-" + "Assassin Li")

    let figurinha3 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047663308808912946/53.png");

  let figurinha3v = await db.get(interaction.user.id + "-" + "raro" + "-" + "Erlang")


let figurinha4 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047663794526109717/49.png");

  let figurinha4v = await db.get(interaction.user.id + "-" + "raro" + "-" + "Fluttershy")

    let figurinha5 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047664152769986590/51.png");

  let figurinha5v = await db.get(interaction.user.id + "-" + "raro" + "-" + "Gata corrida")

    let figurinha6 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047664575581016095/46.png");

  let figurinha6v = await db.get(interaction.user.id + "-" + "raro" + "-" + "Mary mapa")


 let canvas = Canvas.createCanvas(700, 450)
let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911729113801293845/1045337163446898800/image-3.png`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

ctx.strokeStyle = '#0099ff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	

   if (figurinha1v === true) ctx.drawImage(figurinha1, 120, 125, 118, 135);



    if (figurinha2v === true) ctx.drawImage(figurinha2, 290, 125, 118, 135);

    if (figurinha3v === true) ctx.drawImage(figurinha3, 460, 125, 118, 135);

    if (figurinha4v === true) ctx.drawImage(figurinha4, 120, 290, 118, 135);

    if (figurinha5v === true)  ctx.drawImage(figurinha5, 290, 290, 118, 135);

if (figurinha6v === true) ctx.drawImage(figurinha6, 460, 290, 118, 135);

	ctx.beginPath();

	ctx.arc(120, 120, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	
  
ctx.save()

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'album.png'}) 

  
let pg = new ActionRowBuilder().addComponents(
      
  new ButtonBuilder()
					.setCustomId(`raro1_${interaction.user.id}`)
					.setLabel('1')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true),
  new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  )


   interaction.editReply({ content: `${interaction.user}`, files: [attachment], components: [pg] })
    
                                 }

                                                                                                                

    


    if (interaction.customId === `figurinhasEpico_${interaction.user.id}` || interaction.customId === `epico1_${interaction.user.id}`){
    await interaction.deferUpdate()

    let figurinha1 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047667413602275419/56.png");

  let figurinha1v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Abóbora")

    let figurinha2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047667893283860630/58.png");

  let figurinha2v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Carol")

    let figurinha3 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047939640964956260/63.png");

  let figurinha3v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Fada evoluída")


let figurinha4 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047940062568009758/66.png");

  let figurinha4v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Fada da Lua")

    let figurinha5 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047940388285071441/64.png");

  let figurinha5v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Kaka")

    let figurinha6 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047940826094899300/61.png");

  let figurinha6v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Lancelot espada")


 let canvas = Canvas.createCanvas(700, 450)
let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911729113801293845/1045337163446898800/image-3.png`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

ctx.strokeStyle = '#0099ff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	

   if (figurinha1v === true) ctx.drawImage(figurinha1, 120, 125, 118, 135);



    if (figurinha2v === true) ctx.drawImage(figurinha2, 290, 125, 118, 135);

    if (figurinha3v === true) ctx.drawImage(figurinha3, 460, 125, 118, 135);

    if (figurinha4v === true) ctx.drawImage(figurinha4, 120, 290, 118, 135);

    if (figurinha5v === true)  ctx.drawImage(figurinha5, 290, 290, 118, 135);

if (figurinha6v === true) ctx.drawImage(figurinha6, 460, 290, 118, 135);

	ctx.beginPath();

	ctx.arc(120, 120, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	
  
ctx.save()

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'album.png'}) 

  
let pg = new ActionRowBuilder().addComponents(
      
  new ButtonBuilder()
					.setCustomId(`epico1_${interaction.user.id}`)
					.setLabel('1')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true),
  new ButtonBuilder()
					.setCustomId(`epico2_${interaction.user.id}`)
					.setLabel('2')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  )


   interaction.editReply({ content: `${interaction.user}`, files: [attachment], components: [pg] })
    
    }

  



        if (interaction.customId === `epico2_${interaction.user.id}`){
    await interaction.deferUpdate()

    let figurinha1 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047941994313437325/59.png");

  let figurinha1v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Sakura (guarda chuva)")

    let figurinha2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047942340075077742/67.png");

  let figurinha2v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Transformers azul (raio)")

    let figurinha3 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047942702530039899/57.png");

  let figurinha3v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Transformers vermelho (carro)")


let figurinha4 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047943072245350472/60.png");

  let figurinha4v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Vovô")

    let figurinha5 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047943429411307560/62.png");

  let figurinha5v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Xiaolou")

    let figurinha6 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047940826094899300/61.png");

  let figurinha6v = await db.get(interaction.user.id + "-" + "epico" + "-" + "Lancelot espada")


 let canvas = Canvas.createCanvas(700, 450)
let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911729113801293845/1045337163446898800/image-3.png`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

ctx.strokeStyle = '#0099ff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	

   if (figurinha1v === true) ctx.drawImage(figurinha1, 120, 125, 118, 135);



    if (figurinha2v === true) ctx.drawImage(figurinha2, 290, 125, 118, 135);

    if (figurinha3v === true) ctx.drawImage(figurinha3, 460, 125, 118, 135);

    if (figurinha4v === true) ctx.drawImage(figurinha4, 120, 290, 118, 135);

    if (figurinha5v === true)  ctx.drawImage(figurinha5, 290, 290, 118, 135);

if (figurinha6v === true) ctx.drawImage(figurinha6, 460, 290, 118, 135);

	ctx.beginPath();

	ctx.arc(120, 120, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	
  
ctx.save()

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'album.png'}) 

  
let pg = new ActionRowBuilder().addComponents(
      
  new ButtonBuilder()
					.setCustomId(`epico1_${interaction.user.id}`)
					.setLabel('1')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  new ButtonBuilder()
					.setCustomId(`epico2_${interaction.user.id}`)
					.setLabel('2')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true),
  new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  )


   interaction.editReply({ content: `${interaction.user}`, files: [attachment], components: [pg] })
    
}







      if (interaction.customId === `figurinhasLendadio_${interaction.user.id}`){
    await interaction.deferUpdate()

    let figurinha1 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047944509834666015/68.png");

  let figurinha1v = await db.get(interaction.user.id + "-" + "lendario" + "-" + "Eva")

    let figurinha2 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047944982423670925/69.png");

  let figurinha2v = await db.get(interaction.user.id + "-" + "lendario" + "-" + "Fada evoluída")

    let figurinha3 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047945384967815179/70.png");

  let figurinha3v = await db.get(interaction.user.id + "-" + "lendario" + "-" + "Fada da lua evoluída")


let figurinha4 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047946954065317939/71.png");

  let figurinha4v = await db.get(interaction.user.id + "-" + "lendario" + "-" + "Lilith com efeito")

    let figurinha5 = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1028756005556846632/1047947349995048980/72.png");

  let figurinha5v = await db.get(interaction.user.id + "-" + "lendario" + "-" + "Misra")
/*
    let figurinha6 = await Canvas.loadImage("");

  let figurinha6v = await db.get(interaction.user.id + "-" + "incomum" + "-" + "")*/


 let canvas = Canvas.createCanvas(700, 450)
let ctx = canvas.getContext("2d")
    
    let background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911729113801293845/1047647907777630278/image-4.png`)
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

ctx.strokeStyle = '#0099ff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	

   if (figurinha1v === true) ctx.drawImage(figurinha1, 120, 125, 118, 135);



    if (figurinha2v === true) ctx.drawImage(figurinha2, 290, 125, 118, 135);

    if (figurinha3v === true) ctx.drawImage(figurinha3, 460, 125, 118, 135);

    if (figurinha4v === true) ctx.drawImage(figurinha4, 200, 290, 118, 135);

    if (figurinha5v === true)  ctx.drawImage(figurinha5, 380, 290, 118, 135);
/*
if (figurinha6v === true) ctx.drawImage(figurinha6, 460, 290, 118, 135);*/

	ctx.beginPath();

	ctx.arc(120, 120, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	
  
ctx.save()

    let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'album.png'}) 

  
let pg = new ActionRowBuilder().addComponents(
      
  new ButtonBuilder()
					.setCustomId(`lendario1_${interaction.user.id}`)
					.setLabel('1')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true),
  
  new ButtonBuilder()
					.setCustomId(`voltar_${interaction.user.id}`)
					.setLabel('Voltar')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(false),
  )


   interaction.editReply({ content: `${interaction.user}`, files: [attachment], components: [pg] })
    
  }
})
