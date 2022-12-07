const { SlashCommandBuilder } = require('@discordjs/builders');



module.exports ={
    data: new SlashCommandBuilder()
    .setName('9anime')
    .setDescription("Please Enter Anime to Serach on 9anime")
    .addStringOption(option => option.setName('anime').setDescription('Anime search query').setRequired(true)),

    async execute (interaction, client){

        const searchQ = interaction.options.getString('anime');
        baseUrl = 'https://9anime.vc/search?keyword='


        await interaction.reply({content: baseUrl +`${searchQ}`, ephemeral: false}).catch((err=>{
            console.log(err)
            return;
        }))
    }
}



