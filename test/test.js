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
    const Java8Lexer = require('../src/java8/antlr/JavaLexer')
    const Java8Parser = require('../src/java8/antlr/JavaParser')
    const Java8Visitor = require('../src/java8/antlr/JavaVisitor')

    /**
     * Sample Visitor that doesn't work
     * @return {Visitor}
     * @constructor
     */
    function Visitor() {
      Java8Visitor.JavaVisitor.call(this)
      return this
    }

    Visitor.prototype = Object.create(Java8Visitor.JavaVisitor.prototype)
    Visitor.prototype.constructor = Visitor
    Visitor.prototype.visitTree = function(ctx) {
      // implement logic to determine which function to visit
      // then call next function and with the right context
      this.visitCompilationUnit(ctx)
    }

    const input = JExamples.code
    const chars = new antlr4.InputStream(input)
    const lexer = new Java8Lexer.JavaLexer(chars)
    const tokens = new antlr4.CommonTokenStream(lexer)
    const parser = new Java8Parser.JavaParser(tokens)
    parser.buildParseTrees = true

    let tree
    try {
      // Stage 1: High-speed parsing for correct documents
      parser._errHandler = new antlr4.error.BailErrorStrategy()
      parser._interp.predictionMode = antlr4.atn.PredictionMode.SLL
      parser._interp.tail_call_preserves_sll = false // TODO set this correctly - not the case atm
      tree = parser.compilationUnit()
    } catch (e) {
      // Stage 2: High-accuracy fallback parsing for complex and/or erroneous documents

      // TODO: reset your input stream
      parser._errHandler = new antlr4.error.DefaultErrorStrategy()
      parser._interp.predictionMode = antlr4.atn.PredictionMode.LL
      parser._interp.enable_global_context_dfa = true
      parser._interp.tail_call_preserves_sll = false
      tree = parser.compilationUnit()
    }

    const visitor = new Visitor()
    // const tree = parser.compilationUnit()

     visitor.visitTree(tree)

    expect(1).to.equal(1)
  })
}
