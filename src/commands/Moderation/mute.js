const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder}= require(`discord.js`)


module.exports ={
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription("Mute a member ")
    .addUserOption(option => option.setName('target').setDescription('The member you would like to add a role to ').setRequired(true)),

    async execute (interaction, client){

        const member1 = interaction.options.getUser('target');
        const role = interaction.guild.roles.cache.find(r => r.name === 'muted')

        const selectedMember = await interaction.guild.members.fetch(member1);
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})

        selectedMember.roles.add(role);

        await interaction.reply({content: `You have muted ${member1}`, ephemeral: true}).catch((err=>{
            console.log(err)
            return;
        }))
    }
}