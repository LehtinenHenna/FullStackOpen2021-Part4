const config = require('./utils/config')
const express = require('express')
require('express-async-errors') // a library that enables us to move caught errors found in async functions into middleware.errorHandler without try-catch phrases
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error while connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.morganLog)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)


module.exports = app

// to run program use command npm run dev