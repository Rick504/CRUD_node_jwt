CREATE TABLE "users" (
    id CHAR(36) DEFAULT NULL PRIMARY KEY,
    "name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(50) UNIQUE NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- INSERT INTO users (name) VALUES ('John'), ('Jane'), ('Bob');
