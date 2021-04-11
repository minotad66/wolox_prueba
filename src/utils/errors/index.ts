export const NotFoundException = (error: string | undefined) => ({
  statusCode: 404,
  message: error || 'Not Found',
  error: 'Not Found',
});

export const InternalServerErrorException = (error: string | undefined) => ({
  statusCode: 500,
  message: error || 'Internal server error',
  error: 'Internal server error',
});

export const BadRequest = (error: string | undefined) => ({
  statusCode: 400,
  message: error || 'Bad request',
  error: 'Bad request',
});

export const UniqueViolation = () => ({
  statusCode: 500,
  message: 'El username ya esta en uso',
  error: 'Unique violation',
});

export const UnauthorizedException = (error: string | undefined) => ({
  statusCode: 401,
  message: error || 'Unauthorized',
  error: 'Unauthorized',
});
