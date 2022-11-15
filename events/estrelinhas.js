const client = require('..')
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const { QuickDB } = require("quick.db");
const db = new QuickDB();

//--------------------EVENTO DE QUANDO REAGIR
client.on('messageReactionAdd', async (reaction, user) => {

  let message = reaction.message, emoji = reaction.emoji;

	if (reaction.partial) {
	
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
		
			return;
		}
	}
if (message.guild.id === client.config.GUILD_ID){
if (reaction.message.author.bot) return;
if (user === reaction.message.author) return;
if (user.bot) return;

  
if (emoji.name === '⭐'){

  const userdb = await client.userdb.findOne({
         userID: reaction.message.author.id
     }) 

      if(!userdb){
         const newuser = new client.userdb({ userID: reaction.message.author.id})
        await  newuser.save();
         
         userdb = client.userdb.findOne({ userID: reaction.message.author.id })
     }


let estrela = userdb.estrelas;
  
await client.userdb.updateOne({
         userID: reaction.message.author.id
     }, { $set: {
         "estrelas": estrela + 1
     }
     })

  
  const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Mensagem')
					.setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
			);


  let canal = client.channels.cache.get(`${client.chat.estrela}`)
let verificando = await db.get(`msgEstrela_${message.author.id}_${message.id}`);
  if (verificando === true) return;

canal.send({
  content: `⭐ - ${reaction.message.channel}`,
  embeds: [
    new EmbedBuilder()
    .setColor("Yellow")
    .setAuthor({ name: `${reaction.message.author.tag}`, iconURL: `  ${reaction.message.author.displayAvatarURL({ format: 'png' })}`})
    .setDescription(`${reaction.message.content}`)
  ],
  components: [row]
}).then(msg => {
db.set(`estrela_${message.author.id}_${message.content}`, `${msg.id}`)
db.set(`msgEstrela_${message.author.id}_${message.id}`, true)
})
}

}
});

//--------------------EVENTO DE QUANDO REMOVER A REAÇÃO!


client.on('messageReactionRemove', async (reaction, user) => {
 
    let message = reaction.message, emoji = reaction.emoji;
  
	if (reaction.partial) {
	
		try {
			 reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
		
			return;
		}
	}
if (message.guild.id === client.config.GUILD_ID){
if (emoji.name === "⭐"){

let content = await db.get(`estrela_${message.author.id}_${message.content}`)
  

  
  if (content === null) return;

client.channels.cache.get(`${client.chat.estrela}`).messages.fetch({ message: `${content}`, cache: false, force: true }).then(msg => {
  msg.delete()
  msg.reactions.removeAll()
                                 });

    const userdb = await client.userdb.findOne({
         userID: reaction.message.author.id
     }) 

      if(!userdb){
         const newuser = new client.userdb({ userID: reaction.message.author.id})
        await  newuser.save();
         
         userdb = client.userdb.findOne({ userID: reaction.message.author.id })
     }


let estrela = userdb.estrelas;
  
await client.userdb.updateOne({
         userID: reaction.message.author.id
     }, { $set: {
         "estrelas": estrela + 1
     }
     })


  await db.delete(`estrela_${message.author.id}_${message.content}`)

  await db.delete(`msgEstrela_${message.author.id}_${message.id}`)
}
  }
});
