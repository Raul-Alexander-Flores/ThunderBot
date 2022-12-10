const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , ButtonStyle, TextInputStyle, TextInputBuilder, EmbedBuilder, ActionRowBuilder, Embed}= require(`discord.js`)

module.exports ={
    data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription("This is a embed guide"),

    async execute (interaction, client){

    
        const embed = new EmbedBuilder()
        .setColor('Blurpe')
        .setTitle('THE EMBED TITLE')
        .setURL(`https://www.youtube.com/@thunderpluss`)
        .setAuthor({name: `Author name` ,iconURL: `https://imagesflores.s3.us-east-2.amazonaws.com/thunder_wave-224-1.png`, url:`https://imagesflores.s3.us-east-2.amazonaws.com/thunder_wave-224-1.png`})
        .setDescription(`This is a description `)
        .setThumbnail(`https://imagesflores.s3.us-east-2.amazonaws.com/thunder_wave-224-1.png`)
        .addFields({ name: ' A field', value: 'THIS IS A FIELD VALUE', inline: true})
        .setImage(`https://imagesflores.s3.us-east-2.amazonaws.com/thunder_wave-224-1.png`)
        .setTimestamp()
        .setFooter({text: 'A footer', iconURL: `https://imagesflores.s3.us-east-2.amazonaws.com/thunder_wave-224-1.png`})


        await interaction.reply({embeds: [embed]})
     
    }
}