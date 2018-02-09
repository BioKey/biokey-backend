/**
 * Helper function to normalize an error
 * to a standard format for display on the client
 * 
 * @param  {Object} err Error to normalize
 * @return {Object}     Normalized errors
 */
const normalizeError = function(err) {
  let error = {name: 'Error', message: 'Something went wrong... Sorry bout it...'}

  if (err.name && err.message) {
    error.name = err.name;
    error.message = err.message;
  }
  else if (err.message) {
    error.message = err.message;
  }
  else if (err.errmsg) {
    let parts = err.errmsg.split(': ')
    error.name = parts[0]
    error.message = parts.slice(1).join(': ')
  }

  return error;
}

/**
 * Helper function to normalize a list of errors
 * to a standard format for display on the client
 * 
 * @param  {Array} errors List of errors to normalize
 * @return {Array}        List of normalized errors
 */
const normalizeErrors = function(errors) {
  if (!errors.isArray) {
    errors = [errors]
  }
  errors = errors.map(normalizeError);
  return {errors}

}

/**
 * Takes a request query and set list of allowed
 * query fields and returns a filtered query object
 * with enabled params.
 * 
 * @param  {Object} query         Request query object
 * @param  {Array} allowedParams  List of allowed query paramaters
 * @return {Object}               Returns filtered query object
 */
const filterQuery = function(query, allowedParams) {
  let newQuery = {};
  allowedParams.forEach(p => {
    if(query[p]) newQuery[p] = query[p]
  });
  return newQuery;
}

module.exports = { 
  norm: {
    error: normalizeError,
    errors: normalizeErrors
  },
  filter: {
    query: filterQuery
  }
};