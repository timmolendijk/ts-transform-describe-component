import * as tap from 'tap';
import transformerFactory from '../src';
import { createTransformer } from '../src/transform';

tap.test("main export is the transformer factory", async t => {

  t.assert(transformerFactory === createTransformer);

});