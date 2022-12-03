const { SlashCommandBuilder, PermissionsBitField } = require('@discordjs/builders');

module.exports ={
    data: new SlashCommandBuilder()
    .setName('muted2')
    .setDescription("get Mutee in the discord server")
    .addUserOption(option => option.setName('target').setDescription('The user you would like to mute').setRequired(true)),

    async execute (interaction, client){

        const role = interaction.guild.roles.cache.find(r => r.name === 'muted')
        console.log(role)
        console.log(interaction.member)
        
        const muteUser = interaction.options.getUser('target');
        const mutedMember = await interaction.guild.members.fetch(muteUser.id);
        console.log(muteUser);
        console.log(mutedMember)

        mutedMember.roles.add(role)

        await interaction.reply({content: "You are now muted within the server", ephemeral: true})
    }
}