import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { isMobileWebApp } from "../../utils";
import { useTelegram } from "../../hooks/useTelegram";
import { Navigation } from "./Navigation";

export function Layout() {
  const { tg } = useTelegram();
  const { pathname } = useLocation();
  useEffect(() => {
    tg.ready();
    tg.expand();

    if (isMobileWebApp) {
      try {
        tg.requestFullscreen();
      } catch (error) {
        console.warn("Fullscreen request not supported:", error);
      }
    }
  }, [tg]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "500px",
        paddingInline: "20px",
        margin: "0 auto",
      }}
    >
      <Outlet />
      {pathname !== "/" && <Navigation />}
    </Box>
  );
}
