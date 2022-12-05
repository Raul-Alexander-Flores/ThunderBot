const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField, ButtonStyle, TextInputBuilder, ModalBuilder, TextInputStyle } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('verified')
    .setDescription("This is verification message"),

    async execute (interaction, client){
        if ( !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must be an administrator to create verification message", ephemeral: true})
    
    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('button')
        .setEmoji('✅')
        .setLabel('Verify')
        .setStyle(ButtonStyle.Success),
    )

    let number1 = Math.floor(Math.random() * (10-1)) + 1;
    let number2 = Math.floor(Math.random() * (10-1)) + 10;


    let modal = new ModalBuilder()
        .setCustomId(`verifyModal, ${number1},${number2}`)
        .setTitle('Verification')
    
    modal.addComponents(
        new ActionRowBuilder().addComponents(
            new TextInputBuilder()
                .setCustomId('input')
                .setLabel(`What is ${number1} + ${number2}?`)
                .setStyle(TextInputStyle.Short)
                .setMaxLength(2)
                .setPlaceholder('Enter your answer')
                .setRequired()
        )
    );

    await interaction.showModal(modal)

    


    const embed = new EmbedBuilder()
    .setColor("Blue")
    .setTitle("Server Verification")
    .setDescription("Click the button below to verify yourself within the server")

   // await interaction.reply({ embeds: [ embed], components: [ button ]});

    const collector = await interaction.channel.createMessageComponentCollector();

    collector.on('collect', async i =>{
        await i.update({embeds: [embed], components: [button]});

        const role = interaction.guild.roles.cache.find( r => r.name === "Verified");

        const member = i.member;
       // console.log("**************" ,member)
       // console.log("**************" ,member.roles)
        

        member.roles.add(role);

        i.user.send(`You are now verified within ${i.guild.name}`).catch(err =>{
            return;
        })
    })



    }
}