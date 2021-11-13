const {Client, Intents} = require('discord.js');
const {token} = require('../saramma/config.json');
const fs = require("fs");

const client = new Client({
    intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
    partials: ["CHANNEL"]
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else if (client.on) {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);