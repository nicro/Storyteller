import { Session } from '../entities'

export interface Phase {
    session: Session

    start: () => void
    finished: () => boolean
    next?: () => Phase
}