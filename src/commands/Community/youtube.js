const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require("@discordjs/rest");
const { Routes, ApplicationCommandOptionType } = require("discord.js");
const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports ={
    data: new SlashCommandBuilder()
        .setName('youutbe')
        .setDescription("Please enter youtube link")
        .addStringOption(option => option.setName('youtube').setDescription('UID').setRequired(true)),

        async execute (interaction, client){
            
            youtube =  interaction.options.getString("youtube");


            ytdl(`${youtube}`)
                    .pipe(fs.createWriteStream('video.mp4'));

   
        
    
    }
    
  
  };