import { useEffect } from 'react'
import { useNetwork, useDisconnect } from 'wagmi';
import { useSearchParams, useLocation } from "react-router-dom";
import { supportedChainIds } from '../constants/common';

const useListenChainChange = () => {
    const { chain } = useNetwork();
    const { disconnect } = useDisconnect();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
  
    useEffect(() => {
      if(chain && !supportedChainIds.includes(chain?.id)) {
        disconnect()
      } else if(chain) {
        const currentChainId = parseInt(location?.search?.split("=")[1]);
        if(currentChainId !== chain.id) {
          setSearchParams({chainId: chain.id.toString()})
          window?.location?.reload();
        }
      }
    }, [chain])
}

export default useListenChainChange
