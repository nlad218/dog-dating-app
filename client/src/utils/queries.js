import { gql } from "@apollo/client";

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
// //Display Conversation for a Single Match
// export const QUERY_CURRENT_MATCH_CONVO = gql`
//   query CurrentMatchConvo($matchId: ID!) {
//     oneMatch(matchId: $matchId) {
//       messages {
//         _id
//         createdAt
//         messageText
//         user {
//           _id
//         }
//       }
//     }
//   }
// `;
export const QUERY_MATCH_MESSAGES = gql`
  query matchMessages($matchId: ID!) {
    oneMatch(matchId: $matchID) {
      user1 {
        _id
      }
      user2 {
        _id
      }
      messages {
        _id
        createdAt
        user {
          _id
        }
        messageText
      }
    }
  }
`;

export const QUERY_DISPLAYABLE_USERS = gql`
  query showableUsers {
    getRandomUsers {
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
