import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { GET_POSTS, CREATE_POST } from '../graphql'

const PostForm = () => {
  const [body, setBody] = React.useState('')
  const [error, setError] = React.useState('')
  const [createPost] = useMutation(CREATE_POST, {
    variables: {
      body
    },
    update: (cache, result) => {
      setBody('')
      const data = cache.readQuery({
        query: GET_POSTS
      })
      const newData = {...data, posts: [result.data.createPost, ...data.posts]}
      cache.writeQuery({query: GET_POSTS, data: newData})
    },
    onError: (err) => {
      setError(err.graphQLErrors[0].message)
    }
  })
  const onSubmit = () => {
    createPost()
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Add a post</h2>
        <Form.Input
          placeholder="post body"
          name="body"
          onChange={e => setBody(e.target.value)}
          value={body}
          error={error ? true : false}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error}</li>
          </ul>
        </div>
      )}
    </>
  )
}

export default PostForm