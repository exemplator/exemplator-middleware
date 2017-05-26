import antlr4 from 'antlr4/index'
import Java8Lexer from './java8/antlr/Java8Lexer'
import Java8Parser from './java8/antlr/Java8Parser'
import Visitor from './java8/visitor'
import JExamples from '../test/resources/java/example1'

const Middleware = {
  sendRequest(code, type, page, counter) {
    const input = JExamples.code
    const chars = new antlr4.InputStream(input)
    const lexer = new Java8Lexer.Java8Lexer(chars)
    const tokens = new antlr4.CommonTokenStream(lexer)
    const parser = new Java8Parser.Java8Parser(tokens)
    const visitor = new Visitor()
    parser.buildParseTrees = true
    const tree = parser.typeDeclaration()

    visitor.visitTree(tree)
  }
}

export default Middleware
