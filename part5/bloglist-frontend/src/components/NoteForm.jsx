import React, { useState, useEffect } from 'react'


const NoteForm = ({ user, handleBlogSubmit }) => {

    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const newBlog = {
        "title": blogTitle,
        "author": blogAuthor,
        "url": blogUrl
    }

    return (
        <div>
            <h2>Create new</h2>
            <p>Title:</p><input id='title'
                onChange={({ target }) => setBlogTitle(target.value)}
            ></input>
            <p>Author:</p><input id='author'
                onChange={({ target }) => setBlogAuthor(target.value)}
            ></input>
            <p>URL:</p> <input id='url'
                onChange={({ target }) => setBlogUrl(target.value)}
            ></input>
            <button onClick={() => { handleBlogSubmit(newBlog) }}>Submit</button>
        </div>
    )
}

export default NoteForm
