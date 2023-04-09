import React, { useEffect } from 'react'

interface IComponentProps {
    setPoolAdd: (add: string) => void;
}
const PoolAddInput: React.FC<IComponentProps> = ({ setPoolAdd }) => {

    const handleKeyDown = (event: any) => {
        if(event.key === "Enter") {
            console.log("Enter pressed")
            const walletAddRegExp = new RegExp(/^0x[a-fA-F0-9]{40}$/g);
            if(!walletAddRegExp.test(event.target.value)) {
                console.log("INVALID ADD!!!!")
            } else {
                setPoolAdd(event.target.value);
            }
        }
    }
    return (
         <input
      className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
      type="text"
      onKeyDown={handleKeyDown}
      placeholder={"Enter pool address"}
    />

  
    )
}

export default PoolAddInput
