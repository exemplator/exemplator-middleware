import Immutable from 'immutable'
import ENV_VARS from '../tools/ENV_VARS'

export default class CodeSample extends Immutable.Record({
  rawUrl: 1,
  userUrl: 2,
  fileUrl: 3,
  code: 4,
  selections: new Immutable.List()
}) {
  constructor() {
    super()
  }

  getSurroundings() {
    const split = this.code.split('\n')
    const mappedSelections = this.selections.map(selection => {
      return new Immutable.Record({
        selection: selection,
        surrounding: ''
      })
    })

    return mappedSelections.map(mappedSelection => {
      const selection = mappedSelection.get('selection')
      const start = selection.get('start').get('line') - 1 - ENV_VARS.CONSTANTS.SURROUNDING_RADIUS
      const end = selection.get('end').get('line') - 1 + ENV_VARS.CONSTANTS.SURROUNDING_RADIUS

      const realStart = Math.min(Math.max(start, 0), split.length - 1);

      let result = ''
      for (let i = realStart; i <= end && i < split.length; i++) {
        result += split[i] + '\n'
      }

      return mappedSelection.set('surrounding', result)
    })
  }
}
