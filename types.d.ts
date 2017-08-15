declare module "tap" {
  type Fail = false;
  type Pass = true;
  type FailOrPass = Fail | Pass;
  type Assert = (obj: any, message?: string) => FailOrPass;
  interface Test {
    fail(message: string): Fail;
    pass(message: string): Pass;
    test(message: string, cb: (t: Test) => Promise<any>): Promise<any>;
    assert: Assert;
    ok: Assert;
    true: Assert;
  }
  const tap: Test;
  export = tap;
}