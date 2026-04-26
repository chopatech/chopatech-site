export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Chat endpoint
    if (url.pathname === "/chat" && request.method === "POST") {
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
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    // Default response
    return new Response("ChopaTech AI Worker", { headers: corsHeaders });
  }
};