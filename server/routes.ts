import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUrlSchema, aliasSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Direct URL redirect route - this should be BEFORE API routes
  app.get("/:alias", async (req, res, next) => {
    try {
      // Skip this route for API routes, static files, and other special paths
      if (req.path.startsWith("/api/") || 
          req.path.includes(".") || 
          req.path === "/favicon.ico" ||
          req.path === "/src" ||
          req.path.startsWith("/@")) {
        return next();
      }

      console.log("Attempting to redirect:", req.params.alias);
      const { alias } = aliasSchema.parse({ alias: req.params.alias });
      const url = await storage.getUrlByAlias(alias);

      if (!url) {
        console.log("No URL found for alias:", alias);
        return next();
      }

      console.log("Redirecting to:", url.originalUrl);
      await storage.incrementClicks(alias);
      return res.redirect(url.originalUrl);
    } catch (err) {
      console.error("Error in redirect route:", err);
      next();
    }
  });

  // API routes
  app.post("/api/urls", async (req, res) => {
    try {
      const data = insertUrlSchema.parse(req.body);

      if (data.alias) {
        const exists = await storage.aliasExists(data.alias);
        if (exists) {
          return res.status(409).json({ message: "Alias already exists" });
        }
      }

      // Use Render's external URL in production, fallback to local development URL
      const baseUrl = process.env.RENDER_EXTERNAL_URL 
        ? process.env.RENDER_EXTERNAL_URL
        : `${req.protocol}://${req.get('host')}`;

      const url = await storage.createUrl(data, baseUrl);
      res.status(201).json(url);
    } catch (err) {
      console.error('Error in POST /api/urls:', err);
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error", details: err instanceof Error ? err.message : String(err) });
      }
    }
  });

  app.get("/api/urls", async (_req, res) => {
    try {
      const urls = await storage.getAllUrls();
      res.json(urls);
    } catch (err) {
      console.error('Error in GET /api/urls:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}