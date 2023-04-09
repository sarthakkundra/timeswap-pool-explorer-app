import {
	EthereumClient,
} from "@web3modal/ethereum";
import { arbitrum, mainnet } from "wagmi/chains";
import wagmiClient from "./wagmiClient";

const chains = [arbitrum, mainnet];
export const ethereumClient = new EthereumClient(wagmiClient, chains);
