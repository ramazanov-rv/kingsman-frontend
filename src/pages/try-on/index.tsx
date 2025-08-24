import { useState, useRef, useEffect } from "react";
import { Box, Button, Container, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { isMobileWebApp, telegramVibrate } from "../../utils";
import { useTelegram } from "../../hooks/useTelegram";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import confetti from 'canvas-confetti';

type TryOnResponse = {
  data: {
    result: string;
    generatedImageUrl: string;
    clothesId: number;
  };
};

export const TryOnPage = () => {
  const { id } = useParams();
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tryOnMutation: UseMutationResult<TryOnResponse, Error, File> = useMutation<TryOnResponse, Error, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('clothesId', id || '1');
      formData.append('personImage', file);
      formData.append('prompt', 'Определи какая одежда на фото и надень на меня эту одежду.');

      const response = await axios.post(
        'http://5.129.196.187/api/clothes/try-on-with-clothes-id',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      setSelectedImage(data.data.generatedImageUrl);
      setGeneratedImage(data.data.generatedImageUrl);
      telegramVibrate("light");
      
      // Запускаем конфетти
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1e244a', '#dad6d1', '#ffffff'],
      });
    },
    onError: (error) => {
      console.error('Error processing image:', error);
      // Здесь можно добавить обработку ошибок, например показ уведомления
    },
  });

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
    if (!fileInputRef.current?.files?.[0]) return;
    tryOnMutation.mutate(fileInputRef.current.files[0]);
  };

  const handleSaveImage = () => {
    if (!generatedImage) return;
    
    // Используем Telegram Mini App API для сохранения изображения
    tg.showPopup({
      title: "Сохранить изображение",
      message: "Хотите сохранить сгенерированное изображение?",
      buttons: [
        {
          id: "save",
          type: "default",
          text: "Сохранить"
        },
        {
          id: "cancel",
          type: "cancel",
        }
      ]
    }, (buttonId) => {
      if (buttonId === "save") {
        tg.openLink(generatedImage);
      }
    });
  };

  useEffect(() => {
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
      telegramVibrate("light");
      navigate("/catalog");
    });
  }, [tg.BackButton, navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{ py: 4, pb: 18, pt: isMobileWebApp ? 14 : 4 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ color: "#fff", fontWeight: 600 }}
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
                borderColor: "#fff",
              },
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: "#fff", mb: 2 }} />
            <Typography color="#fff">Нажмите, чтобы загрузить фото</Typography>
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
            <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
              <Button
                onClick={() => setSelectedImage(null)}
                sx={{
                  backgroundColor: "#fff",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "#fff",
                    opacity: 0.9,
                  },
                }}
              >
                Выбрать другое фото
              </Button>
              {generatedImage && (
                <Button
                  onClick={handleSaveImage}
                  sx={{
                    backgroundColor: "#fff",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "#fff",
                      opacity: 0.9,
                    },
                  }}
                >
                  Сохранить изображение
                </Button>
              )}
            </Box>
          </Box>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: "none" }}
        />

        {tryOnMutation.isPending ? (
          <CircularProgress sx={{ color: "#fff" }} />
        ) : (
          <Button
            onClick={handleTryOn}
            disabled={!selectedImage || generatedImage !== null}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: "#fff",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "#fff",
                opacity: 0.9,
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.26)",
              },
            }}
          >
            Примерить
          </Button>
        )}
      </Box>
    </Container>
  );
};
