import React, { useRef } from 'react'
import { useSearchParams } from "react-router-dom";
import { ADDRESS_FILTERS } from '../../constants/common';

interface IComponentProps {
    setPoolAdd: (add: string) => void;
}
const PoolAddInput: React.FC<IComponentProps> = ({ setPoolAdd }) => {

    const inputFieldRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const checkAndSetPoolAdd = () => {
        const walletAddRegExp = new RegExp(/^0x[a-fA-F0-9]{40}$/g);
        // @ts-ignore
        const inputAdd = inputFieldRef?.current?.value || ""
        if(!walletAddRegExp.test(inputAdd)) {
            console.log("INVALID ADD!!!!")
        } else {
            setPoolAdd(inputAdd);
        }
    }

    const handleKeyDown = (event: any) => {
        if(event.key === "Enter") {
            checkAndSetPoolAdd()
        }
    }

    const getPlaceholder = () => {
        const currentFilterInUrl = searchParams.get("filter");
        return `Enter ${currentFilterInUrl === ADDRESS_FILTERS.optionPair ? 'option' : 'pool'} address`
    }
    return (
        <>
         <input
      className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
      type="text"
      onKeyDown={handleKeyDown}
      placeholder={getPlaceholder()}
      ref={inputFieldRef}
    />
    <button className="bg-[#a0d2eb] px-2 py-1 text-black text-bold rounded-md mt-2" onClick={checkAndSetPoolAdd}>See Transactions</button>
</>
  
    )
}

export default PoolAddInput
