import React from 'react'
import { ITransactionType } from '../../common/apiTypes'

interface IComponentProps {
    onClose: () => void;
    transaction: ITransactionType
}

const TransactionDetailCard: React.FC<IComponentProps> = ({ onClose, transaction }) => {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  {/* <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
  <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      {/* <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-[#22283C] flex flex-col">
              <h3 className="text-white font-bold text-lg">Transaction Details</h3>
              <p className="text-sm text-bold text-white">{`Amount - ${transaction?.tokenAmount}`}</p>
              <p className="text-sm text-bold text-white">{`Timestamp - ${transaction?.blockTimestamp}`}</p>
              <p className="text-sm text-bold text-white">{`Strike - ${transaction?.strike}`}</p>
              <p className="text-sm text-bold text-white">{`Maturity - ${transaction?.maturity}`}</p>
              <p className="text-sm text-bold text-white">{`Token0 - ${transaction?.token0}`}</p>
              <p className="text-sm text-bold text-white">{`Token1 - ${transaction?.token1}`}</p>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default TransactionDetailCard
