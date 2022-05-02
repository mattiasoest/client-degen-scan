import { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SocketContext } from "./contexts/SocketProvider";
import { NetworkContext } from "./contexts/NetworkProvider";
import { Listing } from "../utils";
import { ListingRow } from "./ListingRow";

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

const ListingTable = () => {
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
                  <ListingRow
                    row={row}
                    key={`${row.timestamp}${row.pair}${row.token0.contract}${row.token1.contract}`}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ListingTable;
