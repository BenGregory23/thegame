export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig();
  loggerF.log(to.path);

  if (to.path.startsWith("/admin")) {
    // Extract the key from query parameters
    const key = to.query.key;

    if (!key) {
      return navigateTo("/");
    }

    const url = new URL("/api/validate", config.public.baseURL);
    url.searchParams.append("key", key as string);

    const response = await fetch(url.toString());
    const body = await response.json();
    loggerF.log(response);
    if (!body.valid) {
      return navigateTo("/");
    }
  }
});
