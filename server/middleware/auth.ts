export default defineEventHandler((event) => {
  const params = getQuery(event);
  const config = useRuntimeConfig();

  if (params.key !== config.admin_key) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }
});
