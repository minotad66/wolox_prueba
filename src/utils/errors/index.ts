/* export const errors = (error: { code: any; message: any }) => {
  switch (error.code) {
    case 'user-error':
      return { status: 400, message: error.message };
    case 'not-found':
      return { status: 404, message: error.message };
    case 'token-expired':
      return { status: 401, message: error.message };
    case 'invalid-token':
      return { status: 403, message: error.message };
    default:
      return { status: 500, message: error.message };
  }
}; */

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
