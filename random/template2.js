const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require('@discordjs/builders');
const Twit = require('twitter-v2')
const needle = require('needle');



require('dotenv').config();





module.exports = {
    data: new SlashCommandBuilder()
    .setName('listening')
    .setDescription('Talk to the AI BOT'),
    
    
    
    async execute(interaction, client){




}
}