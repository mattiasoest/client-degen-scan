import React, { useState } from "react";
import { initNetworkGroup, NetworkGroup } from "../../utils";

export const NetworkContext = React.createContext<NetworkGroup>(
  {} as NetworkGroup
);

export const NetworkUpdateContext = React.createContext<
  ((x: NetworkGroup) => void) | null
>(null);

export function NetworkProvider({ children }: React.PropsWithChildren<{}>) {
  const [networks, setNetworks] = useState<NetworkGroup>(
    initNetworkGroup(true)
  );

  const updateNetworks = (group: NetworkGroup) => {
    setNetworks(group);
  };

  return (
    <NetworkContext.Provider value={networks}>
      <NetworkUpdateContext.Provider
        value={(group: NetworkGroup) => updateNetworks(group)}
      >
        {children}
      </NetworkUpdateContext.Provider>
    </NetworkContext.Provider>
  );
}
