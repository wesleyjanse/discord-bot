const { GuildMember, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'queue',
	description: 'Show the current queue.',
	async execute(interaction, player) {
		if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
			return void interaction.reply({
				content: 'You are not in a voice channel!',
				ephemeral: true,
			});
		}

		if (
			interaction.guild.me.voice.channelId &&
			interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
		) {
			return void interaction.reply({
				content: 'You are not in my voice channel!',
				ephemeral: true,
			});
		}

		await interaction.deferReply();
		const queue = player.getQueue(interaction.guildId);

		if (!queue || queue.tracks.length === 0) {
			return void interaction.followUp({
				embeds: [
					{
						title: 'Queue Info',
						description: '⚠️ | There is nothing in the queue, add a song by typing **/play**!',
						color: 0xFFD727,
					},
				],
			});
		}

		let q = '';
		queue.tracks.map((track, i) => {
			q += ` \n${i + 1}. **${track.title}** \n Requested By: ${track.requestedBy}`;
		});

		console.log(queue.current);

		const fields = [
			{ name: 'Now Playing', value: queue.current.title },
			{ name: 'Requested By', value: queue.current.requestedBy.username },
			{ name: 'Queue', value: q },
		];

		const queueEmbed = new MessageEmbed()
			.setColor('#FFD727')
			.setTitle('Queue')
			.addFields(
				fields,
			);


		return void interaction.followUp({
			embeds: [
				queueEmbed,
			],
		});

		// if (!queue || !queue.playing) {
		// 	return void interaction.followUp({
		// 		content: '❌ | No music is being played!',
		// 	});
		// }

		// return void interaction.reply({
		// 	embeds: [
		// 		{
		// 			title: 'Help',
		// 			description: ,
		// 			color: 0xffffff,
		// 		},
		// 	],
		// });
	},
};
