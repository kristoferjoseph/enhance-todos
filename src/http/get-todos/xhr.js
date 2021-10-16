const isXHR = require('@architect/shared/is-xhr')
const getTodos = require('./todos')

module.exports = async function XHR(req) {
  if (isXHR(req)) {
    try {
      const todos = await getTodos(req)

      return {
        statusCode: 200,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'text/html; charset=utf8'
        },
        body: JSON.stringify(todos)
      }
    }
    catch (err) {
      return {
        statusCode: 500,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'text/html; charset=utf8'
        },
        body: JSON.stringify({ error: err.message })
      }
    }
  }
  else {
    return false
  }
}
