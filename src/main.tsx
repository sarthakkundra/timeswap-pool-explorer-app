import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import App from "./App";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { WagmiConfig } from "wagmi";
import wagmiClient from "./wagmiClient";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Helmet>
					<meta charSet='utf-8' />
					<title>Timeswap Pool Explorer</title>
				</Helmet>
				<WagmiConfig client={wagmiClient}>
					<ApolloProvider client={client}>
						<App />
					</ApolloProvider>
				</WagmiConfig>
			</>
		),

	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
