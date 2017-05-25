const addArray = function addArray(arr) {
  const result = arr.reduce(function(a, b) {
    return a + b
  }, 0)

  return result
}

module.exports = addArray
