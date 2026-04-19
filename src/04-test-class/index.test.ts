// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const result = getBankAccount(100);
    expect(result.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const from = getBankAccount(100);
    const to = getBankAccount(50);
    expect(() => from.transfer(200, to)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const from = getBankAccount(100);
    expect(() => from.transfer(200, from)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(40);
    expect(account.getBalance()).toBe(60);
  });

  test('should transfer money', () => {
    const from = getBankAccount(100);
    const to = getBankAccount(50);

    from.transfer(30, to);

    expect(from.getBalance()).toBe(70);
    expect(to.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(200);

    const result = await account.fetchBalance();

    expect(typeof result).toBe('number');
    expect(result).toBe(200);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(300);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(300);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
