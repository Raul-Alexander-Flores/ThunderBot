const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { REST } = require("@discordjs/rest");


const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const prefix = '>';
const prefix2 = '$$';



const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


module.exports = client => {

    client.on("messageCreate", function (message) {
        if(!message.content.startsWith(prefix) || message.author.bot) return;
        let prompt =`Thunderbot is a chatbot that is helpful to whoever is asking `
        prompt += `You: ${message.content}\n`;
       (async () => {
             const gptResponse = await openai.createCompletion({
                // console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
                 model: "text-davinci-002",
                 prompt: prompt,
                 max_tokens: 90,
                 temperature: 0.5,
                 top_p: 0.3,
                 presence_penalty: 0,
                 frequency_penalty: 0.5,
               });
             message.reply(`${gptResponse.data.choices[0].text.substring()}`);
             prompt += `${gptResponse.data.choices[0].text}\n`;
         })().catch(err =>{
            return
         })




         // *************************************IMAGE GENERATOR 



         if(!message.content.startsWith(prefix2) || message.author.bot) return;
         prompt = `${message.content}`;
        (async () => {
             const response = await openai.createImage({
                 prompt: prompt,
                 n: 1,
                 size: '256x256',
             });
             image_url = response.data.data[0].url;
             message.reply(image_url)
              
          })()().catch(err =>{
            return
         })
         

         
     })
     
}
