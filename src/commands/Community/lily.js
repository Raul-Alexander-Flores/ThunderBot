const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require("@discordjs/rest");



module.exports = {
    data: new SlashCommandBuilder()
    .setName('lily')
    .setDescription('Wheres my money'),

    async execute(interaction, client){
        await interation.reply({ content: ` The bot is working `, ephemeral: true})
        await interaction.channel.send('Wheres my welkin Lily')
    },
}

