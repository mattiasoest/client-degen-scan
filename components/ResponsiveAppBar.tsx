import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const networkToggles = {
  arbitrum: "Arbitrum",
  avax: "Avalanche",
  bsc: "Binance Smart Chain",
  eth: "Ethereum",
  ftm: "Fantom",
  poly: "Polygon",
};

type NetworkGroup = {
  arbitrum: boolean;
  avax: boolean;
  bsc: boolean;
  eth: boolean;
  ftm: boolean;
  poly: boolean;
};

type Network = keyof typeof networkToggles;

const TITLE = "DEGEN SCAN";

const initNetworkGroup = (value: boolean): NetworkGroup => {
  return {
    arbitrum: value,
    avax: value,
    bsc: value,
    eth: value,
    ftm: value,
    poly: value,
  };
};

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const [networks, setNetworks] = useState<NetworkGroup>(
    initNetworkGroup(true)
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNetworkChange = (
    _e: React.MouseEvent<HTMLElement>,
    enabled: Network[]
  ) => {
    const updated = initNetworkGroup(false);
    enabled.forEach((net) => {
      updated[net] = true;
    });

    setNetworks(updated);
  };

  const handleNetworkMenuClick = (
    _e: React.MouseEvent<HTMLElement>,
    value: Network
  ) => {
    const newGroup = { ...networks };
    newGroup[value] = !networks[value];
    setNetworks(newGroup);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="#949494"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            {TITLE}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="networks"
              aria-controls="menu-appbar"
              aria-haspopup="false"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Object.keys(networkToggles).map((network) => (
                <MenuItem
                  key={network}
                  selected={networks[network as Network]}
                  onClick={(event) =>
                    handleNetworkMenuClick(event, network as Network)
                  }
                >
                  <Typography textAlign="center">
                    {networkToggles[network as Network]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            color="#949494"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            {TITLE}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ToggleButtonGroup
              value={Object.keys(networks).filter(
                (net) => networks[net as Network]
              )}
              onChange={handleNetworkChange}
            >
              {Object.keys(networkToggles).map((network) => (
                <ToggleButton value={network} sx={{ my: 2, display: "block" }}>
                  <Typography
                    noWrap
                    textAlign="center"
                    variant="subtitle2"
                    color="primary"
                  >
                    {networkToggles[network as Network]}
                  </Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
