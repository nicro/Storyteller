import { ApplicationCommandData, CommandInteraction } from 'discord.js'


export interface Command {
    name: string
    data: ApplicationCommandData
    execute(handle: CommandInteraction): void
}