
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('removenickname')
    .setDescription('Use this command to remove a nickname ')
    .addUserOption(option => option.setName('target').setDescription('Select a user to remove').setRequired(true)),
    async execute(interaction, client){


        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to change nicknames", ephemeral: true})
        
        const user = interaction.options.getUser('target');
        const userId = await interaction.guild.members.fetch(user.id);
        const nickname = userId.nickname
  
        if(!userId.kickable) return await interaction.reply({content: 'I cannot change this users nickname ', ephemeral: true})
         
        // console.log(userId)

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: Sucessfuly removed ${user.tag} nickname`)

    
        
        userId.setNickname(null).catch(err=>{
            console.log(err)
        })
        
        await interaction.reply({embeds: [embed]}).catch(err=>{
            return;
        });

    }
}
