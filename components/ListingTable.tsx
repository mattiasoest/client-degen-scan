import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { alpha } from "@mui/material/styles";
import { useDevDummyListings } from "../dev/useDevDummyListings";
import { useSocket } from "./contexts/SocketProvider";
import { useNetwork } from "./contexts/NetworkProvider";
import { Listing } from "../utils";
import { ListingRow } from "./ListingRow";

type Column = {
  id: "chain" | "date" | "listing" | "dexId" | "pair";
  label: string;
  minWidth?: number;
};

const columns: readonly Column[] = [
  { id: "chain", label: "Chain", minWidth: 90 },
  { id: "date", label: "Time", minWidth: 70 },
  { id: "dexId", label: "DEX", minWidth: 90 },
  { id: "listing", label: "Listing", minWidth: 180 },
  { id: "pair", label: "Pair", minWidth: 90 },
];

const ListingTable = () => {
  const devDummyListings = useDevDummyListings();
  const [pairs, setPairs] = useState<Listing[]>([]);
  const socket = useSocket();
  const { networks } = useNetwork();
  const rows = pairs.length > 0 ? pairs : devDummyListings;

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const raw = event.data;
      if (raw === "ping") {
        socket.send("pong");
        return;
      }
      const parsed = JSON.parse(event.data);
      // First message is the most recent listings as array
      if (Array.isArray(parsed)) {
        setPairs((prevList) => {
          const base = prevList.length > 0 ? prevList : devDummyListings;
          return [...parsed, ...base];
        });
      } else {
        // Listing object
        setPairs((prevList) => {
          const base = prevList.length > 0 ? prevList : devDummyListings;
          return [parsed, ...base];
        });
      }
    };

    socket.addEventListener("message", handleMessage);
    return () => socket.removeEventListener("message", handleMessage);
  }, [socket, devDummyListings]);

  const visibleRows = rows.filter((row: Listing) => networks[row.network]);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        flex: 1,
        minHeight: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        px: { xs: 1.5, md: 3 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 960,
          width: "100%",
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 3,
          backgroundColor: (t) => alpha(t.palette.background.paper, 0.55),
          backdropFilter: "blur(10px)",
          border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.18)}`,
          boxShadow: (t) =>
            `0 0 0 1px ${alpha(t.palette.primary.main, 0.05)}, 0 24px 60px rgba(0,0,0,0.55)`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 1.5,
            borderBottom: (t) =>
              `1px solid ${alpha(t.palette.primary.main, 0.15)}`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: "primary.main",
              letterSpacing: "0.22em",
              textShadow: (t) =>
                `0 0 12px ${alpha(t.palette.primary.main, 0.5)}`,
            }}
          >
            {"// LIVE LISTINGS"}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {visibleRows.length} pairs
          </Typography>
        </Box>

        <TableContainer sx={{ flex: 1, minHeight: 0 }}>
          <Table stickyHeader size="small">
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
              {visibleRows.map((row: Listing) => (
                <ListingRow
                  row={row}
                  key={`${row.timestamp}${row.pair}${row.token0.contract}${row.token1.contract}`}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ListingTable;
