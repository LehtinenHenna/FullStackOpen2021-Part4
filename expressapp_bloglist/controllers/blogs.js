const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')

// gets all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

// posts a new blog
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

// deletes a blog by id
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter