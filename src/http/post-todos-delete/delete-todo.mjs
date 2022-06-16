import arc from '@architect/functions'
import data from '@begin/data'

export default async function deleteTodo(req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const table = `todos-${accountId}`
  const key = arc.http.helpers.bodyParser(req).key
  try {
    const isDestroyed = await data.destroy({
      table,
      key
    })
    console.log('isDestroyed', isDestroyed)
    return key
  }
  catch (err) {
    console.log(err)
    return err
  }
}
