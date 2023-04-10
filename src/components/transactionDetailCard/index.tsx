import React, { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import { getTokenPriceInUsd } from '../../common/api/coinGecko'
import { ITransactionType } from '../../common/apiTypes'
import { ethereum } from '../../constants/coinGeckoAssetPlatform'

interface IComponentProps {
    onClose: () => void;
    transaction: ITransactionType
    addressTokenMap: Map<string, string> | null
}

const TransactionDetailCard: React.FC<IComponentProps> = ({ onClose, transaction, addressTokenMap }) => {
    const [tokenPriceInUsd, setTokenPriceInUsd] = useState(0);
    const { chain } = useNetwork();
    const getTokenAmountInUsd =  async () => {
        const tokenAddress = transaction?.isToken0 ? transaction?.token0 : transaction?.token1
        const price = await getTokenPriceInUsd(ethereum.id, tokenAddress);
        setTokenPriceInUsd(price);
    }
    useEffect(() => {
        getTokenAmountInUsd();
    }, [])
    useEffect(() => {
        console.log("TOKEN PRICE ", tokenPriceInUsd)
    }, [tokenPriceInUsd])

    console.log("TRANSACTION ", transaction, addressTokenMap)
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-[#22283C] flex flex-col p-4">
              <div className=" w-full flex justify-between">
              <h3 className="text-white font-bold text-lg mb-4">Transaction Details</h3>
              <button className="text-white font-bold text-lg" onClick={onClose}>x</button>
              </div>
              <p className="text-sm text-bold text-white my-1">{`Amount - $${tokenPriceInUsd ? tokenPriceInUsd : ""} | ${transaction?.tokenAmount}`}</p>
              <p className="text-sm text-bold text-white my-1">{`Timestamp - ${transaction?.blockTimestamp}`}</p>
              <p className="text-sm text-bold text-white my-1">{`Network - ${chain?.name}`}</p>
              <p className="text-sm text-bold text-white ny-1">{`Strike - ${transaction?.strike}`}</p>
              <p className="text-sm text-bold text-white my-1">{`Maturity - ${transaction?.maturity}`}</p>
              <p className="text-sm text-bold text-white my-1">{`Token0 - ${addressTokenMap?.get(transaction?.token0)} (${transaction?.token0})`}</p>
              <p className="text-sm text-bold text-white my-1">{`Token1 - ${addressTokenMap?.get(transaction?.token1)} (${transaction?.token1})`}</p>
              <div className="w-full flex justify-center items-center">
            <button className="py-2 px-4 text-sm text-white rounded-md bg-[#2C3B56] mt-2" onClick={() => {
                window.open(`https://etherscan.io/tx/${transaction?.transactionHash}`, '_blank');
            }}>View on Etherscan</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default TransactionDetailCard
