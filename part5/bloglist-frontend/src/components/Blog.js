import React, { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {

  const [liked, setLiked] = useState(false)

  const handleLike = async () => {
    if (liked === false) {
      const newBlog = blog
      newBlog.likes = blog.likes + 1
      await blogService.update(newBlog)
      setLiked(true)
    }
    else {

      const newBlog = blog
      newBlog.likes = blog.likes - 1
      await blogService.update(newBlog)
      setLiked(false)
    }
  }


  return (
    <div className='info'>
      {blog.title} {blog.author} {blog.likes}
      <button onClick={handleLike}>
        {liked === false ? 'Like' : 'Unlike'}
      </button>
    </div>
  )
}

export default Blog