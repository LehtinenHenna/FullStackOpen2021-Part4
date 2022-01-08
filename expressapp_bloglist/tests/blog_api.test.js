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



describe('when viewing all notes from database', () => {

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
})



describe('addition of a new blog', () => {

  test('succeeds with valid data', async () => {
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


  test('with "likes" field left blank should have zero likes', async () => {
    const newBlog = {
      title: 'The Closet Historian',
      url: 'http://theclosethistorian.blogspot.com/',
      author: 'Bianca'
    }

    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const blogIndex = _.findIndex(blogsAtEnd, (blog) => blog.title === 'The Closet Historian')
    expect(blogsAtEnd[blogIndex].likes).toBe(0)
  })


  test('fails with status code 400 if the fields "title" or "url" are left blank', async () => {
    const newBlog = {
      title: 'Sopivasti Hukassa',
      author: 'Suvi',
      likes: 12
    }
    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)


    const newBlog2 = {
      url: 'https://peculiarseamstress.blog/',
      author: 'Sarah W.',
      likes: 14
    }
    await api 
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
  })
})

describe('deleting a blog', () => {

  test('succeeds with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })


  test('fails with status code 400 if id is invalid', async () => {
    const id = '7'

    await api
      .delete(`/api/blogs/${id}`)
      .expect(400)
  })
})



afterAll(() => {
  mongoose.connection.close()
})