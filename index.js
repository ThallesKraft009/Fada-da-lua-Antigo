const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./configs/config.json')
const fs = require('fs')
const mongo = require("mongoose")
const DiscordModal = require('discord-modal')

require('events').EventEmitter.defaultMaxListeners = 500;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

DiscordModal(client)


client.commands = new Collection()
client.aliases = new Collection()
client.prefix = config.prefix
client.config = require('./configs/config.json');
client.MongoConnect = () => mongo.connect(config.mongo)
client.userdb = require("./MongoDB/user.js");
client.kanaeuser = require("./MongoDB/kanaeuser.js")
//client.config.GUILD_ID
client.botdb = require("./MongoDB/bot.js");
client.conexao = require("./MongoDB/conexao.js");
client.chat = require("./configs/chats.json")
require("./MongoDB/sorteio.js").run(client)
client.slashCommands = new Collection();
client.buttons = new Collection();
module.exports = client;
client.categories = fs.readdirSync("./commands/");

["command", "events", "slashCommand"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const { Player } = require("discord-player");

const player = new Player(client);

client.login(config.token)

//
antiErro()



  
function antiErro() {


  const c = require("colors");

        process.on('multipleResolves', (type, reason, promise) => {
    console.log(c.red(`🚫 Erro Detectado\n\n` + type, promise, reason))
});
        process.on('unhandRejection', (reason, promise) => {
    console.log(c.red(`🚫 Erro Detectado:\n\n` + reason, promise))
});
        process.on('uncaughtException', (error, origin) => {
    console.log(c.red(`🚫 Erro Detectado:\n\n` + error, origin))
});
        process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(c.red(`🚫 Erro Detectado:\n\n` + error, origin))
});
}
