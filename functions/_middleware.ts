const PUBLIC_PATHS = [
  "/",
  "/RAMeow-login",
];

const PUBLIC_API_PATHS = [
  "/api/login",
];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.includes(pathname);
}

function isPublicApiPath(pathname: string) {
  return PUBLIC_API_PATHS.includes(pathname);
}

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

export const onRequest: PagesFunction<{
  RAMEOW_PORTAL_PASSWORD: string;
  RAMEOW_SESSION_TOKEN: string;
}> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const { pathname } = url;

  const isPortalRoute = pathname.startsWith("/RAMeow");
  const isApiRoute = pathname.startsWith("/api/");

  if (
    isPublicPath(pathname) ||
    isPublicApiPath(pathname) ||
    (!isPortalRoute && !isApiRoute)
  ) {
    return next();
  }

  const cookieHeader = request.headers.get("Cookie");
  const sessionCookie = getCookieValue(cookieHeader, "rameow_session");

  if (sessionCookie && sessionCookie === env.RAMEOW_SESSION_TOKEN) {
    return next();
  }

  if (isApiRoute) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return Response.redirect(`${url.origin}/RAMeow-login`, 302);
};
