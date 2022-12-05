const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField , ButtonStyle, TextInputStyle, TextInputBuilder, ModalBuilder, ActionRowBuilder}= require(`discord.js`)


module.exports ={
data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription("A magic 8ball command 🎱")    
    .addStringOption(option => option.setName(`question`).setDescription(`Please ask me a question`).setRequired(true)),


    async execute (interaction, client){
        const question1 = interaction.options.getString(`question`);
        if (!question1[0]) {
			return interaction.reply('Please ask me a question.');
		} else {
			interaction.channel.sendTyping();
			let eightball = [
				'It is certain.',
				'It is decidedly so.',
				'Without a doubt.',
				'Yes definitely.',
				'You may rely on it.',
				'As I see it, yes.',
				'Most likely.',
				'Outlook good.',
				'Yes.',
				'Signs point to yes.',
				'Reply hazy try again.',
				'Ask again later.',
				'Better not tell you now.',
				'Cannot predict now.',
				'Concentrate and ask again.',
				'Don\'t count on it.',
				'My reply is no.',
				'My sources say no.',
				'Outlook not so good.',
				'Very doubtful.',
				'No way.',
				'Maybe',
				'The answer is hiding inside you',
				'No.',
				'Depends on the mood of the CS god',
				'||No||',
				'||Yes||',
				'Hang on',
				'It\'s over',
				'It\'s just the beginning',
				'Good Luck',
			];
			let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
			setTimeout(() => {
				interaction.reply({
					content: eightball[index],
				});
			}, 750);
		}
	}
}

