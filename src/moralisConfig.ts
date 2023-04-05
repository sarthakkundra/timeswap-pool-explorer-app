import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const runApp = async () => {
  await Moralis.start({
    apiKey: `${import.meta.env.VITE_MORALIS_API_KEY}`,
    // ...and any other configuration
  });
};

runApp();