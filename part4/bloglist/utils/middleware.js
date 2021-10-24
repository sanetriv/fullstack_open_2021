const logger = require('./logger')
const morgan = require('morgan')

morgan.token('content', function (req) { return JSON.stringify(req.body) })

const requestLogger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.content(req)
  ].join(' ')
})

module.exports = {
    requestLogger
  }