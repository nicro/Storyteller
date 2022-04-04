import { GameSession } from './../entities'

export interface Phase {
    session: GameSession

    start: () => void
    finished: () => boolean
    next?: () => Phase
}