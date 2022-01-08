const listHelper = require('../utils/list_helper')
const helper = require('./blog_test_helper')


describe('author with most likes', () => {

  test('with an empty list is empty object', () => {
    const result = listHelper.mostLikes(helper.emptyList)
    expect(result).toEqual({})
  })

  test('when a list has only one blog equals an object {author: <authorOfThatBlog>, likes: <likesOfThatBlog>}', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    expect(result).toEqual(
      {
        author:'Edsger W. Dijkstra', 
        likes: 5
      }
    )
  })

  test('of a list of many blogs the result is an object with the author of blogs with most likes as key and number of their likes as value', () =>  {
    const result = listHelper.mostLikes(helper.listWithManyBlogs)
    expect(result).toEqual(
      {
        author: "Edsger W. Dijkstra", 
        likes: 17
      }
    )
  })

})