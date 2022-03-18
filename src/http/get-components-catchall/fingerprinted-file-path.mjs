import { readFileSync } from 'fs'
const manifest = JSON.parse(readFileSync('./node_modules/@architect/shared/static.json', 'utf8'))
const STATIC_ROOT = '_static'

export default function fingerprintedFilePath(rootRelativeAssetPath) {
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
