import gql from 'graphql-tag'

export const FETCH_POSTS = gql`
  query {
    posts {
      id body createdAt username likesCount
      likes {
        username
      }
      comments {
        id body username createdAt
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id body createdAt username likesCount
      likes {
        username
      }
      comments {
        id body username createdAt
      }
    }
  }
`