import {Client, Intents} from 'discord.js';
import config from './config'
import fs from 'fs';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

function loadEvents() {
    const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.ts'));

    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once)
            client.once(event.name, (...args) => event.execute(...args));
        else
            client.on(event.name, (...args) => event.execute(...args));
    }
}

loadEvents();
client.login(config.DISCORD_TOKEN);