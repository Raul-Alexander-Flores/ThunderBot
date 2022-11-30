const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 
const { REST } = require("@discordjs/rest");
const { Configuration, OpenAIApi } = require("openai");



client.commands = new Collection();

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

    let prompt =`Thunderbot is bot where it answers lifes questions `;


require('dotenv').config();

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands");


// GPT 3 
/* client.on("messageCreate", function (message) {
    if (message.author.bot) return;
    prompt += `You: ${message.content}\n`;
   (async () => {
         const gptResponse = await openai.createCompletion({
            // console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
             model: "text-davinci-002",
             prompt: prompt,
             max_tokens: 60,
             temperature: 0.9,
             top_p: 0.3,
             presence_penalty: 0,
             frequency_penalty: 0.5,
           });
         message.reply(`${gptResponse.data.choices[0].text.substring()}`);
         prompt += `${gptResponse.data.choices[0].text}\n`;
     })();
 }); 
 */
(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events");
    client.handleCommands(commandFolders, "./commands/");
    client.login(process.env.DISCORD_TOKEN)
})();

