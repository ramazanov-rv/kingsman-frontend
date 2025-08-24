import { Box, Fade, Typography } from "@mui/material";
import { isMobileWebApp } from "../../utils";
import { ProductCard } from "../../components/atoms/ProductCard";

export const sampleProducts = [
  {
    id: "1",
    image: "/catalog/jacket-1.jpeg",
    title: "Куртка зимняя",
    description: "Теплая зимняя куртка с капюшоном",
    price: 5990,
    discount: {
      type: "percent",
      value: 20,
      label: "Зимняя распродажа",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"],
  },
  {
    id: "2",
    image: "/catalog/jacket-2.jpeg",
    title: "Куртка демисезонная",
    description: "Легкая куртка для весны и осени",
    price: 4590,
    discount: {
      type: "percent",
      value: 25,
      label: "Весенняя коллекция",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["XS", "S", "M"],
  },
  {
    id: "3",
    image: "/catalog/jacket-3.jpeg",
    title: "Куртка спортивная",
    description: "Стильная спортивная куртка",
    price: 3990,
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["M", "L", "XL"],
  },
  {
    id: "1",
    image: "/catalog/jacket-1.jpeg",
    title: "Куртка зимняя",
    description: "Теплая зимняя куртка с капюшоном",
    price: 5990,
    discount: {
      type: "percent",
      value: 20,
      label: "Зимняя распродажа",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"],
  },
  {
    id: "2",
    image: "/catalog/jacket-2.jpeg",
    title: "Куртка демисезонная",
    description: "Легкая куртка для весны и осени",
    price: 4590,
    discount: {
      type: "percent",
      value: 25,
      label: "Весенняя коллекция",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["XS", "S", "M"],
  },
  {
    id: "3",
    image: "/catalog/jacket-3.jpeg",
    title: "Куртка спортивная",
    description: "Стильная спортивная куртка",
    price: 3990,
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["M", "L", "XL"],
  },
  {
    id: "1",
    image: "/catalog/jacket-1.jpeg",
    title: "Куртка зимняя",
    description: "Теплая зимняя куртка с капюшоном",
    price: 5990,
    discount: {
      type: "percent",
      value: 20,
      label: "Зимняя распродажа",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"],
  },
  {
    id: "2",
    image: "/catalog/jacket-2.jpeg",
    title: "Куртка демисезонная",
    description: "Легкая куртка для весны и осени",
    price: 4590,
    discount: {
      type: "percent",
      value: 25,
      label: "Весенняя коллекция",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["XS", "S", "M"],
  },
  {
    id: "3",
    image: "/catalog/jacket-3.jpeg",
    title: "Куртка спортивная",
    description: "Стильная спортивная куртка",
    price: 3990,
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["M", "L", "XL"],
  },
  {
    id: "1",
    image: "/catalog/jacket-1.jpeg",
    title: "Куртка зимняя",
    description: "Теплая зимняя куртка с капюшоном",
    price: 5990,
    discount: {
      type: "percent",
      value: 20,
      label: "Зимняя распродажа",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"],
  },
  {
    id: "2",
    image: "/catalog/jacket-2.jpeg",
    title: "Куртка демисезонная",
    description: "Легкая куртка для весны и осени",
    price: 4590,
    discount: {
      type: "percent",
      value: 25,
      label: "Весенняя коллекция",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["XS", "S", "M"],
  },
  {
    id: "3",
    image: "/catalog/jacket-3.jpeg",
    title: "Куртка спортивная",
    description: "Стильная спортивная куртка",
    price: 3990,
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["M", "L", "XL"],
  },
];

export function CatalogPage() {
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
          Каталог товаров
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 2,
          }}
        >
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Box>
      </Box>
    </Fade>
  );
}
