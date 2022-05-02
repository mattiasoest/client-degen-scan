import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link } from "@mui/material";
import { DEX_DATA, DexId } from "../constants";
import { Listing } from "../utils";

type Props = {
  row: Listing;
};

export const ListingRow = ({ row }: Props) => {
  return (
    <TableRow hover>
      <TableCell key={"date"}>
        {new Date(row.timestamp).toLocaleTimeString()}
      </TableCell>
      <TableCell key={"dexId"}>
        {DEX_DATA[row.dexId as DexId].name} ({row.network.toUpperCase()})
      </TableCell>
      <TableCell key={"listing"}>
        <Link
          href={`${DEX_DATA[row.dexId as DexId].scanner}${row.token0.contract}`}
          target="_blank"
        >
          {row.token0.name}
        </Link>
        &nbsp;x&nbsp;
        <Link
          href={`${DEX_DATA[row.dexId as DexId].scanner}${row.token1.contract}`}
          target="_blank"
        >
          {row.token1.name}
        </Link>
      </TableCell>
      <TableCell key={"pair"}>
        <Link
          href={`${DEX_DATA[row.dexId as DexId].scanner}${row.pair}`}
          target="_blank"
        >
          Contract
        </Link>
      </TableCell>
    </TableRow>
  );
};
