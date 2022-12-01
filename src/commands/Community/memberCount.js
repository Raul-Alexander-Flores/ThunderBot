
const { SlashCommandBuilder } = require('@discordjs/builders');



module.exports = {
    data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Get Member Count'),


    async execute(interaction, client){
        const m = interaction.guild.memberCount;
        const b = interaction.guild.members.cache.filter(member => member.user.bot).size;

        await interaction.channel.send(`*Total members: ${m} \n*Total Bots: ${b}`)
    },
    }



