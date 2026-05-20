export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // =========================
    // 1. SERVE WEBSITE (HTML)
    // =========================
    if (url.pathname === "/") {
      return new Response(HTML_PAGE, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    // =========================
    // REGISTER
    // =========================
    if (url.pathname === "/api/register" && request.method === "POST") {
      const { fullname, email, password } = await request.json();

      await env.DB.prepare(
        "INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)"
      )
        .bind(fullname, email, password, "student")
        .run();

      return Response.json({ success: true, message: "User created" });
    }

    // =========================
    // LOGIN
    // =========================
    if (url.pathname === "/api/login" && request.method === "POST") {
      const { email, password } = await request.json();

      const user = await env.DB.prepare(
        "SELECT * FROM users WHERE email = ? AND password = ?"
      )
        .bind(email, password)
        .first();

      if (!user) {
        return Response.json({
          success: false,
          message: "Invalid login",
        });
      }

      return Response.json({
        success: true,
        token: "demo-token",
        user,
      });
    }

    // =========================
    // DEFAULT RESPONSE
    // =========================
    return new Response("ChopaTech Worker Running API");
  },
};

// =========================
// HTML PAGE (PUT YOUR SITE HERE)
// =========================
const HTML_PAGE = `PASTE_YOUR_FULL_HTML_HERE`;