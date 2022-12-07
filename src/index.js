const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, messageLink } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { REST } = require("@discordjs/rest");
const welcome = require('./events/welcome.js')
const gpt3 = require('./GPT3/gpt3text.js')
const dplayer = require('./events/discordplayer.js');
const TwitchApi = require("node-twitch").default;
require('dotenv').config();




client.on("ready", () => {
    gpt3(client)
    // welcome(client)
    dplayer(client)
    })

  client.commands = new Collection();


// ********************* EVENTS AND COMMANDS ************************

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands");


(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events");
    client.handleCommands(commandFolders, "./commands/");
    client.login(process.env.DISCORD_TOKEN)
})();

client.on(Events.InteractionCreate, async interaction =>{
  if(!interaction.isModalSubmit()) return;

  if(interaction.customId === 'modal'){
    await interaction.reply({ content: 'Your modal has been submitted', ephemeral: true})
  }
  


  const name = interaction.fields.getTextInputValue('name');
  const about = interaction.fields.getTextInputValue('about');

  const member = interaction.user.id;
  const tag = interaction.user.tag;


  console.log(`Name:${name} \nAbout the person: ${about}\nSubmitted by: ${member}`)
})


// ********************* Welcome ************************


const { QuickDB } = require(`quick.db`);
const db = new QuickDB();

client.on(Events.GuildMemberAdd, async (member) =>{

  const channelID = await db.get(`welchannel_${member.guild.id}`)
  const channel = member.guild.channels.cache.get(channelID)
  const message = `Welcome to the server, ${member}`

  if (channelID == null) return;

  channel.send(message)

}) 
