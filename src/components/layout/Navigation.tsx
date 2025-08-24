import { Box, IconButton, Typography, useTheme, Badge } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { useFavorites } from "../../contexts/FavoritesContext";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export function Navigation() {
  const { tg } = useTelegram();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { favorites } = useFavorites();

  const { isCatalog, isFavorites, isStart } = useMemo(
    () => ({
      isCatalog: location.pathname === "/catalog",
      isFavorites: location.pathname === "/favorites",
      isStart: location.pathname === "/start",
    }),
    [location.pathname]
  );

  const navLinks = useMemo(
    () => [
      {
        label: "Каталог",
        icon: (
          <CheckroomIcon
            sx={{ color: 'secondary.main' }}
          />
        ),
        path: "/catalog",
        isSelected: isCatalog,
      },
      {
        label: "Избранное",
        icon: (
          <Badge 
            badgeContent={favorites.length || null} 
            color="error"
            max={99}
            sx={{
              "& .MuiBadge-badge": {
                right: -6,
                top: 2,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: "0 4px",
                minWidth: "20px",
                height: "20px",
              },
            }}
          >
            <FavoriteIcon sx={{ color: 'secondary.main' }} />
          </Badge>
        ),
        path: "/favorites",
        isSelected: isFavorites,
      },
      {
        label: "Поддержка",
        icon: <SupportAgentIcon sx={{ color: "secondary.main" }} />,
        path: "support",
        isSelected: false,
      },
    ],
    [isCatalog, isFavorites, favorites.length, theme.palette.background.paper]
  );

  const handleClick = (path: string) => {
    if (path === "support") {
      tg.openTelegramLink("https://t.me/ramazanov_rv");
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {/* Blur layer */}
      <Box
        sx={{
          display: isStart ? "none" : "block",
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99997,
          height: "110px",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          transition: "transform 0.3s ease-in-out",
        }}
      />
      {/* Background layer */}
      <Box
        component="nav"
        sx={{
          display: isStart ? "none" : "block",
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99998,
          height: "110px",
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(28, 28, 29, 0.75)"
              : "rgba(255, 255, 255, 0.75)",
          borderTop: `1px solid ${
            theme.palette.mode === "dark" ? "#3C3C3F" : "rgba(0, 0, 0, 0.1)"
          }`,
          transition: "transform 0.3s ease-in-out",
        }}
      />
      {/* Content layer */}
      <Box
        component="nav"
        sx={{
          display: isStart ? "none" : "flex",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          height: "110px",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          pb: "calc(var(--tg-safe-area-inset-bottom) + 10px)",
          background: "#1e2449e0",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {navLinks.map((link) => (
          <IconButton
            key={link.label}
            onClick={() => handleClick(link.path)}
            disableRipple
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              color: "inherit",
              padding: "8px",
              minWidth: "64px",
              height: "58px",
              borderRadius: "18px",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "visible",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              userSelect: "none",
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                borderRadius: "0px",
                opacity: link.isSelected ? 1 : 0,
                transform: link.isSelected ? "scale(1)" : "scale(0.8)",
                transition:
                  "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                willChange: "opacity, transform",
              },
              "@media (hover: hover)": {
                "&:hover": {
                  transform: "translateY(-2px) translateZ(0)",
                  "&::before": {
                    opacity: 1,
                    transform: "scale(1)",
                  },
                },
              },
              "@media (hover: none)": {
                "&:active": {
                  transform: "scale(0.95) translateZ(0)",
                },
              },
            }}
          >
            <Box
              className="nav-icon"
              sx={{
                transition: "transform 0.2s ease-in-out",
                transform: link.isSelected
                  ? "scale(1.1) translateZ(0)"
                  : "scale(1) translateZ(0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                willChange: "transform",
                opacity: 1,
                pt: 0.5,
                borderRadius: "18px",
              }}
            >
              {link.icon}
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: "11px",
                color: link.isSelected
                  ? "secondary.main"
                  : "white",
                transition: "color 0.2s ease-in-out",
                fontWeight: link.isSelected ? 500 : 400,
                display: "block",
                opacity: 1,
                pb: 0.5,
              }}
            >
              {link.label}
            </Typography>
          </IconButton>
        ))}
      </Box>
    </>
  );
}
