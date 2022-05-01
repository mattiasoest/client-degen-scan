import React, { useEffect, useState } from 'react'

export const SocketContext = React.createContext<WebSocket | null>(null);

export function SocketProvider({ children }: React.PropsWithChildren<{}>) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // const newSocket = new WebSocket('ws://localhost:1000');
    const newSocket = new WebSocket('ws://localhost:4000');
    setSocket(newSocket)

    newSocket.onopen = (event) => {
      console.log('Socket Open Provider!');

      setInterval(() => {
        // newSocket.send(('heartbeat'));
        // console.log('== heartbeat');
      }, 20000);
    };


    return () => newSocket.close()
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
