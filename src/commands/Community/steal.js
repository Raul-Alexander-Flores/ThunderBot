const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')
const axios = require(`axios`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('steal')
    .setDescription(`Adds a given emoji to the server`)
    .addStringOption(option => option.setName(`emoji`).setDescription(`The emoji you would liek to add to the server`).setRequired(true))
    .addStringOption(option => option.setName(`name`).setDescription(`The name of the emoji`).setRequired(true)),



    async execute(interaction){

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})


        let emoji  = interaction.options.getString(`emoji`)?.trim();
        const name = interaction.options.getString(`name`);


        if(emoji.startsWith("<") && emoji.endsWith('>')) {


            const id = emoji.match(/\d{15,}/g)[0];

            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
                .then(image =>{
                    if(image) return "gif"
                    else return "png"
                }).catch((err =>{
                    return "png"
                }))

                emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`

                console.log(emoji)
        }


        if(!emoji.startsWith("http")){
            return await interaction.reply({ content: 'You cannot steal default emojis!', ephemeral: true})
        }
        if(!emoji.startsWith("https")){
            return await interaction.reply({ content: 'You cannot steal default emojis!', ephemeral: true})

            
    }

    interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}`})
        .then(emoji =>{
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`Added ${emoji}, with the name ${name}`)

            return interaction.reply({ embeds: [embed]})



        }).catch(err =>{
            interaction.reply({content: " You cannot add this emoji because you have reached your sever emoji limit", ephemeral: true})
        })

    }

}

