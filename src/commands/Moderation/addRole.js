const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder}= require(`discord.js`)


module.exports ={
    data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription("Add a role to a specific member ")
    .addUserOption(option => option.setName('target').setDescription('The member you would like to add a role to ').setRequired(true))
    .addRoleOption(option => option.setName(`role`).setDescription(`This is the first role you want to set up `).setRequired(true)),

    async execute (interaction, client){

        const member1 = interaction.options.getUser('target');
        const role = interaction.options.getRole(`role`)

        const selectedMember = await interaction.guild.members.fetch(member1);
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})

        selectedMember.roles.add(role);

        await interaction.reply({content: `You have now added the role: ${role} to ${member1}`, ephemeral: true}).catch((err=>{
            console.log(err)
            return;
        }))
    }
}