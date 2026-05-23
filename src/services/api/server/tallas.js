import { apiFetch } from "../api";

export async function getTallas() {
  return apiFetch('/api/talla', {
    cache: 'no-store'
  });
}
