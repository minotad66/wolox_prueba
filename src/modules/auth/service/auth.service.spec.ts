import * as typeorm from 'typeorm';
import * as service from '.';
import * as jwt from 'jsonwebtoken';
import { mockedDataUser } from '../test/mockedData';

(typeorm as any).getRepository = jest.fn();

describe('User services, signIn', () => {
  it('should have a create signIn funtion', () => {
    expect(typeof service.signIn).toBe('function');
  });

  it('should return json body response', async () => {
    const { user, body } = mockedDataUser;

    (typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(user),
    });

    const response: any = await service.signIn(body);

    expect(typeof response).toEqual('object');
    const count = Object.keys(response);
    expect(count.length).toBe(2);
    expect(count).toEqual(['user', 'token']);
    expect(
      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve(user),
      }),
    ).toBeCalled();
  });

  it('should handle errors, when the user is not found', async () => {
    try {
      const { user, body } = mockedDataUser;

      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve(),
      });

      await service.signIn(body);
    } catch (err) {
      expect(err).toEqual({
        error: 'Unauthorized',
        message: 'incorrect username or password',
        statusCode: 401,
      });
    }
  });

  it('should handle errors, when the user is not found', async () => {
    try {
      const { user, body } = mockedDataUser;
      user.password = 'passwordWrong';

      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve(),
      });

      await service.signIn(body);
    } catch (err) {
      expect(err).toEqual({
        error: 'Unauthorized',
        message: 'incorrect username or password',
        statusCode: 401,
      });
    }
  });
});
