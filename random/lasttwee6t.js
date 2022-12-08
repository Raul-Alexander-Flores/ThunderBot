const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences] }); 
const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require('@discordjs/builders');
const Twit = require('twitter-v2')
const needle = require('needle');



require('dotenv').config();



const twitterClient = new Twit({
    consumer_key: process.env.TWITTER_API,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });


module.exports = {
    data: new SlashCommandBuilder()
    .setName('lasttweet')
    .setDescription('Talk to the AI BOT'),
    
    
    
    async execute(interaction, client){
        
    const bearerToken = process.env.BEARER_TOKEN;
    const userId = "1494737971811135488";
    const url = `https://api.twitter.com/2/users/${userId}/tweets`;


    const getUserTweets = async () => {
    let userTweets = [];

    // we request the author_id expansion so that we can print out the user name later
    let params = {
        "max_results": 5,
        "tweet.fields": "created_at",
        "expansions": "author_id"
    }

    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }

    let hasNextPage = true;
    let nextToken = null;
    let userName;
    console.log("Retrieving Tweets...");

    if (hasNextPage) {
        let resp = await getPage(params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            userName = resp.includes.users[0].username;
            if (resp.data) {
                console.log(userTweets.push.apply(userTweets, resp.data))
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }
    
     console.dir(userTweets, {
        depth: null
    });  
    console.log(`Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`);
    await interaction.channel.send({content: `Got ! `, ephemeral: true});

}




const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}

getUserTweets();
/* 
(async () => {
    try {
      const searchFilteredStream = await twitterClient.tweets.searchStream();
      console.dir(searchFilteredStream, {
        depth: null,
      });
    } catch (error) {
      console.log(error);
    }
  })(); */





}
}