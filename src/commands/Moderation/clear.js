const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('This command clears a number of messages from a channel')
    .addIntegerOption(option => option.setName('amount').setDescription('The amount of messages to delete').setRequired(true)),


    async execute(interaction, client){

        const amount = interaction.options.getInteger('amount');
        const channel = interaction.channel;

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must have admin permissions to clear messages", ephemeral: true})
        
        if(!amount) return await interaction.reply({ content: "Please specify the amount of messages you want to delete", ephemeral: true})

        if(amount < 1 || amount > 100) return await interaction.reply({ content: " Please select a number btween 1 and 100", ephemeral: true})


        await interaction.channel.bulkDelete(amount).catch(err =>{
            return;
        })


        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(` :white_check_mark: Deleted ${amount} messages`)

        await interaction.reply({embeds: [embed]}).catch(err=>{
            return;
        });

    }
}