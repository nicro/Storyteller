import { User } from 'discord.js';

class Player {
    user: User
    isCreator?: boolean

    constructor(user: User, isCreator?: boolean) {
        this.user = user;
        this.isCreator = isCreator;
    }

    handleMessage(msg: string) {
        console.log('direct message to ' + this.user.username + ": " + msg);
    }
}

export {Player};