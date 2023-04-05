import React, { useEffect, useState } from "react";

import WalletConnectProvider from "@walletconnect/web3-provider";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { EvmAddressish, EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import { IMoralisTokenStruct, ITransactionType } from "../../common/apiTypes";
import TransactionCard from "../../components/transactionCard";
const ethers = require("ethers")

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
	infuraId: `${import.meta.env.VITE_INFURA_ID}`,
});

//  Wrap with Web3Provider from ethers.js
const web3Provider = new ethers.providers.Web3Provider(provider);

//  Enable session (triggers QR Code modal)
// await provider.enable();

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
`

const AllTransactions = () => {
	// Subscribe to chainId change
	provider.on("chainChanged", (chainId: number) => {
		console.log(chainId);
	});

    const [addressTokenMap, setAddressTokenMap] = useState<null | Map<string, string>>(null)

    const { loading, error, data } = useQuery(LEND_AND_BORROW_TRANSACTIONS);

    const getTokenNames = async () => {
        const tokenAddresses: EvmAddressish[] | Set<unknown> = new Set();
        data?.borrowGivenPrincipals?.forEach((borrowTx: any) => {
            tokenAddresses.add(borrowTx.token0);
            tokenAddresses.add(borrowTx.token1);
        })
        data?.lendGivenPrincipals?.forEach((lendTx: any) => {
            tokenAddresses.add(lendTx.token0);
            tokenAddresses.add(lendTx.token1);
        })

        const addresses = Array.from(tokenAddresses) as  EvmAddressish[];

        const chain = EvmChain.ETHEREUM;
      
        const response: any = await Moralis.EvmApi.token.getTokenMetadata({
          addresses,
          chain,
        });

        const addressToTokenMap = new Map();
        response?.jsonResponse?.forEach((token: IMoralisTokenStruct) => {
            addressToTokenMap.set(token?.address, token?.name);
        })

        setAddressTokenMap(addressToTokenMap);

        console.log("RESPONSE ", response.jsonResponse)
        console.log("DATA ", data )
    }

    useEffect(() => {
       data && getTokenNames()
    }, [data])
    
    // web3Provider.on("network", (newNetwork: any, oldNetwork: any) => {
    //     console.log("NETWORK LISTENER!!!")
    //     if(oldNetwork) {
    //         window.location.reload()
    //     }
    // })
	return (
        <div className="flex w-full">
        <div className="flex flex-col justify-between items-center w-10/12">
            <h3 className="text-lg font-bold text-black">Lend Transactions</h3>
            {data?.lendGivenPrincipals?.map((tx: ITransactionType) => (
                <TransactionCard transaction={tx} addressTokenMap={addressTokenMap}/>
            ))}
        </div>
        <div className="flex flex-col justify-center items-center w-10/12">
        <h3 className="text-lg font-bold text-black">Borrow Transactions</h3>
            {data?.borrowGivenPrincipals?.map((tx: ITransactionType) => (
                <TransactionCard transaction={tx} addressTokenMap={addressTokenMap}/>
            ))}
        </div>
        </div>
    );
};

export default AllTransactions;
