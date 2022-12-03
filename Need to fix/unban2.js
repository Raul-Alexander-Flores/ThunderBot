const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, Embed} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban2')
    .setDescription('This command unbans a member'),
    

    async execute(interaction, client){

        const member = args[0]

        let reason = argument.slice(1).join(" ") | `No reason given`

        const channel = interaction.channel;


        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: <@${member} has been unbanned | ${reason}`)
        
        if(!client.user.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})
      
        interaction.guild.bans.fetch()
        .then(async bans =>{
            if ( bans == 0); return channel.send(`There is no one banned from this server`)
        
        
        })


        await channel.send({ embeds: [ embed ]})
    }
}