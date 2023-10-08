'use client'

import { useState, useEffect } from 'react'
import PromtCard from './PromtCard'

// If a new component is needed and it'll be used only within another 
// component, there is no need to create it separately, it could be and should be done
// in the same file.

const PromtCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => (
        <PromtCard 
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchedText, setSearchedText] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPrompts()
  }, [])
  
  const handleSearch = async (e) => {}

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for a tag or a username'
          value={searchedText}
          onChange={handleSearch}
          required
          className='search_input peer'
        />
      </form>

      <PromtCardList 
        data={posts}
        handleTagClick={() => {}}
      />
      
    </section>
  )
}

export default Feed