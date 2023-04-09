import axios from "axios";

export const getTokenPriceInUsd = async (
	platformId: string,
	contractAdd: string,
) => {
	const url = `https://api.coingecko.com/api/v3/simple/token_price/${platformId}?contract_addresses=${contractAdd}&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=4`;
    const res = await axios.get(url);
    console.log("COIN GECKO RES ", res);
    return res?.data?.[contractAdd]?.usd
};
