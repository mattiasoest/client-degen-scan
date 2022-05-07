const BSC_SCAN = "https://bscscan.com/address/";
const ETH_SCAN = "https://etherscan.io/address/";
const AVAX_SCAN = "https://snowtrace.io/address/";
const POLY_SCAN = "https://polygonscan.com/address/";
const FTM_SCAN = "https://ftmscan.com/address/";
const ARBITRUM_SCAN = "https://arbiscan.io/address/";

export const DEX_DATA = {
  test_dex: {
    scanner: ETH_SCAN,
    name: "Test Dex",
  },
  pancake: {
    scanner: BSC_SCAN,
    name: "PancakeSwap",
  },
  apeswap: {
    scanner: BSC_SCAN,
    name: "ApeSwap",
  },
  trader_joe: {
    scanner: AVAX_SCAN,
    name: "Trader Joe",
  },
  uniswap: {
    scanner: ETH_SCAN,
    name: "Uniswap v2",
  },
  quickswap: {
    scanner: POLY_SCAN,
    name: "Quickswap",
  },
  spiritswap: {
    scanner: FTM_SCAN,
    name: "SpiritSwap",
  },
  spookyswap: {
    scanner: FTM_SCAN,
    name: "SpookySwap",
  },
  sushiswap_eth: {
    scanner: ETH_SCAN,
    name: "SushiSwap",
  },
  sushiswap_arb: {
    scanner: ARBITRUM_SCAN,
    name: "SushiSwap",
  },
  sushiswap_poly: {
    scanner: POLY_SCAN,
    name: "SushiSwap",
  },
  sushiswap_ftm: {
    scanner: FTM_SCAN,
    name: "SushiSwap",
  },
  sushiswap_bsc: {
    scanner: BSC_SCAN,
    name: "SushiSwap",
  },
};

export type DexId = keyof typeof DEX_DATA;
