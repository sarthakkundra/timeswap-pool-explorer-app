import { EvmAddressish, EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import { IMoralisTokenStruct } from "./apiTypes";

export const formatTxHash = (txHash: string) => {
    return `${txHash.substring(0, 5)}...${txHash.substring(txHash.length, txHash.length - 3)}`
}

export const getTokenNamesByAddresses = async (data: any) => {
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

    if(!addresses || !addresses.length) {
        return;
    }
    const response: any = await Moralis.EvmApi.token.getTokenMetadata({
        addresses,
        chain,
    });

    const addressToTokenMap = new Map();
    response?.jsonResponse?.forEach((token: IMoralisTokenStruct) => {
        addressToTokenMap.set(token?.address, token?.name);
    });

    return addressToTokenMap;
}