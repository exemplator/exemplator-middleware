import Immutable from 'immutable'
import ENV_VARS from '../tools/ENV_VARS'

export default class CodeSample extends Immutable.Record({
  rawUrl: '',
  repoUrl: '',
  fileUrl: '',
  code: '',
  selections: new Immutable.List()
}) {
  constructor() {
    super()
  }

  static init(jsonResult) {
    const filename = jsonResult.filename

    const gitRepo = jsonResult.repo
    const location = jsonResult.location
    const gitData = gitRepo.substring(0, gitRepo.length() - 4).split('/')

    const user = gitData[3]
    const repo = gitData[4]

    const rawURL = ENV_VARS.CONSTANTS.GITHUB_RAW_URL + user + '/' + repo + '/master' + location + '/' + filename
    const fileURL = ENV_VARS.CONSTANTS.GITHUB_URL + user + '/' + repo + '/blob/master' + location + '/' + filename

    let record = new CodeSample()
    record = record.set('rawUrl', rawURL)
    record = record.set('fileURL', fileURL)
    record = record.set('repoUrl', gitRepo)

    return record
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
