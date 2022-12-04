const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require('@discordjs/builders');


const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


module.exports = {
    data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('Generate an image')
    .addStringOption(option => option.setName(`prompt`).setDescription(`Enter a prompt`).setRequired(true)),


    async execute(interaction, client){

        const prompt2 = interaction.options.getString(`prompt`);
       (async () => {
              const response = await openai.createImage({
                prompt: prompt2,
                n: 1,
                size: '256x256',
               });
               image_url = response.data.data[0].url;
               await interaction.channel.send(image_url);
            })().catch(err =>{
                return
         })
    },
    }

