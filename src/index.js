export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // =========================
    // REGISTER
    // =========================
    if (
      url.pathname === "/api/register" &&
      request.method === "POST"
    ) {

      try {

        const {
          fullname,
          email,
          password
        } = await request.json();

        const existing = await env.DB.prepare(
          "SELECT * FROM users WHERE email = ?"
        )
        .bind(email)
        .first();

        if (existing) {

          return Response.json({
            success:false,
            message:"Email already exists"
          });

        }

        await env.DB.prepare(
          "INSERT INTO users (fullname,email,password,role) VALUES (?,?,?,?)"
        )
        .bind(
          fullname,
          email,
          password,
          "student"
        )
        .run();

        return Response.json({
          success:true,
          message:"Registration successful"
        });

      } catch (error) {

        return Response.json({
          success:false,
          message:"Register failed"
        });

      }

    }

    // =========================
    // LOGIN
    // =========================
    if (
      url.pathname === "/api/login" &&
      request.method === "POST"
    ) {

      try {

        const {
          email,
          password
        } = await request.json();

        const user = await env.DB.prepare(
          "SELECT * FROM users WHERE email = ? AND password = ?"
        )
        .bind(email, password)
        .first();

        if (!user) {

          return Response.json({
            success:false,
            message:"Invalid login"
          });

        }

        return Response.json({
          success:true,
          user
        });

      } catch (error) {

        return Response.json({
          success:false,
          message:"Login failed"
        });

      }

    }

    return new Response(
      "ChopaTech API Running"
    );

  }
}