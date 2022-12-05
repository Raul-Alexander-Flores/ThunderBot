const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();
const Discord = require('discord.js');
const tmi = require('tmi.js');

module.exports ={
    data: new SlashCommandBuilder()
    .setName('twitch')
    .setDescription("Twitch"),

    async execute (interaction, client){


    const twitch = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true,
    },
    identity: {
        username: 'process.env.YOUR_TWITCH_USERNAME',
        password: 'process.env.YOUR_TWITCH_PASSWORD',
    },
    channels: ['process.env.YOUR_TWITCH_CHANNEL'],
    });

  twitch.connect();
  twitch.on('stream-online', async (channel, tags) => {
    await interaction.reply({ content: `Image being generated`, ephemeral: true})
}).catch(err =>{
    return
})
}}