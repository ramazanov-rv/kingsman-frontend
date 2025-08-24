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

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  discount?: {
    type: string;
    value: number;
    label: string;
  };
}

export function ProductCard({
  id,
  image,
  title,
  description,
  price,
  discount,
}: ProductCardProps) {
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
          border: "1px solid #1e244a",
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ position: "relative" }}>
          {discount && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                zIndex: 1,
                backgroundColor: "#FF4081",
                color: "#fff",
                py: 0.5,
                px: 1,
                borderRadius: 1,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              -{discount.value}%
            </Box>
          )}
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              height: 250,
              objectFit: "cover",
            }}
          />
          <IconButton
            onClick={() => {
              telegramVibrate("light");
              toggleFavorite(id);
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
            {isFavorite(id) ? (
              <FavoriteIcon sx={{ color: "#FF4081" }} />
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
              }}
            >
              {title}
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
            {discount ? (
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
                    price * (1 - discount.value / 100)
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
                <Box
                  sx={{
                    backgroundColor: "#FF4081",
                    color: "#fff",
                    py: 0.5,
                    px: 1,
                    borderRadius: 1,
                    fontSize: 14,
                    fontWeight: 600,
                    order: 3,
                  }}
                >
                  -{discount.value}%
                </Box>
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
                backgroundColor: "secondary.main",
                color: "primary.main",
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
