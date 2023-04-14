import React, { Dispatch, SetStateAction } from "react";
import { useNetwork } from "wagmi";
import { ADDRESS_FILTERS, TOGGLE_TYPE } from "../../constants/common";

interface IComponentProps {
	setShowUserInitiatedTxs?: Dispatch<SetStateAction<boolean>>;
	toggleType: TOGGLE_TYPE;
    setAddressFilter?: Dispatch<SetStateAction<ADDRESS_FILTERS>>;
    currentAddressFilter?: ADDRESS_FILTERS
}
const UserTxsToggle: React.FC<IComponentProps> = ({
	setShowUserInitiatedTxs,
	toggleType,
    setAddressFilter,
    currentAddressFilter
}) => {
	const { chain } = useNetwork();
	return (
		<div className='my-2'>
			<div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
				<input
					type='checkbox'
					name='toggle'
					id='toggle'
					className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
					onClick={() => {
                            if(toggleType === TOGGLE_TYPE.transactions && setShowUserInitiatedTxs) {
							setShowUserInitiatedTxs((s: boolean) => !s);
                            } else if(setAddressFilter) {
                                if(currentAddressFilter === ADDRESS_FILTERS.optionPair) {
                                    setAddressFilter(ADDRESS_FILTERS.poolPair)
                                } else {
                                    setAddressFilter(ADDRESS_FILTERS.optionPair);
                                }
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
                <div className='text-white text-md'>
                Filter by
            </div>
            )}
		</div>
	);
};

export default UserTxsToggle;
