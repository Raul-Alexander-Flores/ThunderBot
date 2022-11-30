const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require("@discordjs/rest");
require('dotenv').config();




module.exports = {
    data: new SlashCommandBuilder()
    .setName('lily')
    .setDescription('Wheres my money'),

    async execute(interation, client){
        await interation.reply({ content: ` The bot is working `, ephemeral: true})
        await interation.channel.send('Wheres my welkin Lily')
    },
}

