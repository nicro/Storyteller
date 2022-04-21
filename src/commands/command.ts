import { ApplicationCommandData, CommandInteraction } from 'discord.js'

export interface Command {
    data: ApplicationCommandData
    execute(handle: CommandInteraction): void
}
