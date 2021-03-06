const _ = require('lodash');

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}


const favouriteBlog = (blogs) => {
 
  if (blogs.length === 0){
    return null
  } else {
    let maxLikes = 0
    let favBlog = blogs[0]

    blogs.forEach( (blog) => {
      if (Number(blog.likes) > maxLikes){
        maxLikes = blog.likes
        favBlog = blog
      }
    })

    return favBlog
  }  
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    let countedAuthors = _.countBy(blogs, 'author')
    
    let countedAuthorsList = []
       
    // create list of objects with authors and blog numbers as keys
    for (const author in countedAuthors){
      
      const newAuthor = {
        "author": author,
        "blogs": countedAuthors[author]
      }
      countedAuthorsList.push(newAuthor)
    }
    
    // return the object with the highest number of blogs
    let mostBlogsObj = countedAuthorsList[0] // initialise mostBlog Obj with the first object of the list
   
    countedAuthorsList.forEach(obj => {
     if (obj.blogs > mostBlogsObj.blogs){
       mostBlogsObj = {
        "author": obj.author,
        "blogs": obj.blogs
       }
     }
   })
    
    return mostBlogsObj
  }
}

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return null
  } else {
    // transform blog object so it contains only author and number of likes
    let transformedBlogs = []

    blogs.forEach(blog => {
      let newBlog = _.pick(blog, ['author', 'likes'])   
      transformedBlogs.push(newBlog)
    })

   let likesObj = {}

   transformedBlogs.forEach(blog => {
     if (likesObj[blog.author]){
      likesObj[blog.author] += blog.likes
     } else {
      likesObj[blog.author] = blog.likes
     }
   })
    
   let mostLikedAuthor = _.maxBy(Object.keys(likesObj), o => likesObj[o])
   
   // return author with most likes
    return {
      "author": mostLikedAuthor,
      "likes": likesObj[mostLikedAuthor]
      }
    
  }
}


module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}

