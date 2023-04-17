export class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = 'CustomError';
  }
}

export const errorHandler = (err) => {
  const code = err.extensions && err.extensions.exception && err.extensions.exception.code ? err.extensions.exception.code : 500;
  return {
    errors: [
      {
        message: err.message,
        code: code,
      }
    ]
  };
}
