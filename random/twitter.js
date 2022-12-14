// **************************************** TWITTER ******************************

const T = new Twit({
    consumer_key: process.env.TWITTER_API,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });


  let twitterChannel = "";
  let twitterID = "";
  let twitterUser = "";

  client.once("ready", () => {
    console.log("Ready!");
    console.log(twitterChannel, twitterID, twitterUser)

    const channelID = '1048983473009983498';


    twitterChannel = client.channels.cache.get(channelID);
    // console.log(twitterChannel.id);
    // twitterChannel.send("Testing");
  });

  client.on("message", message => {
    if (message.content === "!ping") {
      message.channel.send("Pong.");
      // message.channel.send(message.author.bot);
      console.log(message.channel.id);
    }
    if (message.content === "!marx") {
      message.channel.send(
        "Workers of the world unite; you have nothing to lose but your chains."
      );
    }
    const twitterPrefix = "!set twitter";
    if (
      message.channel === twitterChannel &&
      message.content.startsWith(twitterPrefix)
    ) {
      twitterUser = message.content.slice(twitterPrefix.length + 1);
      T.get("users/lookup", { screen_name: twitterUser }, function(
        err,
        data,
        response
      ) {
        twitterID = data[0].id_str;
        // console.log(data);
        message.channel.send("Twitter User: " + twitterUser);
        message.channel.send("Twitter ID: " + twitterID);
        const stream = T.stream("statuses/filter", {
          follow: twitterID
          // filter_level: "low"
        });
  




        stream.on("tweet", tweet => {
          if (tweet.user.id_str === twitterID) {
            console.log(tweet);
            twitterChannel
              .send(
                "https://twitter.com/" + twitterUser + "/status/" + tweet.id_str
              )
              .catch(errors => {
                console.log(errors);
              });
          }
        });
      });
    }
    if (message.content === "!currenttwitter") {
      message.channel.send("Currently Following " + twitterUser);
    }
  });