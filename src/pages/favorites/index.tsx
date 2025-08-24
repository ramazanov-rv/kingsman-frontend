import { Box, CircularProgress, Fade, Typography } from "@mui/material";
import { ProductCard } from "../../components/atoms/ProductCard";
import { useFavorites } from "../../contexts/FavoritesContext";
import { isMobileWebApp, telegramVibrate } from "../../utils";
import { useTelegram } from "../../hooks/useTelegram";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClothesItems } from "../../services/clothes";
import { ClothesItem } from "../../types/clothes";



export function FavoritesPage() {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ClothesItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getClothesItems();
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(String(product.id))
  );

  useEffect(() => {
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
      telegramVibrate("light");
      navigate("/catalog");
    });

    return () => {
      tg.BackButton.hide();
    };
  }, []);

  return (
    <Fade in timeout={400}>
      <Box sx={{ pt: isMobileWebApp ? "120px" : "30px", px: 2, pb: "150px" }}>
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

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : favoriteProducts.length === 0 ? (
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
              <ProductCard key={product.id} item={product} />
            ))}
          </Box>
        )}
      </Box>
    </Fade>
  );
}
