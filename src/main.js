import antlr4 from 'antlr4/index'
import Java8Lexer from 'java/antlr/Java8Lexer'
import Java8Parser from 'java/antlr/Java8Parser'
import Java8Visitor from 'java/antlr/Java8Visitor'
import JExamples from '../test/resources/java/example1'

const Middleware = {
  sendRequest(code, type, page, counter) {
    /**
     * Sample Visitor that doesn't work
     * @return {Visitor}
     * @constructor
     */
    function Visitor() {
      Java8Visitor.Java8Visitor.call(this)
      return this
    }

    Visitor.prototype = Object.create(Java8Visitor.Java8Visitor.prototype)
    Visitor.prototype.constructor = Visitor
    Visitor.prototype.visitTree = function(ctx) {
      // implement logic to determine which function to visit
      // then call next function and with the right context
      this.visitTypeDeclaration(ctx)
    }

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
