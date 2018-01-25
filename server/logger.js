import logger from 'winston'

logger.level = process.env.LOG_LEVEL || 'info'
logger.remove(logger.transports.Console)
logger.add(logger.transports.Console, {
    timestamp: true,
    colorize: true,
    prettyPrint: true,
})

export default logger