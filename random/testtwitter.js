const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require('@discordjs/builders');
const Twit = require('twitter-v2')
var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({

});

require('dotenv').config();






module.exports = {
    data: new SlashCommandBuilder()
    .setName('lasttweet2')
    .setDescription('Talk to the AI BOT'),
    
    
    
    async execute(interaction, client){
        
        var config = {
            method: 'get',
            url: 'https://api.twitter.com/2/users/1494737971811135488/tweets',
            headers: { 
              'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAMggkAEAAAAAX5%2BQ0BzsXaN3mW5UgdO1DCQdfNg%3Dg9hg0gCFZG69icsz1Yv5WP7L5VnM34xtod3aQXmCp22jiZ5Q5a', 
              'Cookie': 'guest_id=v1%3A167017845142935374'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data[0]));
          })
          .catch(function (error) {
            console.log(error);
          });


}
}