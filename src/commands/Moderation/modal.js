const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , ButtonStyle, TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder}= require(`discord.js`)

module.exports ={
    data: new SlashCommandBuilder()
    .setName('modal')
    .setDescription("This is a modal"),

    async execute (interaction, client){

        const modal = new ModalBuilder()
        .setTitle('Test Modal')
        .setCustomId('modal')

        const name = new TextInputBuilder()
        .setCustomId('name')
        .setRequired(true)
        .setLabel('Provide us with your name')
        .setStyle(TextInputStyle.Short)

        const about = new TextInputBuilder()
        .setCustomId('about')
        .setRequired(true)
        .setLabel('Provide us with a short essay about you')
        .setStyle(TextInputStyle.Paragraph)


        const firstActionRow = new ActionRowBuilder().addComponents(name)
        const secondActionRow = new ActionRowBuilder().addComponents(about)


        modal.addComponents(firstActionRow, secondActionRow)
        interaction.showModal(modal)




     
    }
}