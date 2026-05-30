import { Listing } from "../utils";

export function loadDummyListings(): Listing[] {
  if (process.env.NODE_ENV !== "development") {
    return [];
  }

  const { DEV_DUMMY_LISTINGS } = require("./dummyListings") as {
    DEV_DUMMY_LISTINGS: Listing[];
  };
  return DEV_DUMMY_LISTINGS;
}
