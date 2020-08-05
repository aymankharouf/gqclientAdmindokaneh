import gql from 'graphql-tag'

export const GET_NOTIFICATIONS = gql`
  query notifications($toUser: ID!) {
    notifications(toUser: $toUser) {
      id title message status fromUser toUser
    }
  }
`
export const CREATE_NOTIFICATION = gql`
  mutation createNotification($title: String!, $message: String!, $toUser: ID!) {
    createNotification(title: $title, message: $message, toUser: $toUser) {
      id title message status fromUser toUser
    }
  }
`

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id: ID!) {
    deleteNotification(id: $id) 
  }
`

export const GET_CATEGORIES = gql`
  query {
    categories {
      id name ordering isLeaf parentId
    }
  }
`

export const LOGIN = gql`
  mutation login(
    $mobile: String!
    $password: String!) {
      login(
          mobile: $mobile
          password: $password
      ) {
        id userName mobile createdAt token
      }
  }
`

export const REGISTER = gql`
  mutation register(
    $userName: String!
    $mobile: String!
    $password: String!
    $confirmPassword: String!) {
      register(
        registerInput: {
          userName: $userName
          mobile: $mobile
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        id userName mobile createdAt token
      }
  }
`