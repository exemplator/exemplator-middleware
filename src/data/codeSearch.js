const fetch = require('isomorphic-fetch')
import Immutable from 'immutable'
import VARS from '../tools/VARS'

export default class CodeSearch {

  constructor() {
  }

  fetch(searchTerms, page) {
    const url = this._createQuery(Immutable.List(searchTerms), page, 2, 23)

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(serverResponse => {
      if (serverResponse.status === 200) {
        serverResponse.json().then(json => {
          console.log(json.results)
        })
      } else {
        serverResponse.json().then(json => {
         console.log('error:' + json)
        })
      }
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

      return VARS.CONSTANTS.SEARCHCODE_API_URL + searchString + '&p=' + page + '&src=' + vcs + '&lan=' + language
    }

    return null
  }
}
