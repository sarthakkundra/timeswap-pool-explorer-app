import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ITransactionType } from "../../common/apiTypes";
import TransactionCard from "../../components/transactionCard";
import {
	LEND_AND_BORROW_TRANSACTIONS,
	LEND_AND_BORROW_TRANSACTIONS_BY_USER,
} from "../../queries/transactions";
import { getTokenNamesByAddresses } from "../../common/utils";
import { useAccount } from "wagmi";
interface IComponentProps {
	poolAdd: string;
	showUserInitiatedTxs: boolean;
}

const AllTransactions: React.FC<IComponentProps> = ({
	poolAdd,
	showUserInitiatedTxs,
}) => {

	const { address } = useAccount();

	const [skipCounter, setSkipCounter] = useState(0);
	const [addressTokenMap, setAddressTokenMap] =
		useState<null | Map<string, string>>(null);

	const [getTxs, { data }] = useLazyQuery(
		showUserInitiatedTxs
			? LEND_AND_BORROW_TRANSACTIONS_BY_USER
			: LEND_AND_BORROW_TRANSACTIONS
	);
	useEffect(() => {
		getTxs({
			variables: {
				address: address,
				poolAdd,
			},
		});
	}, []);

	useEffect(() => {
		getTxs({
			variables: {
				address: address,
				poolAdd,
				skip: skipCounter,
			},
		});
	}, [skipCounter]);

	useEffect(() => {
		if (data) {
			(async () => {
				const tokenAddToNameMap = await getTokenNamesByAddresses(data);
				setAddressTokenMap(tokenAddToNameMap);
			})();
		}
	}, [data, showUserInitiatedTxs]);
	return (
		<>
			<div className='flex w-full'>
				<div className='flex flex-col justify-between items-center w-10/12'>
					<h3 className='text-lg font-bold text-white'>Lend Transactions</h3>
					<ul className="w-full">
					{data?.lendGivenPrincipals?.map((tx: ITransactionType) => (
						<li key={tx?.transactionHash}>
						<TransactionCard
							transaction={tx}
							addressTokenMap={addressTokenMap}
						/>
						</li>
					))}
					</ul>
				</div>
				<div className='flex flex-col justify-center items-center w-10/12'>
					<h3 className='text-lg font-bold text-white'>Borrow Transactions</h3>
					<ul className="w-full">
					{data?.borrowGivenPrincipals?.map((tx: ITransactionType) => (
						<li key={tx?.transactionHash}>
						<TransactionCard
							transaction={tx}
							addressTokenMap={addressTokenMap}
						/>
						</li>
					))}
					</ul>
				</div>
			</div>
			<div className='w-full flex justify-between'>
				<button
					className='bg-black py-1 px-4 text-white font-bold rounded-md'
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
					className='bg-black py-1 px-4 text-white font-bold rounded-md'
					onClick={() => {
						const currentSkipCount = skipCounter;
						setSkipCounter(currentSkipCount + 1);
					}}>
					Next
				</button>
			</div>
		</>
	);
};

export default AllTransactions;
