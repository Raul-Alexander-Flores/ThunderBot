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
    .setName('thunderbot')
    .setDescription('Talk to the AI BOT')
    .addStringOption(option => option.setName(`prompt`).setDescription(`Enter a prompt`).setRequired(true)),


    async execute(interaction, client){

        const prompt2 = interaction.options.getString(`prompt`);

        let prompt =`Thunderbot is a chatbot that is helpful to whoever is asking. Replies in first person. Do not include Bot:  `
        prompt += `You: ${prompt2}\n`;
       (async () => {
             const gptResponse = await openai.createCompletion({
                 model: "text-davinci-002",
                 prompt: prompt,
                 max_tokens: 90,
                 temperature: 0.5,
                 top_p: 0.3,
                 presence_penalty: 0,
                 frequency_penalty: 0.5,
               });
               prompt += `${gptResponse.data.choices[0].text}\n`;
               
               await interaction.channel.send({content: `${gptResponse.data.choices[0].text.substring()}`, ephemeral: true});
              })().catch(err =>{
                return;
              })
              await interaction.reply({ content: `Response loading`, ephemeral: true})


    },
    }