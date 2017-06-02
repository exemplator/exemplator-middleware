import ANTLRVisitor from './parser/java8/Java8Visitor'

/**
 * ANTLR 4 visitor for Java 8.
 */
export default class Java8Visitor extends ANTLRVisitor {

  constructor() {
    super()
  }

  visitTree(ctx) {
    this.visitTypeDeclaration(ctx)
  }
}
