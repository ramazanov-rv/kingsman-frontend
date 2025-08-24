import { api } from "../api";
import {
  ClothesResponse,
  SingleClothesResponse,
  TryOnResponse,
} from "../../types/clothes";

export async function getClothesItems() {
  const res = await api.get<ClothesResponse>("/clothes?populate=*");
  return res.data;
}

export async function getClothesById(id: number) {
  const res = await api.get<SingleClothesResponse>(`/clothes/${id}?populate=*`);
  return res.data;
}

export async function tryOnClothes(
  clothesId: number,
  personImage: File,
  prompt?: string
) {
  const formData = new FormData();
  formData.append("clothesId", String(clothesId));
  formData.append("personImage", personImage);
  if (prompt) {
    formData.append("prompt", prompt);
  }

  const res = await api.post<TryOnResponse>("/clothes/try-on-with-clothes-id", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function tryOnClothesWithUrls(
  personImageUrl: string,
  clothingImageUrl: string,
  prompt?: string
) {
  const res = await api.post<TryOnResponse>("/clothes/try-on", {
    personImageUrl,
    clothingImageUrl,
    prompt,
  });
  return res.data;
}
