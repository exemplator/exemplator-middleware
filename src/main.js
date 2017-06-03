require('es6-promise').polyfill()
// import antlr4 from 'antlr4/index'
// import Java8Lexer from './parser/java8/Java8Lexer'
// import Java8Parser from './parser/java8/Java8Parser'
// import Visitor from './search/java8/visitor'
// import JExamples from '../test/resources/java/example1'
import CodeSearch from './data/codeSearch'
import LANGUAGES from './data/languages'
import VCS from './data/vcs'

const Middleware = {
  sendRequest(code, type, page, counter) {
    // const input = JExamples.code
    // const chars = new antlr4.InputStream(input)
    // const lexer = new Java8Lexer.Java8Lexer(chars)
    // const tokens = new antlr4.CommonTokenStream(lexer)
    // const parser = new Java8Parser.Java8Parser(tokens)
    // const visitor = new Visitor()
    // parser.buildParseTrees = true
    // const tree = parser.typeDeclaration()
    //
    // visitor.visitTree(tree)
  },

  fetchTest(list, page) {
    const codeSearch = new CodeSearch()

    codeSearch.fetch(list, page)
  },

  VCS: VCS,
  LANGUAGE: LANGUAGES
}

export default Middleware
