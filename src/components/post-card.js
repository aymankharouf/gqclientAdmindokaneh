import React from 'react'
import { Card, Image, Button, Icon, Label, Confirm } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { AuthContext } from '../auth-provider'
import { DELETE_POST, GET_POSTS } from '../graphql'

const PostCard = props => {
  const { state } = React.useContext(AuthContext)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const { id, body, createdAt, username, likesCount } = props.post
  const likePost = () => {
    
  }
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      id
    },
    update: (cache, result) => {
      setConfirmOpen(false)
      const data = cache.readQuery({
        query: GET_POSTS
      })
      const newData = {...data, posts: data.posts.filter(p => p.id !== id)}
      cache.writeQuery({query: GET_POSTS, data: newData})
    }
  })
  const handleDeletePost = () => {
    deletePost()
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='teal' basic>
            <Icon name='heart' />
          </Button>
          <Label basic color='teal' pointing='left'>
            {likesCount}
          </Label>
        </Button>
        {state.user?.username === username && (
          <Button as='div' color="red" floated="right" onClick={() => setConfirmOpen(true)}>
            <Icon name='trash' style={{ margin: 0 }}/>
          </Button>
        )}
      </Card.Content>
      <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={handleDeletePost} />
    </Card>
  )
}

export default PostCard