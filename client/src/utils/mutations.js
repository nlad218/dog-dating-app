import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation Mutation($ownerName: String!, $email: String!, $password: String!) {
    createUser(ownerName: $ownerName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const DELETE_USER = gql`
mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
    }
  }`;

// export const CHECK_FOR_MATCH_AFTER_LIKES = gql`
// mutation AddLikeCheckAddMatch($otherId: ID!) {
//     addLikeCheckAddMatch(otherId: $otherId) {
//       _id
//     }
//   }`;

export const ADD_TO_LIKES = gql`
mutation AddToLikes($otherId: ID!) {
    addToLikes(otherId: $otherId) {
      _id
    }
  }`

export const CREATE_MATCH = gql`
mutation Mutation($otherId: ID!) {
    createMatch(otherId: $otherId) {
      _id
    }
  }`

export const CREATE_MESSAGE = gql`
mutation CreateMessage($messageText: String!, $matchId: ID!) {
    createMessage(messageText: $messageText, matchId: $matchId) {
      messageText
      _id
    }
  }`;

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }`;

export const UPDATE_USER = gql`
mutation UpdateUser($ownerName: String!, $newEmail: String!, $newPassword: String!) {
    updateUser(ownerName: $ownerName, newEmail: $newEmail, newPassword: $newPassword) {
        ownerName
        email
        dogName
        image
        breed
        age
        size
        about
        hobbies
    }
  }`;
