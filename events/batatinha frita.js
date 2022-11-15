const client = require('..')
const pudim = client;

const { QuickDB } = require("quick.db");
const db = new QuickDB();

pudim.on('interactionCreate', async (interaction) => {
  
	if (!interaction.isButton()) return;

let userid = await db.get(`player_${interaction.user.id}`);

  let user = pudim.users.cache.get(userid)
  

//

  
if (interaction.customId === `1_${interaction.user.id}`){


await interaction.deferUpdate()
  
let msgid = await db.get('msg_2');
let statusid = await db.get("msg_3");
let msgid2 = await db.get("msg_1");

  let status = await db.get("status");

  
  pudim.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${msgid}`, cache: false, force: true }).then(async(msg) => {

  pudim.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${msgid2}`, cache: false, force: true }).then(async(msg2) => {

    pudim.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${statusid}`, cache: false, force: true }).then(async(statusmsg) => {
    
if (status === "off"){

  await db.set("tempo_interval", "nao")

  
statusmsg.delete()


if (msg.content === "1.🟥⬛⬛⬛⬛⬛⬛⬛🟩") {
  msg.edit({content: "1.⬛:x:⬛⬛⬛⬛⬛⬛🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 2 venceu!"})
}
if (msg.content === "1.⬛🟥⬛⬛⬛⬛⬛⬛🟩") {
  msg.edit({content: "1.⬛⬛:x:⬛⬛⬛⬛⬛🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 2 venceu!"})
    }
if (msg.content === "1.⬛⬛🟥⬛⬛⬛⬛⬛🟩") {
  msg.edit({content: "1.⬛⬛⬛:x:⬛⬛⬛⬛🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 2 venceu!"})
}
  
if (msg.content === "1.⬛⬛⬛🟥⬛⬛⬛⬛🟩"){
  msg.edit({content: "1.⬛⬛⬛⬛:x:⬛⬛⬛🟩"})
  msg2.edit({components: []})

  interaction.followUp({content: "O número 2 venceu!"})
}

if (msg.content === "1.⬛⬛⬛⬛🟥⬛⬛⬛🟩") {
  msg.edit({content: "1.⬛⬛⬛⬛⬛:x:⬛⬛🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 2 venceu!"})
}
if (msg.content === "1.⬛⬛⬛⬛⬛🟥⬛⬛🟩"){
  msg.edit({content: "1.⬛⬛⬛⬛⬛⬛:x:⬛🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 2 venceu!"})
}

if (msg.content === "1.⬛⬛⬛⬛⬛⬛🟥⬛🟩"){
  msg.edit({content: "1.⬛⬛⬛⬛⬛⬛⬛:x:🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 2 venceu!"})
}
if (msg.content === "1.⬛⬛⬛⬛⬛⬛⬛🟥🟩"){
  msg.edit({content: "1.⬛⬛⬛⬛⬛⬛⬛⬛:x:"})
msg2.edit({components: []})

  interaction.followUp({content: "O número 2 venceu!"})
}
  
}

  if (status === "run"){

    if (msg.content === "1.⬛⬛⬛⬛⬛⬛⬛🟥🟩"){
  msg.edit({content: "1.⬛⬛⬛⬛⬛⬛⬛⬛🟥"})

  msg2.edit({components: []})

  interaction.followUp({content: `${interaction.user} ganhou o jogo!`})


        await db.set("tempo_interval", "nao")

         statusmsg.delete()
}

    interaction.followUp({content: "✅", ephemeral: true})

if (msg.content === "1.🟥⬛⬛⬛⬛⬛⬛⬛🟩") msg.edit({content: "1.⬛🟥⬛⬛⬛⬛⬛⬛🟩"})

if (msg.content === "1.⬛🟥⬛⬛⬛⬛⬛⬛🟩") msg.edit({content: "1.⬛⬛🟥⬛⬛⬛⬛⬛🟩"})

if (msg.content === "1.⬛⬛🟥⬛⬛⬛⬛⬛🟩") msg.edit({content: "1.⬛⬛⬛🟥⬛⬛⬛⬛🟩"})

if (msg.content === "1.⬛⬛⬛🟥⬛⬛⬛⬛🟩") msg.edit({content: "1.⬛⬛⬛⬛🟥⬛⬛⬛🟩"})

if (msg.content === "1.⬛⬛⬛⬛🟥⬛⬛⬛🟩") msg.edit({content: "1.⬛⬛⬛⬛⬛🟥⬛⬛🟩"})

if (msg.content === "1.⬛⬛⬛⬛⬛🟥⬛⬛🟩") msg.edit({content: "1.⬛⬛⬛⬛⬛⬛🟥⬛🟩"})

if (msg.content === "1.⬛⬛⬛⬛⬛⬛🟥⬛🟩") msg.edit({content: "1.⬛⬛⬛⬛⬛⬛⬛🟥🟩"})


                                            }
    })
  })
  })
}

    });



pudim.on('interactionCreate', async (interaction) => {
  
	if (!interaction.isButton()) return;

let userid = await db.get(`player_${interaction.user.id}`);

  let user = pudim.users.cache.get(userid)


//await interaction.deferUpdate()
  
if (interaction.customId === `2_${interaction.user.id}`){

let msgid = await db.get('msg_1');
let statusid = await db.get("msg_3");
let msgid2 = await db.get("msg_2");

  let status = await db.get("status");
  pudim.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${msgid}`, cache: false, force: true }).then(async(msg) => {

  pudim.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${msgid2}`, cache: false, force: true }).then(async(msg2) => {

    pudim.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${statusid}`, cache: false, force: true }).then(async(statusmsg) => {
    
if (status === "off"){

  await db.set("tempo_interval", "nao")
  
statusmsg.delete()


if (msg.content === "2.🟥⬛⬛⬛⬛⬛⬛⬛🟩") {
  msg.edit({content: "2.⬛:x:⬛⬛⬛⬛⬛⬛🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 1 venceu!"})
}
if (msg.content === "2.⬛🟥⬛⬛⬛⬛⬛⬛🟩") {
  msg.edit({content: "2.⬛⬛:x:⬛⬛⬛⬛⬛🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 1 venceu!"})
    }
if (msg.content === "2.⬛⬛🟥⬛⬛⬛⬛⬛🟩") {
  msg.edit({content: "2.⬛⬛⬛:x:⬛⬛⬛⬛🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 1 venceu!"})
}
  
if (msg.content === "2.⬛⬛⬛🟥⬛⬛⬛⬛🟩"){
  msg.edit({content: "2.⬛⬛⬛⬛:x:⬛⬛⬛🟩"})
  msg2.edit({components: []})

  interaction.followUp({content: "O número 1 venceu!"})
}

if (msg.content === "2.⬛⬛⬛⬛🟥⬛⬛⬛🟩") {
  msg.edit({content: "2.⬛⬛⬛⬛⬛:x:⬛⬛🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 1 venceu!"})
}
if (msg.content === "2.⬛⬛⬛⬛⬛🟥⬛⬛🟩"){
  msg.edit({content: "2.⬛⬛⬛⬛⬛⬛:x:⬛🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 1 venceu!"})
}

if (msg.content === "2.⬛⬛⬛⬛⬛⬛🟥⬛🟩"){
  msg.edit({content: "2.⬛⬛⬛⬛⬛⬛⬛:x:🟩"})

  msg2.edit({components: []})

  interaction.followUp({content: "O número 1 venceu!"})
}
if (msg.content === "2.⬛⬛⬛⬛⬛⬛⬛🟥🟩"){
  msg.edit({content: "2.⬛⬛⬛⬛⬛⬛⬛⬛:x:"})
msg2.edit({components: []})

  interaction.followUp({content: "O número 1 venceu!"})
}
  
}

  if (status === "run"){

    if (msg.content === "2.⬛⬛⬛⬛⬛⬛⬛🟥🟩"){
  msg.edit({content: "2.⬛⬛⬛⬛⬛⬛⬛⬛🟥"})

  msg2.edit({components: []})

  interaction.followUp({content: `${interaction.user} ganhou o jogo!`})

         statusmsg.delete()
}

    interaction.followUp({content: "✅", ephemeral: true})

if (msg.content === "2.🟥⬛⬛⬛⬛⬛⬛⬛🟩") msg.edit({content: "2.⬛🟥⬛⬛⬛⬛⬛⬛🟩"})

if (msg.content === "2.⬛🟥⬛⬛⬛⬛⬛⬛🟩") msg.edit({content: "2.⬛⬛🟥⬛⬛⬛⬛⬛🟩"})

if (msg.content === "2.⬛⬛🟥⬛⬛⬛⬛⬛🟩") msg.edit({content: "2.⬛⬛⬛🟥⬛⬛⬛⬛🟩"})

if (msg.content === "2.⬛⬛⬛🟥⬛⬛⬛⬛🟩") msg.edit({content: "2.⬛⬛⬛⬛🟥⬛⬛⬛🟩"})

if (msg.content === "2.⬛⬛⬛⬛🟥⬛⬛⬛🟩") msg.edit({content: "2.⬛⬛⬛⬛⬛🟥⬛⬛🟩"})

if (msg.content === "2.⬛⬛⬛⬛⬛🟥⬛⬛🟩") msg.edit({content: "2.⬛⬛⬛⬛⬛⬛🟥⬛🟩"})

if (msg.content === "2.⬛⬛⬛⬛⬛⬛🟥⬛🟩") msg.edit({content: "2.⬛⬛⬛⬛⬛⬛⬛🟥🟩"})


                                            }
    })
  })
  })
}


      

    });
