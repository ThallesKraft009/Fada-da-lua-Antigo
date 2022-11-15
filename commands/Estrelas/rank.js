const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {

    name: 'rank',
    aliases: ['rank-estrelinhas'],
    description: "Veja o rank de estrelinhas!",
    usage: '',
    category: 'Admin',
    cooldown: 5000,
	userPerms: ['BanMembers'],
	botPerms: [''],

	run: async (client, message, args) => {
let userdb = await client.userdb.find({})
      
      userdb.sort((a,b) => (b.estrelas + b.estrelas) - (a.estrelas + a.estrelas))
      
      userdb = userdb.slice(0,15)
    

let ultimoRank = await db.get(`ultimoRank_${message.guild.id}`);

    if (ultimoRank === null){





      
     message.reply({content:`> ${userdb.map((user, i) => `#${i+1} | 👥**${client.users.cache.get(user.userID) || `sumido#0000`}** (⭐ ${abreviar(user.estrelas)})`).join("\n> ") }`
          }).then(async (msg) => {
  await db.set(`ultimoRank_${message.guild.id}`, `${msg.id}`)

  msg.pin()
})

      
    } else {
      
const botao = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel(' - Rank anterior')
          .setEmoji("⭐")
					.setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${ultimoRank}`)
			);


      message.reply({content:`**__⭐ | Rank de Estrelinhas__**\n\n> ${userdb.map((user, i) => `#${i+1} | 👥**${client.users.cache.get(user.userID) || `sumido#0000`}** (⭐ ${abreviar(user.estrelas)})`).join("\n> ") }`,
                     components: [botao]
          }).then(async(msg) => {

        msg.pin()


client.channels.cache.get(`${message.channel.id}`).messages.fetch({ message: `${ultimoRank}`, cache: false, force: true }).then(rank => {
  rank.unpin()
                                 });
        
        await db.delete(`ultimoRank_${message.guild.id}`).then(async() => {
          await db.set(`ultimoRank_${message.guild.id}`, `${msg.id}`)
        })
      })
    }
  
    }                         
};

function abreviar(number, precision=2) {
  return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
 }
