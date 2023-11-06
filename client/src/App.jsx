import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

const httpLink = createHttpLink({
	uri: "/graphql",
});
const styles = {
	activeConv: {
		border: ".2rem solid red",
	},
};
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default function App() {
	return (
		<ApolloProvider client={client}>
			<Header>
				<Nav />
			</Header>
			<div
				className="flex justify-center items-center mb-10 max-h-min"
				style={{ padding: "none" }}
			>
				<Outlet />
			</div>
			<Footer>
				<Nav />
			</Footer>
		</ApolloProvider>
	);
}
//comment
