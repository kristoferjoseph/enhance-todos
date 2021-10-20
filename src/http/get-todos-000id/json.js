const readTodo = require('./read-todo')
const isJSON = require('@architect/shared/is-json')

module.exports = async function json(req) {
  if (isJSON(req)) {
    try {
      const todo = await readTodo(req)

      return {
        statusCode: 200,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'application/json; charset=utf8'
        },
        body: JSON.stringify(todo)
      }
    }
    catch(err) {
      return {
        statusCode: 500,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'application/json; charset=utf8'
        },
        body: JSON.stringify({ error: err.message })
      }
    }
  }
  else {
    return false
  }
}
