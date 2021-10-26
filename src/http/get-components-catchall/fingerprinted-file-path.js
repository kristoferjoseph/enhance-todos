const manifest = require('@architect/shared/static.json')
const STATIC_ROOT = '_static'

module.exports = function fingerprintedFilePath(rootRelativeAssetPath) {
  const asset = rootRelativeAssetPath[0] === '/'
    ? rootRelativeAssetPath.substring(1)
    : rootRelativeAssetPath
  const local = process.env.ARC_ENV
    ? process.env.ARC_ENV === 'testing'
    : process.env.NODE_ENV === 'testing'
  if (manifest && !local) {
    const fingerprintedFileName = manifest[asset]
    if (!fingerprintedFileName) {
      throw new ReferenceError(`${asset} not found in the fingerprint manifest: static.json`)
    }
    return `/${STATIC_ROOT}/${fingerprintedFileName}`
  }
  return `/${STATIC_ROOT}/${asset}`
}
