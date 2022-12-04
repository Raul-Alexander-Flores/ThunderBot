



module.exports = client =>{
    
    client.on("guildMemberAdd", member =>{

        const channelID = '1047666695780716544';

        console.log(member)

        const message = `Welcome to the server, <@${member.id}> `;

        const channel = member.guild.channels.cache.get(channelID);

        channel.send(message)

        const dmMessage = `Welcome to the Waifu FC, ${member}`;

        member.send(dmMessage).catch(err =>{
            return;
        })

    })
}