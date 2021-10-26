const aws = require('aws-sdk')
const { join } = require('path')
const getFolder = require('./get-static-folder')

module.exports = function getFile(filePath) {
  const testing = process.env.ARC_ENV
    ? process.env.ARC_ENV === 'testing'
    : process.env.NODE_ENV === 'testing'

  if (testing) {
    const folder = await getFolder()
    return fs.existsSync(join(folder, filePath))
      ? { filePath }
      : false
  }
  else {
    try {
      const s3 = new aws.S3
      const Bucket = process.env.ARC_STATIC_BUCKET
      const Key = filePath.substring(1)
      const meta = await s3.headObject({ Bucket, Key }).promise()
      return { filePath, ...meta.Metadata }
    }
    catch (e) {
      if (e.code != 'NotFound') {
        console.log('err in check-for-file', e)
      }
      return false
    }
  }
}
