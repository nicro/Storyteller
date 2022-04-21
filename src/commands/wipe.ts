import { CommandInteraction, ApplicationCommandData, Channel, TextChannel } from 'discord.js'
import { Command } from './command'

export default class implements Command {
    data: ApplicationCommandData = {
        name: 'wipe',
        description: 'Wipes all the server channels'
    };

    async execute(interaction: CommandInteraction) {
        const channels = await interaction.guild?.channels.fetch();
        const sysChannels = channels?.filter(channel => channel.name === 'system' && channel.type === 'GUILD_TEXT');
        const textChannels = channels?.filter(channel => channel.name === 'chat' && channel.type === 'GUILD_TEXT');

        sysChannels?.forEach(sysChannel => {
            const textChannel = textChannels?.find(textChannel => textChannel.parentId === sysChannel.parentId);
            if (textChannel) {
                // if found both channels, delete all
                sysChannel.parent?.delete();
                sysChannel.delete();
                textChannel.delete();
            }
        })

        return interaction.reply('deleted!');
    }
}
