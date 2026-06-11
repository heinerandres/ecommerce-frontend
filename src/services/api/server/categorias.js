import { apiFetch } from "../api";

export async function getCategorias() {
  return apiFetch('/api/categoria', {
    cache: 'no-store'
  });
}