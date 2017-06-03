import Immutable from 'immutable'
import ENV_VARS from '../tools/ENV_VARS'
import VCS from './vcs'

export default class CodeSample extends Immutable.Record({
  rawUrl: '',
  repoUrl: '',
  fileUrl: '',
  code: '',
  vcs: '',
  language: '',
  selections: new Immutable.List()
}) {
  constructor() {
    super()
  }

  static init(jsonResult, vcs) {
    const vcsURLs = CodeSample._getVCSURLs(jsonResult, vcs)

    let record = new CodeSample()
    record = record.set('rawUrl', vcsURLs.rawURL)
    record = record.set('fileUrl', vcsURLs.fileURL)
    record = record.set('repoUrl', jsonResult.repo)
    record = record.set('vcs', vcs)
    record = record.set('language', jsonResult.language)

    return record
  }

  static _getVCSURLs(jsonResult, vcs) {
    const filename = jsonResult.filename

    const gitRepo = jsonResult.repo
    const location = jsonResult.location
    const gitData = gitRepo.substring(0, gitRepo.length - 4).split('/')

    const user = gitData[3]
    const repo = gitData[4]

    switch (vcs) {
      case VCS.GITHUB:
        return {
          rawURL: ENV_VARS.CONSTANTS.GITHUB_RAW_URL + user + '/' + repo + '/master' + location + '/' + filename,
          fileURL: ENV_VARS.CONSTANTS.GITHUB_URL + user + '/' + repo + '/blob/master' + location + '/' + filename
        }
      default:
        return {
          rawURL: jsonResult.repo,
          fileURL: jsonResult.repo.replace('view', 'raw')
        }
    }
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
