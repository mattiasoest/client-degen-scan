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

const BSC_SCAN = "https://bscscan.com/address";
const ETH_SCAN = "https://etherscan.io/address";
const AVAX_SCAN = "https://snowtrace.io/address/";
const POLY_SCAN = "https://polygonscan.com/address/";

const DEX_DATA = {
  test_dex: {
    scanner: ETH_SCAN,
    name: "Test Dex",
  },
  pancake: {
    scanner: BSC_SCAN,
    name: "Pancake Swap",
  },
  apeswap: {
    scanner: BSC_SCAN,
    name: "ApeSwap",
  },
  trader_joe: {
    scanner: AVAX_SCAN,
    name: "Trader Joe",
  },
  uniswap: {
    scanner: ETH_SCAN,
    name: "Uniswap v2",
  },
  quickswap: {
    scanner: POLY_SCAN,
    name: "Quickswap",
  },
};

type DexId = keyof typeof DEX_DATA;

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
  date: string;
  dexId: DexId;
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

function getDexData(dexId: string) {}
