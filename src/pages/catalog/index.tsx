import { Box, CircularProgress, Fade, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { isMobileWebApp } from "../../utils";
import { ProductCard } from "../../components/atoms/ProductCard";
import { getClothesItems } from "../../services/clothes";
import { ClothesItem } from "../../types/clothes";



export function CatalogPage() {
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

  return (
    <Fade in timeout={400}>
      <Box sx={{ pt: isMobileWebApp ? "120px" : "30px", pb: "150px" }}>
        <Typography
          sx={{
            variant: "h1",
            fontWeight: 600,
            lineHeight: "122%",
            fontSize: 22,
            mb: 3,
          }}
        >
          Каталог товаров
        </Typography>
        {loading ? (
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
            <CircularProgress sx={{ color: '#fff' }} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 2,
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </Box>
        )}
      </Box>
    </Fade>
  );
}
