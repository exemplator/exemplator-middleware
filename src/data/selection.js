import Immutable from 'immutable'

export default class Selection extends Immutable.Record({
  rawUrl: 1,
  userUrl: 2,
  fileUrl: 3,
  code: 4,
  selections: new Immutable.List()
}) {
  constructor() {
    super()
  }
}
