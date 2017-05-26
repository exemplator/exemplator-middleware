import {expect} from 'chai'
import {it, describe} from 'mocha'
import JExamples from './resources/java/example1'

describe('Perform sample test\n', () => {
  antlrDebuging()
})

/**
 * Debugging for antlr
 */
function antlrDebuging() {
  it('Debugging antlr: ', () => {
    const antlr4 = require('antlr4/index')
    const Java8Lexer = require('../src/antlr/java8/Java8Lexer')
    const Java8Parser = require('../src/antlr/java8/Java8Parser')
    const Java8Visitor = require('../src/antlr/java8/Java8Visitor')

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
    Visitor.prototype.visitTest = function(ctx) {
      // implement logic to determine which function to visit
      // then call next function and with the right context
      this.visitPackageDeclaration(ctx)
    }

    const input = JExamples.code
    const chars = new antlr4.InputStream(input)
    const lexer = new Java8Lexer.Java8Lexer(chars)
    const tokens = new antlr4.CommonTokenStream(lexer)
    const parser = new Java8Parser.Java8Parser(tokens)
    const visitor = new Visitor()
    parser.buildParseTrees = true
    const tree = parser.packageDeclaration()

    visitor.visitTest(tree)

    expect(1).to.equal(1)
  })
}
