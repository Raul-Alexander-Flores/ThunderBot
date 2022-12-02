const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('This command kicks a member')
    .addUserOption(option => option.setName('target').setDescription('The user you would like to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for kicking the user').setRequired(true)),


    async execute(interaction, client){

        const kickUser = interaction.options.getUser('target');
        const kickMember = await interaction.guild.members.fetch(kickUser.id);
        const channel = interaction.channnel;

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})
        if(!kickMember) return await interaction.reply({ content: 'The user mentioned is no longer within the server', ephemeral: true});

        if(!kickMember.kickable) return await interaction.reply({content: 'I cannt kick this user becaue they have roles above me or you ', ephemeral: true})


        let reason = interaction.options.getString('reason');
        if (!reason) reason ='No reason given';

        const dmEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription( `:white_check_mark: You have been kicked from **${interaction.guild.name} | ${reason}`)


        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(` :white_check_mark: ${kickUser.tag} has been **kicked**`)

        await kickMember.send({ embeds: [dmEmbed]}).catch(err=>{
            return;
        })

        await kickMember.kick({ reason: reason }).catch(err=>{
            interaction.reply({content: " There was an error", ephemeral: true});
        })

        await interaction.reply({embeds: [embed]});

    }
}