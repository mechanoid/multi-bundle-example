import logger from 'logger'
import greeter from 'greeter'

export default () => {
  greeter.sayHello()
  logger.log('my very important log message')
}
