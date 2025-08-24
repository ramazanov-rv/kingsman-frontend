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

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

export function ProductCard({
  id,
  image,
  title,
  description,
  price,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Fade in={inView} timeout={600} style={{ transitionDelay: "100ms" }}>
      <Card ref={ref}
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
          onClick={() => toggleFavorite(id)}
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
              mb: .5,
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
          <Button
            variant="contained"
            onClick={() => navigate(`/product/${id}`)}
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
