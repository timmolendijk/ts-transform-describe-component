import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';

export function loadFixture(filename: string): ts.SourceFile {
  const fixturePath = path.resolve(__dirname, '..', 'fixtures', filename);
  return ts.createSourceFile(
    fixturePath, fs.readFileSync(fixturePath, 'utf8'), ts.ScriptTarget.ES2017
  );
}

export function createTransformationContext() {
  return {
    getCompilerOptions() {
      return {} as ts.CompilerOptions;
    },
    startLexicalEnvironment() {},
    endLexicalEnvironment() {},
    suspendLexicalEnvironment() {},
    resumeLexicalEnvironment() {}
  } as ts.TransformationContext;
}

export function createChecker(compilerOptions: ts.CompilerOptions) {
  const program = ts.createProgram([], compilerOptions);
  return program.getTypeChecker();
}