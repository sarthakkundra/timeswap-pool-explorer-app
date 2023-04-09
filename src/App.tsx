import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { Web3Button } from "@web3modal/react";
import AllTransactions from "./pages/allTransactions";
import "./moralisConfig.ts";
import React, { useState } from "react";
import SignIn from "./pages/signIn";
import PoolAddInput from "./components/poolAddInput";

// TODO :- Move this to a singleton class, project id to env
const chains = [arbitrum, mainnet];
const projectId = `${import.meta.env.VITE_WALLETCONNECT_PROJECT_ID}`;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, version: 1, chains }),
	provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
	const [poolAdd, setPoolAdd] = useState("");

	const { address } = useAccount();

	// if(!address) {
	//   return <SignIn ethereumClient={ethereumClient} />
	// }

	//  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],

	return (
		<div className="bg-gradient-to-br w-screen h-screen flex flex-col justify-center items-center">
    			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
			<Web3Button />
			<WagmiConfig client={wagmiClient}>
				<div className='App '>
					{/* <TransactionCard /> */}
					{/* <TransactionDetailCard /> */}
					<div className='w-full'>
            <PoolAddInput setPoolAdd={setPoolAdd}/>
						{poolAdd && address && <AllTransactions poolAdd={poolAdd}/>}
					</div>
				</div>
			</WagmiConfig>
		</div>
	);
}

export default App;
