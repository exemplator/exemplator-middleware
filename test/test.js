import {expect} from 'chai'
import {it, describe} from 'mocha'
import J8Parser from '../src/antlr/java8/Java8Parser'
import JExamples from './resources/java/example1'

describe('Perform sample test\n', () => {
  antlrDebuging()
})

/**
 * Debugging for antlr
 */
function antlrDebuging() {
  it('Debugging antlr: ', () => {
    J8Parser.Java8Parser(JExamples.code)
    expect(1).to.equal(1)
  })
}
