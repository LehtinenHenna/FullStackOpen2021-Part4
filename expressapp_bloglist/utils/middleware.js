const logger = require('./logger')
const morgan = require('morgan')

// errorHandler middleware handles the errors
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ 
      error: 'malformatted id' 
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ 
      error: error.message 
    })
  } else if (error.name === 'JsonWebTokenError') {    
    return response.status(401).json({      
      error: 'invalid token'    
    })
  }
  next(error)
}


// morgan middleware logs request data in the console
const morganLog = (morgan((tokens,req, res) => {
  let tokensList = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ]
  let body = req.body
  body = JSON.stringify(body)

  if (body !== '{}') {
    // creating a new token that can be called with tokens.body(req, res)
    morgan.token('body', () => body)
    tokensList.push(tokens.body(req, res))
  }
  return tokensList.join(' ')
}))


const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    request.token = authorization.replace('bearer ', '') // remove bearer from start to extract the token
    console.log('request.token:', request.token)
  } 
  next()
}
  


module.exports = {
  errorHandler,
  morganLog,
  tokenExtractor
}