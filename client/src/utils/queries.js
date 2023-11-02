import { gql } from "@apollo/client";

export const QUERY_SELF_PROFILE = gql`
  query self {
    me {
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

export const QUERY_SELF_MATCHES = gql`
  query selfMatches {
    me {
      matches {
        _id
        user1
        user2
      }
    }
  }
`;

export const QUERY_MATCH_MESSAGES = gql`
  query matchMessages($matchId: ID!) {
    oneMatch(matchId: $matchID) {
      user1
      user2
      messages {
        user
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
