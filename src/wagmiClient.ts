import {
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

const chains = [arbitrum, mainnet];
const projectId = `${import.meta.env.VITE_WALLETCONNECT_PROJECT_ID}`;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, version: 1, chains }),
	provider,
});

export default wagmiClient;