// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 4, b: 1, action: Action.Divide, expected: 4 },
  { a: 5, b: 4, action: Action.Divide, expected: 1.25 },
  { a: 6, b: 6, action: Action.Divide, expected: 1 },

  { a: 7, b: 0, action: Action.Divide, expected: Infinity },
  { a: 8, b: NaN, action: Action.Divide, expected: NaN },

  { a: 7, b: -1, action: Action.Multiply, expected: -7 },
  { a: -8, b: -2, action: Action.Multiply, expected: 16 },
  { a: 9, b: 0, action: Action.Multiply, expected: 0 },

  { a: 10, b: 1, action: Action.Subtract, expected: 9 },
  { a: 9, b: NaN, action: Action.Subtract, expected: NaN },
  { a: 8, b: 0, action: Action.Subtract, expected: 8 },

  { a: 7, b: 2, action: Action.Exponentiate, expected: 49 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },

  { a: 4, b: -1, action: Action.Exponentiate, expected: 0.25 },
  { a: 3, b: NaN, action: Action.Exponentiate, expected: NaN },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for $action ($a, $b)',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
