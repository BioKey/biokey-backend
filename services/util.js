const normalizeError = function(err) {
  let error = {name: 'Error', message: 'Something went wrong... Sorry bout it...'}

  if (err.name && err.message) {
    error.name = err.name;
    error.message = err.message;
  }
  else if (err.errmsg) {
    let parts = err.errmsg.split(': ')
    error.name = parts[0]
    error.message = parts.slice(1).join(': ')
  }

  return error;
}

const normalizeErrors = function(errors) {
  if (!errors.isArray) {
    errors = [errors]
  }
  errors = errors.map(normalizeError);
  return {errors}

}

module.exports = { 
  normalize: {
    error: normalizeError,
    errors: normalizeErrors
  }
};