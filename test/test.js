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
    const antlr4 = require('antlr4/index');
    const Java8Lexer = require('../src/antlr/java8/Java8Lexer');
    const Java8Parser = require('../src/antlr/java8/Java8Parser');
    const Java8Listener = require('../src/antlr/java8/Java8Listener');

    const J8Parser = function() {
      SimpleListener.SimpleListener.call(this);
      return this;
    }
    J8Parser.prototype = Object.create(Java8Listener.Java8Listener.prototype);
    J8Parser.prototype.constructor = YearPrinter;
    J8Parser.prototype.exitYear = function (ctx) {
      console.log(ctx);
    }

    const input = JExamples.code;
    const chars = new antlr4.InputStream(input);
    const lexer = new SimpleLexer.SimpleLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new SimpleParser.SimpleParser(tokens);
    parser.buildParseTrees = true;
    const tree = parser.date();
    const printer = new YearPrinter();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(printer, tree);

    expect(1).to.equal(1)
  })
}
