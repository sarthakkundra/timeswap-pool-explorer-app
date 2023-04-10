import { useState } from "react";
import { Web3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { Web3Button } from "@web3modal/react";
import AllTransactions from "./pages/allTransactions";
import "./moralisConfig.ts";
import PoolAddInput from "./components/poolAddInput";
import UserTxsToggle from "./components/userTxsToggle";
import { ethereumClient } from "./ethereumClient";
import useListenChainChange from "./hooks/useListenChainChange";

function App() {
	const [poolAdd, setPoolAdd] = useState("");
	const [showUserInitiatedTxs, setShowUserInitiatedTxs] = useState(false);

	const { address } = useAccount();
	useListenChainChange();

	const projectId = `${import.meta.env.VITE_WALLETCONNECT_PROJECT_ID}`;

	return (
		<div className='bg-gradient-to-br w-screen h-screen flex flex-col justify-center items-center'>
			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} 
			  themeVariables={{
				'--w3m-accent-color': '#22283B',
				'--w3m-accent-fill-color': 'white',
				'--w3m-background-color': '#4a5577'
			  }}
			/>
			<div className="my-4">
			<Web3Button />

			</div>
			<div className='App '>
				<div className='w-screen flex flex-col justify-center items-center'>
					<PoolAddInput setPoolAdd={setPoolAdd} />
					{poolAdd && address && (
						<>
							<UserTxsToggle
								setShowUserInitiatedTxs={setShowUserInitiatedTxs}
							/>
							<AllTransactions
								poolAdd={poolAdd}
								showUserInitiatedTxs={showUserInitiatedTxs}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
