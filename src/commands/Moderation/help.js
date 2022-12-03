const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription(`This is a help command`),

    async execute (interaction, client){

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Help Center')
        .setDescription(`Help Command Guide:`)
        .addFields({ name: 'Page 1', value: 'Help and Resources (button1)'})
        .addFields({ name: 'Page 2', value: 'Community Commands (button2)'})
        .addFields({ name: 'Page 3', value: 'Moderation Commands (button3)'})



        const embed2 = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Community Commands')
        .addFields({ name: '/help', value: 'Do /help for the command list & support'})
        .addFields({ name: '/test', value: 'Check is bot is working'})
        .addFields({ name: '/steal', value: 'Steal an emoji'})

    
        .setTimestamp()

        const embed3 = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Moderation Commands')
        .addFields({ name: '/clearwarn', value: 'Do /help for the command list & support'})
        .addFields({ name: '/clear', value: 'Clears the channel with given amount)'})
        .addFields({ name: '/warn', value: 'Gives a member a warning'})
        .addFields({ name: '/warnings', value: 'Shows the amount of warning from a member'})
        .addFields({ name: '/reactrole', value: 'This send s a reaction role message'})
        .addFields({ name: '/verify', value: 'This verifies a member'})
        .addFields({ name: '/ticket', value: 'Creates a ticket'})


        .setTimestamp()







        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`page1`)
            .setLabel(`Page 1`)
            .setStyle(ButtonStyle.Success),


            new ButtonBuilder()
            .setCustomId(`page2`)
            .setLabel(`Page 2`)
            .setStyle(ButtonStyle.Success),


            new ButtonBuilder()
            .setCustomId(`page3`)
            .setLabel(`Page 3`)
            .setStyle(ButtonStyle.Success)



            
        )
        const message = await interaction.reply({ embeds: [ embed] , components: [ button ]});

        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i =>{

            if(i.customId === 'page1'){
                if(i.user.id !== interaction.user.id){
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [ embed], component: [button]})
            }
            if(i.customId === 'page2'){
                if(i.user.id !== interaction.user.id){
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [ embed2], component: [button]})
            }
            if(i.customId === 'page3'){
                if(i.user.id !== interaction.user.id){
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({ embeds: [ embed3], component: [button]})
            }

            })

    }    

}