import { Application, Router } from "oak";

const app = new Application();
const router = new Router();

// 🔑 Movies API Key
const MOVIES_API_KEY = "mov_bW92aWV6LmRvYnJhaW42NjYuZGVuby5uZXQ.wp1YWXoaw4okJXbClMOjXGjCoyfDolTCjsOiSHrCvMO";

// Home page — index.html serve karta hai aur YOUR_KEY replace karta hai
router.get("/", async (ctx) => {
  const html = await Deno.readTextFile("./index.html");
  ctx.response.type = "text/html";
  ctx.response.body = html.replaceAll("YOUR_KEY", MOVIES_API_KEY);
});

// Health check
router.get("/api/health", (ctx) => {
  ctx.response.body = { status: "ok", hasKey: true };
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = Number(Deno.env.get("PORT")) || 8000;
console.log(`🎬 Movie site running on http://localhost:${PORT}`);
await app.listen({ port: PORT });
