import { User } from 'discord.js';

class Player {
    user: User

    constructor(user: User) {
        this.user = user;
    }
}

export {Player};