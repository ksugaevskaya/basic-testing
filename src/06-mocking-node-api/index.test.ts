// Uncomment the code below and write your tests
import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);

    expect(spy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 500);

    expect(spy).toHaveBeenCalledWith(callback, 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 500);

    jest.advanceTimersByTime(1500);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    (join as jest.Mock).mockReturnValue('/fake/path');

    await readFileAsynchronously('file.txt');

    expect(join).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    (join as jest.Mock).mockReturnValue('/fake/path');
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (join as jest.Mock).mockReturnValue('/fake/path');
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as unknown as jest.Mock).mockResolvedValue(Buffer.from('hello'));

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('hello');
  });
});
