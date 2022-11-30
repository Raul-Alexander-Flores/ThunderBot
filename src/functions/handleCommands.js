const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();

const clientId = '1047610035469045831'; 
const guildId = '893188928184676352'; 



const rest = new REST({
    version: '9'
}).setToken(process.env.DISCORD_TOKEN);


module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }
        

        
        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(

                    // This is for global commands
                   // Routes.applicationCommands(clientId), {
                    Routes.applicationGuildCommands(clientId, guildId), {

                        body: client.commandArray
                    },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};