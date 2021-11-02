const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length===0
    ? 0
    : blogs.map(x => x.likes).reduce((sum, amount) => sum + amount, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length===0){
        return {}
    }
    const rb = blogs.reduce((p, c) => (p.likes > c.likes) ? p : c)
    return { 'title': rb.title, 'author': rb.author, 'likes': rb.likes }
}

const mostBlogs = (blogs) => {
    if (blogs.length===0){
        return {}
    }
    const res = lodash.countBy(blogs, blog => blog.author)
    const key = Object.keys(res).reduce((a, b) => res[a] > res[b] ? a : b)
    return {'author': key, 'blogs': res[key]}
}

const mostLikes = (blogs) => {
    if (blogs.length===0){
        return {}
    }
    const authors = lodash.uniq(blogs.map(blog => blog.author))
    const likes = authors.map(author => blogs.filter(x => x.author===author)).map(a => a.reduce((sum, n) => sum + n.likes, 0))
    const mostPopular = authors[lodash.indexOf(likes, Math.max(...likes))]
    return { 'author': mostPopular, 'likes': Math.max(...likes) }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}