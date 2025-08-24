import { Box, Button, Divider, Fade } from "@mui/material";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import { telegramVibrate } from "../../utils";
import { useState, useEffect } from "react";

export function HelloPage() {
  const { platform } = useTelegram();
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 300);
    const buttonTimer = setTimeout(() => setShowButton(true), 700);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleClick = () => {
    telegramVibrate("light");
    navigate("/start");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Fade in={showLogo} timeout={600}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            src="/logo-white.png"
            component={"img"}
            sx={{
              height: "125px",
              margin: "0 auto",
              opacity: showLogo ? 1 : 0,
              transition: "opacity 0.4s ease-in-out",
            }}
          />
        </Box>
      </Fade>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "primary.main",
        }}
      >
        <Divider
          sx={{
            width: "100%",
            backgroundColor: "white",
          }}
        />
        <Fade in={showButton} timeout={400}>
          <Box
            sx={{
              width: "100%",
              margin: "15px auto 0 auto",
              padding: "0px 16px",
            }}
          >
            <Button
              sx={{
                bgcolor: "white",
                color: "primary.main",
                marginTop: "0px",
                marginBottom:
                  platform === "ios" || platform === "android"
                    ? `calc(6px + var(--tg-safe-area-inset-bottom))`
                    : "22px",
                paddingBlock: "13px",
                padding: "15px 12px",
                borderRadius: "12px",
                height: "50px",
                ml: "2px",
              }}
              onClick={handleClick}
            >
              Далее
            </Button>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}