const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require('@discordjs/builders');
const TwitchApi = require("node-twitch").default;

require('dotenv').config();

module.exports ={
    data: new SlashCommandBuilder()
    .setName('twitch')
    .setDescription("Twitch"),

    async execute (interaction, client){

        const twitch = new TwitchApi({
            client_id: process.env.TWITCH_CLIENT_ID,
            client_secret: process.env.TWITCH_KEY_SECRET

        })


        async function getStream(){
            const streams = await twitch.getStreams({ channel: "Asmongold" });
            const stream = streams.data[0].user_name;
            const streamID = streams.data[0]?.id;
            
            
            const message2 = 'Hmmge'
            const message = `${stream} `
        
        
            if (streamID === undefined ){
              console.log('no stream today')
            }else(
              //console.log(message),
             //console.log(message2)
              console.log('stream_on')
            )
            await interaction.reply({ content: `${stream}`, ephemeral: false})
          }
        
          getStream();
            
    }
}