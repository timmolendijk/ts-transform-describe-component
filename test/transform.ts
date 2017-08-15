import * as tap from 'tap';
import * as ts from 'typescript';
import { loadFixture, createTransformationContext } from './helpers';
import { createTransformer, walk, Replacer } from '../src/transform';

tap.test("source does not change if no transformation is needed", async t => {

  const transformationContext = createTransformationContext();
  const transformer = createTransformer(transformationContext);
  const sourceFileIn = loadFixture('non-component.ts');
  const sourceFileOut = transformer(sourceFileIn);

  // TODO(tim): Since source file text is just a static field, we are going to
  // need a printer to get a proper tree serialization.
  t.assert(sourceFileIn.getFullText() === sourceFileOut.getFullText());

});

// tap.test("passing plugin upon transformer creation hooks it up to tree walk", async t => {

//   const transformationContext = createTransformationContext();
//   const transformer = createTransformer(transformationContext, [plugin]);
//   const sourceFile = loadFixture('Component.tsx');
//   transformer(sourceFile);
  
// });

tap.test("all child nodes are visited regardless of transformation", async t => {

  const transformationContext = createTransformationContext();
  const nodes: Set<ts.Node> = new Set();
  const sourceFile = loadFixture('non-component.ts');
  walk(sourceFile, transformationContext, node => { nodes.add(node); });

  // The original `non-component.ts` comprises 63 child nodes.
  t.assert(nodes.size === 63);

});

tap.test("single node can be replaced by another single node", async t => {

  const pluralizeAlternative = 'makeTermAccountForOtherCountsThanOne';

  const transformationContext = createTransformationContext();
  const sourceFile = loadFixture('non-component.ts');
  const replaceNode: Replacer<ts.Identifier> = node => {
    if (node.kind === ts.SyntaxKind.Identifier && node.text === 'pluralize')
      return ts.createIdentifier(pluralizeAlternative);
  };
  const transformedSourceFile = walk(sourceFile, transformationContext, replaceNode);

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const expectedPrint = printer.printFile(sourceFile).
    replace(/pluralize\(/g, pluralizeAlternative + '(');
  const transformedPrint = printer.printFile(transformedSourceFile);
  
  t.assert(transformedPrint === expectedPrint);

});