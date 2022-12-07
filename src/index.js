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




  const twitch = new TwitchApi({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_KEY_SECRET
 
  })
 
 
  /* const run = async function getStream(){
      const streams = await twitch.getStreams({ channel: "Asmongold" });
      const stream = streams.data[0].user_name;
      const streamID = streams.data[0]?.id;
      
  
      if (streamID === undefined ){
        console.log('no stream today')
      }else(
        console.log('stream_on')
      )
      
    }
    
  setInterval(run, 2000); */


    
  const run = async function Run() {
    await twitch.getStreams({ channel: "Asmongold" })
        .then(async data => {
        const r = data.data[0]
        // console.log(data.data[0])
        let ThisGuildOnly = client.guilds.cache.get("893188928184676352")
        const ChannelAnnounceLive = ThisGuildOnly.channels.cache.find(x => x.id === "1049807567645331618")
        let IsLiveMemory = false
        if (r !== undefined) {
            if (r.type === "live") {
                if (IsLiveMemory === false || IsLiveMemory === undefined) {
                    IsLiveMemory = true
                    ChannelAnnounceLive.send(` @everyone https://www.twitch.tv/${r.user_name} is now **LIVE**`)
                } else if (IsLiveMemory === true) {
                } else {}
            } else {
                if (IsLiveMemory === true) {
                    IsLiveMemory = false
                } else {}
            }
        } else {
            if (IsLiveMemory === true) {
                IsLiveMemory = false
            } else {
            }
        }
      })
  }
  setInterval(
      run, 200000)
