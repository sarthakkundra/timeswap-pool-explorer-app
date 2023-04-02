import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: `${import.meta.env.VITE_TIMESWAP_POOL_EXPLORER_ARBITRUM}`,
    cache: new InMemoryCache(),
    connectToDevTools: true
});

export default client;