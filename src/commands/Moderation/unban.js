const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('This command bans a member')
    .addUserOption(option => option.setName('target').setDescription('The user you would like to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for banning the user').setRequired(true)),


    async execute(interaction, client){

        const unbanUser = interaction.options.getUser('target');
        const unbanMember = await interaction.guild.bans.remove(unbanUser);
        const channel = interaction.channel;

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})
        
        if(!unbanMember) return await interaction.reply({ content: 'The user mentioned is not banned from the server', ephemeral: true});

       // if(!banMember.kickable) return await interaction.reply({content: 'I cannot ban this user becaue they have roles above me or you ', ephemeral: true})


        let reason = interaction.options.getString('reason');
        if (!reason) reason ='No reason given';

        const dmEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription( `:white_check_mark: You have been unbanned from **${interaction.guild.name} | ${reason}`)


        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(` :white_check_mark: ${unbanUser.tag} has been **unbanned**`)

        await unbanMember.send({ embeds: [dmEmbed]}).catch(err=>{
            return;
        })

        await interaction.reply({embeds: [embed]}).catch(err=>{
            interaction.reply({content: " There was an error", ephemeral: true});
        })

    }
}