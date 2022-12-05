const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events } = require(`discord.js`);
const fs = require('fs');
const ytdl = require('ytdl-core');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { REST } = require("@discordjs/rest");
const Twit = require('twitter-v2')
const welcome = require('./events/welcome.js')
const gpt3 = require('./GPT3/gpt3text.js')
const { Player } = require("discord-player");

require('dotenv').config();




client.on("ready", () => {
    gpt3(client)
    welcome(client)
  
  })

client.commands = new Collection();


// ********************* Discord JS Player ************************


const player = new Player(client);

player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // /play track:Despacito
  // will play "Despacito" in the voice channel
  if (interaction.commandName === "play") {
      if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
      if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
      const query = interaction.options.getString("query");
      const queue = player.createQueue(interaction.guild, {
          metadata: {
              channel: interaction.channel,
              autoSelfDeaf: false,
              voiceChannel: true,

          }
        });
      
     // await queue.connect(interaction.member.voice.channel)
      // verify vc connection
      try {
          if (!queue.connection) await queue.connect(interaction.member.voice.channel);
      } catch {
          queue.clear()
          queue.destroy();
          return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
      }

      await interaction.deferReply();


      const track = await player.search(query, {
          requestedBy: interaction.user
      }).then(x => x.tracks[0]);

      console.log("************TRACK*************", track)
    ;




      
      queue.play(track)

      if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });
      console.log( " *************************QUEUE**************************", queue)


      console.log("************END*************")  
      
      player.on("error", (queue, error) => {
        console.log(`Error at ${queue.guild.id} | ${error.message}`);
    });
      return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });

  } 
    
});


// ************************* TWITTER ******************************


let twitterChannel = "HebeCelene";
let twitterID = "1494737971811135488";
let twitterUser = "HebeCelene";
        
const bearerToken = process.env.BEARER_TOKEN;
const userId = "1494737971811135488";
const url = `https://api.twitter.com/2/users/${userId}/tweets`;

client.once("ready", () => {
  //console.log("Ready!");
  //console.log(twitterChannel, twitterID, twitterUser)

  const channelID = '1048983473009983498';


  twitterChannel = client.channels.cache.get(channelID);
  // console.log(twitterChannel.id);
  // twitterChannel.send("Testing");
});
client.on("message", message => {
  if (message.content === "!ping") {
    message.channel.send("Pong.");
    // message.channel.send(message.author.bot);
    console.log(message.channel.id);
  }
  if (message.content === "!marx") {
    message.channel.send(
      "Workers of the world unite; you have nothing to lose but your chains."
    );
  }
  const twitterPrefix = "!set twitter";
  if (
    message.channel === twitterChannel &&
    message.content.startsWith(twitterPrefix)
  ) {
    twitterUser = message.content.slice(twitterPrefix.length + 1);
    bearerToken.get("users/lookup", { screen_name: twitterUser }, function(
      err,
      data,
      response
    ) {
      twitterID = data[0].id_str;
      // console.log(data);
      message.channel.send("Twitter User: " + twitterUser);
      message.channel.send("Twitter ID: " + twitterID);
      const stream = bearerToken.stream("statuses/filter", {
        follow: twitterID
        // filter_level: "low"
      });

      stream.on("tweet", tweet => {
        if (tweet.user.id_str === twitterID) {
          console.log(tweet);
          twitterChannel
            .send(
              "https://twitter.com/" + twitterUser + "/status/" + tweet.id_str
            )
            .catch(errors => {
              console.log(errors);
            });
        }
      });
    });
  }
  if (message.content === "!currenttwitter") {
    message.channel.send("Currently Following " + twitterUser);
  }
});

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

