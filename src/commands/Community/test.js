const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require("@discordjs/rest");
require('dotenv').config();




module.exports = {
    data: new SlashCommandBuilder()
    .setName('renzal')
    .setDescription('Wheres my money'),

    async execute(interaction, client){
        await interaction.reply({ content: ` The bot is working `, ephemeral: true})
        await interaction.channel.send('Wheres my welkin Renzal')
    },
}

