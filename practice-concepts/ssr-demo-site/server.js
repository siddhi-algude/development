import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

async function createServer() {
  const app = express();

  let vite;

  if (!isProd) {
    // DEV MODE
    vite = await (
      await import("vite")
    ).createServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);
  } else {
    // PROD SERVE
    app.use(express.static("dist/client"));
  }

 app.use(async (req, res) => { 

    try {
      let template;
      let render;

      if (!isProd) {
        template = fs.readFileSync("index.html", "utf-8");
        template = await vite.transformIndexHtml(req.url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
      } else {
        template = fs.readFileSync("dist/client/index.html", "utf-8");
        render = (await import("./dist/server/entry-server.js")).render;
      }

      const appHtml = render();
      const html = template.replace("<!--ssr-outlet-->", appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      vite?.ssrFixStacktrace(err);
      console.error(err);
      res.status(500).end(err.message);
    }
  });

  app.listen(9003, () => {
    console.log("SSR server running at http://localhost:9003");
  });
}

createServer();
