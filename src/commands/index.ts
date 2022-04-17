import { Command } from './command'
import { CreateCommand } from './create'
import { DeleteCommand } from './delete'
import { ExportCommand } from './export'
import { ListCommand } from './list'
import { SaveCommand } from './save'
import { StartCommand } from './start'

const commands: Array<Command> = [
    new CreateCommand(),
    new StartCommand(),
    new DeleteCommand(),
    new ExportCommand(),
    new SaveCommand(),
    new ListCommand()
];

export { commands, Command }