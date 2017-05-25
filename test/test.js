import {expect} from 'chai'
import {it, describe} from 'mocha'

describe('Perform sample test\n', () => {
    sampleTest()
})

/**
 * Sample test
 */
function sampleTest() {
  it('Test case for testing purposes: ', () => {
    expect('hello world').to.equal('hello world')
  })
}
