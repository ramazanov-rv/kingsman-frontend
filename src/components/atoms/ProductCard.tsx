import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Fade,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";
import { telegramVibrate } from "../../utils";

import { ClothesItem } from "../../types/clothes";

interface ProductCardProps {
  item: ClothesItem;
}

export function ProductCard({ item }: ProductCardProps) {
  const { id, attributes } = item;
  const { name, description, price, discount, discountLabel, images } = attributes;
  const defaultImage = '/catalog/jacket-1.jpeg';
  const imageUrl = images?.data && Array.isArray(images.data) && images.data.length > 0 && images.data[0]?.attributes?.url
    ? images.data[0].attributes.url
    : defaultImage;
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Fade in={inView} timeout={600} style={{ transitionDelay: "100ms" }}>
      <Card
        ref={ref}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "none",
          border: "1px solid #fff",
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ position: "relative" }}>
          {(discount ?? 0) > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                zIndex: 1,
                backgroundColor: "#9D4141",
                color: "#fff",
                py: 0.5,
                px: 1,
                borderRadius: 1,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              -{discount}%
            </Box>
          )}
          <CardMedia
            component="img"
            image={imageUrl.startsWith('/') ? `http://5.129.196.187${imageUrl}` : imageUrl}
                          alt={name}
            sx={{
              height: 250,
              objectFit: "cover",
            }}
          />
          <IconButton
            onClick={() => {
              telegramVibrate("light");
              toggleFavorite(String(id));
            }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
              },
            }}
          >
            {isFavorite(String(id)) ? (
              <FavoriteIcon sx={{ color: "#9D4141" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#1e244a" }} />
            )}
          </IconButton>
        </Box>
        <CardContent
          sx={{
            p: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                fontSize: 18,
                fontWeight: 600,
                mb: 0.5,
                color: "primary.main",
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="primary.main"
              sx={{
                opacity: 0.8,
                fontSize: 16,
              }}
            >
              {description}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {(discount ?? 0) > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "primary.main",
                    order: 1,
                  }}
                >
                  {Math.round(
                    price * (1 - (discount ?? 0) / 100)
                  ).toLocaleString()}{" "}
                  ₽
                </Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "primary.main",
                    opacity: 0.5,
                    textDecoration: "line-through",
                    order: 2,
                  }}
                >
                  {price.toLocaleString()} ₽
                </Typography>
                {discountLabel && (
                  <Box
                    sx={{
                      backgroundColor: "#9D4141",
                      color: "#fff",
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      fontSize: 14,
                      fontWeight: 600,
                      order: 3,
                    }}
                  >
                    {discountLabel}
                  </Box>
                )}
              </Box>
            ) : (
              <Typography
                variant="h6"
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                {price.toLocaleString()} ₽
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={() => {
                telegramVibrate("light");
                navigate(`/catalog/${id}`);
              }}
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 2,
                backgroundColor: "primary.main",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "primary.main",
                },
              }}
            >
              Подробнее
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}
