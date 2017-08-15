"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
exports.createTransformer = context => {
    const program = ts.createProgram([], context.getCompilerOptions());
    const checker = program.getTypeChecker();
    return sourceFile => walk(sourceFile, context, node => {
        // TODO(tim): Use context and checker to apply transformations where we want.
    });
};
function walk(sourceFile, context, replacer) {
    const transformer = node => 
    // TODO(tim): Children are ignored when `replacer(node)` returns `node`!
    replacer(node) || ts.visitEachChild(node, transformer, context);
    return ts.visitEachChild(sourceFile, transformer, context);
}
exports.walk = walk;
