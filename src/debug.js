// const middleware = require('../lib/lib.min')
//
// middleware.sendRequest(null, null, null, null)

const antlr4 = require('antlr4/index')
const Java8Lexer = require('./parser/java8/Java8Lexer')
const Java8Parser = require('./parser/java8/Java8Parser')
const Java8Visitor = require('./parser/java8/Java8Visitor')
const JExamples = require('../test/resources/java/example1')


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
  this.visitCompilationUnit(ctx)
}

const input = JExamples.code
const chars = new antlr4.InputStream(input)
const lexer = new Java8Lexer.Java8Lexer(chars)
const tokens = new antlr4.CommonTokenStream(lexer)
const parser = new Java8Parser.Java8Parser(tokens)
const visitor = new Visitor()
parser.buildParseTrees = true
const tree = parser.compilationUnit()

visitor.visitTree(tree)

expect(1).to.equal(1)