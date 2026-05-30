import React, { useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { initNetworkGroup, NetworkGroup } from "../../utils";

const NetworkContext = React.createContext<NetworkGroup>(
  {} as NetworkGroup
);

const NetworkUpdateContext = React.createContext<
  ((x: NetworkGroup) => void) | null
>(null);

export function useNetwork() {
  const networks = useContext(NetworkContext);
  const setNetworks = useContext(NetworkUpdateContext);
  if (setNetworks === null) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return { networks, setNetworks };
}

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
