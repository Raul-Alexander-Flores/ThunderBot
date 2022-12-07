const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder}= require(`discord.js`);
const { QuickDB } = require(`quick.db`)

const db = new QuickDB();



module.exports ={
    data: new SlashCommandBuilder()
    .setName(`removewelchannel`)
    .setDescription(`This disables the welcome message`),
    async execute (interaction, client){

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to disable messages ", ephemeral: true})


        const channel = interaction.options.getChannel(`channel`)

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`:white_check_mark: Your welcome channel has been removed`)


        await db.delete(`welchannel_${interaction.guild.id}`)

        await interaction.reply({embeds: [embed]})
    }

}