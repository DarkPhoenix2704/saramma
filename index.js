const {Client, Intents} = require('discord.js');
const {token} = require('../saramma/config.json');

const client = new Client({
    intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
    partials: ["CHANNEL"]
});

client.login(token);