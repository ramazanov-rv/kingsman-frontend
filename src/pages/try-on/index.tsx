import { useState, useRef, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { telegramVibrate } from "../../utils";
import { useTelegram } from "../../hooks/useTelegram";

export const TryOnPage = () => {
  const { id } = useParams();
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    telegramVibrate("light");
    if (!selectedImage || !id) return;

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          image: selectedImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      // Handle the response from your server
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  useEffect(() => {
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
      telegramVibrate("light");
      navigate("/catalog");
    });
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4, pb: 18 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ color: "#000", fontWeight: 600 }}
        >
          Примерить одежду
        </Typography>

        {!selectedImage ? (
          <Box
            sx={{
              width: "100%",
              height: 400,
              border: "2px dashed",
              borderColor: "secondary.main",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUploadIcon
              sx={{ fontSize: 48, color: "secondary.main", mb: 2 }}
            />
            <Typography color="text.secondary">
              Нажмите, чтобы загрузить фото
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              position: "relative",
            }}
          >
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 8,
                objectFit: "contain",
              }}
            />
            <Button
              sx={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                maxWidth: "200px",
              }}
              onClick={() => setSelectedImage(null)}
            >
              Выбрать другое фото
            </Button>
          </Box>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: "none" }}
        />

        <Button
          onClick={handleTryOn}
          disabled={!selectedImage}
          sx={{
            mt: 2,
            width: "100%",
            bgcolor: "secondary.main",
            color: "primary.main",
          }}
        >
          Примерить
        </Button>
      </Box>
    </Container>
  );
};
