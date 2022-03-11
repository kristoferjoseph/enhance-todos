import isJSON from '@architect/shared/is-json.mjs'
import updateTodo from './update-todo.mjs'

export const handler = async function json(req) {
  if (isJSON(req)) {
    try {
      const todo = await updateTodo(req)
      return {
        statusCode: 200,
        headers: {
          'content-type': 'application/json; charset=utf8'
        },
        body: JSON.stringify(todo)
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
