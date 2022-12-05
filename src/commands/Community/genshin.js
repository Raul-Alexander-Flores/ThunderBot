const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder}= require(`discord.js`)
const { EnkaClient } = require("enka-network-api");
const enka = new EnkaClient({ timeout: 4000, defaultLanguage: "en" });

module.exports ={
    data: new SlashCommandBuilder()
    .setName('genshin')
    .setDescription("Please Enter UID")
    .addIntegerOption(option => option.setName('uid').setDescription('UID').setRequired(true)),

    async execute (interaction, client){

        const genUID = interaction.options.getInteger('uid');

        var names = []
        imageBase = 'https://enka.network/ui/UI_AvatarIcon_Nahida.png'

        const user = await enka.fetchUser(genUID);
        names = user.characters.map(c => c.characterData.name.get("en"));

        console.log(user.nickname)
        console.log(user.level)

        console.log(user.worldLevel)

        console.log(user.nickname)

        console.log(names);
    

        await interaction.reply({content: `Nickname: ${ user.nickname}\nLevel: ${ user.level}\nWorld Level: ${user.worldLevel}\nCharacters: ${ names.join(",  ")} `, ephemeral: false}).catch((err=>{
            console.log(err)
            return;
        }))
    }
}