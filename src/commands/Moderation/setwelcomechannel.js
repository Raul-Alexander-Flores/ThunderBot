const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , EmbedBuilder}= require(`discord.js`);
const { QuickDB } = require(`quick.db`)




module.exports ={
    data: new SlashCommandBuilder()
    .setName(`setwelchannel`)
    .addChannelOption(option => option.setName('channel').setDescription(`This is the channel where you want the welcome message to be sent`).setRequired(true))
    .setDescription(`This sets a welcome channel`),
    
    async execute (interaction){
        
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to set welcome channel ", ephemeral: true})
        
        
        const db = new QuickDB();
        const channel = interaction.options.getChannel(`channel`)
        
        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`:white_check_mark: Your welcome channel has been set to ${channel}`)


        await db.set(`welchannel_${interaction.guild.id}`, channel.id)

        await interaction.reply({embeds: [embed]})
    }

}