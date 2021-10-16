const isXHR = require('@architect/shared/is-xhr')
const deleteTodo = require('./delete-todo.js')

module.exports = async function XHR(req) {
  if (isXHR(req)) {
    try {
      const key = deleteTodo(req)
      return {
        statusCode: 200,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'text/html; charset=utf8'
        },
        body: JSON.stringify({ key })
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
