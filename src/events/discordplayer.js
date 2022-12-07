const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events } = require(`discord.js`);
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { Player } = require("discord-player");
const ytdl = require('ytdl-core');


module.exports = client =>{

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

      // console.log("************TRACK*************", track)
    ;


    
    
    
    
    if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` }).catch(error=>{
      console.log(error)
    });
    // console.log( " *************************QUEUE**************************", queue)
    
    if(queue.track === []){
      queue.previousTracks.play(track)
    }else(queue.play(track))
    
    //console.log(queue.data, "Current");
    console.log('****************************************')
    // console.log(queue.Tracks, "TRACKS")
    console.log(queue.previousTracks, "Previous")

    // console.log("************END*************")  
      
    player.on("error", (queue, error) => {
      console.log(`${error.message}`);
    });
      return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
      

  } 

})

}
