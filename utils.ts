import { DexId } from "./constants";

export type NetworkGroup = {
  // arbitrum: boolean;
  // avax: boolean;
  bsc: boolean;
  eth: boolean;
  // ftm: boolean;
  // poly: boolean;
};

export type Network = keyof NetworkGroup;

export const initNetworkGroup = (value: boolean): NetworkGroup => {
  return {
    // arbitrum: value,
    // avax: value,
    bsc: value,
    eth: value,
    // ftm: value,
    // poly: value,
  };
};

export type Listing = {
  timestamp: number;
  dexId: DexId;
  network: Network;
  token0: {
    contract: string;
    name: string;
  };
  token1: {
    contract: string;
    name: string;
  };
  pair: string;
};