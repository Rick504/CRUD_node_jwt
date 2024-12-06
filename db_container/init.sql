CREATE TABLE "users" (
    id CHAR(36) DEFAULT NULL PRIMARY KEY,
    "name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(50) UNIQUE NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    auth_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE "users_history_update" (
    id CHAR(36) DEFAULT NULL PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address VARCHAR(45),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE "users_history_delete" (
    id CHAR(36) DEFAULT NULL PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address VARCHAR(45),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
