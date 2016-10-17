import { decorate } from './decorator'

export const log = (...messages) => decorate(...messages)
