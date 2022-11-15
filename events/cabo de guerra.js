//1_cabo_

const client = require('..')
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');


const { QuickDB } = require("quick.db");
const db = new QuickDB();

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;

if (interaction.customId === `1_cabo_${interaction.user.id}`){

//`.🟦⬛⬛⬛🟩⬛⬛⬛🟦`

  await interaction.deferUpdate()

  let msgid = await db.get("cabo_msg");

client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${msgid}`, cache: false, force: true }).then(async(msg) => {


  if (msg.content === `.🟦⬛⬛⬛🟩⬛⬛⬛🟦`) msg.edit({
    content: `.🟦⬛⬛🟩⬛⬛⬛⬛🟦`
  })

    if (msg.content === `.🟦⬛⬛🟩⬛⬛⬛⬛🟦`) msg.edit({
    content: `.🟦⬛🟩⬛⬛⬛⬛⬛🟦`
  })

  if (msg.content === `.🟦⬛🟩⬛⬛⬛⬛⬛🟦`) msg.edit({
    content: `.🟦🟩⬛⬛⬛⬛⬛⬛🟦`
  })

    if (msg.content === `.🟦🟩⬛⬛⬛⬛⬛⬛🟦`) msg.edit({
    content: `.🟩⬛⬛⬛⬛⬛⬛🟦`,
    components: []
  }).then(() => {
    interaction.followUp({content: `${interaction.user} ganhou o jogo!`})
  })

         if (msg.content === `.🟦⬛⬛⬛⬛🟩⬛⬛🟦`) msg.edit({
    content: `.🟦⬛⬛⬛🟩⬛⬛⬛🟦`
  })

  if (msg.content === `.🟦⬛⬛⬛⬛⬛🟩⬛🟦`) msg.edit({
    content: `.🟦⬛⬛⬛⬛🟩⬛⬛🟦`
  })

  if (msg.content === `.🟦⬛⬛⬛⬛⬛⬛🟩🟦`) msg.edit({
    content: `.🟦⬛⬛⬛⬛⬛🟩⬛🟦`
  })


})

  
}
  
});


client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;

if (interaction.customId === `2_cabo_${interaction.user.id}`){

//`.🟦⬛⬛⬛🟩⬛⬛⬛🟦`

 // await interaction.deferUpdate()

  let msgid = await db.get("cabo_msg");

client.channels.cache.get(`${interaction.channel.id}`).messages.fetch({ message: `${msgid}`, cache: false, force: true }).then(async(msg) => {


  if (msg.content === `.🟦⬛⬛⬛🟩⬛⬛⬛🟦`) msg.edit({
    content: `.🟦⬛⬛⬛⬛🟩⬛⬛🟦`
  })

  if (msg.content === `.🟦⬛⬛⬛⬛🟩⬛⬛🟦`) msg.edit({
    content: `.🟦⬛⬛⬛⬛⬛🟩⬛🟦`
  })

    if (msg.content === `.🟦⬛⬛⬛⬛⬛🟩⬛🟦`) msg.edit({
    content: `.🟦⬛⬛⬛⬛⬛⬛🟩🟦`
  })

  if (msg.content === `.🟦⬛⬛⬛⬛⬛⬛🟩🟦`) msg.edit({
    content: `.🟦⬛⬛⬛⬛⬛⬛⬛🟩`,
components: []

  }).then(() => {
    interaction.followUp({content: `${interaction.user} ganhou o jogo!`})
  })

if (msg.content === `.🟦⬛⬛🟩⬛⬛⬛⬛🟦`) msg.edit({
    content: `.🟦⬛⬛⬛🟩⬛⬛⬛🟦`
  })

if (msg.content === `.🟦⬛🟩⬛⬛⬛⬛⬛🟦`) msg.edit({
    content: `.🟦⬛⬛🟩⬛⬛⬛⬛🟦`
  })


if (msg.content === `.🟦🟩⬛⬛⬛⬛⬛⬛🟦`) msg.edit({
    content: `.🟦⬛🟩⬛⬛⬛⬛⬛🟦`
  })


})

  
}
  
});
