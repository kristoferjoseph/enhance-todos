const isJSON = require('@architect/shared/is-json')
const getTodos = require('./todos')

module.exports = async function json(req) {
  if (isJSON(req)) {
    try {
      const todos = await getTodos(req)

      return {
        statusCode: 200,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'application/json; charset=utf8'
        },
        body: JSON.stringify(todos)
      }
    }
    catch (err) {
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
