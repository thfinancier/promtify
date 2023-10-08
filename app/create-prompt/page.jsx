'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const CreatPrompt = () => {

  const [submitting, setSumbitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  const router = useRouter()
  const { data } = useSession()

  const createPrompt = async (e) => {
    e.preventDefault()
    setSumbitting(true)

    try {
      const response = await fetch('api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: data?.user.id,
          tag: post.tag
        })
      })

      if (response.ok) {
        // Works like a link, redirects to the specified path
        router.push('/')
        console.log(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSumbitting(false)
    }
  }

  return (
    <Form 
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatPrompt