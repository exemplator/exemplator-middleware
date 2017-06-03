const fetch = require('isomorphic-fetch')
import Immutable from 'immutable'
import CodeSample from './codeSample'
import Promise from 'bluebird'
import ENV_VARS from '../constants/ENV_VARS'

export default class CodeSearch {

  constructor() {
  }

  fetch(searchTerms, page, language, vcs) {
    const url = this._createQuery(Immutable.List(searchTerms), page, language, vcs)

    return Promise.resolve()
      .then(result => {
        return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
      })
      .then(serverResponse => {
        if (serverResponse.status === 200) {
          return serverResponse.json().then(json => json)
        } else {
          return serverResponse.json().then(json => {
            throw new Error('error:' + json)
          })
        }
      })
      .then(json => {
        const results = new Immutable.List(json.results)
        return results.map(result => CodeSample.init(result, vcs))
      })
      .then(codeSamples => codeSamples.map(codeSample => this._fetchRawCode(codeSample)))
      .all(results => results)
  }

  _fetchRawCode(codeSample) {
    const url = codeSample.get('rawUrl')

    if (!url) {
      return null
    }

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/text'
      }
    }).then(serverResponse => {
      if (serverResponse.status === 200) {
        return serverResponse.text().then(text => text)
      } else if (serverResponse.status === 404) {
        return ''
      } else {
        return serverResponse.text().then(text => {
          throw new Error('error:' + text)
        })
      }
    }).then(json => codeSample.set('code', json))
  }

  /**
   * Create query for http request
   *
   * @param searchTerms All terms that should be search for if they pop up in a file
   * @param page The page number to look for (if a previous query was done)
   * @param language The language that should be looked for
   * @param vcs Version Control System to look at
   * @returns {*} The query for a http request to codesearch, as a string
   */
  _createQuery(searchTerms, page, language, vcs) {
    if (searchTerms != null && !searchTerms.isEmpty()) {
      const searchString = searchTerms
        .map(term => term.trim())
        .join('+')

      return ENV_VARS.CONSTANTS.SEARCHCODE_API_URL + searchString + '&p=' + page + '&src=' + vcs + '&lan=' + language
    }

    return null
  }
}
