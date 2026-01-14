export default defineEventHandler((event) => {
  const params = getQuery(event);
  const config = useRuntimeConfig();
  const ADMIN_PATH = "/admin";

  if (event.path.startsWith(ADMIN_PATH) && params.key !== config.admin_key) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }
});
