// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 7, action: Action.Add });
    expect(result).toBe(10);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Multiply });
    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 21, b: 7, action: Action.Divide });
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 1,
      b: 3,
      action: 'multiply',
    });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '7',
      b: 'lalala',
      action: Action.Exponentiate,
    });
    expect(result).toBe(null);

    const resultOne = simpleCalculator({
      a: 7,
      b: false,
      action: Action.Add,
    });
    expect(resultOne).toBe(null);

    const resultTwo = simpleCalculator({
      a: undefined,
      b: NaN,
      action: Action.Multiply,
    });
    expect(resultTwo).toBe(null);
  });
});
