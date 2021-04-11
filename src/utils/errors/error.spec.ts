import * as error from './index';

describe('NotFoundException', () => {
  it('should have a create NotFoundException funtion', () => {
    expect(typeof error.NotFoundException).toBe('function');
  });

  it('should return json body response', async () => {
    const response = error.NotFoundException('error');

    expect(response).toEqual({
      error: 'Not Found',
      message: 'error',
      statusCode: 404,
    });
  });
});

describe('InternalServerErrorException', () => {
  it('should have a create InternalServerErrorException funtion', () => {
    expect(typeof error.InternalServerErrorException).toBe('function');
  });

  it('should return json body response', async () => {
    const response = error.InternalServerErrorException('error');

    expect(response).toEqual({
      error: 'Internal server error',
      message: 'error',
      statusCode: 500,
    });
  });
});

describe('BadRequest', () => {
  it('should have a create BadRequest funtion', () => {
    expect(typeof error.BadRequest).toBe('function');
  });

  it('should return json body response', async () => {
    const response = error.BadRequest('error');

    expect(response).toEqual({
      error: 'Bad request',
      message: 'error',
      statusCode: 400,
    });
  });
});

describe('UniqueViolation', () => {
  it('should have a create UniqueViolation funtion', () => {
    expect(typeof error.UniqueViolation).toBe('function');
  });

  it('should return json body response', async () => {
    const response = error.UniqueViolation();

    expect(response).toEqual({
      error: 'Unique violation',
      message: 'El username ya esta en uso',
      statusCode: 500,
    });
  });
});

describe('UnauthorizedException', () => {
  it('should have a create UnauthorizedException funtion', () => {
    expect(typeof error.UnauthorizedException).toBe('function');
  });

  it('should return json body response', async () => {
    const response = error.UnauthorizedException('error');

    expect(response).toEqual({
      error: 'Unauthorized',
      message: 'error',
      statusCode: 401,
    });
  });
});
