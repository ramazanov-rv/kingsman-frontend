import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Typography,
  Container,
  keyframes,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { isMobileWebApp, telegramVibrate } from "../../utils";
import { getClothesById } from "../../services/clothes";
import { ClothesItem } from "../../types/clothes";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../services/order";

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export function ProductPage() {
  const { tg } = useTelegram();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ClothesItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { mutate: createOrderMutation, isPending: isCreatingOrder } =
    useMutation({
      mutationFn: createOrder,
      onSuccess: () => {
        telegramVibrate("rigid");
        tg.close();
      },
      onError: () => {
        telegramVibrate("heavy");
        alert("Ошибка при создании заказа");
      },
    });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const response = await getClothesById(Number(id));
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
      telegramVibrate("light");
      navigate("/catalog");
    });

    return () => {
      tg.BackButton.hide();
    };
  }, [tg, navigate]);

  if (loading) {
    return (
      <Box sx={{ 
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(0, 0, 0, 0.2)"
      }}>
        <CircularProgress sx={{ color: "#fff" }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ pt: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Товар не найден
        </Typography>
        <Button
          onClick={() => {
            telegramVibrate("light");
            navigate("/catalog");
          }}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Вернуться в каталог
        </Button>
      </Box>
    );
  }

  const { attributes } = product;
  const {
    name,
    description,
    price,
    discount,
    discountLabel,
    images,
    availableSizes,
  } = attributes;
  const defaultImage = "/catalog/jacket-1.jpeg";
  const imageUrls =
    images?.data && Array.isArray(images.data) && images.data.length > 0
      ? images.data.map((img) => {
          const url = img?.attributes?.url;
          return url ? `https://kingsman-tryon.ru${url}` : defaultImage;
        })
      : [defaultImage];

  return (
    <Fade in timeout={400}>
      <Container
        maxWidth="lg"
        sx={{ pt: { xs: isMobileWebApp ? 14 : "20px", sm: 4 }, pb: 18 }}
      >
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          }}
        >
          {/* Галерея изображений */}
          <Box
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                "& .swiper": {
                  paddingBottom: 0,
                },
                "& .swiper-pagination": {
                  position: "relative",
                  bottom: "0 !important",
                  marginTop: 2,
                },
                "& .swiper-button-next, & .swiper-button-prev": {
                  width: "32px",
                  height: "32px",
                  backgroundColor: "secondary.main",
                  borderRadius: "50%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    opacity: 0.9,
                  },
                  "&::after": {
                    fontSize: "16px",
                    color: "primary.main",
                  },
                },
              }}
            >
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{
                  clickable: true,
                }}
                navigation
                loop
                style={
                  {
                    "--swiper-pagination-color": "#dad6d1",
                    "--swiper-navigation-color": "#1e244a",
                    "--swiper-navigation-size": "16px",
                    "--swiper-navigation-sides-offset": "10px",
                    "--swiper-pagination-position": "relative",
                    "--swiper-pagination-bottom": "0",
                    "--swiper-pagination-top": "100%",
                    "--swiper-pagination-margin-top": "16px",
                  } as any
                }
              >
                {imageUrls.map((img, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      component="img"
                      src={img}
                      alt={`${name} - изображение ${index + 1}`}
                      sx={{
                        borderRadius: 1,
                        width: "100%",
                        height: { xs: 300, sm: 400, md: 500 },
                        objectFit: "cover",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>

          {/* Информация о товаре */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              sx={{
                fontSize: { xs: 24, sm: 32 },
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              {name}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 14, sm: 18 },
                opacity: 0.8,
                lineHeight: 1.1,
              }}
            >
              {description}
            </Typography>

            {/* Размеры */}
            <Box sx={{ mt: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                Размеры
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {(availableSizes || []).map((size: string) => {
                  const isAvailable = true;
                  const isSelected = selectedSize === size;

                  return (
                    <Box
                      key={size}
                      onClick={() => {
                        telegramVibrate("light");
                        isAvailable &&
                          setSelectedSize(isSelected ? null : size);
                      }}
                      sx={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid",
                        borderColor: isSelected
                          ? "secondary.main"
                          : "secondary.main",
                        borderRadius: 1,
                        fontSize: 14,
                        fontWeight: 500,
                        color: isSelected
                          ? "primary.main"
                          : !isAvailable
                          ? "secondary.main"
                          : "secondary.main",
                        opacity: isAvailable ? 1 : 0.3,
                        backgroundColor: isSelected
                          ? "secondary.main"
                          : isAvailable
                          ? "primary.main"
                          : "transparent",
                        cursor: isAvailable ? "pointer" : "default",
                        transition: "all 0.2s ease",
                        "&:hover": isAvailable
                          ? {
                              opacity: 0.9,
                              transform: "scale(1.05)",
                            }
                          : {},
                      }}
                    >
                      {size}
                    </Box>
                  );
                })}
              </Box>
            </Box>

            <Box
              sx={{
                mt: "auto",
                pt: 3,
                borderTop: "1px solid",
                borderColor: "primary.main",
              }}
            >
              <Box sx={{ mb: 2 }}>
                {(discount ?? 0) > 0 ? (
                  <>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: 24, sm: 26 },
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {Math.round(
                          price * (1 - (discount ?? 0) / 100)
                        ).toLocaleString()}{" "}
                        ₽
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: 16, sm: 18 },
                          fontWeight: 500,
                          opacity: 0.5,
                          textDecoration: "line-through",
                        }}
                      >
                        {price.toLocaleString()} ₽
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: "#9D4141",
                          color: "#fff",
                          py: 0.5,
                          px: 1,
                          borderRadius: 1,
                          fontSize: 14,
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        -{discount}%
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#FF4081",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {discountLabel}
                    </Typography>
                  </>
                ) : (
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: 24, sm: 26 },
                      fontWeight: 700,
                      color: "primary.main",
                    }}
                  >
                    {price.toLocaleString()} ₽
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!selectedSize}
                  onClick={() => {
                    if (selectedSize) {
                      telegramVibrate("light");
                      createOrderMutation({
                        amount: price,
                        product_name: name,
                        size: selectedSize,
                        color: " ",
                        quantity: 1,
                        user_id: tg.initDataUnsafe.user?.id ?? 0,
                      });
                    }
                  }}
                  sx={{
                    height: "50px",
                    py: 1.5,
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
                  {isCreatingOrder ? (
                    <CircularProgress size={22} sx={{ color: "primary.main" }} />
                  ) : selectedSize ? (
                    "Заказать"
                  ) : (
                    "Выберите размер"
                  )}
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    telegramVibrate("light");
                    navigate(`/catalog/${id}/try-on`);
                  }}
                  startIcon={<SmartToyIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    background:
                      "linear-gradient(45deg, #FF4081 30%, #7C4DFF 90%)",
                    backgroundSize: "200% 200%",
                    animation: `${gradient} 5s ease infinite`,
                    color: "#fff",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(255, 255, 255, 0.1)",
                      animation: `${pulse} 2s infinite`,
                      borderRadius: 2,
                    },
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(124, 77, 255, 0.4)",
                    },
                    "& .MuiButton-startIcon": {
                      animation: `${pulse} 2s infinite`,
                    },
                  }}
                >
                  AI Примерка
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Fade>
  );
}
