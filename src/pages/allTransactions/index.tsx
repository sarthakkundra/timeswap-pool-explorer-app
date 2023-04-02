import React, { useEffect } from "react";

import WalletConnectProvider from "@walletconnect/web3-provider";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
const ethers = require("ethers")

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
	infuraId: `${import.meta.env.VITE_INFURA_ID}`,
});

//  Wrap with Web3Provider from ethers.js
const web3Provider = new ethers.providers.Web3Provider(provider);

//  Enable session (triggers QR Code modal)
// await provider.enable();

const ALL_POOLS = gql`
query AllPools {
    creates(first: 5) {
        id
        caller
        option
        poolPair
      }
}
`

const AllTransactions = () => {
	// Subscribe to chainId change
	provider.on("chainChanged", (chainId: number) => {
		console.log(chainId);
	});

    const { loading, error, data } = useQuery(ALL_POOLS);

    useEffect(() => {
        console.log("POOL DATA ", data);
    }, [data])
    
    // web3Provider.on("network", (newNetwork: any, oldNetwork: any) => {
    //     console.log("NETWORK LISTENER!!!")
    //     if(oldNetwork) {
    //         window.location.reload()
    //     }
    // })
	return <div></div>;
};

export default AllTransactions;
