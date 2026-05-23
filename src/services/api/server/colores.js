import { apiFetch } from "../api";

export async function getColores() {
  return apiFetch('/api/color', {
    cache: 'no-store'
  });
}
