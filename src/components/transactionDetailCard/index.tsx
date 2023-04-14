import React, { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { getTokenPriceInUsd } from "../../common/api/coinGecko";
import { ITransactionType } from "../../common/apiTypes";
import { ethereum } from "../../constants/coinGeckoAssetPlatform";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "#22283C",
		display: "flex",
		flexDirection: "column",
		padding: "16px",
    borderRadius: "10px"
	},
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  }
};

interface IComponentProps {
	onClose: () => void;
	transaction: ITransactionType;
	addressTokenMap: Map<string, string> | null;
}

const TransactionDetailCard: React.FC<IComponentProps> = ({
	onClose,
	transaction,
	addressTokenMap,
}) => {
	const [tokenPriceInUsd, setTokenPriceInUsd] = useState(0);
	const { chain } = useNetwork();
	const getTokenAmountInUsd = async () => {
		const tokenAddress = transaction?.isToken0
			? transaction?.token0
			: transaction?.token1;
		const price = await getTokenPriceInUsd(ethereum.id, tokenAddress);
		setTokenPriceInUsd(price);
	};
	useEffect(() => {
		getTokenAmountInUsd();
	}, []);
	useEffect(() => {
		console.log("TOKEN PRICE ", tokenPriceInUsd);
	}, [tokenPriceInUsd]);

	console.log("TRANSACTION ", transaction, addressTokenMap);
	return (
		// <div
		// 	className='relative z-10'
		// 	aria-labelledby='modal-title'
		// 	role='dialog'
		// 	aria-modal='true'>
		// 	<div
		// 		className='fixed inset-0 z-20 bg-black bg-opacity-75 transition-opacity'
		// 		tabIndex={-1}
		// 		onMouseOver={() => console.log("HELLO")}></div>

		// 	<div className='fixed inset-0 overflow-y-auto'>
		// 		<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
		// 			<div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
		<Modal
			isOpen={true}
			onRequestClose={onClose}
			style={customStyles}
			contentLabel='Transaction Details Modal'

      >
			<div className=' w-full flex justify-between'>
				<h3 className='text-white font-bold text-lg mb-4'>
					Transaction Details
				</h3>
				<button className='text-white font-bold text-lg' onClick={onClose}>
					x
				</button>
			</div>
			<p className='text-sm text-bold text-white my-1'>{`Amount - $${
				tokenPriceInUsd ? tokenPriceInUsd : ""
			} | ${transaction?.tokenAmount}`}</p>
			<p className='text-sm text-bold text-white my-1'>{`Timestamp - ${transaction?.blockTimestamp}`}</p>
			<p className='text-sm text-bold text-white my-1'>{`Network - ${chain?.name}`}</p>
			<p className='text-sm text-bold text-white ny-1'>{`Strike - ${transaction?.strike}`}</p>
			<p className='text-sm text-bold text-white my-1'>{`Maturity - ${transaction?.maturity}`}</p>
			<p className='text-sm text-bold text-white my-1'>{`Token0 - ${addressTokenMap?.get(
				transaction?.token0
			)} (${transaction?.token0})`}</p>
			<p className='text-sm text-bold text-white my-1'>{`Token1 - ${addressTokenMap?.get(
				transaction?.token1
			)} (${transaction?.token1})`}</p>
			<div className='w-full flex justify-center items-center'>
				<button
					className='py-2 px-4 text-sm text-white rounded-md bg-[#2C3B56] mt-2'
					onClick={() => {
						window.open(
							`https://etherscan.io/tx/${transaction?.transactionHash}`,
							"_blank"
						);
					}}>
					View on Etherscan
				</button>
			</div>
		</Modal>
	);
};

export default TransactionDetailCard;
