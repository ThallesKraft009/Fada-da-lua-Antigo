const { EmbedBuilder } = require("discord.js");
const tempo = require("ms");

module.exports = {
  name: "giveaway-setup",
  aliases: ["sorteios", "giveaway", "iniciar sorteio", "start giveaway"],
  description: "Inicie um sorteio!",
    usage: '',
    category: 'Admin',
    cooldown: 5000,
  	userPerms: ['BanMembers'],
	  botPerms: [''],

run: async(client, message, args) => {

message.reply({
    embeds: [
    new EmbedBuilder()
    .setDescription("Qual o canal de texto para o sorteio?")
    .setColor("Green")
  ]
}).then(msg => {
  let coletor_1 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

            coletor_1.on("collect", (palavra_1) => {
                let chat = palavra_1.mentions.channels.first() || message.guild.channels.cache.get(palavra_1.content);


              
                if (!chat) {
    msg.edit({
      content: `**🚫 | Utilize o comando novamente e mencione um canal de texto.**`,
      embeds: []
    })
                } else
                if (chat) {
    const canal = client.channels.cache.get(`${chat.id}`)
                  msg.edit({
                    content: `${message.author}`,
                    embeds: [
                      new EmbedBuilder()
                      .setDescription(`Qual será o prêmio do sorteio?`)
                      .setColor(`Yellow`)
                    ]
                  }).then(msg2 => {
                  let coletor_4 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                                coletor_4.on("collect", (palavra_4) => {

                                  

                                    const premio = palavra_4.content;


                                  
msg.edit({
  content: `${message.author}`,
  embeds: [
    new EmbedBuilder()
    .setDescription(`
    Qual o tempo do sorteio? Exemplo: 1m, 1h, 1d.`)
    .setColor(`Orange`)
  ]
}).then(msg3 => {
  
let coletor_5 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                                coletor_5.on("collect", (palavra_5) => {

                                    const tempo2 = palavra_5.content;

                                                        

const time = tempo(tempo2)

  msg.edit({
    content: `${message.author}`,
    embeds: [
      new EmbedBuilder()
      .setDescription(`Quantos ganhadores o sorteio vai ter?`)
      .setColor(`Red`)
    ]
  }).then(msg4 => {

    let coletor_6 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                                coletor_6.on("collect", (palavra_6) => {

                                    let ganhadores = palavra_6.content;

                                  

        if (parseInt(ganhadores) > 10 || parseInt(ganhadores) <= 0) return msg.edit({
          content: `🚫 | Utilize o comando novamente e diga um número de 1 > 10.`
        })

let ganhador = Number(ganhadores);
                               
                                  
       msg.edit({
  content: `${message.author}`,
  embeds: [
    new EmbedBuilder()
    .setDescription(`O sorteio foi iniciado no ${canal}`)
  ]
})
                                  
const messages = require("./../../message.js")
                                  
client.giveawaysManager.start(canal, {
            
            duration: time,
            
            prize: premio,
            
            winnerCount: ganhador,
            
            messages
  
        });
  })     
  })
                                })
})

                                  
               })
        })
       }      
   })
 })
}}
