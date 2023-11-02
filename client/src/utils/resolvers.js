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
  query matchMessages {
    
  }
`;

export const QUERY_LIKES = gql``;

export const QUERY_RANDOM_USERS = gql``;
