const isJSON = require('@architect/shared/is-json')
const deleteTodo = require('./delete-todo.js')

module.exports = async function json(req) {
  if (isJSON(req)) {
    try {
      const key = await deleteTodo(req)
      return {
        statusCode: 200,
        headers: {
          'content-type': 'application/json; charset=utf8'
        },
        body: JSON.stringify({ key })
      }
    }
    catch (err) {
      return {
        statusCode: 500,
        headers: {
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
