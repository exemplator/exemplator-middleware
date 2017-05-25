import logger from 'util/logger'

const addArray = function addArray(arr) {
  const result = arr.reduce(function(a, b) {
    return a + b
  }, 0)

  logger.debug('test')

  return result
}

module.exports = addArray
