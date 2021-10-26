const isJSON = require('@architect/shared/is-json')
const createTodo = require('./create-todo')

module.exports = async function json(req) {
  if (isJSON(req)) {
    try {
      const newTodo = await createTodo(req)
      return {
        statusCode: 200,
        headers: {
          'content-type': 'application/json; charset=utf8'
        },
        body: JSON.stringify(newTodo)
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

