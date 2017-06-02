let VARS

const CONSTANTS = {
  SEARCHCODE_API_URL: 'https://searchcode.com/api/codesearch_I/?q=',
  LANG_JAVA: 'java',
  GITHUB_REPO_URL: 'https://api.github.com/search/repositories?q=',
  GITHUB_RAW_URL: 'https://raw.githubusercontent.com/',
  GITHUB_URL: 'https://github.com/'
}

if (ENV !== 'production') {
  console.log('Dev variables chosen')
  VARS = {
    CONSTANTS: CONSTANTS
  }
} else {
  VARS = {
    CONSTANTS: CONSTANTS
  }
}

export default VARS
