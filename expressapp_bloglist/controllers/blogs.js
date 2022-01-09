const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { findById } = require('../models/blog')

// gets all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

// posts a new blog
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)  

  if (!token || !decodedToken.id) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

// modifies an existing blog
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

// deletes a blog by id
blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)  

  if (!token || !decodedToken.id) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }  
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'you are not authorized to delete this blog' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

module.exports = blogsRouter