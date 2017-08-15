const path = require('path');

// First of all, bring some structure and insight into which arguments we have
// received from outside.

const args = process.argv;

const command = args.slice(0, 2);

const files = [];
for (let arg of args.slice(2).reverse()) {
  arg = arg.trim();
  if (arg.charAt(0) === '-' && arg.length > command.length)
    // The first non-file that we encounter when coming from the right means we
    // have reached the end of our files list.
    break;
  files.unshift(arg);
}

const options = args.slice(command.length + 1, args.length - files.length);

// Now, let's complement the arguments where necessary, to make them suitable
// for passing on to `node-tap`'s runner.

if (files.length === 0)
  files.push(path.relative(process.cwd(), path.resolve(__dirname, '../**.ts')));

options.push('--node-arg=--require', '--node-arg=ts-node/register');

process.argv = [...command, ...options, ...files];

// Do a crazy and scary hack to work around node-tap's flawed assumption that it
// should actively refuse to run any scripts that do not end in `.js`. Since we
// hook up `ts-node`, we can (and need to) run `.tsx?` files as well.

const nativeStringMatch = String.prototype.match;

function match(regexp) {
  const value = this.toString();
  // As soon as we have decent indications to believe that the current call to
  // `match` is done to check whether a file name is supported by the runner, we
  // monkey-patch its native behavior by making sure that our TypeScript file
  // names are getting the green light.
  if (
    arguments.length === 1 &&
    (typeof regexp === 'string' || regexp instanceof RegExp) &&
    new RegExp(regexp).test('file.js') &&
    (value.endsWith('.ts') || value.endsWith('.tsx'))
  ) {
    const alternativeValue = value.substr(0, value.lastIndexOf('.')) + '.js';
    return alternativeValue.match(...arguments);
  }
  return nativeStringMatch.apply(this, arguments);
}

Object.assign(String.prototype, { match });

// Time to hand it over to node-tap's runner!

require('.bin/tap');