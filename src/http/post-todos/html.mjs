import createTodo from './create-todo.mjs'

export default async function html(req) {
  try {
    await createTodo(req)
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
      statusCode: 302,
      headers: {
        location: '/todos'
      }
    }
  }
}
