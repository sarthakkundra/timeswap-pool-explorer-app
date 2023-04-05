export const formatTxHash = (txHash: string) => {
    return `${txHash.substring(0, 5)}...${txHash.substring(txHash.length, txHash.length - 3)}`
}