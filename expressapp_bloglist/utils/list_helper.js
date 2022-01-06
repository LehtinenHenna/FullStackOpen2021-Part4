
const dummy = blogs => 1

const totalLikes = blogs => {
  totalAmount = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return totalAmount
}

const favoriteBlog = blogs => {
  const max = blogs.reduce((number, blog) => Math.max(number, blog.likes), 0)
  if (max === 0) {
    return {blog: "no favorite blog found"}
  } else {
    const blogWithMostLikes = blogs.find(blog => blog.likes === max)
    return {
      title: blogWithMostLikes.title,
      author: blogWithMostLikes.author,
      likes: blogWithMostLikes.likes
    }
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}