export const errorResponse = (res, code = 400, message) => res.status(code).json({
  error: {
    status: 'error',
    message
  }
});
