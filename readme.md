# Storyteller
A discord bot creating a linked story

## ⚡️ Overview

Storyteller is a discord bot, which helps you and your friends to create a roleplay story based on some details you provide. [Here](concept/logic.md) you can see the bot logic plan.

## ⚙️ Configuration

The bot requires some [environment variables](config.md) to work correctly.

## 🧬 Commands

Here is a list of available commands.

| Command                             | Description                    |
| :-------------------------------:   | :----------------------------: |
| [/create](src\commands\create.ts)   | Creates a new room             |
| [/delete](src\commands\delete.ts)   | Deltes a room                  |
| [/export](src\commands\export.ts)   | Exports game data as json file |
| [/list](src\commands\list.ts)       | Lists available saves          |
| [/start](src\commands\start.ts)     | Starts a game session          |
| [/restart](src\commands\restart.ts) | Restart a game session         |
| [/save](src\commands\save.ts)       | Creates a new save             |
| [/wipe](src\commands\wipe.ts)       | Wipes ALL game channels        |
