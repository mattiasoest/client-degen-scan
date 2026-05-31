import { Listing } from "../utils";

const now = Date.now();

export const DEV_DUMMY_LISTINGS: Listing[] = [
  {
    timestamp: now - 30_000,
    dexId: "uniswap",
    network: "eth",
    token0: {
      contract: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      name: "Uniswap",
    },
    token1: {
      contract: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      name: "Wrapped Ether",
    },
    pair: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
  },
  {
    timestamp: now - 120_000,
    dexId: "pancake",
    network: "bsc",
    token0: {
      contract: "0x0e09fabb73bd3ade0a17b671fe5682c997d6608",
      name: "PancakeSwap Token",
    },
    token1: {
      contract: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      name: "Wrapped BNB",
    },
    pair: "0x16b9a82891338f9ba80e954d058195e8d2b3510",
  },
  {
    timestamp: now - 450_000,
    dexId: "trader_joe",
    network: "avax",
    token0: {
      contract: "0x6e84a6216eA365d8541bbfc0945b466968E990E4",
      name: "JoeToken",
    },
    token1: {
      contract: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      name: "Wrapped AVAX",
    },
    pair: "0xa388067385Bd10920AbcE04DadaA43fC8D51a5d9",
  },
  {
    timestamp: now - 300_000,
    dexId: "sushiswap_eth",
    network: "eth",
    token0: {
      contract: "0x6b175474e89094c44da98b954eedeac495271d0f",
      name: "Dai Stablecoin",
    },
    token1: {
      contract: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      name: "USD Coin",
    },
    pair: "0x397ff1542a882a6e1e740f04a36e8c19f7a88a71",
  },
  {
    timestamp: now - 600_000,
    dexId: "apeswap",
    network: "bsc",
    token0: {
      contract: "0x603c7f932ed1fcbe115137ca07446a882ca6ee6d",
      name: "ApeSwapFinance Banana",
    },
    token1: {
      contract: "0x55d398326f99059ff775485246999027b3197955",
      name: "Tether USD",
    },
    pair: "0x16b9a82891338f9ba80e954d058195e8d2b3510",
  },
  {
    timestamp: now - 900_000,
    dexId: "uniswap",
    network: "eth",
    token0: {
      contract: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
      name: "SHIBA INU",
    },
    token1: {
      contract: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      name: "Wrapped Ether",
    },
    pair: "0x81145516dc8986eaa8e783753675f4036d9f663f",
  },
  {
    timestamp: now - 1_200_000,
    dexId: "pancake",
    network: "bsc",
    token0: {
      contract: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      name: "Ethereum Token",
    },
    token1: {
      contract: "0x55d398326f99059ff775485246999027b3197955",
      name: "Tether USD",
    },
    pair: "0x16b9a82891338f9ba80e954d058195e8d2b3510",
  },
  {
    timestamp: now - 1_800_000,
    dexId: "sushiswap_bsc",
    network: "bsc",
    token0: {
      contract: "0x8f0528ce5eb7f0eb376522931b80e5937a016c07",
      name: "Alpaca Finance",
    },
    token1: {
      contract: "0xe9e7cea3dedca5982380bafc599bd69add087d56",
      name: "BUSD Token",
    },
    pair: "0x4e68ccd3e89f51c3074ca5072bbac773960dfa36",
  },
  {
    timestamp: now - 2_400_000,
    dexId: "uniswap",
    network: "eth",
    token0: {
      contract: "0x000000000000000000000000000000000000dead",
      name: "Super Long Meme Token Name That Should Truncate In The UI For Visual Testing Purposes",
    },
    token1: {
      contract: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      name: "Wrapped Ether",
    },
    pair: "0x000000000000000000000000000000000000beef",
  },
];
