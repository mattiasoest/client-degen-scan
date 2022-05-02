import { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SocketContext } from "./contexts/SocketProvider";
import { Link } from "@mui/material";
import { DexId, DEX_DATA } from "../constants";
import { NetworkContext } from "./contexts/NetworkProvider";
import { Network } from "../utils";

type Column = {
  id: "date" | "listing" | "dexId" | "pair";
  label: string;
  minWidth?: number;
};

const columns: readonly Column[] = [
  { id: "date", label: "Listing time", minWidth: 50 },
  {
    id: "dexId",
    label: "DEX",
    minWidth: 40,
  },
  { id: "listing", label: "Listing", minWidth: 100 },
  {
    id: "pair",
    label: "Pair",
    minWidth: 80,
  },
];

type Listing = {
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

export default function ListingTable() {
  const [pairs, setPairs] = useState([] as Listing[]);
  const socket = useContext(SocketContext);

  const networks = useContext(NetworkContext);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      console.log(event.data);
      const parsed = JSON.parse(event.data);
      setPairs((prevList) => [parsed, ...prevList]);
    };
  }, [socket]);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TableContainer sx={{ maxWidth: 920, maxHeight: 800 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pairs
              .filter((row: Listing) => networks[row.network])
              .map((row: Listing) => {
                return (
                  <TableRow hover key={`${row.timestamp}${row.pair}`}>
                    <TableCell key={"date"}>
                      {new Date(row.timestamp).toLocaleTimeString()}
                    </TableCell>
                    <TableCell key={"dexId"}>
                      {DEX_DATA[row.dexId as DexId].name} (
                      {row.network.toUpperCase()})
                    </TableCell>
                    <TableCell key={"listing"}>
                      <Link
                        href={`${DEX_DATA[row.dexId as DexId].scanner}${
                          row.token0.contract
                        }`}
                        target="_blank"
                      >
                        {row.token0.name}
                      </Link>
                      &nbsp;x&nbsp;
                      <Link
                        href={`${DEX_DATA[row.dexId as DexId].scanner}${
                          row.token1.contract
                        }`}
                        target="_blank"
                      >
                        {row.token1.name}
                      </Link>
                    </TableCell>
                    <TableCell key={"pair"}>
                      <Link
                        href={`${DEX_DATA[row.dexId as DexId].scanner}${
                          row.pair
                        }`}
                        target="_blank"
                      >
                        Contract
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
