import { Client, Intents } from 'discord.js'

import fs from 'fs'

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials: ['CHANNEL']
});

const eventFiles = fs.readdirSync('./src/events')
    .filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
    import(`./events/${file.replace('.ts', '.js')}`)
        .then(event => {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        })
}

export { client }
