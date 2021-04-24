import React from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {

  const handleLike = async () => {
    const newBlog = blog
    newBlog.likes = blog.likes + 1

    const res = await blogService.update(newBlog)
    console.log(res)
  }

  return (
    <div className='info'>
      {blog.title} {blog.author}
      <button onClick={handleLike}>
        Like
      </button>
    </div>
  )
}

export default Blog