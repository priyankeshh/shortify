import { urls, type Url, type InsertUrl } from "@shared/schema";
import { customAlphabet } from "nanoid";
import { eq } from "drizzle-orm";
import { db } from "./db";

const generateAlias = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6);

export interface IStorage {
  createUrl(url: InsertUrl, baseUrl: string): Promise<Url>;
  getUrlByAlias(alias: string): Promise<Url | undefined>;
  incrementClicks(alias: string): Promise<void>;
  getAllUrls(): Promise<Url[]>;
  aliasExists(alias: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async createUrl(insertUrl: InsertUrl, baseUrl: string): Promise<Url> {
    const alias = insertUrl.alias || generateAlias();
    const [url] = await db.insert(urls)
      .values({
        originalUrl: insertUrl.originalUrl,
        alias,
        publicUrl: `${baseUrl}/${alias}`,
        clicks: 0,
        createdAt: new Date(),
      })
      .returning();
    return url;
  }

  async getUrlByAlias(alias: string): Promise<Url | undefined> {
    const [url] = await db.select()
      .from(urls)
      .where(eq(urls.alias, alias));
    return url;
  }

  async incrementClicks(alias: string): Promise<void> {
    await db.update(urls)
      .set({ clicks: db.raw('clicks + 1') })
      .where(eq(urls.alias, alias));
  }

  async getAllUrls(): Promise<Url[]> {
    return db.select()
      .from(urls)
      .orderBy(urls.clicks);
  }

  async aliasExists(alias: string): Promise<boolean> {
    const [url] = await db.select({ id: urls.id })
      .from(urls)
      .where(eq(urls.alias, alias));
    return !!url;
  }
}

export const storage = new DatabaseStorage();