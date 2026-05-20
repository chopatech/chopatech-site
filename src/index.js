export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS (important for frontend)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // =====================
    // REGISTER
    // =====================
    if (url.pathname === "/api/register" && request.method === "POST") {
      try {
        const { fullname, email, password } = await request.json();

        if (!fullname || !email || !password) {
          return Response.json(
            { success: false, message: "Missing fields" },
            { headers: corsHeaders }
          );
        }

        await env.DB.prepare(
          "INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)"
        )
          .bind(fullname, email, password, "student")
          .run();

        return Response.json(
          { success: true, message: "User created" },
          { headers: corsHeaders }
        );
      } catch (err) {
        return Response.json(
          { success: false, message: "User already exists or error" },
          { headers: corsHeaders }
        );
      }
    }

    // =====================
    // LOGIN
    // =====================
    if (url.pathname === "/api/login" && request.method === "POST") {
      try {
        const { email, password } = await request.json();

        const user = await env.DB.prepare(
          "SELECT * FROM users WHERE email = ? AND password = ?"
        )
          .bind(email, password)
          .first();

        if (!user) {
          return Response.json(
            { success: false, message: "Invalid login" },
            { headers: corsHeaders }
          );
        }

        return Response.json(
          {
            success: true,
            token: crypto.randomUUID(),
            user
          },
          { headers: corsHeaders }
        );
      } catch (err) {
        return Response.json(
          { success: false, message: "Server error" },
          { headers: corsHeaders }
        );
      }
    }

    return new Response("🚀 ChopaTech API Running", {
      headers: corsHeaders
    });
  }
};