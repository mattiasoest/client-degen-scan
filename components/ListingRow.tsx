import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link, Typography, Box, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { DEX_DATA, DexId } from "../constants";
import { Listing, Network } from "../utils";
import { ChainIcon } from "./icons/ChainIcons";

const NAME_CAP = 60;

const CHAIN_LABEL: Record<Network, string> = {
  avax: "Avalanche",
  bsc: "Binance Smart Chain",
  eth: "Ethereum",
};

const truncate = (name: string) =>
  name.length < NAME_CAP ? name : `${name.substring(0, NAME_CAP)}...`;

type Props = {
  row: Listing;
};

const ChainBadge = ({ network }: { network: Network }) => (
  <Tooltip title={CHAIN_LABEL[network] ?? network.toUpperCase()} arrow>
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        width: "fit-content",
        px: 1,
        py: 0.5,
        borderRadius: "999px",
        border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.2)}`,
        backgroundColor: (t) => alpha(t.palette.primary.main, 0.05),
      }}
    >
      <ChainIcon network={network} sx={{ fontSize: 20 }} />
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 700, letterSpacing: "0.08em" }}
      >
        {network.toUpperCase()}
      </Typography>
    </Box>
  </Tooltip>
);

export const ListingRow = ({ row }: Props) => {
  const dex = DEX_DATA[row.dexId as DexId];
  return (
    <TableRow hover>
      <TableCell key="chain">
        <ChainBadge network={row.network} />
      </TableCell>

      <TableCell key="date">
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
        >
          {new Date(row.timestamp).toLocaleTimeString()}
        </Typography>
      </TableCell>

      <TableCell key="dexId">
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {dex.name}
        </Typography>
      </TableCell>

      <TableCell key="listing">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            flexWrap: "wrap",
          }}
        >
          <Link href={`${dex.scanner}${row.token0.contract}`} target="_blank">
            {truncate(row.token0.name)}
          </Link>
          <Box component="span" sx={{ color: "text.secondary", px: 0.25 }}>
            /
          </Box>
          <Link href={`${dex.scanner}${row.token1.contract}`} target="_blank">
            {truncate(row.token1.name)}
          </Link>
        </Box>
      </TableCell>

      <TableCell key="pair">
        <Link
          href={`${dex.scanner}${row.pair}`}
          target="_blank"
          sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
        >
          Contract
          <OpenInNewIcon sx={{ fontSize: 14 }} />
        </Link>
      </TableCell>
    </TableRow>
  );
};
