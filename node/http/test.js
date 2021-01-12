// const { createServer } = require('http')

// const server = createServer((req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'application/json'
//   })
//   res.write('hello node.js')
//   res.end()
// })
//   .listen(3000, () => {
//     console.log('http://localhost:3000');
//   })

// const { createServer } = require('http')
// createServer((req, res) => {
//   console.log(req.url, req.method);
//   if (req.url === '/' || req.url === '/favicon.ico') {
//     res.writeHead(200, {})
//   } else if (req.url === '/home') {
//     res.writeHead(200, {
//       'Content-Type': 'application/json'
//     })
//     res.write('hello home')
//   } else if (req.url === '/about') {
//     res.writeHead(200, {
//       'Content-Type': 'application/json'
//     })
//     res.write('hello about')
//   } else {
//     res.writeHead(200, {
//       'Content-Type': 'application/json'
//     })
//     res.write('hello error')
//   }
//   res.end()
// })
//   .listen(3000, () => {
//     console.log('http://localhost:3000');
//   })

const { createServer } = require('http')
const querystring = require('querystring')
createServer((req, res) => {
  const [path, searchStr] = req.url.split('?')
  const searchObj = querystring.parse(searchStr)
  console.log(path, searchObj);
  if (path === '/' || path === '/favicon.ico') {
    res.writeHead(200, {})
  } else if (path === '/home') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.write('hello home')
  } else if (path === '/about') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.write('hello about')
    if (searchObj.id) res.write('\n id' + searchObj.id)
  } else {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.write('hello error')
  }
  res.end()
})
  .listen(3000, () => {
    console.log('http://localhost:3000');
  })