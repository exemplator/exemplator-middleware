let ENV_VARS

const CONSTANTS = {
  SEARCHCODE_API_URL: 'https://searchcode.com/api/codesearch_I/?q=',
  LANG_JAVA: 'java',
  GITHUB_REPO_URL: 'https://api.github.com/search/repositories?q=',
  GITHUB_RAW_URL: 'https://raw.githubusercontent.com/',
  GITHUB_URL: 'https://github.com/'
}

if (NODE_ENV !== 'production') {
  console.log('Dev variables chosen')
  ENV_VARS = {
    CONSTANTS: CONSTANTS
  }
} else {
  ENV_VARS = {
    CONSTANTS: CONSTANTS
  }
}

export default ENV_VARS
