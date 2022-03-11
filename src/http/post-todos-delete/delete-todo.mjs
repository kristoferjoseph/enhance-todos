import arc from '@architect/functions'
import data from '@begin/data'

export const handler = async function deleteTodo(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const table = `todos-${accountId}`
  const key = arc.http.helpers.bodyParser(req).key
  await data.destroy({
    table,
    key
  })
  return key
}
