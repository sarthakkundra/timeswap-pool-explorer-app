
import TransactionCard from './components/transactionCard'
import TransactionDetailCard from './components/transactionDetailCard'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'
import AllTransactions from './pages/allTransactions'
import "./moralisConfig.ts";

// TODO :- Move this to a singleton class, project id to env
const chains = [arbitrum, mainnet]
const projectId = `${import.meta.env.VITE_WALLETCONNECT_PROJECT_ID}`

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

function App() {

//  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],

  return (
    <>
    <WagmiConfig client={wagmiClient}>
    <div className="App">
      {/* <TransactionCard /> */}
      {/* <TransactionDetailCard /> */}
      <div className="w-full">
      <AllTransactions />
      </div>
    </div>
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    <Web3Button />
    </>
  )
}

export default App
