# ts-transform-describe-component

A TypeScript compiler plugin.

Analyses a React component and includes the resulting structured meta information in the component module itself, making it available for any runtime piece of software. Support planned for the following bits of descriptive data:

* description of the component;
* name, type, default value and description of its props;
* components that it depends on;
* components that depend on it.

## How to use it

### Pass as argument directly to TypeScript’s compiler API

👷 🌬 🕳 🚧 🤷

### Pass as argument to [ts-loader](https://github.com/TypeStrong/ts-loader) or [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader)

✍ 🔧 🏗 🔨 👨‍💻 

## How to develop it

Having a ball starts at install.

```bash
# Only tested with npm v5 by the way:
npm install
```

Creating your own build is easy.

```bash
# Fresh new JavaScript bundle straight from the source:
npm run build

# Or go for the watch variant:
npm run dev
```

Running the tests is equally straight-forward.

```bash
# You can have them all:
npm test

# Or optimise for speed by being selective:
npm test -- test/transform.ts

# But for debugging nothing beats this:
node --inspect=<port> --debug-brk --require ts-node/register test/transform.ts
```

## How to understand it

### TypeScript compiler API

This little plugin library would have by no means been feasible if it weren’t for the impressive and delightful achievements of the people behind the grand and gratifying TypeScript project.

Not only is the language an absolute pleasure to work with, it also sports an elaborate JavaScript API under the hood. The API is super powerful, battle-tested and… little known. The reason may lie in the fact that its design is not yet considered stable, version one status is not to be expected any time soon and official documentation is basically non-existent.

Unsurprisingly; getting started requires some degree of hustle. Luckily for us the code that team TypeScript has been shipping is firmly on the decently-structured-and-fairly-intelligible-side of the spectrum. A friendly relationship with IntelliSense, a colorful edition of [TypeScript’s own library typings](https://github.com/Microsoft/TypeScript/blob/master/lib/typescript.d.ts), a couple of [basic code samples](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) and perhaps a pinch of perseverence – should be enough to get you on your way.

### Automated testing

Our approach follows from two base decisions:

* We are using the nicely opiniated [node-tap](http://www.node-tap.org/) for writing and running our tests.
* We are writing our tests in TypeScript because types make them more expressive and easier to understand, especially in our scenario of building against an extensive and strongly typed compiler API.

Combining the two is not trivial, resulting in the following intricacies: 

* First of all, an official type definition for node-tap is in the works, but has as of this writing [not landed yet](https://github.com/tapjs/node-tap/pull/381). Therefore we are including a home-grown type definition (which is sufficient but incomplete).
* Transpiling the tests is something that we would like to have abstracted away, because managing two versions of the same tests would serve no purpose other than creating opportunity for confusion. Instead how we would like it to work is that we can simply run them with a single command and get quick results. This is why we use [ts-node](https://github.com/TypeStrong/ts-node) to run the test modules.
* Since the transformer’s source code is compiled in an explicit build step (`npm run build` or `npm run dev`), while the tests are compiled implicitly, we are forced to introduce a slightly different `tsconfig.json` for both of them.
* To make it possible for node-tap’s test runner to deal with our TypeScript test modules, we basically have two options. The first requires [making the modules into autonomous executables](https://github.com/tapjs/node-tap/issues/313#issuecomment-250067741), which is rather intrusive and therefore not my preferred solution. It entails messing with file permissions and depends on an exotic shebang header line in every test file. We have managed to devise an alternative solution that suffers from none of these downsides, at the price of [exactly one crazy sorry-ass work-around](https://github.com/timmolendijk/ts-transform-describe-component/blob/master/test/helpers/run.js#L32).