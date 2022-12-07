


```const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ButtonIneraction, PermissionsBitField} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Use this command to create a ticket message'),
    async execute(interaction, client){

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})


    }
}
```
## Checklist of working commands:

### Community

- [x] 8ball
- [x] Enka
- [ ] Genshin - error connecting to enka 
- [x] Image
- [ ] Last Tweet - too many tweet requests
- [x] Member Count - application did not respond error
- [x] Modal - Test Modal
- [ ] Only play function, error with previous track 
- [x] Steal 
- [x] ThunderBot
- [ ] Twitch - Set to channels, need to add more 
- [ ] verified - Need to add final confirmation of modal to verify 2 
- [ ] youtube - uhh somehow downloads youtube video no audio
- [x] 9anime general search

### Moderation
- [x] Add Role
- [x] Ban
- [x] Clear
- [x] Clear Warn
- [x] Help
- [x] Mute
- [x] Reaction Role
- [x] Ticket
- [x] Timeout
- [x] Unban
- [x] Verify - Verified added Role
- [x] Verify 2 - Button to confirm Verified
- [x] Warn
- [x] Warnings
- [x] Untimeout


