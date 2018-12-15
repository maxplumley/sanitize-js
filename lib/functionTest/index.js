'use strict';
const should = require('should');

const shoulds = {
  pass: 'PASS',
  fail: 'FAIL',
  throw: 'THROW',
}

const caller = (fn, args) => {
  return fn.apply(fn, args);
}

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const runTests = (testManifest) => {
  const fn = testManifest.function;
  describe(fn.name, () => {

    before( () => {
      //do nothing;
    });

    testManifest.testCases.forEach( testCase => {
      const testShould = testCase['should'];
      const args = testCase['args'];
      const expected = testCase['return'];

      it(`Should ${testShould.toLowerCase()}, ${testCase.description}`, () => {

        if (testShould === shoulds.throw) {
          let errReg = undefined;
          if (expected) {
            errReg =  new RegExp(escapeRegExp(expected));
          }
          should(() => {caller(fn, args);}).throw(errReg);
        }

        if (testShould === shoulds.pass) {
          const val = caller(fn, args);
          
          val.should.eql(expected);

        }

        if (testShould === shoulds.fail) {
          should(() => {caller(fn, args);}).throw(); 
        }
      }); 
    });
  }); 
}

module.exports = {
  runTests,
  shoulds,
}