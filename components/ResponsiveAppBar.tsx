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
import { ToggleButtonGroup, ToggleButton, NoSsr } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useNetwork } from "./contexts/NetworkProvider";
import { initNetworkGroup, Network } from "../utils";
import { APP_NAME } from "../config";
import { ChainIcon } from "./icons/ChainIcons";

const networkToggles: Record<string, { label: string; short: string }> = {
  bsc: { label: "Binance Smart Chain", short: "BSC" },
  eth: { label: "Ethereum", short: "ETH" },
};

const Logo = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      <Box
        sx={{
          width: 30,
          height: 30,
          display: "grid",
          placeItems: "center",
          borderRadius: "8px",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          color: "primary.main",
          fontWeight: 700,
          fontSize: 18,
          boxShadow: `inset 0 0 14px ${alpha(
            theme.palette.primary.main,
            0.25,
          )}, 0 0 12px ${alpha(theme.palette.primary.main, 0.25)}`,
          textShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.9)}`,
        }}
      >
        {">"}
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: "-4px -8px",
            borderRadius: 1,
            background: (t) =>
              `radial-gradient(ellipse 110% 70% at 50% 50%, ${alpha(
                t.palette.primary.main,
                0.34,
              )} 0%, transparent 68%)`,
            filter: "blur(10px)",
            pointerEvents: "none",
          }}
        />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ position: "relative", color: "primary.main" }}
        >
          {APP_NAME.toUpperCase()}
          <Box
            component="span"
            sx={{
              ml: 0.5,
              animation: "cursor-blink 1.1s steps(2, start) infinite",
            }}
          >
            _
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

const LiveBadge = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.25,
        py: 0.5,
        borderRadius: "999px",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
        backgroundColor: alpha(theme.palette.primary.main, 0.06),
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "primary.main",
          animation: "matrix-pulse 1.4s ease-in-out infinite",
        }}
      />
      <Typography
        variant="subtitle2"
        sx={{ color: "text.secondary", letterSpacing: "0.18em" }}
      >
        LIVE
      </Typography>
    </Box>
  );
};

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { networks, setNetworks } = useNetwork();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNetworkChange = (
    _e: React.MouseEvent<HTMLElement>,
    enabled: Network[],
  ) => {
    const updated = initNetworkGroup(false);
    enabled.forEach((net) => {
      updated[net] = true;
    });
    setNetworks(updated);
  };

  const handleNetworkMenuClick = (
    _e: React.MouseEvent<HTMLElement>,
    value: Network,
  ) => {
    const newGroup = { ...networks };
    newGroup[value] = !networks[value];
    setNetworks(newGroup);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="networks"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <NoSsr>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {Object.keys(networkToggles).map((network) => (
                  <MenuItem
                    key={network}
                    selected={networks[network as Network]}
                    onClick={(event) =>
                      handleNetworkMenuClick(event, network as Network)
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                      }}
                    >
                      <ChainIcon
                        network={network as Network}
                        sx={{ fontSize: 20 }}
                      />
                      <Typography>{networkToggles[network].label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </NoSsr>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <NoSsr>
              <ToggleButtonGroup
                size="small"
                value={Object.keys(networks).filter(
                  (net) => networks[net as Network],
                )}
                onChange={handleNetworkChange}
              >
                {Object.keys(networkToggles).map((network) => (
                  <ToggleButton key={network} value={network}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 0.5,
                      }}
                    >
                      <ChainIcon
                        network={network as Network}
                        sx={{ fontSize: 22 }}
                      />
                      <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ fontWeight: 700 }}
                      >
                        {networkToggles[network].short}
                      </Typography>
                    </Box>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </NoSsr>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <LiveBadge />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
