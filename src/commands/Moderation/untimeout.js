const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder}= require(`discord.js`)


module.exports ={
    data: new SlashCommandBuilder()
    .setName('untimeout')
    .setDescription("Untimeout a specific Member")
    .addUserOption(option => option.setName('target').setDescription('The member you would like to timeout ').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for banning the user').setRequired(true)),

    async execute (interaction, client){


        const unTimeoutUser = interaction.options.getUser('target');
        const unTimeoutMember = await interaction.guild.members.fetch(unTimeoutUser.id);


        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})
        if(!unTimeoutUser) return interaction.reply("Please specify a member to timeout")
        if(!interaction.member === unTimeoutUser) return interaction.reply("You cannot untimeout yourself")
       // if(!timeoutUser.kickable) return await interaction.reply({content: 'I cannt kick this user becaue they are timed out ', ephemeral: true})


        let reason = interaction.options.getString('reason');
        if (!reason) reason ='No reason given';

        const dmEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription( `:white_check_mark: You have been untimed out from **${interaction.guild.name} | ${reason}`)


        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription( `:white_check_mark: You have been untimed out | ${reason}`)

        unTimeoutMember.timeout(0, reason).catch(err=>{
            return;
        })

        await interaction.reply({ embeds: [ embed ]})

        unTimeoutUser.send({ embeds: [ dmEmbed ]}).catch(err=>{
            return;
        })
    }
}