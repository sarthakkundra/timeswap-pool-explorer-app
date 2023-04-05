export interface IMoralisTokenStruct {
    address: string;
    name: string;
}

export interface IMoralisTokenResponse {
    jsonResponse: IMoralisTokenStruct[]
}

export interface ITransactionType {
    id: string;
    token0: string;
    token1: string;
    strike: string;
    transactionHash: string;
    blockNumber: string;
    isToken0: boolean;
    tokenAmount: string;
    positionAmount: string;
    blockTimestamp: string;
    maturity: string;
}