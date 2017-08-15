import * as ts from 'typescript';

export const createTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
  const program = ts.createProgram([], context.getCompilerOptions());
  const checker = program.getTypeChecker();

  return sourceFile => walk(sourceFile, context, node => {
    // TODO(tim): Use context and checker to apply transformations where we want.
  });
};

export type Replacer<N extends ts.Node> = (node: N) => N | void;
export function walk<S extends ts.SourceFile, T extends ts.Node>(
  sourceFile: S, context: ts.TransformationContext, replacer: Replacer<T>
): S {
  const transformer: ts.Transformer<T> = node =>
    // TODO(tim): Children are ignored when `replacer(node)` returns `node`!
    replacer(node) || ts.visitEachChild(node, transformer, context);
  return ts.visitEachChild(sourceFile, transformer, context);
}