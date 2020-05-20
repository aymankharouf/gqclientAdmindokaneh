import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id body createdAt username likesCount
    }
  }
`
const PostForm = () => {
  const [body, setBody] = React.useState('')
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      body
    },
    update: (cache, result) => {
      setBody('')
    }
  })
  const onSubmit = () => {
    createPost()
  }
  return (
    <Form onSubmit={onSubmit}>
      <h2>Add a post</h2>
      <Form.Input
        placeholder="post body"
        name="body"
        onChange={e => setBody(e.target.value)}
        value={body}
      />
      <Button type="submit" color="teal">
        Submit
      </Button>
    </Form>
  )
}

export default PostForm