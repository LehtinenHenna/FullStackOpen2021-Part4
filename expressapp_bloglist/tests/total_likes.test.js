const listHelper = require('../utils/list_helper')
const helper = require('./blog_test_helper')

describe('total likes', () => {

  test('with an empty list is zero', () => {
    const result = listHelper.totalLikes(helper.emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a list of many blogs is calculated right', () =>  {
    const result = listHelper.totalLikes(helper.listWithManyBlogs)
    expect(result).toBe(36)
  })
})