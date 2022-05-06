import React, { useEffect, useState } from "react";
export const SocketContext = React.createContext<WebSocket | null>(null);

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
