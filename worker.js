export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Chat API endpoint
    if (path === "/chat" && request.method === "POST") {
      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      };

      if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
      }

      try {
        const { message } = await request.json();
        const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
          messages: [
            { role: "system", content: "You are a helpful AI assistant inside a modern website." },
            { role: "user", content: message }
          ]
        });

        return new Response(JSON.stringify({ reply: response }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: "AI request failed" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Use Cloudflare Sites built-in asset handling
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  }
};