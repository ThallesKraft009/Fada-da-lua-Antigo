const client = require('..')
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const Canvas = require("canvas")
const { registerFont } = require('canvas')
registerFont('././osvaldo.ttf', { family: 'osvaldo' })
const Discord = require("discord.js");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

const tempo = require("ms");

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

  const fome = userdb.rpg.status.fome;

  if (interaction.customId === `trocarMadeira_${interaction.user.id}`){
    
    let total = await db.get(`trocar_${interaction.user.id}`)

    let money = Number(`${total}`)


if (userdb.rpg.blocos.madeira < money) return interaction.reply({content: `:x: | Você não tem tudo isso de madeiras!`, ephemeral: true})

interaction.reply({content: `Parabéns! Agora você tem ${money} MiniMoedas!`, ephemeral: true})

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.money": userdb.rpg.money + money,
         "rpg.blocos.madeira": userdb.rpg.blocos.madeira - money
         }
        })
           
  }



  if (interaction.customId === `trocarPedra_${interaction.user.id}`){
    
    let total = await db.get(`trocar_${interaction.user.id}`)

    let money = Number(`${total}`)


if (userdb.rpg.blocos.pedra < money) return interaction.reply({content: `:x: | Você não tem tudo isso de pedras!`, ephemeral: true})

interaction.reply({content: `Parabéns! Agora você tem ${money + 2} MiniMoedas!`, ephemeral: true})

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.money": userdb.rpg.money + money + 2,
         "rpg.blocos.pedra": userdb.rpg.blocos.pedra - money
         }
        })
           
  }






  

  if (interaction.customId === `explorar_${interaction.user.id}`){
    if (userdb.rpg.status.vida < 5) return interaction.reply({
      content: `:x: | Você não pode explorar pois está com vida baixa!`,
      ephemeral: true
    })

    
    if (userdb.rpg.status.fome < 5) return interaction.reply({
      content: `:x: | Você não pode explorar pois está com fome!`,
      ephemeral: true
    })

    await interaction.deferUpdate()

    let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`explorar_${interaction.user.id}`)
					.setLabel('Sua aventura terminará em 1 minuto')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true)
			);

    interaction.editReply({
      content: `<a:Doguinhu:795105130311712829> | ${interaction.user}`,
      components: [botao]
    }).then(async(msg) => {// setTimeout(async() => {

    await wait(tempo("1m"));

let ilhas = ["Não", "Não", "Não", "Não", "Não", "Sim", "Não", "Não"];

    let ilha = ilhas[Math.floor(Math.random() * ilhas.length)];

let bioma = ["Em criação..."];

const comida = Math.floor(Math.random() * 5) + 15

let a = Math.floor(Math.random() * 50) + 500



    const img = new AttachmentBuilder("https://cdn.discordapp.com/attachments/1028756005556846632/1036807732998717471/aventura.png", {name: 'aventura.png'}) 

    if (ilha === "Sim"){

      //explorar: {
     // ilhaflutuanteA
      

      await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
    "rpg.status.fome": fome - 2,
    "rpg.item.comida": userdb.rpg.item.comida + comida,
        "explorar.ilhaflutuanteA": a
         }
        })

      msg.reply({content: `<a:Doguinhu:795105130311712829> | ${interaction.user}\n> Achou ilha flutuante? **\`${ilha}\`**\n> Achou novo bioma? **\`${bioma}\`**> Comida: **\`${comida}\`**`, files: [img]})
    }

    
      await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
    "rpg.status.fome": fome - 2,
    "rpg.item.comida": userdb.rpg.item.comida + comida
         }
        })

  msg.reply({content: `<a:Doguinhu:795105130311712829> | ${interaction.user}\n> Achou ilha flutuante? **\`${ilha}\`**\n> Achou novo bioma? **\`${bioma}\`**> Comida: **\`${comida}\`**`, files: [img]})
    })
  //  }, tempo("1m"))
    
  }

if (interaction.customId === `mob_${interaction.user.id}`){

  let statust = ["matou", "f", "matou", "matou"];

  
let status = statust[Math.floor(Math.random() * statust.length)];

  if (status === "f"){

    let vidaa = Math.floor(Math.random() * 5) + 7

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.status.vida": userdb.rpg.status.vida - vidaa,
    "rpg.status.fome": fome - 2
         }
        })

    let botao1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder() .setCustomId(`minerar_${interaction.user.id}`) .setLabel('Continuar') .setStyle(ButtonStyle.Secondary) 
    )

interaction.reply({
  content: `Você não consegiu matar o monstro, mas fugiu. No entanto, Você perdeu **\`${vidaa}\`** de vida!`,
  components: [botao1],
  ephemeral: true
})


  } else {
    
let vida = Math.floor(Math.random() * 2) + 5

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.status.vida": userdb.rpg.status.vida - vida,
        "rpg.status.fome": fome - 2
         }
        })

    let botao2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder() .setCustomId(`minerar_${interaction.user.id}`) .setLabel('Continuar') .setStyle(ButtonStyle.Secondary) 
    )

interaction.reply({
  content: `Você  consegiu matar o monstro! No entanto, Você perdeu **\`${vida}\`** de vida!`,
  components: [botao2],
  ephemeral: true
})


  }
  
}


  
if (interaction.customId === `assarTitanio_${interaction.user.id}`){
  let total = await db.get(`fornalha_${interaction.user.id}`);

  let valor = Number(`${total}`)

if (userdb.rpg.mineriosBloco.titanio < valor) return interaction.reply({
  content: `Você não tem tudo isso de minério de titanio..`,
  ephemeral: true
})



  if (userdb.rpg.minerios.carvao < valor) return interaction.reply({
  content: `Você não tem tudo isso de carvão.`,
  ephemeral: true
})

  interaction.reply({
    content: `Espere 35 segundos...`,
    ephemeral: true
  })


		await wait(35000);
		

  interaction.editReply({
    content: `Foram transformados ${valor} blocos de titanio em minérios de titanio!`
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.carvao": userdb.rpg.minerios.carvao - valor,
  "rpg.minerios.titanio": userdb.rpg.minerios.titanio + valor,
  "rpg.mineriosBloco.titanio": userdb.rpg.mineriosBloco.titanio - valor
         }
        })
  
}



  
if (interaction.customId === `assarFerro_${interaction.user.id}`){
  let total = await db.get(`fornalha_${interaction.user.id}`);

  let valor = Number(`${total}`)

  if (userdb.rpg.mineriosBloco.ferro < valor) return interaction.reply({
  content: `Você não tem tudo isso de minério de ferro..`,
  ephemeral: true
})

  if (userdb.rpg.minerios.carvao < valor) return interaction.reply({
  content: `Você não tem tudo isso de carvão.`,
  ephemeral: true
})

  interaction.reply({
    content: `Espere 35 segundos...`,
    ephemeral: true
  })


		await wait(35000);
		

  interaction.editReply({
    content: `Foram transformados ${valor} blocos de ferro em minérios de ferro!`
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.carvao": userdb.rpg.minerios.carvao - valor,
  "rpg.minerios.ferro": userdb.rpg.minerios.ferro + valor,
  "rpg.mineriosBloco.ferro": userdb.rpg.mineriosBloco.ferro - valor
         }
        })
  
}




  


if (interaction.customId === `assarCobre_${interaction.user.id}`){
  let total = await db.get(`fornalha_${interaction.user.id}`);

  let valor = Number(`${total}`)

if (userdb.rpg.mineriosBloco.cobre < valor) return interaction.reply({
  content: `Você não tem tudo isso de minério de cobre..`,
  ephemeral: true
})

  if (userdb.rpg.mineriosBloco.cobre < valor) return interaction.reply({
  content: `Você não tem tudo isso de minério de cobre..`,
  ephemeral: true
})

  if (userdb.rpg.minerios.carvao < valor) return interaction.reply({
  content: `Você não tem tudo isso de carvão.`,
  ephemeral: true
})

  interaction.reply({
    content: `Espere 35 segundos...`,
    ephemeral: true
  })


		await wait(35000);
		

  interaction.editReply({
    content: `Foram transformados ${valor} blocos de cobre em minérios de cobre!`
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.carvao": userdb.rpg.minerios.carvao - valor,
  "rpg.minerios.cobre": userdb.rpg.minerios.cobre + valor,
  "rpg.mineriosBloco.cobre": userdb.rpg.mineriosBloco.cobre - valor
         }
        })
  
}


  

  if (interaction.customId === `updateFornalha_${interaction.user.id}`){
    if (userdb.rpg.item.fornalha === null) return interaction.reply({
      content: `Você não tem uma fornalha..`,
      ephemeral: true
    })

let fornalha = userdb.rpg.item.fornalha 


if (fornalha === "titanio") return interaction.reply({
  content: `A fornalha já está em seu nivel maximo`,
  ephemeral: true
})



if (fornalha === "ferro"){

if (userdb.rpg.money < 20000) return interaction.reply({content: `Você precisa de 20 mil mini moedas..`,
  ephemeral: true
                                                      })

if (userdb.rpg.minerios.titanio < 10) return interaction.reply({content: `Você precisa de 10 minérios de titanio`, ephemeral: true})

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.item.fornalha": "titanio",
         "rpg.money": userdb.rpg.money - 20000,
         "rpg.minerios.titanio": userdb.rpg.minerios.titanio - 10
         }
        })

interaction.reply({
  content: `Você atualizou sua fornalha de ferro para uma fornalha de titanio!!`,
  ephemeral: true
})

      
    }

    

if (fornalha === "cobre"){

if (userdb.rpg.money < 5000) return interaction.reply({content: `Você precisa de 5 mil mini moedas..`,
  ephemeral: true
                                                      })

if (userdb.rpg.minerios.ferro < 10) return interaction.reply({content: `Você precisa de 10 minérios de ferro`, ephemeral: true})

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.item.fornalha": "ferro",
         "rpg.money": userdb.rpg.money - 5000,
         "rpg.minerios.cobre": userdb.rpg.minerios.ferro - 10
         }
        })

interaction.reply({
  content: `Você atualizou sua fornalha de cobre para uma fornalha de ferro!!`,
  ephemeral: true
})

      
    }


    

    if (fornalha === "pedra"){

if (userdb.rpg.money < 1000) return interaction.reply({content: `Você precisa de mil mini moedas..`,
  ephemeral: true
                                                      })

if (userdb.rpg.minerios.cobre < 10) return interaction.reply({content: `Você precisa de 10 minérios de cobre`, ephemeral: true})

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.item.fornalha": "cobre",
         "rpg.money": userdb.rpg.money - 1000,
         "rpg.minerios.cobre": userdb.rpg.minerios.cobre - 10
         }
        })

interaction.reply({
  content: `Você atualizou sua fornalha de pedra para uma fornalha de cobre!!`,
  ephemeral: true
})

      
    }
    
  }
  
/*config: {
      madeiraTotal: { type: Number, default: 2 },
      madeiraMoney: { type: Number, default: 100 }
    },
*/

if (interaction.customId === `updateMadeira_${interaction.user.id}`){

if (userdb.rpg.config.madeiraMoney > userdb.rpg.money) return interaction.reply({
  content: `:x: | Você precisa ter ${userdb.rpg.config.madeiraMoney} MiniMoedas!`,
  ephemeral: true
})

let configMoney = userdb.rpg.config.madeiraMoney;
  
  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.money": userdb.rpg.money - configMoney,
         "rpg.config.madeiraTotal": userdb.rpg.config.madeiraTotal + 15,
    "rpg.config.madeiraMoney": configMoney + 150
         }
        })

  interaction.reply({
    content: `Parabéns! Agora a cada madeira que você coletar, vai ganhar muito mais!!`,
    ephemeral: true
  })
  
}


/*
mineriosBloco: {
      cobre: { type: Number, default: 0},
      ferro: { type: Number, default: 0},
      titanio: { type: Number, default: 0}
    },
  */

  if (interaction.customId === `trocarTitanio_${interaction.user.id}`){
    let total = await db.get(`trocar_${interaction.user.id}`)

    let money = Number(`${total}`)


if (userdb.rpg.minerios.titanio < money) return interaction.reply({content: `:x: | Você não tem tudo isso de titanio!`, ephemeral: true})

interaction.reply({content: `Parabéns! Agora você tem ${money + 30} MiniMoedas!`, ephemeral: true})

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.money": userdb.rpg.money + money + 30,
         "rpg.minerios.titanio": userdb.rpg.minerios.titanio - money
         }
        })
           
  }



  
  if (interaction.customId === `trocarFerro_${interaction.user.id}`){
    let total = await db.get(`trocar_${interaction.user.id}`)

    let money = Number(`${total}`)


if (userdb.rpg.minerios.ferro < money) return interaction.reply({content: `:x: | Você não tem tudo isso de ferro!`, ephemeral: true})

interaction.reply({content: `Parabéns! Agora você tem ${money + 10} MiniMoedas!`, ephemeral: true})

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.money": userdb.rpg.money + money + 10,
         "rpg.minerios.ferro": userdb.rpg.minerios.ferro - money
         }
        })
           
  }

  if (interaction.customId === `trocarCobre_${interaction.user.id}`){
    let total = await db.get(`trocar_${interaction.user.id}`)

    let money = Number(`${total}`)


if (userdb.rpg.minerios.cobre < money) return interaction.reply({content: `:x: | Você não tem tudo isso de cobre!`, ephemeral: true})

interaction.reply({content: `Parabéns! Agora você tem ${money + 5} MiniMoedas!`, ephemeral: true})

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.money": userdb.rpg.money + money + 5,
         "rpg.minerios.cobre": userdb.rpg.minerios.cobre - money
         }
        })
           
  }
  


if (interaction.customId === `picaretaTitanioFerro_${interaction.user.id}`){

    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.titanio === 0 || userdb.rpg.picaretas.titanio < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de titanio!`, ephemeral: true})
} else {
let valor = Math.floor(Math.random() * 70) + 100

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.ferro": userdb.rpg.mineriosBloco.ferro + valor,
  "rpg.picaretas.titanio": userdb.rpg.picaretas.titanio - valor,
      "rpg.status.fome": fome - 1
         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de ferro!!`,
    components: [continuar],
    ephemeral: true
  })
}                         
}




if (interaction.customId === `picaretaFerroFerro_${interaction.user.id}`){

    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.ferro === 0 || userdb.rpg.picaretas.ferro < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de ferro!`, ephemeral: true})
} else {
let valor = Math.floor(Math.random() * 30) + 70

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.ferro": userdb.rpg.mineriosBloco.ferro + valor,
  "rpg.picaretas.ferro": userdb.rpg.picaretas.ferro - valor,
      "rpg.status.fome": fome - 1
         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de ferro!!`,
    components: [continuar],
    ephemeral: true
  })
}                         
}
  




  

if (interaction.customId === `picaretaCobreFerro_${interaction.user.id}`){

    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.cobre === 0 || userdb.rpg.picaretas.cobre < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de cobre!`, ephemeral: true})
} else {
let valor = Math.floor(Math.random() * 10) + 30

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.ferro": userdb.rpg.mineriosBloco.ferro + valor,
  "rpg.picaretas.cobre": userdb.rpg.picaretas.cobre - valor,
      "rpg.status.fome": fome - 1
         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de ferro!!`,
    components: [continuar],
    ephemeral: true
  })
}                         
}





if (interaction.customId === `picaretaPedraCobre_${interaction.user.id}`){

    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.pedra === 0 || userdb.rpg.picaretas.pedra < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de pedra!`, ephemeral: true})
} else {
let valor = Math.floor(Math.random() * 2) + 17

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.cobre": userdb.rpg.mineriosBloco.cobre + valor,
  "rpg.picaretas.pedra": userdb.rpg.picaretas.pedra - valor,
      "rpg.status.fome": fome - 1
         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de cobre!!`,
    components: [continuar],
    ephemeral: true
  })
}                         
}

  



  
if (interaction.customId === `picaretaCobreCobre_${interaction.user.id}`){

    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.cobre === 0 || userdb.rpg.picaretas.cobre < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de cobre!`, ephemeral: true})
} else {
let valor = Math.floor(Math.random() * 60) + 100

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.cobre": userdb.rpg.mineriosBloco.cobre + valor,
  "rpg.picaretas.cobre": userdb.rpg.picaretas.cobre - valor,
      "rpg.status.fome": fome - 1
         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de cobre!!`,
    components: [continuar],
    ephemeral: true
  })
}                         
}





  
if (interaction.customId === `picaretaFerroCobre_${interaction.user.id}`){

    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.ferro === 0 || userdb.rpg.picaretas.ferro < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de ferro!`, ephemeral: true})
} else {
let valor = Math.floor(Math.random() * 100) + 300

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.cobre": userdb.rpg.mineriosBloco.cobre + valor,
  "rpg.picaretas.ferro": userdb.rpg.picaretas.ferro - valor,
      "rpg.status.fome": fome - 1
         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de cobre!!`,
    components: [continuar],
    ephemeral: true
  })
}                         
}


  
if (interaction.customId === `picaretaTitanioCobre_${interaction.user.id}`){

    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.titanio === 0 || userdb.rpg.picaretas.titanio < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de titânio!`, ephemeral: true})
} else {
let valor = Math.floor(Math.random() * 300) + 500

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.cobre": userdb.rpg.mineriosBloco.cobre + valor,
  "rpg.picaretas.titanio": userdb.rpg.picaretas.titanio - valor,
      "rpg.status.fome": fome - 1
         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de cobre!!`,
    components: [continuar],
    ephemeral: true
  })
}                         
}





           
if (interaction.customId === `picaretaTitanioCarvao_${interaction.user.id}`){

    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.titanio === 0 || userdb.rpg.picaretas.titanio < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de titânio!`, ephemeral: true})
} else {
let valor = Math.floor(Math.random() * 300) + 500

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.carvao": userdb.rpg.minerios.carvao + valor,
  "rpg.picaretas.titanio": userdb.rpg.picaretas.titanio - valor,
      "rpg.status.fome": fome - 1
         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de carvões!!`,
    components: [continuar],
    ephemeral: true
  })
}                         
}



  
if (interaction.customId === `picaretaFerroCarvao_${interaction.user.id}`){

    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.ferro === 0 || userdb.rpg.picaretas.ferro < 0) { interaction.reply({content: `:x: | Você não tem uma picareta de ferro!`,ephemeral: true })
                                    } else {

let valor = Math.floor(Math.random() * 100) + 300

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.carvao": userdb.rpg.minerios.carvao + valor,
  "rpg.picaretas.ferro": userdb.rpg.picaretas.ferro - valor,
    "rpg.status.fome": fome - 1

         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de carvões!!`,
    components: [continuar],
    ephemeral: true
  })
}             
}



  
if (interaction.customId === `picaretaCobreCarvao_${interaction.user.id}`){


    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.cobre === 0 || userdb.rpg.picaretas.cobre < 0) { interaction.reply({content: `:x: | Você não tem uma picareta de cobre!`, ephemeral: true})
                                    } else {

let valor = Math.floor(Math.random() * 40) + 70

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.carvao": userdb.rpg.minerios.carvao + valor,
  "rpg.picaretas.cobre": userdb.rpg.picaretas.cobre - valor,
    "rpg.status.fome": fome - 1

         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de carvões!!`,
    components: [continuar],
    ephemeral: true
  })
}                
}



  

if (interaction.customId === `picaretaPedraCarvao_${interaction.user.id}`){

    if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

if (userdb.rpg.picaretas.pedra === 0 || userdb.rpg.picaretas.pedra < 0) { interaction.reply({content: `:x: | Você não tem uma picareta de pedra!`, ephemeral: true})
                                    } else {
let valor = Math.floor(Math.random() * 10) + 30

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.carvao": userdb.rpg.minerios.carvao + valor,
  "rpg.picaretas.pedra": userdb.rpg.picaretas.pedra - valor,
    "rpg.status.fome": fome - 1

         }
        })



  interaction.reply({
    content: `Boa!! Você minerou **\`${valor}\`** minérios de carvões!!`,
    components: [continuar],
                           ephemeral: true                         
  })
}              
}


  
  
if (interaction.customId === `minerar_${interaction.user.id}`){

  if (userdb.rpg.status.vida < 2) return interaction.reply({content: `Sua vida está abaixo de "2", por isso você não pode minerar.`,
                               ephemeral: true                            })

    if (userdb.rpg.status.vida < 5) return interaction.reply({content: `Sua fome está abaixo de "5", por isso você não pode minerar.`,
                               ephemeral: true                            })

  let minerios = ["mob", "Carvao", "mob", "Carvao", "Carvao", "Cobre","Carvao", "Cobre", "mob", "Cobre", "Ferro", "Ferro", "mob", "mob"];

  let minerio = minerios[Math.floor(Math.random() * minerios.length)];

const botaoRetornar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel(' - Pular')
.setEmoji("🔁")
					.setStyle(ButtonStyle.Secondary)
  )

  if (minerio === "mob"){
    let atacar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`mob_${interaction.user.id}`)
					.setLabel(' - Atacar')
      .setEmoji('🗡')
					.setStyle(ButtonStyle.Secondary)
  )

interaction.reply({
  content: `Você achou um monstro!! Ataque!!!`,
  ephemeral: true,
  components: [atacar]
})


  }
                  
if (minerio === 'Carvao'){

  let botaoCarvao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`picaretaPedraCarvao_${interaction.user.id}`)
					.setLabel('Pedra')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaCobreCarvao_${interaction.user.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaFerroCarvao_${interaction.user.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaTitanioCarvao_${interaction.user.id}`)
					.setLabel('Titanio')
					.setStyle(ButtonStyle.Secondary),
    );

interaction.reply({content: `Boaa!! Você achou minério de carvão!! Mas..qual picareta você vai utilizar para minerar o carvão?`, components: [botaoCarvao, botaoRetornar], ephemeral: true})
  
  }


if (minerio === "Cobre"){

  let botaocobre = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`picaretaPedraCobre_${interaction.user.id}`)
					.setLabel('Pedra')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaCobreCobre_${interaction.user.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaFerroCobre_${interaction.user.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaTitanioCobre_${interaction.user.id}`)
					.setLabel('Titanio')
					.setStyle(ButtonStyle.Secondary),
    );

interaction.reply({content: `Boaa!! Você achou minério de cobre!! Mas..qual picareta você vai utilizar para minerar o cobre?`, components: [botaocobre, botaoRetornar], ephemeral: true})
  
  }


  if (minerio === "Ferro"){
      let botaoFerro = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
					.setCustomId(`picaretaCobreFerro_${interaction.user.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaFerroFerro_${interaction.user.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaTitanioFerro_${interaction.user.id}`)
					.setLabel('Titanio')
					.setStyle(ButtonStyle.Secondary),
    );

interaction.reply({content: `Boaa!! Você achou minério de ferro!! Mas..qual picareta você vai utilizar para minerar o ferro?`, components: [botaoFerro, botaoRetornar], ephemeral: true})
  
  }
  
}
  





if (interaction.customId === `picaretaTitanio_${interaction.user.id}`){
  if (userdb.rpg.minerios.titanio < 3) return interaction.reply({
    content: ":x: | Você não tem 3 minérios de titânio criar uma picareta de titânio!",
    ephemeral: true
  })

  if (userdb.rpg.item.graveto < 2) return interaction.reply({
    content: `:x: | Você não tem 2 gravetos!`,
    ephemeral: true
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.titanio": userdb.rpg.minerios.titanio - 3,
         "rpg.item.graveto": userdb.rpg.item.graveto - 2,
         "rpg.picaretas.titanio": 3500
         }
        })

  interaction.reply({content: `${interaction.user} Você criou uma picareta de titânio :DD`})
  
}



  

if (interaction.customId === `picaretaFerro_${interaction.user.id}`){
  if (userdb.rpg.minerios.ferro < 3) return interaction.reply({
    content: ":x: | Você não tem 3 minérios de ferro para criar uma picareta de ferro!",
    ephemeral: true
  })

  if (userdb.rpg.item.graveto < 2) return interaction.reply({
    content: `:x: | Você não tem 2 gravetos!`,
    ephemeral: true
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.ferro": userdb.rpg.minerios.ferro - 3,
         "rpg.item.graveto": userdb.rpg.item.graveto - 2,
         "rpg.picaretas.ferro": 1200
         }
        })

  interaction.reply({content: `${interaction.user} Você criou uma picareta de ferro :DD`})
  
}

  

  
  if (interaction.customId === `picaretaCobre_${interaction.user.id}`){
  if (userdb.rpg.minerios.cobre < 3) return interaction.reply({
    content: ":x: | Você não tem 3 minérios de cobre para criar uma picareta de cobre!",
    ephemeral: true
  })

  if (userdb.rpg.item.graveto < 2) return interaction.reply({
    content: `:x: | Você não tem 2 gravetos!`,
    ephemeral: true
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.cobre": userdb.rpg.minerios.cobre - 3,
         "rpg.item.graveto": userdb.rpg.item.graveto - 2,
         "rpg.picaretas.cobre": 700
         }
        })

  interaction.reply({content: `${interaction.user} Você criou uma picareta de cobre :DD`})
  
}





  


if (interaction.customId === `picaretaPedra_${interaction.user.id}`){
  if (userdb.rpg.blocos.pedra < 3) return interaction.reply({
    content: ":x: | Você não tem 3 pedras/rochas para criar uma picareta de pedra!",
    ephemeral: true
  })

  if (userdb.rpg.item.graveto < 2) return interaction.reply({
    content: `:x: | Você não tem 2 gravetos!`,
    ephemeral: true
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.blocos.pedra": userdb.rpg.blocos.pedra - 3,
         "rpg.item.graveto": userdb.rpg.item.graveto - 2,
         "rpg.picaretas.pedra": 400
         }
        })

  interaction.reply({content: `${interaction.user} Você criou uma picareta de pedra :DD`})
  
}
  
  if (interaction.customId === `proximaPg_Pedra_2_${interaction.user.id}`){
    let usersDB = await client.userdb.find({})
    usersDB.sort((a,b) => b.rpg.blocos.madeira - a.rpg.blocos.madeira)
    usersDB = usersDB.slice(5,10)
    
    let canvas = Canvas.createCanvas(800, 600)
    let ctx = canvas.getContext("2d")
        
    let serverIcon = await Canvas.loadImage(interaction.guild.iconURL({ forceStatic: true, extension: "png", size: 1024 }))
    ctx.drawImage(serverIcon, 515, -102.5, 285, 285)
    
    let background = await Canvas.loadImage("https://i.imgur.com/wIiuWJP.png")
    ctx.drawImage(background, 0, 75, canvas.width, canvas.height)

    let layout = await Canvas.loadImage("https://i.imgur.com/RCBNEMa.png")
    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

    ctx.font = '33px osvaldo';
    ctx.fillStyle = '#F8F8F8';
    ctx.fillText(`${interaction.guild.name}`, 265 - interaction.guild.name.length * 8, 50)
    
    for(let i = 0; i < usersDB.length; i++){

    let user = await client.users.fetch(usersDB[i].userID)
     
    let cordenada = i * 105
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

    let userAvatar2 = await Canvas.loadImage(`${user.displayAvatarURL({ forceStatic:true, extension: "png", size: 1024})}`) 
    ctx.drawImage(userAvatar2, 0, cordenada, 285, 285)
    ctx.restore()
     }

    await interaction.deferUpdate();
		await interaction.editReply({ content: '<a:bop:788210473454796861> | Carregando..', components: [] }).then(async(msg) => {
      await wait(1500)

const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'rankPedra2.png'}) 
    msg.edit({ content: `${interaction.user}`, files: [attachment], components: [] })
      
    })
  }
//----------------------------RANK-PAGINA 2

if (interaction.customId === `proximaPg_2_${interaction.user.id}`){

let usersDB = await client.userdb.find({})
    usersDB.sort((a,b) => b.rpg.blocos.madeira - a.rpg.blocos.madeira)
    usersDB = usersDB.slice(5,10)
    
    const canvas = Canvas.createCanvas(800, 600)
    const ctx = canvas.getContext("2d")
        
    const serverIcon = await Canvas.loadImage(interaction.guild.iconURL({ forceStatic: true, extension: "png", size: 1024 }))
    ctx.drawImage(serverIcon, 515, -102.5, 285, 285)
    
    const background = await Canvas.loadImage("https://i.imgur.com/wIiuWJP.png")
    ctx.drawImage(background, 0, 75, canvas.width, canvas.height)

    const layout = await Canvas.loadImage("https://i.imgur.com/RCBNEMa.png")
    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

    ctx.font = '33px osvaldo';
    ctx.fillStyle = '#F8F8F8';
    ctx.fillText(`${interaction.guild.name}`, 265 - interaction.guild.name.length * 8, 50)
    
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

  
  await interaction.deferUpdate();
		await interaction.editReply({ content: '<a:bop:788210473454796861> | Carregando..', components: [] }).then(async(msg) => {
      await wait(1500)

const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), {name: 'rankMadeira2.png'}) 
    msg.edit({ content: `${interaction.user}`, files: [attachment], components: [] })
      
    })
	
}
//------------------C O L E T A R   M A D E I R A
if (interaction.customId === `madeira_${interaction.user.id}`) {

let madeiraTotal = userdb.rpg.config.madeiraTotal;

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.blocos.madeira": userdb.rpg.blocos.madeira + madeiraTotal
         }
        })

let img = ['https://cdn.discordapp.com/attachments/893663610138685460/1000425760391180308/Screenshot_20220722-161145_Mini_World.jpg','https://cdn.discordapp.com/attachments/893663610138685460/1000425760768655381/Screenshot_20220722-161431_Mini_World.jpg','https://cdn.discordapp.com/attachments/893663610138685460/1000425761162932325/Screenshot_20220722-161729_Mini_World.jpg','https://cdn.discordapp.com/attachments/893663610138685460/1000425761456541796/Screenshot_20220722-155812_Mini_World.jpg','https://cdn.discordapp.com/attachments/893663610138685460/1000425761695604776/Screenshot_20220722-160120_Mini_World.jpg','https://cdn.discordapp.com/attachments/893663610138685460/1000425761943081093/Screenshot_20220722-160629_Mini_World.jpg'];

  let fotos = img[Math.floor(Math.random() * img.length)];
  
	interaction.reply({
    embeds: [
      new EmbedBuilder()
      .setDescription(`Você coletou ${madeiraTotal} blocos de madeira!`)
      .setColor("Blue")
      .setImage(`${fotos}`)
    ],
    ephemeral: true
  })
	}
  if (interaction.customId === `rochas_${interaction.user.id}`) {

let rochaTotal = userdb.rpg.config.madeiraTotal;

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.blocos.pedra": userdb.rpg.blocos.pedra + rochaTotal
         }
        })
    interaction.reply({
    embeds: [
      new EmbedBuilder()
      .setDescription(`Você coletou ${rochaTotal} rochas!`)
      .setColor("Blue")
    ],
    ephemeral: true
  })
  }
});
