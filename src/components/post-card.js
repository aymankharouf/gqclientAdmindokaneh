import React from 'react'
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PostCard = props => {
  const { id, body, createdAt, username, likesCount } = props.post
  const likePost = () => {
    
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
      </Card.Content>
    </Card>
  )
}

export default PostCard