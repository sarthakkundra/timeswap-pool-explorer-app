import { Web3Modal, Web3Button } from "@web3modal/react";
import React from "react";

interface IComponentProps {
    ethereumClient: any;
}

const projectId = `${import.meta.env.VITE_WALLETCONNECT_PROJECT_ID}`;

const SignIn: React.FC<IComponentProps> = ({ ethereumClient }) => {
	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center'>
			<h3 className='text-xl font-bold text-black'>Sign in</h3>
			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
			<Web3Button />
		</div>
	);
};

export default SignIn;
