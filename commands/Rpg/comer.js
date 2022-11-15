module.exports = {
   name: 'comer',
    aliases: [''],
    description: "Restaure sua fome ou vida",
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

let fome = userdb.rpg.status.fome;
let vida = userdb.rpg.status.vida;
let comida = userdb.rpg.item.comida;



    if (userdb.rpg.status.fome === 100) return message.reply({
      content: `:x: | Você não está com fome..`
    })



    if (comida < 10) return message.reply({content: `:x: | Você precisa ter pelo menos 10 comidas, no momento você só tem ${comida} comidas.`})

    if (fome > 95) return message.reply({
      content: `:x: | Você não está com fome..`
    })
    
    if (userdb.rpg.status.vida < 95){
let novaVida = Math.floor(Math.random() * 2) + 5
let novaFome = Math.floor(Math.random() * 2) + 5

await client.userdb.updateOne({
         userID: message.author.id
     }, { $set: {
         "rpg.status.fome": fome + novaFome,
         "rpg.status.vida": vida + novaVida,
         "rpg.item.comida": comida - novaFome
         }
        })

      message.reply({content: `Você comeu **\`${novaFome}\`** comidas e regenorou **\`${novaVida + vida}/100\`** de vida e **\`${novaFome + fome}/100\`** de fome!`})

    } else {

let novaFome2 = Math.floor(Math.random() * 2) + 5
      
      await client.userdb.updateOne({
         userID: message.author.id
     }, { $set: {
         "rpg.status.fome": fome + novaFome2,
        "rpg.item.comida": comida - novaFome2
         }
        })

      message.reply({content: `Você comeu **\`${novaFome2}\`** comidas e regenorou **\`${novaFome2 + fome}/100\`** de fome!`})
    }
    
	}
};
