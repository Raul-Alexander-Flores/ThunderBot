const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require("@discordjs/rest");
const { Routes, ApplicationCommandOptionType } = require("discord.js");
const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports ={
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription("Please enter youtube link")
        .addStringOption(option => option.setName('youtube').setDescription('Temp download twitch').setRequired(true)),

        async execute (interaction, client){
            

            youtubeLink =  interaction.options.getString("youtube");

            const video = ytdl(`${youtubeLink}`,{quality: 18});
            video.on('progress', function(info) {
            console.log('Download progress')
                })
            video.on('end', function(info) {
            console.log('Download finish')
            })
                    
            video.pipe(fs.createWriteStream('video.mp4'));
    }
    
  };