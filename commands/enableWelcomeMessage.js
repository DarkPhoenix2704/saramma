const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	getDb
} = require('../utils/util');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('enablewelcomemessage')
		.setDescription('Enable or Disable Welcome Message for new users')
		.addStringOption(option => option.setName('option')
			.setRequired(true)),
	async execute(interaction) {
		if (interaction.guild === null) {
			console.log('This command can only be used in a server.');
			await interaction.reply({
				content: 'You are not authorized to use this command',
				ephemeral: true
			});
			return;
		}
		let hasPermission = interaction.member.roles.cache.has(interaction.guild.roles.cache.find(role => role.name === 'ADMINISTRATOR').id);
		if (hasPermission) {
			const userChoice = interaction.options.getString('option');
			console.log(userChoice);
			const db = await getDb();
			await db.set('welcomeUser', userChoice === 'enable' ? true : false);
			await interaction.reply({
				content: `Welcome Message is now ${userChoice === 'enable' ? 'Enabled' : 'Disabled'}`,
				ephemeral: true
			});
		} else {
			await interaction.reply({
				content: 'You are not authorized to use this command',
				ephemeral: true
			});
		}
	}
};