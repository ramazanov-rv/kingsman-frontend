import { Box, Button, Divider, Fade, Typography } from "@mui/material";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import { telegramVibrate } from "../../utils";
import { useState, useEffect } from "react";

export function StartPage() {
  const { platform } = useTelegram();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 400);
    const buttonTimer = setTimeout(() => setShowButton(true), 700);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleClick = () => {
    telegramVibrate("light");
    navigate("/catalog");
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
      <Box sx={{ position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <img src="/smal-logo.svg" alt="Logo" style={{ width: 48, height: 48 }} />
      </Box>
      <Fade in={showContent} timeout={600}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ display: "grid", gap: "10px", paddingTop: "44px" }}>
            <Typography
              variant="h1"
              fontWeight={590}
              lineHeight={"122%"}
              fontSize={19}
              color="primary.main"
            >
              Добро пожаловать в мир стиля!
            </Typography>
            <Typography
              variant="h2"
              fontWeight={400}
              lineHeight={"22px"}
              fontSize={14}
              color="primary.main"
            >
              Откройте для себя коллекцию модной одежды и создайте свой
              неповторимый образ.
            </Typography>
          </Box>
        </Box>
      </Fade>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "secondary.main",
        }}
      >
        <Divider
          sx={{
            width: "100%",
            backgroundColor: "#1e244a29",
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
                bgcolor: "primary.main",
                color: "white",
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
              Продолжить
            </Button>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}