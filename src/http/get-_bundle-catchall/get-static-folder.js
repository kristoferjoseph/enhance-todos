const inventory = require('@architect/inventory')
const { join } = require('path')

module.exports = async function getStaticFolder() {
  const base =  join(process.cwd(), '..', '..', '..')
  const { inv } = await inventory({ cwd: base  })
  return join(base, inv.static.folder)
}
