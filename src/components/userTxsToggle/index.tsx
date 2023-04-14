import React, { Dispatch, SetStateAction } from "react";
import { useNetwork } from "wagmi";

interface IComponentProps {
    setShowUserInitiatedTxs: Dispatch<SetStateAction<boolean>>
}
const UserTxsToggle: React.FC<IComponentProps> = ({ setShowUserInitiatedTxs }) => {
    const { chain } = useNetwork();
	return (
		<div className="my-2">
			<div
				className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
				<input
					type='checkbox'
					name='toggle'
					id='toggle'
					className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
                    onClick={() => {
                        setShowUserInitiatedTxs((s: boolean) => !s)
                    }}
				/>
				<label
					htmlFor='toggle'
					className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'></label>
			</div>
			<label htmlFor='toggle' className='text-xs text-white'>
				Show my transactions
			</label>
            {chain && <div className="text-white text-md">Connected network: {chain?.name}</div>}
            
		</div>
	);
};

export default UserTxsToggle;
