import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from 'bun:test';
import { http } from '.';

const originalFetch = global.fetch;

// TODO: rework when bun implements module mocking
describe('http client', () => {
  const mockFn = jest.fn();
  const mockData = {
    data: 'data',
  };

  beforeAll(() => {
    global.fetch = mockFn;
  });

  afterEach(() => {
    mockFn.mockReset();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('should handle successful GET request', async () => {
    mockFn.mockReturnValue(
      Promise.resolve(new Response(JSON.stringify(mockData))),
    );

    const { data } = await http.get('');

    expect(mockFn).toHaveBeenCalled();
    expect(data).toEqual(mockData.data);
  });

  it('should handle failed GET request', () => {
    mockFn.mockReturnValue(
      Promise.resolve(
        new Response(JSON.stringify(mockData), {
          status: 404,
          statusText: 'Not Found',
        }),
      ),
    );

    expect(() => http.get('')).toThrow();
  });

  it('should handle successful POST request', async () => {
    mockFn.mockReturnValue(
      Promise.resolve(new Response(JSON.stringify(mockData))),
    );

    const { data } = await http.post('', mockData.data);

    expect(mockFn).toHaveBeenCalled();
    expect(data).toEqual(mockData.data);
  });

  it('should handle failed POST request', () => {
    mockFn.mockReturnValue(
      Promise.resolve(
        new Response(JSON.stringify(mockData), {
          status: 404,
          statusText: 'Not Found',
        }),
      ),
    );

    expect(() => http.post('', null)).toThrow();
  });
});
