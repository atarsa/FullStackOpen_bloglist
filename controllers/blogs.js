const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
   
  response.json(blogs.map(blog => blog.toJSON()))
  
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.title && body.url){
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    })
  
    const savedBlog = await blog.save()
    
    response.json(savedBlog.toJSON())
  } else {
    response
      .status(400)
      .send('Title and url are required')
      
  }  
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception){
    console.log(exception);
    response.status(400).end()
  }
})

module.exports = blogsRouter