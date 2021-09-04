const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'List all available commands.',
	execute(interaction) {
		let str = '';
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			str += `**${command.name}:** ${command.description} \n`;
		}

		return void interaction.reply({
			embeds: [
				{
					title: 'Help',
					description: str,
					color: 0xffffff,
				},
			],
		});
	},
};
