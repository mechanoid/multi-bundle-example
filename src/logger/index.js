import { systemMessage } from 'util'
import { decorate } from './decorator'

export const log = (...messages) => {
  systemMessage('attempt to write a decorated message')
  decorate(...messages)
}
