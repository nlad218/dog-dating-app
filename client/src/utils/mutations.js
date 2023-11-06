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
	}
`;

export const ADD_TO_LIKES = gql`
	mutation AddToLikes($otherId: ID!) {
		addToLikes(otherId: $otherId) {
			_id
		}
	}
`;

export const CREATE_MATCH = gql`
	mutation Mutation($otherId: ID!) {
		createMatch(otherId: $otherId) {
			_id
		}
	}
`;

export const CREATE_MESSAGE = gql`
	mutation CreateMessage($messageText: String!, $matchId: ID!) {
		createMessage(messageText: $messageText, matchId: $matchId) {
			messageText
			_id
		}
	}
`;

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout: string
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser(
		$ownerName: String
		$email: String
		$password: String
		$dogName: String
		$breed: String
		$age: Int
		$size: String
		$about: String
		$image: String
		$hobbies: [String]
	) {
		updateUser(
			ownerName: $ownerName
			email: $email
			password: $password
			dogName: $dogName
			breed: $breed
			age: $age
			size: $size
			about: $about
			image: $image
			hobbies: $hobbies
		) {
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
