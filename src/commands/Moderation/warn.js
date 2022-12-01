const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { PermissionsBitField, EmbedBuilder } = require(`discord.js`);
const { QuickDB } = require("quick.db");

const db = new QuickDB()


module.exports = { 
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warns a member")
    .addUserOption(option => option.setName('target').setDescription('The user you would like to warn').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for warning the user').setRequired(true)),

    async execute(interaction){
        if( !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: " You dont have permission to execute this command", ephemeral: true})

        const member = interaction.options.getUser('target')
        let reason = interaction.options.getString('reason')

        if(!reason) reason = 'No reason provided'

        const dmEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`:white_check_mark:  You have been **warned** in ${interaction.guild.name}  | reason`)
    

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`:white_check_mark:  ${member.tag} has been ** warned| ${reason}`)

        await interaction.reply({embeds: [embed]});

        await member.send({embeds: [ dmEmbed]}).catch(err =>{
            return;
        })

        db.add(`warns_${member}`, 1)
    
    }
}
