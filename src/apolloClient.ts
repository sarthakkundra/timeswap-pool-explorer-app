import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: `${import.meta.env.VITE_TIMESWAP_UNISWAP_PERIPHERY_ETHEREUM}`,
    cache: new InMemoryCache(),
    connectToDevTools: true
});

export default client;