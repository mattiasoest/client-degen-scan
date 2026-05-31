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

export const AvaxIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 32 32" {...props}>
    <circle cx="16" cy="16" r="16" fill="#E84142" />
    <path
      fill="#fff"
      d="M11.518 22.75H8.49c-.636 0-.95 0-1.142-.123A.77.77 0 017 22.025c-.012-.226.145-.503.46-1.055l7.472-13.193c.318-.56.48-.84.682-.944a.77.77 0 01.698 0c.203.104.364.384.682.944l1.536 2.686.008.014c.343.6.517.906.593 1.226a2.26 2.26 0 010 1.066c-.076.323-.249.63-.597 1.24l-3.926 6.95-.01.017c-.346.606-.52.913-.764 1.145a2.284 2.284 0 01-.93.54c-.319.089-.675.089-1.387.089zm7.643 0h4.336c.64 0 .962 0 1.154-.126a.768.768 0 00.348-.607c.011-.219-.142-.484-.443-1.005l-.032-.054-2.172-3.722-.025-.042c-.305-.517-.46-.778-.657-.879a.762.762 0 00-.693 0c-.2.104-.36.377-.678.925l-2.165 3.722-.007.013c-.317.548-.476.821-.464 1.046a.777.777 0 00.348.606c.188.123.51.123 1.15.123z"
    />
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
    case "avax":
      return <AvaxIcon {...props} />;
    case "bsc":
      return <BnbIcon {...props} />;
    case "eth":
      return <EthIcon {...props} />;
    default:
      return null;
  }
};
