const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder}= require(`discord.js`)


module.exports ={
    data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription("Timeout a specific Member")
    .addUserOption(option => option.setName('target').setDescription('The member you would like to timeout ').setRequired(true))
    .addIntegerOption(option => option.setName('amount').setDescription('The amount of seconds to time out user').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for banning the user').setRequired(true)),

    async execute (interaction, client){


        
        const timeoutUser = interaction.options.getUser('target');
        const timeoutMember = await interaction.guild.members.fetch(timeoutUser.id);

        const duration = interaction.options.getInteger('amount');
        
        //console.log(timeoutMember)

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})
        if(!timeoutUser) return interaction.reply("Please specify a member to timeout")
        if(!interaction.member === timeoutUser) return interaction.reply("You cannot timeout yourself")
        if(!duration) return interaction.reply("Please specify a duration in which you want the member to be timed out.")
        if(duration > 604800) return interaction.reply("Please specify a duration between 1 & 604800 (one week) seconds")

        if(isNaN(duration)){
            return interaction.reply("Please specify a valid number in the duration")
        }

        let reason = interaction.options.getString('reason');
        if (!reason) reason ='No reason given';

        const dmEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription( `:white_check_mark: You have been timed out for ${duration} from **${interaction.guild.name} | ${reason}`)


        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription( `:white_check_mark: You have been timed out for ${duration} | ${reason}`)

        timeoutMember.timeout(duration * 1000, reason);

        interaction.reply({ embeds: [ embed ]})

        timeoutUser.send({ embeds: [ dmEmbed ]}).catch(err=>{
            return;
        })
    }
}