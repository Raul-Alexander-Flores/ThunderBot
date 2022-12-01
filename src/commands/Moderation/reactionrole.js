const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder}= require(`discord.js`)

module.exports ={

    data: new SlashCommandBuilder()
    .setName('reactrole')
    .setDescription(`This is the reaction role message command`)
    .addRoleOption(option => option.setName(`role1`).setDescription(`This is the first role you want to set up `).setRequired(true))
    .addRoleOption(option => option.setName(`role2`).setDescription(`This is the first role you want to set up `).setRequired(true))
    .addRoleOption(option => option.setName(`role3`).setDescription(`This is the first role you want to set up `).setRequired(true)),

    async execute (interaction,client){

        const role1 = interaction.options.getRole(`role1`)
        const role2 = interaction.options.getRole(`role2`)
        const role3 = interaction.options.getRole(`role3`)

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: " You must have admin perms to create a react role message ", ephemeral: true})

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`button1`)
            .setLabel(`${role1.name}`)
            .setStyle(ButtonStyle.Secondary),


            new ButtonBuilder()
            .setCustomId(`button2`)
            .setLabel(`${role2.name}`)
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId(`button3`)
            .setLabel(`${role3.name}`)
            .setStyle(ButtonStyle.Secondary),
        )

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Reaction Roles`)
        .setDescription(`Testing but Renzal wheres my content 🔫 (${role1},${role2},${role3} ) `)


        await interaction.reply({ embeds: [ embed] , components: [ button ]});

        const collector = await interaction.channel.createMessageComponentCollector()

        collector.on('collect', async(i) =>{
            const member = i.member;

            if(i.guild.members.me.roles.highest.position < role1.position ){

                // Add embeds [], components: []   instead of ephemeral for reaction order being shut down
                i.update({ content: " My role is below the roles that I'm tying to give; I have shut this reaction message down", ephemeral: true})
                return;
            } else if (i.guild.members.me.roles.highest.position < role2.position ){
                i.update({ content: " My role is below the roles that I'm tying to give; I have shut this reaction message down", ephemeral: true})
                return;
            } else if (i.guild.members.me.roles.highest.position < role3.position ){
                i.update({ content: " My role is below the roles that I'm tying to give; I have shut this reaction message down", ephemeral: true})
                return;
            } 

            if ( i.customId === 'button1'){
                member.roles.add(role1);
                i.reply({content: `You now have the role: ${role1.name}`, ephemeral: true})
            }
            if ( i.customId === 'button2'){
                member.roles.add(role2);
                i.reply({content: `You now have the role: ${role2.name}`, ephemeral: true})
            }
            if ( i.customId === 'button3'){
                member.roles.add(role3);
                i.reply({content: `You now have the role: ${role3.name}`, ephemeral: true})
            }
        })

    }


}