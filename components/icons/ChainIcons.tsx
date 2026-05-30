import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { Network } from "../../utils";

export const EthIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 256 417" {...props}>
    <path fill="#8a92b2" d="M127.96 0 125.16 9.5v275.67l2.8 2.79 127.96-75.63z" />
    <path fill="#62688f" d="M127.96 0 0 212.32l127.96 75.64V154.16z" />
    <path
      fill="#454a75"
      d="M127.96 312.19 126.38 314.1v98.2l1.58 4.6L256 236.59z"
    />
    <path fill="#62688f" d="M127.96 416.9v-104.71L0 236.59z" />
    <path fill="#454a75" d="m127.96 287.96 127.96-75.64-127.96-58.16z" />
    <path fill="#62688f" d="m0 212.32 127.96 75.64V154.16z" />
  </SvgIcon>
);

export const BnbIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 126.61 126.61" {...props}>
    <path
      fill="#f3ba2f"
      d="m38.73 53.2 24.59-24.58 24.6 24.6 14.3-14.31L63.32 0 24.43 38.89z"
    />
    <path fill="#f3ba2f" d="M0 63.31 14.3 49 28.61 63.3 14.31 77.61z" />
    <path
      fill="#f3ba2f"
      d="m38.73 73.41 24.59 24.59 24.6-24.6 14.31 14.29-38.9 38.91-38.91-38.88z"
    />
    <path fill="#f3ba2f" d="m98 63.31 14.3-14.31 14.31 14.3-14.31 14.32z" />
    <path
      fill="#f3ba2f"
      d="M77.83 63.3 63.32 48.78 52.59 59.51l-1.23 1.24-2.54 2.54v.01l14.5 14.5z"
    />
  </SvgIcon>
);

type ChainIconProps = SvgIconProps & {
  network: Network;
};

/** Renders the correct chain logo for a given network. */
export const ChainIcon = ({ network, ...props }: ChainIconProps) => {
  switch (network) {
    case "bsc":
      return <BnbIcon {...props} />;
    case "eth":
      return <EthIcon {...props} />;
    default:
      return null;
  }
};
