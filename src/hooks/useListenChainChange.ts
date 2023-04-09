import React, { useEffect } from 'react'
import { useNetwork, useDisconnect } from 'wagmi';
import { supportedChainIds } from '../constants/common';

const useListenChainChange = () => {
    const { chain } = useNetwork();
    const { disconnect } = useDisconnect();
  
    useEffect(() => {
      if(chain && !supportedChainIds.includes(chain?.id)) {
        disconnect()
      }
    }, [chain])
}

export default useListenChainChange
