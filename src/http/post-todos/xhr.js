const isXHR = require('@architect/shared/is-xhr')
const createTodo = require('./create-todo')

module.exports = async function XHR(req) {
  if (isXHR(req)) {
    try {
      const newTodo = await createTodo(req)
      return {
        statusCode: 200,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
        },
        body: JSON.stringify(newTodo)
      }
    }
    catch (err) {
      return {
        statusCode: 500,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
        },
        body: JSON.stringify({ error: err.message })
      }
    }
  }
  else {
    return false
  }
}

