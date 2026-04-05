import https from 'https'

// 要测试的外部链接
const links = [
  'https://cdn.tailwindcss.com'
]

// 测试链接函数
const testLink = (url) => {
  return new Promise((resolve) => {
    const options = {
      method: 'HEAD',
      timeout: 5000
    }

    const req = https.request(url, options, (res) => {
      resolve({
        url,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        isSuccess: res.statusCode >= 200 && res.statusCode < 400
      })
    })

    req.on('error', (error) => {
      resolve({
        url,
        statusCode: 0,
        statusMessage: error.message,
        isSuccess: false
      })
    })

    req.on('timeout', () => {
      resolve({
        url,
        statusCode: 408,
        statusMessage: 'Request Timeout',
        isSuccess: false
      })
    })

    req.end()
  })
}

// 运行测试
const runTests = async () => {
  console.log('Testing external links...')
  console.log('==========================')

  const results = await Promise.all(links.map(testLink))

  results.forEach(result => {
    const statusColor = result.isSuccess ? '\x1b[32m' : '\x1b[31m'
    const resetColor = '\x1b[0m'
    
    console.log(`${statusColor}${result.statusCode}${resetColor} - ${result.url}`)
    if (!result.isSuccess) {
      console.log(`  Error: ${result.statusMessage}`)
    }
  })

  console.log('==========================')
  console.log('Testing completed!')
}

runTests()
