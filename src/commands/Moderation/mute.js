const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Use this command to create a mute a user '),
    //.addUserOption(option => option.setName('target').setDescription('The user you would like to mute').setRequired(true))
    //.addStringOption(option => option.setName('reason').setDescription('The reason for kicking the user').setRequired(true)),
    

    async execute(interaction, client){

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})

        const muteRole = interaction.guild.roles.cache.find(r => r.name.includes('muted'))
        const muteUser = interaction.options.getUser('target');

        //let reason = interaction.options.getString('reason');
          if (!reason) reason ='No reason given';

        

        const channel = interaction.channnel;


        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})


        console.log("1**************" , muteUser)
        console.log("2**************"  ,muteRole)
        console.log("3**************"  , interaction.guild.roles)

       
        

        const dmEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription( `:white_check_mark: You have been muted from **${interaction.guild.name} | ${reason}`)


        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(` :white_check_mark: ${muteUser.tag} has been **kicked**`)

        await interaction.reply({embeds: [embed]});

    }
}