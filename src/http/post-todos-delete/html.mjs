import deleteTodo from './delete-todo.mjs'

export default async function html(req) {
  try {
    await deleteTodo(req)
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
