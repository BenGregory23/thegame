import { gameManager } from "../socket/managers/GameManager";

export default defineEventHandler((event) => {
  const params = getQuery(event);
  const config = useRuntimeConfig();

  if (params.key !== config.admin_key) {
    return {
      valid: false,
    };
  }

  return {
    valid: true,
  };
});
