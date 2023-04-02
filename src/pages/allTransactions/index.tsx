import React from "react";

import WalletConnectProvider from "@walletconnect/web3-provider";
const ethers = require("ethers")

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
	infuraId: `${import.meta.env.VITE_INFURA_ID}`,
});

//  Wrap with Web3Provider from ethers.js
const web3Provider = new ethers.providers.Web3Provider(provider);

//  Enable session (triggers QR Code modal)
// await provider.enable();

const AllTransactions = () => {
	// Subscribe to chainId change
	provider.on("chainChanged", (chainId: number) => {
		console.log(chainId);
	});
    
    // web3Provider.on("network", (newNetwork: any, oldNetwork: any) => {
    //     console.log("NETWORK LISTENER!!!")
    //     if(oldNetwork) {
    //         window.location.reload()
    //     }
    // })
	return <div></div>;
};

export default AllTransactions;
