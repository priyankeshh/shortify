CREATE TABLE "urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"alias" text NOT NULL,
	"public_url" text NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "urls_alias_unique" UNIQUE("alias")
);
