import * as ts from 'typescript';
export declare const createTransformer: ts.TransformerFactory<ts.SourceFile>;
export declare type Replacer<N extends ts.Node> = (node: N) => N | void;
export declare function walk<S extends ts.SourceFile, T extends ts.Node>(sourceFile: S, context: ts.TransformationContext, replacer: Replacer<T>): S;
