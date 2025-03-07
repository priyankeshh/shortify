import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  originalUrl: text("original_url").notNull(),
  alias: text("alias").notNull().unique(),
  publicUrl: text("public_url").notNull(),
  clicks: integer("clicks").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUrlSchema = createInsertSchema(urls).pick({
  originalUrl: true,
  alias: true,
}).extend({
  originalUrl: z.string().url("Please enter a valid URL"),
  alias: z.string().min(1).max(50).regex(/^[a-zA-Z0-9-_]+$/, "Only letters, numbers, hyphens and underscores are allowed"),
});

// Separate schema for validating aliases in URLs
export const aliasSchema = z.object({
  alias: z.string().min(1).max(50)
});

export type InsertUrl = z.infer<typeof insertUrlSchema>;
export type Url = typeof urls.$inferSelect;