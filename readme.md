# Storyteller
A discord bot creating a linked story

## ⚡️ Overview

Storyteller is a discord bot, which helps you and your friends to create a roleplay story based on some details you provide. [Here](concept/logic.md) you can see the bot logic plan.

## ⚙️ Configuration

The bot requires some [environment variables](config.md) to work correctly.

```bash
npm i
npm start
```

## 🧬 Commands

Here is a list of available commands.

| Command                             | Description                   |
| :-------------------------------:   | :---------------------------: |
| [/create](src/commands/create.ts)   | Create a new room             |
| [/delete](src/commands/delete.ts)   | Delete a room                 |
| [/export](src/commands/export.ts)   | Export game data as json file |
| [/list](src/commands/list.ts)       | List available saves          |
| [/start](src/commands/start.ts)     | Start a game session          |
| [/restart](src/commands/restart.ts) | Restart a game session        |
| [/save](src/commands/save.ts)       | Create a new save             |
| [/wipe](src/commands/wipe.ts)       | Wipe ALL game channels        |
