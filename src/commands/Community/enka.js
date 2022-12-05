const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder}= require(`discord.js`)
const { EnkaClient } = require("enka-network-api");
const enka = new EnkaClient({ timeout: 4000, defaultLanguage: "en" });

module.exports ={
    data: new SlashCommandBuilder()
    .setName('enka')
    .setDescription("Please Enter UID")
    .addIntegerOption(option => option.setName('uid').setDescription('UID').setRequired(true)),

    async execute (interaction, client){

        const genUID = interaction.options.getInteger('uid');
        baseUrl = 'https://enka.network/u/'


        await interaction.reply({content: baseUrl +`${genUID}`, ephemeral: false}).catch((err=>{
            console.log(err)
            return;
        }))
    }
}