import Immutable from 'immutable'

export default class Position extends Immutable.Record({
  line: -1,
  column: -1
}) {
  constructor(line, column) {
    super(line, column)
    this.set('line', line)
    this.set('column', line)
  }
}
