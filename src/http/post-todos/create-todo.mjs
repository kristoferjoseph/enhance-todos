import arc from '@architect/functions'
import data from '@begin/data'
import sanitize from 'xss'

export const handler = async function createTodo(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const todo = arc.http.helpers.bodyParser(req)
  todo.created = new Date().toISOString()
  todo.title = sanitize(todo.title)
  todo.text = sanitize(todo.text)
  const table = `todos-${accountId}`
  const newTodo = await data.set({
    table,
    ...todo
  })
  return newTodo
}
