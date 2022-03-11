import isJSON from '@architect/shared/is-json.mjs'
import getTodos from './todos.mjs'

export default async function json(req) {
  if (isJSON(req)) {
    try {
      const todos = await getTodos(req)

      return {
        statusCode: 200,
        headers: {
          'content-type': 'application/json; charset=utf8'
        },
        body: JSON.stringify(todos)
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
