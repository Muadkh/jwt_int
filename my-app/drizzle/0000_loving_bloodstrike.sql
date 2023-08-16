CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"user_name" text,
	"user_email_address" text,
	"user_password" varchar(256)
);
