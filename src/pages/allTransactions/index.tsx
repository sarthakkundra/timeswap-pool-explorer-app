import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import WalletConnectProvider from "@walletconnect/web3-provider";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { EvmAddressish, EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import { IMoralisTokenStruct, ITransactionType } from "../../common/apiTypes";
import TransactionCard from "../../components/transactionCard";
const ethers = require("ethers");

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
	infuraId: `${import.meta.env.VITE_INFURA_ID}`,
});

//  Wrap with Web3Provider from ethers.js
const web3Provider = new ethers.providers.Web3Provider(provider);

//  Enable session (triggers QR Code modal)
// await provider.enable();
interface IComponentProps {
	poolAdd: string;
}
const LEND_AND_BORROW_TRANSACTIONS = gql`
	query LendAndBorrowTransactions {
		lendGivenPrincipals(first: 5) {
			id
			token0
			token1
			strike
			transactionHash
			blockNumber
			isToken0
			tokenAmount
			positionAmount
			maturity
			blockTimestamp
		}
		borrowGivenPrincipals(first: 5) {
			id
			token0
			token1
			strike
			transactionHash
			isToken0
			tokenAmount
			positionAmount
			maturity
			blockTimestamp
		}
	}
`;

// borrowGivenPrincipals(first: 5, where: { from: $address }) {
const LEND_AND_BORROW_TRANSACTIONS_BY_USER = gql`
	query LendAndBorrowTransactionsByUser($address: String, $poolAdd: String) {
		lendGivenPrincipals(first: 5, where: { poolPairAddress: $poolAdd, from: $address}) {
			id
			token0
			token1
			strike
			poolPairAddress
			transactionHash
			blockNumber
			isToken0
			tokenAmount
			positionAmount
			maturity
			blockTimestamp
		}
		borrowGivenPrincipals(first: 5, where: { poolPairAddress: $poolAdd, from: $address}) {
			id
			token0
			token1
			strike
			transactionHash
			isToken0
			tokenAmount
			positionAmount
			maturity
			blockTimestamp
		}
	}
`;

const AllTransactions: React.FC<IComponentProps> = ({ poolAdd }) => {
	const { address } = useAccount();
    const [showUserInitiatedTxs, setShowUserInitiatedTxs] = useState(true);
	console.log("CONNECTED ADDRESS ", address);
	// Subscribe to chainId change
	provider.on("chainChanged", (chainId: number) => {
		console.log(chainId);
	});

	const [addressTokenMap, setAddressTokenMap] =
		useState<null | Map<string, string>>(null);

	const { loading, error, data } = useQuery(
		showUserInitiatedTxs ? LEND_AND_BORROW_TRANSACTIONS_BY_USER : LEND_AND_BORROW_TRANSACTIONS,
		{
			variables: {
				address: "0x1b2055564258b3f2dd3bb9ca08ce519c5ff34a88",
				poolAdd
			},
		}
	);

	const getTokenNames = async () => {
		const tokenAddresses: EvmAddressish[] | Set<unknown> = new Set();
		data?.borrowGivenPrincipals?.forEach((borrowTx: any) => {
			tokenAddresses.add(borrowTx.token0);
			tokenAddresses.add(borrowTx.token1);
		});
		data?.lendGivenPrincipals?.forEach((lendTx: any) => {
			tokenAddresses.add(lendTx.token0);
			tokenAddresses.add(lendTx.token1);
		});

		const addresses = Array.from(tokenAddresses) as EvmAddressish[];

		const chain = EvmChain.ETHEREUM;

		const response: any = await Moralis.EvmApi.token.getTokenMetadata({
			addresses,
			chain,
		});

		const addressToTokenMap = new Map();
		response?.jsonResponse?.forEach((token: IMoralisTokenStruct) => {
			addressToTokenMap.set(token?.address, token?.name);
		});

		setAddressTokenMap(addressToTokenMap);

		console.log("SETTING ", addressToTokenMap)

		console.log("RESPONSE ", response.jsonResponse);
		console.log("DATA ", data);
	};

	useEffect(() => {
		data && getTokenNames();
	}, [data, showUserInitiatedTxs]);

	// web3Provider.on("network", (newNetwork: any, oldNetwork: any) => {
	//     console.log("NETWORK LISTENER!!!")
	//     if(oldNetwork) {
	//         window.location.reload()
	//     }
	// })
	return (
		<>
        
			<div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in' onClick={() => setShowUserInitiatedTxs((s) => !s)}>
				<input
					type='checkbox'
					name='toggle'
					id='toggle'
					className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
				/>
				<label
					htmlFor='toggle'
					className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'></label>
			</div>
			<label htmlFor='toggle' className='text-xs text-gray-700'>
				Show my transactions
			</label>
			<div className='flex w-full'>
				<div className='flex flex-col justify-between items-center w-10/12'>
					<h3 className='text-lg font-bold text-white'>Lend Transactions</h3>
					{data?.lendGivenPrincipals?.map((tx: ITransactionType) => (
						<TransactionCard
							transaction={tx}
							addressTokenMap={addressTokenMap}
						/>
					))}
				</div>
				<div className='flex flex-col justify-center items-center w-10/12'>
					<h3 className='text-lg font-bold text-white'>Borrow Transactions</h3>
					{data?.borrowGivenPrincipals?.map((tx: ITransactionType) => (
						<TransactionCard
							transaction={tx}
							addressTokenMap={addressTokenMap}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default AllTransactions;
