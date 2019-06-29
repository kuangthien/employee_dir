const jsonServer = require('json-server')
const server = jsonServer.create()
const rewriteRoutes = require('./json-server/routes.json')
const router = jsonServer.router(require('./json-server/db')())

// watch static json files:
const middlewares = jsonServer.defaults({
  static: 'scripts/json-server/static',
})

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

server.use(jsonServer.rewriter(rewriteRoutes))
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  const _send = res.send
  const _status = res.status
  res.send = function(body) {
    if (require('url').parse(req.url, true).query['singular']) {
      try {
        const json = JSON.parse(body)
        if (Array.isArray(json)) {
          if (json.length === 1) {
            return _send.call(this, JSON.stringify(json[0]))
          } else if (json.length === 0) {
            return _status.call(this, 404).send('{}')
          }
        }
      } catch (e) {}
    }
    return _send.call(this, body)
  }
  next()
})
server.use(router)
server.listen(3030, () => {
  console.log('JSON Server is running')
})
