import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { WagmiConfig } from "wagmi";
import wagmiClient from "./wagmiClient";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<WagmiConfig client={wagmiClient}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</WagmiConfig>
	</React.StrictMode>
);
