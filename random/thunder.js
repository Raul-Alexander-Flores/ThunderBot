const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const Twit = require('twitter-v2')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require('@discordjs/builders');


const tweeter = new Twit({
    bearer_token:  process.env.BEARER_TOKEN
  })


  module.exports = {
    data: new SlashCommandBuilder()
    .setName('thunderplus')
    .setDescription('Check out last tweet from thunderplus'),


    async execute(interaction, tweet, client){
        const url = "https://twitter.com/thunderpluss/status/" + tweet.id
        
        const embed = new EmbedBuilder()
                .setColor("Blue")
                .setTitle('Latest Tweet')
                .setDescription(`${process.env.CHANNEL_MESSAGE} ${url}`)
    
            await interaction.reply({ embeds: [embed]})

    }

  }


