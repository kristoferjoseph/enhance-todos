import deleteTodo from './delete-todo.mjs'

export default function html(req) {
  try {
    deleteTodo(req)
    return {
      statusCode: 302,
      headers: {
        location: '/todos'
      }
    }
  }
  catch (err) {
    req.session.error = err.message
    console.error(err)
    return {
      statusCode: 500,
      headers: {
        location: '/todos'
      }
    }
  }
}
