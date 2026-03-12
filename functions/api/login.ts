export const onRequestPost: PagesFunction<{
  RAMEOW_PORTAL_PASSWORD: string;
  RAMEOW_SESSION_TOKEN: string;
}> = async ({ request, env }) => {
  try {
    const body = await request.json().catch(() => null);
    const password = typeof body?.password === "string" ? body.password : "";

    if (!password) {
      return new Response(
        JSON.stringify({ error: "Missing password" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (password !== env.RAMEOW_PORTAL_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": [
            `rameow_session=${encodeURIComponent(env.RAMEOW_SESSION_TOKEN)}`,
            "Path=/",
            "HttpOnly",
            "Secure",
            "SameSite=Strict",
            "Max-Age=86400",
          ].join("; "),
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);

    return new Response(
      JSON.stringify({ error: "Login failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
