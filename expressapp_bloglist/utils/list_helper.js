
const dummy = blogs => 1

const totalLikes = blogs => {
  totalAmount = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return totalAmount
}



module.exports = {
  dummy,
  totalLikes
}