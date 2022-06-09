import map from '@architect/views/_bundles/map.mjs'
import fs from 'fs'
import { readFile } from 'node:fs/promises'
import path from 'path'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export async function handler (req) {
  console.log('BUNDLES')

  try {
    const reverse = {}
    for (let key in map) {
      reverse[map[key]] = key
    }

    if (Object.keys(reverse).includes(req.rawPath) === false) {
      console.log('FAILED')
      return {
        statusCode: 404,
        headers: {
          'content-type': 'application/json; charset=utf8'
        },
        body: {errors:['not_found: ' + req.rawPath]}
      }
    }

    const base = path.join(__dirname, 'node_modules', '@architect', 'views', '_bundles')
    console.log('BASE')

    const pathToFile = path.join(base, reverse[req.rawPath].split('/').pop())
    console.log('PATH TO FILE', pathToFile)

    const file = await readFile(pathToFile, 'utf8')
    console.log('FILE')

    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/javascript; charset=utf8'
      },
      body: file
    }
  }
  catch(err) {
    console.error(err)
    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json; charset=utf8'
      },
      body: {errors:['Failure: ' + req.rawPath]}
    }
  }
}