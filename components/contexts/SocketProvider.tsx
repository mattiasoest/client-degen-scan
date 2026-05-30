import React, { useContext, useEffect, useState } from "react";

const SocketContext = React.createContext<WebSocket | null>(null);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }: React.PropsWithChildren<{}>) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket(
      process.env.NEXT_PUBLIC_WS_SERVER as string
    );
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
