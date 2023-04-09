import React, { Dispatch, SetStateAction } from "react";

interface IComponentProps {
    // setShowUserInitiatedTxs: (show: boolean) => boolean;
    setShowUserInitiatedTxs: Dispatch<SetStateAction<boolean>>
}
const UserTxsToggle: React.FC<IComponentProps> = ({ setShowUserInitiatedTxs }) => {

	return (
		<>
			<div
				className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'
				onClick={() => setShowUserInitiatedTxs((s: boolean) => !s)}>
				<input
					type='checkbox'
					name='toggle'
					id='toggle'
					className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
				/>
				<label
					htmlFor='toggle'
					className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'></label>
			</div>
			<label htmlFor='toggle' className='text-xs text-gray-700'>
				Show my transactions
			</label>
		</>
	);
};

export default UserTxsToggle;
