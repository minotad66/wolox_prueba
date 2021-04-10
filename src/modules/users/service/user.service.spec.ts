import * as typeorm from 'typeorm';
import * as service from '../service';
import { mockedDataUser } from '../../../test/mockedData';

(typeorm as any).getRepository = jest.fn();

describe('User services, findUsers', () => {
  it('should have a create findUsers funtion', () => {
    expect(typeof service.findUsers).toBe('function');
  });

  it('should return json boby response', async () => {
    (typeorm as any).getRepository.mockReturnValue({
      find: () => Promise.resolve([mockedDataUser.body]),
    });
    const response = await service.findUsers();
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

describe('User services, findOneUsers', () => {
  it('should have a create findOneUsers funtion', () => {
    expect(typeof service.findOneUsers).toBe('function');
  });

  it('should return json boby response', async () => {
    (typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(mockedDataUser.body),
    });
    const response = await service.findOneUsers(mockedDataUser.params);
    expect(response).toStrictEqual(mockedDataUser.body);
    expect(
      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve(mockedDataUser.body),
      }),
    ).toBeCalled();
  });

  it('should handle errors', async () => {
    try {
      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve(),
      });
      await service.findOneUsers(mockedDataUser.params);
    } catch (err) {
      expect(err).toEqual({
        error: 'Not Found',
        message: 'User not found',
        statusCode: 404,
      });
    }
  });
});

describe('User services, saveUsers', () => {
  it('should have a create saveUsers funtion', () => {
    expect(typeof service.saveUsers).toBe('function');
  });

  it('should return json boby response', async () => {
    const { body } = mockedDataUser;
    const data = { ...body, id: 0 };
    (typeorm as any).getRepository.mockReturnValue({
      create: () => data,
      save: () => Promise.resolve(data),
    });
    expect(await service.saveUsers(mockedDataUser.body)).toStrictEqual(data);
    expect(
      (typeorm as any).getRepository.mockReturnValue({
        create: () => data,
        save: () => Promise.resolve(data),
      }),
    ).toBeCalled();
  });

  it('should handle errors', async () => {
    try {
      const { body } = mockedDataUser;
      const data = { ...body, id: 0 };

      (typeorm as any).getRepository.mockReturnValue({
        create: () => data,
        save: () => Promise.resolve(),
      });

      await service.saveUsers(mockedDataUser.body);
    } catch (err) {
      expect(err).toEqual({
        error: 'Internal server error',
        message: 'Problem to create a user. Try again.',
        statusCode: 500,
      });
    }
  });

  it('should handle errors unique violation', async () => {
    try {
      const { body } = mockedDataUser;
      const data = { ...body, id: 0 };

      (typeorm as any).getRepository.mockReturnValue({
        create: () => data,
        save: () => Promise.reject({ code: '23505' }),
      });

      await service.saveUsers(mockedDataUser.body);
    } catch (err) {
      expect(err).toEqual({
        error: 'Unique violation',
        message: 'El username ya esta en uso',
        statusCode: 500,
      });
    }
  });
});

describe('User services, updateUsers', () => {
  it('should have a create updateUsers funtion', () => {
    expect(typeof service.updateUsers).toBe('function');
  });

  it('shoild call reposiories.updateUsers funtion', async () => {
    const { body, params } = mockedDataUser;
    (typeorm as any).getRepository.mockReturnValue({
      update: () => Promise.resolve(),
      findOne: () => Promise.resolve({ ...body, id: 0 }),
    });

    expect(await service.updateUsers(body, params)).toStrictEqual({ ...body, id: 0 });
    expect(
      (typeorm as any).getRepository.mockReturnValue({
        update: () => Promise.resolve(),
        findOne: () => Promise.resolve({ ...body, id: 0 }),
      }),
    ).toBeCalled();
  });

  it('should handle errors', async () => {
    try {
      const { body, params } = mockedDataUser;
      (typeorm as any).getRepository.mockReturnValue({
        update: () => Promise.resolve(),
        findOne: () => Promise.resolve({ ...body, id: 0 }),
      });
      await service.updateUsers(body, params);
    } catch (err) {
      expect(err).toEqual({
        error: 'Not Found',
        message: 'User not found',
        statusCode: 404,
      });
    }
  });
});

describe('User services, removeUsers', () => {
  it('should have a create removeUsers funtion', () => {
    expect(typeof service.removeUsers).toBe('function');
  });

  it('shoild call removeUsers funtion', async () => {
    const { params } = mockedDataUser;
    (typeorm as any).getRepository.mockReturnValue({
      delete: () => Promise.resolve({ rowModifi: 1 }),
    });

    expect(await service.removeUsers(params)).toStrictEqual({
      message: `The user with the id: ${params.id}, was successfully removed`,
    });

    expect(
      (typeorm as any).getRepository.mockReturnValue({
        delete: () => Promise.resolve(),
      }),
    ).toBeCalled();
  });

  it('should handle errors', async () => {
    try {
      (typeorm as any).getRepository.mockReturnValue({
        delete: () => Promise.resolve(),
      });
      await service.removeUsers(mockedDataUser.params);
    } catch (err) {
      expect(err).toEqual({
        error: 'Not Found',
        message: 'User not found',
        statusCode: 404,
      });
    }
  });
});
