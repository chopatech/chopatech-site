export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Chat API endpoint
    if (url.pathname === "/chat" && request.method === "POST") {
      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      };

      // Handle CORS preflight
      if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
      }

      try {
        const { message } = await request.json();

        // Use Cloudflare AI to generate response
        const systemPrompt = "You are a helpful AI assistant inside a modern website.";
        
        const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
          messages: [
            { role: "system", content: systemPrompt },
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

    // Let Cloudflare Sites handle static files
    return new Response("Not found", { status: 404 });
  }
};