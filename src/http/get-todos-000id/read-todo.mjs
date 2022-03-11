import data from '@begin/data'

export const handler = async function readTodo(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const pathParameters = req.pathParameters || {}
  const key = pathParameters.id
  /*
  // TODO: Add todo edit form
  const edit = req.query &&
    req.query.edit === 'true'
  */

  const table = `todos-${accountId}`
  try {
    const todo = await data.get({
      table,
      key
    })
    todo.active = true
    return todo
  }
  catch(err) {
    throw err
  }
}
