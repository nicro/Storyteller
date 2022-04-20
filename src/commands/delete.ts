import { CommandInteraction, ApplicationCommandData } from 'discord.js'
import { Bot, Room } from '../entities'
import { Command } from './command'

export default class implements Command {
    name: string = 'delete';

    data: ApplicationCommandData = {
    	name: 'delete',
    	description: 'Delete a storyteller room!'
    };

    async execute (handle: CommandInteraction) {
    	if (!handle.guild) { throw new Error('guild=null') }

    	const opt = handle.options.get('name_of_room')
    	if (!opt) {
    		Bot.Instance().rooms.forEach((room: Room) => {
    			if (room.sysChannel?.id === handle.channelId) { room.delete() }
    		})
    		return handle.reply('Channel deleted')
    	}
    }
}
