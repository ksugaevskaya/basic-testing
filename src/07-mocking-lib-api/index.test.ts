// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: (fn: unknown) => fn,
}));

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockGet = jest.fn().mockResolvedValue({ data: {} });

    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as unknown as ReturnType<typeof axios.create>);

    await throttledGetDataFromApi('/posts');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockGet = jest.fn().mockResolvedValue({ data: {} });

    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as unknown as ReturnType<typeof axios.create>);

    await throttledGetDataFromApi('/posts/1');

    expect(mockGet).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockData = { id: 1, title: 'test' };

    const mockGet = jest.fn().mockResolvedValue({
      data: mockData,
    });

    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as unknown as ReturnType<typeof axios.create>);

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockData);
  });
});
