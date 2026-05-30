import { useSyncExternalStore } from "react";
import { Listing } from "../utils";
import { loadDummyListings } from "./loadDummyListings";

const subscribe = () => () => {};

const EMPTY_LISTINGS: Listing[] = [];

const getDevDummyListings = (): Listing[] =>
  process.env.NODE_ENV === "development" ? loadDummyListings() : EMPTY_LISTINGS;

export function useDevDummyListings(): Listing[] {
  return useSyncExternalStore(
    subscribe,
    getDevDummyListings,
    () => EMPTY_LISTINGS
  );
}
