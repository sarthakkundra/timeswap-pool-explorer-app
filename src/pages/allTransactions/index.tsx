import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { ITransactionType } from "../../common/apiTypes";
import TransactionCard from "../../components/transactionCard";
import {
	LEND_AND_BORROW_TRANSACTIONS,
	LEND_AND_BORROW_TRANSACTIONS_BY_OPTION_ADD,
	LEND_AND_BORROW_TRANSACTIONS_BY_OPTION_ADD_BY_USER,
	LEND_AND_BORROW_TRANSACTIONS_BY_USER,
} from "../../queries/transactions";
import { getTokenNamesByAddresses } from "../../common/utils";
import { useAccount } from "wagmi";
import { ADDRESS_FILTERS } from "../../constants/common";
interface IComponentProps {
	filterAdd: string;
	showUserInitiatedTxs: boolean;
}

const AllTransactions: React.FC<IComponentProps> = ({
	filterAdd,
	showUserInitiatedTxs: shouldShowUserInitiatedTxs
}) => {
	const [searchParams] = useSearchParams();
	const filterInUrl = searchParams.get("filter");
	const [showUserInitiatedTxs, setShowUserInitiatedTxs] = useState(searchParams.get("showUserTxs") === "true" ? true : false);
	const { address } = useAccount();
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		const shouldShowUserTxs = searchParams.get("showUserTxs")  === "true" ? true : false;
		setShowUserInitiatedTxs(shouldShowUserTxs)
	}, [searchParams.get("showUserTxs")])

	const [skipCounter, setSkipCounter] = useState(0);
	const [addressTokenMap, setAddressTokenMap] =
		useState<null | Map<string, string>>(null);

	const [
		getTxsByPoolAdd,
		{ data: txnDataByPoolAdd, loading: txsByPoolAddLoading },
	] = useLazyQuery(
		showUserInitiatedTxs
			? LEND_AND_BORROW_TRANSACTIONS_BY_USER
			: LEND_AND_BORROW_TRANSACTIONS
	);
	const [
		getTxsByOptionAdd,
		{ data: txnDataByOptionAdd, loading: txsByOptionAddLoading },
	] = useLazyQuery(
		!showUserInitiatedTxs
			? LEND_AND_BORROW_TRANSACTIONS_BY_OPTION_ADD
			: LEND_AND_BORROW_TRANSACTIONS_BY_OPTION_ADD_BY_USER
	);

	useEffect(() => {
		setData(txnDataByOptionAdd ? txnDataByOptionAdd : txnDataByPoolAdd);
	}, [txnDataByOptionAdd, txnDataByPoolAdd]);

	useEffect(() => {
		if (filterInUrl === ADDRESS_FILTERS.poolPair) {
			if (skipCounter) {
				getTxsByPoolAdd({
					variables: {
						address: address,
						poolAdd: filterAdd,
						skip: skipCounter,
					},
				});
			} else {
				getTxsByPoolAdd({
					variables: {
						address: address,
						poolAdd: filterAdd,
					},
				});
			}
		} else if (filterInUrl === ADDRESS_FILTERS.optionPair) {
			if (skipCounter) {
				getTxsByOptionAdd({
					variables: {
						address: address,
						optionAdd: filterAdd,
						skip: skipCounter,
					},
				});
			} else {
				getTxsByOptionAdd({
					variables: {
						address: address,
						optionAdd: filterAdd,
					},
				});
			}
		}
		// else {
		// 	throw new Error("Invalid Address Filter");
		// }
	}, [skipCounter, showUserInitiatedTxs]);

	useEffect(() => {
		if (data) {
			(async () => {
				const tokenAddToNameMap = (await getTokenNamesByAddresses(data)) as Map<
					string,
					string
				>;
				setAddressTokenMap(tokenAddToNameMap);
			})();
		}
	}, [data, showUserInitiatedTxs]);

	if (
		filterInUrl === ADDRESS_FILTERS.optionPair
			? txsByOptionAddLoading
			: txsByPoolAddLoading
	) {
		return (
			<h1 className='text-white text-xs sm:text-md font-bold'>Loading...</h1>
		);
	}
	return (
		<div className='my-2'>
			<div className='flex w-screen'>
				<div className='flex flex-col justify-between items-center w-10/12 min-h-[390px]'>
					<h3 className='text-lg font-bold text-white'>Lend Transactions</h3>
					{data && data?.lendGivenPrincipals?.length ? (
						<ul className='w-full'>
							{data?.lendGivenPrincipals?.map((tx: ITransactionType) => (
								<li key={tx?.transactionHash}>
									<TransactionCard
										transaction={tx}
										addressTokenMap={addressTokenMap}
									/>
								</li>
							))}
						</ul>
					) : (
						<h1 className='text-white text-xs sm:text-md font-bold'>
							No Transactions found
						</h1>
					)}
				</div>
				<div className='flex flex-col justify-between items-center w-10/12 min-h-[390px]'>
					<h3 className='text-lg font-bold text-white'>Borrow Transactions</h3>
					{data && data?.borrowGivenPrincipals?.length ? (
						<ul className='w-full'>
							{data?.borrowGivenPrincipals?.map((tx: ITransactionType) => (
								<li key={tx?.transactionHash}>
									<TransactionCard
										transaction={tx}
										addressTokenMap={addressTokenMap}
									/>
								</li>
							))}
						</ul>
					) : (
						<h1 className='text-white text-xs sm:text-md font-bold'>
							No Transactions found
						</h1>
					)}
				</div>
			</div>
			<div className='w-10/12 flex justify-around'>
				<button
					className='bg-[#a0d2eb] px-2 py-1 text-black text-bold rounded-md mt-2'
					onClick={() => {
						const currentSkipCount = skipCounter;
						if (currentSkipCount === 0) {
							return;
						}
						setSkipCounter(currentSkipCount - 1);
					}}>
					Prev
				</button>
				<button
					className='bg-[#a0d2eb] px-2 py-1 text-black text-bold rounded-md mt-2'
					onClick={() => {
						const currentSkipCount = skipCounter;
						setSkipCounter(currentSkipCount + 1);
					}}>
					Next
				</button>
			</div>
		</div>
	);
};

export default AllTransactions;
