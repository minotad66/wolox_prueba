/* import * as typeorm from 'typeorm';
import * as service from '../service';
import { mockedDataUser } from '../test/mockedData';

(typeorm as any).getRepository = jest.fn();

describe('User services, findListCryptocurrency', () => {
  it('should have a create findListCryptocurrency funtion', () => {
    expect(typeof service.findListCryptocurrency).toBe('function');
  });

  it('should return json body response', async () => {
    (typeorm as any).getRepository.mockReturnValue({
      find: () => Promise.resolve([mockedDataUser.body]),
    });
    const response = await service.findListCryptocurrency(mockedDataUser.user);
    expect(response).toStrictEqual([mockedDataUser.body]);
    expect(
      (typeorm as any).getRepository.mockReturnValue({
        find: () => Promise.resolve([mockedDataUser.body]),
      }),
    ).toBeCalled();
  });

  it('should handle errors', async () => {
    try {
      const error = 'An error ocurred';
      (typeorm as any).getRepository.mockReturnValue({
        find: () => Promise.reject(error),
      });
    } catch (error) {
      expect(error).toThrow('An error ocurred');
    }
  });
});
 */