import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { initNetworkGroup, NetworkGroup } from "../../utils";

export const NetworkContext = React.createContext<NetworkGroup>(
  {} as NetworkGroup
);

export const NetworkUpdateContext = React.createContext<
  ((x: NetworkGroup) => void) | null
>(null);

export function NetworkProvider({ children }: React.PropsWithChildren<{}>) {
  const [networks, setNetworks] = useLocalStorage<NetworkGroup>('network',
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
