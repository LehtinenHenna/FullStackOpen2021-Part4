const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./blog_test_helper')
const _= require('lodash')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.listWithManyBlogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.listWithManyBlogs.length)
})


test('the blogs have a field called id', async () => {
  const response = await api.get('/api/blogs')

  _.forEach(response.body, (value) => {
    expect(value.id).toBeDefined()
  })

  // option to using _.forEach in case the database is very large: 
  // check only the first blog in the list of blogs
  /*
  const blogToInspect = response.body[0] // first blog in the list
  expect(blogToInspect.id).toBeDefined()
  */
})


test('a valid blog can be posted to the database', async () => {
  const newBlog = helper.listWithOneBlog[0]

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'Go To Statement Considered Harmful'
    )
})



afterAll(() => {
  mongoose.connection.close()
})