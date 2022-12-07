const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('Use this command to change users nickname ')
    .addUserOption(option => option.setName('target').setDescription('Select a user to change nickname').setRequired(true))
    .addStringOption(option => option.setName('nickname').setDescription('Type in the nickname').setRequired(true)),


    async execute(interaction, client){


        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to change nicknames", ephemeral: true})
        
        const user = interaction.options.getUser('target');
        const userId = await interaction.guild.members.fetch(user.id);
        const nickname = interaction.options.getString('nickname')
        
        if(!userId.kickable) return await interaction.reply({content: 'I cannot change this users nickname ', ephemeral: true})


        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: Changed ${user.tag} to **${nickname}**`)

    
        
        userId.setNickname(nickname).catch(err=>{
            console.log(err)
        })
        
        
        await interaction.reply({embeds: [embed]}).catch(err=>{
            return;
        });

    }



}