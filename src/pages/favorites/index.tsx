import { Box, Fade, Typography } from "@mui/material";
import { ProductCard } from "../../components/atoms/ProductCard";
import { useFavorites } from "../../contexts/FavoritesContext";
import { isMobileWebApp } from "../../utils";
import { useTelegram } from "../../hooks/useTelegram";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This is a temporary mock data, you should replace it with your actual data source
const mockProducts = [
  {
    id: "1",
    image: "/catalog/jacket-1.jpeg",
    title: "Куртка 1",
    description: "Описание куртки 1",
    price: 5000,
  },
  {
    id: "2",
    image: "/catalog/jacket-2.jpeg",
    title: "Куртка 2",
    description: "Описание куртки 2",
    price: 6000,
  },
  {
    id: "3",
    image: "/catalog/jacket-3.jpeg",
    title: "Куртка 3",
    description: "Описание куртки 3",
    price: 7000,
  },
];

export function FavoritesPage() {
    const {tg} = useTelegram()
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const favoriteProducts = mockProducts.filter((product) =>
    favorites.includes(product.id)
  );

  useEffect(() => {
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
      navigate("/catalog");
    });

    return () => {
      tg.BackButton.hide();
    };
  }, []);

  return (
    <Fade in timeout={400}>
      <Box sx={{ mt: isMobileWebApp ? "120px" : "30px", px: 2, pb: "150px" }}>
        <Typography
          sx={{
            variant: "h1",
            fontWeight: 600,
            lineHeight: "122%",
            fontSize: 22,
            mb: 3,
          }}
        >
          Избранное
        </Typography>

        {favoriteProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              У вас пока нет избранных товаров
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </Box>
        )}
      </Box>
    </Fade>
  );
}
