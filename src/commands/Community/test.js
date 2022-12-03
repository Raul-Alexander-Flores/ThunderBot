const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require("@discordjs/rest");




module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Checks if the bot is working'),

    async execute(interaction, client){
        await interaction.reply({ content: `The bot is working`, ephemeral: true})
        await interaction.channel.send('The Bot is working')
    },
}

