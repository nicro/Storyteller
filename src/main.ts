import { Client, Intents, Collection } from "discord.js";
import config from "./config"
import * as commandModules from "./commands"

const commands = Object(commandModules);

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.once("ready", () => {
    console.log("bot ready");
})

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName } = interaction;

    commands[commandName].execute(interaction, client);

    if (commandName == "ping")
        return interaction.reply("pong")
})

client.login(config.DISCORD_TOKEN);