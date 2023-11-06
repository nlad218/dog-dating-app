import { gql } from "@apollo/client";

export const QUERY_USER_LIKES = gql`
  query likes($userId: ID!) {
    user(userId: $userId) {
      likes {
        _id
      }
    }
  }
`;

export const QUERY_SELF_PROFILE = gql`
  query self {
    me {
      _id
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
  }
`;
//Matches for ConversationList.jsx
// {
//   "data": {
//     "oneMatch": {
//       "user1": {
//         "dogName": "Piper",
//         "ownerName": "Nick",
//         "_id": "654505ae143c66553e09efa4"
//       },
//       "user2": {
//         "dogName": "Pookie",
//         "ownerName": "Maya",
//         "_id": "654505ae143c66553e09efa5"
//       }
//     }
//   }
// }
export const QUERY_SELF_MATCHES = gql`
  query selfMatches {
    me {
      matches {
        _id
        user1 {
          _id
          ownerName
          dogName
        }
        user2 {
          _id
          ownerName
          dogName
        }
      }
    }
  }
`;

export const QUERY_MATCH_MESSAGES = gql`
  query OneMatch($matchId: ID!) {
    oneMatch(matchId: $matchId) {
      user1 {
        _id
        dogName
        ownerName
        image
        breed
        age
        size
        about
        hobbies
      }
      user2 {
        _id
        dogName
        ownerName
        image
        breed
        age
        size
        about
        hobbies
      }
      messages {
        user {
          _id
        }
        messageText
        createdAt
      }
    }
  }
`;

export const QUERY_DISPLAYABLE_USERS = gql`
  query displayableUsers {
    getRandomUsers {
      _id
      about
      age
      breed
      size
      dogName
      hobbies
      image
      likes {
        _id
      }
    }
  }
`;

export const QUERY_FILTER_BY_BREED = gql`
  query filteredUsers {
    filterUsersByBreed {
      _id
      ownerName
      dogName
      image
      breed
      age
      size
      about
      hobbies
      likes
    }
  }
`;
