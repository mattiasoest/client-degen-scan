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

interface Column {
  id: "date" | "listing" | "dexId" | "pair";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "date", label: "Listing time", minWidth: 50 },
  {
    id: "dexId",
    label: "DEX",
    minWidth: 50,
  },
  { id: "listing", label: "Listing", minWidth: 100 },
  {
    id: "pair",
    label: "Pair",
    minWidth: 50,
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
    if (!socket) {
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
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pairs.map((row: Listing) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`${row.date}${row.pair}`}
                >
                  <TableCell key={"date"}>{row.date}</TableCell>
                  <TableCell key={"dexId"}>{row.dexId}</TableCell>
                  <TableCell key={"listing"}>
                    <Link href={row.token0.contract} target="_blank">
                      {row.token0.name}
                    </Link>
                    &nbsp;x&nbsp;
                    <Link href={row.token1.contract} target="_blank">
                      {row.token1.name}
                    </Link>
                  </TableCell>
                  <TableCell key={"pair"}>
                    <Link href={row.pair} target="_blank">
                      Pair Contract
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
