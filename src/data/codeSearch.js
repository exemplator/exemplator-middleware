const fetch = require('isomorphic-fetch')
import Immutable from 'immutable'
import CodeSample from 'codeSample'
import ENV_VARS from '../tools/ENV_VARS'

export default class CodeSearch {

  constructor() {
  }

  fetch(searchTerms, page, language, vcs) {
    const url = this._createQuery(Immutable.List(searchTerms), page, language, vcs)

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(serverResponse => {
      if (serverResponse.status === 200) {
        return serverResponse.json().then(json => {
          return json
        })
      } else {
        return serverResponse.json().then(json => {
          return Promise.reject('error:' + json)
        })
      }
    }).then(json => {
      const results = new Immutable.List(json.results)
      return results.map(result => CodeSample.init(result))
    }).then(codeSamples => {
      return codeSamples.map(codeSample => this.fetchRawCode(codeSample))
    })
  }

  fetchRawCode(codeSample) {
    const url = codeSample.get('rawUrl')

    if (!url) {
      return null
    }

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(serverResponse => {
      if (serverResponse.status === 200) {
        return serverResponse.json().then(json => {
          return json
        })
      } else {
        return serverResponse.json().then(json => {
          return Promise.reject('error:' + json)
        })
      }
    }).then(json => {
      return codeSample.set('code', json)
    })
  }

  /**
   * Create query for http request
   *
   * @param searchTerms All terms that should be search for if they pop up in a file
   * @param page The page number to look for (if a previous query was done)
   * @param vcs Version Control System to look at (github = 2)
   * @param language The language that should be looked for (Java = 23)
   * @returns {*} The query for a http request to codesearch, as a string
   */
  _createQuery(searchTerms, page, vcs, language) {
    if (searchTerms != null && !searchTerms.isEmpty()) {
      const searchString = searchTerms
        .map(term => term.trim())
        .join('+')

      return ENV_VARS.CONSTANTS.SEARCHCODE_API_URL + searchString + '&p=' + page + '&src=' + vcs + '&lan=' + language
    }

    return null
  }
}
