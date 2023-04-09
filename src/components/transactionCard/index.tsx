import React, { useState } from "react";
import { ITransactionType } from "../../common/apiTypes";
import { formatTxHash } from "../../common/utils";
import TransactionDetailCard from "../transactionDetailCard";

interface IComponentProps {
    transaction: ITransactionType
    addressTokenMap: Map<string, string> | null;
}
const TransactionCard: React.FC<IComponentProps> = ({ transaction, addressTokenMap }) => {
    const [showTxDetailCard, setShowTxDetailCard] = useState(false);

    return (
        <>
        <div className="w-10/12 p-8 bg-[#22283C] flex justify-between rounded-md cursor-pointer transition-all hover:w-11/12 m-2" onClick={() => setShowTxDetailCard(true)}>
            <p className="text-md text-white font-bold">
                {formatTxHash(transaction?.transactionHash)}
            </p>
            {addressTokenMap && (
            <p className="text-md text-white font-bold">{transaction?.isToken0 ? addressTokenMap.get(transaction?.token0) : addressTokenMap.get(transaction?.token0)}</p>
            )}
        </div>
        {showTxDetailCard && (
            <TransactionDetailCard onClose={() => setShowTxDetailCard(false)} transaction={transaction} addressTokenMap={addressTokenMap}/>
        )}
        </>
    )
}

export default TransactionCard
