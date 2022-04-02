import { Client, Intents, Collection, TextChannel } from "discord.js";
import config from "./config"
import * as commandModules from "./commands"

const {Bot} = require("./entities");

const bot = Bot.Instance();

const commands = Object(commandModules);

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

client.once("ready", () => {
    console.log("bot ready");
})

client.on("messageReactionAdd", async (reaction, user) => {
    var channel = reaction.message.channel as TextChannel;

    var session = bot.get_session_by_id(channel.id);

    if (session && reaction.message.reactions.cache.size > 1)
        reaction.remove();
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName } = interaction;

    commands[commandName].execute(interaction, client);
})

client.login(config.DISCORD_TOKEN);