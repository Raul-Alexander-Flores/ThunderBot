const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require("@discordjs/rest");
const { Routes, ApplicationCommandOptionType } = require("discord.js");
require('dotenv').config();


module.exports ={
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription("Please Enter Query")
        .addStringOption(option => option.setName('query').setDescription('UID').setRequired(true)),

        async execute (interaction, client){

   
        
    
    }
    
  
  };