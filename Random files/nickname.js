const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('Use this command to create a mute a user '),

    async execute(interaction, client){


        if(!interaction.member.permissions.has("MANAGE_NICKNAMES")) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})



        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: Deleted  messages`)

    
        await interaction.reply({embeds: [embed]}).catch(err=>{
            return;
        });

    }



}