DROP TABLE IF EXISTS tasks; 

CREATE TABLE IF NOT EXISTS tasks(
    id            SERIAL PRIMARY KEY,
    task_title     VARCHAR(100) NOT NULL,
    completed     BOOLEAN NOT NULL,
    created       timestamp,
    user_id       INT
);

INSERT INTO tasks (task_title,completed,created,user_id) VALUES('create database tables',FALSE,NOW(),1);

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(20) NOT NULL,
	password	VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_sessions(
	sid SERIAL PRIMARY KEY,
    sess JSON,
    expire timestamp,
    signed_in BOOLEAN,
	user_id INT NOT NULL,
	username VARCHAR(20) NOT NULL
);