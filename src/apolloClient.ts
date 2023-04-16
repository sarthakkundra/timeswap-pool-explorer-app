import { ApolloClient, InMemoryCache } from "@apollo/client";

const selectedChainId = parseInt(location?.search?.split("=")[1]);
console.log("SELECTED CHAIN ID ", selectedChainId)
const graphEndpoint =
	selectedChainId === 1
		? import.meta.env.VITE_TIMESWAP_UNISWAP_PERIPHERY_ETHEREUM
		: import.meta.env.VITE_TIMESWAP_UNISWAP_PERIPHERY_ARBITRUM;
const client = new ApolloClient({
	uri: `${graphEndpoint}`,
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

export default client;
