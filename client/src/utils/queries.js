import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    _id: ID
    ownerName: String
    email: String
    password: String
    dogName: String
    image: String
    breed: String
    age: Int
    size: String
    about: String
  }
`;


