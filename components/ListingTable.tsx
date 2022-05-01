import { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SocketContext } from "./contexts/SocketProvider";

interface Column {
  id: "date" | "token0" | "token1" | "dexId" | "pair";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "date", label: "Listing time", minWidth: 100 },
  { id: "token0", label: "token 1", minWidth: 100 },
  { id: "token1", label: "token 2", minWidth: 100 },
  {
    id: "dexId",
    label: "DEX",
    minWidth: 100,
  },
  {
    id: "pair",
    label: "Pair",
    minWidth: 120,
  },
];

type Listing = {
  date: string;
  dexId: string;
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

  useEffect(() => {
    console.log("== ListingTable effect");
    if (!socket) {
      console.log("returned");
      return;
    }

    socket.onmessage = (event) => {
      console.log(event.data);
      const parsed = JSON.parse(event.data);
      setPairs((prevList) => [...prevList, parsed]);
    };
  }, [socket]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pairs.map((row: Listing, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {JSON.stringify(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
