import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { useSearchParams } from "react-router-dom";
import { ADDRESS_FILTERS, TOGGLE_TYPE } from "../../constants/common";

interface IComponentProps {
	setShowUserInitiatedTxs?: Dispatch<SetStateAction<boolean>>;
	toggleType: TOGGLE_TYPE;
}
const UserTxsToggle: React.FC<IComponentProps> = ({
	setShowUserInitiatedTxs,
	toggleType,
}) => {
	const { chain } = useNetwork();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const chainIdInUrl = searchParams.get("chainId");
		if (!searchParams.get("filter") && chainIdInUrl) {
			setSearchParams({
				chainId: chainIdInUrl,
				filter: ADDRESS_FILTERS.poolPair,
				showUserTxs: "false"
			});
		}
	}, [searchParams.get("filter")]);

	const setQueryParams = (paramObjToSet: any) => {
		const url = new URL(window?.location?.href);
		const urlSearchParams = new URLSearchParams(url?.search);
		const newSearchParams: any = {};
		for (const [key, value] of urlSearchParams.entries()) {
			newSearchParams[key] = value;
		}

		setSearchParams({...newSearchParams, ...paramObjToSet})
	}

	return (
		<div className='my-2'>
			<div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
				<input
					type='checkbox'
					name='toggle'
					id='toggle'
					className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
					onClick={() => {
						const filterInUrl = searchParams.get("filter");
						if (toggleType === TOGGLE_TYPE.transactions) {
							// setShowUserInitiatedTxs((s: boolean) => !s);
							const shouldShowUserInitiatedTxs = searchParams.get("showUserTxs") === "false"
								? true
								: false;
							// const url = new URL(window?.location?.href);
							// const urlSearchParams = new URLSearchParams(url?.search);
							// const newSearchParams: any = {};
							// for (const [key, value] of urlSearchParams.entries()) {
							// 	newSearchParams[key] = value;
							// }
							// newSearchParams["showUserTxs"] = shouldShowUserInitiatedTxs;
							// setSearchParams(newSearchParams);
							setQueryParams({showUserTxs: shouldShowUserInitiatedTxs});
						} else if (toggleType === TOGGLE_TYPE.addressType) {
							const chainId = searchParams.get("chainId") ?? "1";
							let addFilterToSet;
							if (filterInUrl === ADDRESS_FILTERS.optionPair) {
								// setSearchParams({ filter: ADDRESS_FILTERS.poolPair, chainId });
								addFilterToSet = ADDRESS_FILTERS.poolPair
							} else {
								// setSearchParams({
								// 	filter: ADDRESS_FILTERS.optionPair,
								// 	chainId,
								// });
								addFilterToSet = ADDRESS_FILTERS.optionPair
							}
							setQueryParams({filter: addFilterToSet})
						}
					}}
				/>
				<label
					htmlFor='toggle'
					className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'></label>
			</div>
			<label htmlFor='toggle' className='text-xs text-white'>
				{toggleType === TOGGLE_TYPE.transactions
					? " Show my transactions"
					: "Option Pair"}
			</label>
			{toggleType === TOGGLE_TYPE.transactions ? (
				<>
					{" "}
					{chain && (
						<div className='text-white text-md'>
							Connected network: {chain?.name}
						</div>
					)}{" "}
				</>
			) : (
				<div className='text-white text-md'>Filter by</div>
			)}
		</div>
	);
};

export default UserTxsToggle;
