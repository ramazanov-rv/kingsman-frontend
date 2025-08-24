import { Box, Button, Divider, Fade, Typography } from "@mui/material";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import { telegramVibrate } from "../../utils";

export function HelloPage() {
  const { platform } = useTelegram();
  const navigate = useNavigate();

  const handleClick = () => {
    telegramVibrate("light");
    navigate("/catalog");
  };

  return (
    <Fade in timeout={400}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          textAlign: "center",
        }}
      >
        <Box>
          <Box
            src="/logo.png"
            component={"img"}
            sx={{ height: "200px", margin: "0 auto" }}
          />
          <Box sx={{ display: "grid", gap: "10px", paddingTop: "16px" }}>
            <Typography
              variant="h1"
              fontWeight={590}
              lineHeight={"122%"}
              fontSize={20}
            >
              Добро пожаловать в мир стиля!
            </Typography>
            <Typography
              variant="h2"
              fontWeight={400}
              lineHeight={"22px"}
              fontSize={16}
            >
              Откройте для себя коллекцию модной одежды и создайте свой
              неповторимый образ.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
            background: "#fff",
          }}
        >
          <Divider
            sx={{
              width: "100%",
            }}
          />
          <Box
            sx={{
              width: "100%",
              margin: "15px auto 0 auto",
              padding: "0px 16px",
            }}
          >
            <Button
              sx={{
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
              Перейти к каталогу
            </Button>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
