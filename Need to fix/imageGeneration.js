
const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


  client.on("messageCreate", function (message) {
    if (message.author.bot) return;
    prompt = `${message.content}`;
   (async () => {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '256x256',
        });
        image_url = response.data.data[0].url;
        message.reply(image_url)
         
     })();
 }); 
  
