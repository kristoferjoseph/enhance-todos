import arc from '@architect/functions'
const { http } = arc
import auth from '@architect/shared/auth.mjs'
import json from './json.mjs'
import HTML from './html.mjs'

export const handler = http.async(auth, json, HTML)