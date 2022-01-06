const listHelper = require('../utils/list_helper')
const blogLists = require('./blog_lists')

describe('total likes', () => {

  test('with an empty list is zero', () => {
    const result = listHelper.totalLikes(blogLists.emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blogLists.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a list of many blogs is calculated right', () =>  {
    const result = listHelper.totalLikes(blogLists.listWithManyBlogs)
    expect(result).toBe(36)
  })
})