-- DROP DATABASE eventr;
CREATE DATABASE eventr;

USE eventr;

CREATE TABLE users (
	id int NOT NULL,
	username varchar(100) NOT NULL,
	email varchar(100) NOT NULL UNIQUE,
	password varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE events_users (
	user_id int NOT NULL,
	event_id int NOT NULL
);

CREATE TABLE events (
	id int NOT NULL,
	name varchar(100) NOT NULL,
	date DATE NOT NULL default = 0,
	location varchar,
	total_cost FLOAT,
	PRIMARY KEY (id)
);

CREATE TABLE users_choices (
	user_id int NOT NULL,
	choices_id int NOT NULL
);

CREATE TABLE questions (
	id int NOT NULL,
	text varchar NOT NULL,
	creator bigint NOT NULL,
	event_id varchar NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE messages (
	id int NOT NULL,
	text varchar(500) NOT NULL,
	date DATE NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users_messages (
	user_id bigint NOT NULL,
	message_id bigint NOT NULL
);

CREATE TABLE choices (
	id int NOT NULL,
	text varchar NOT NULL,
	question_id varchar NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE payment (
	id int NOT NULL,
	value FLOAT NOT NULL,
	user_id FLOAT NOT NULL,
	event_id FLOAT NOT NULL,
	PRIMARY KEY (id)
);

ALTER TABLE events_users    ADD CONSTRAINT events_users_fk0     FOREIGN KEY (user_id)     REFERENCES users(id);
ALTER TABLE events_users    ADD CONSTRAINT events_users_fk1     FOREIGN KEY (event_id)    REFERENCES events(id);

ALTER TABLE users_choices   ADD CONSTRAINT users_choices_fk0    FOREIGN KEY (user_id)     REFERENCES users(id);
ALTER TABLE users_choices   ADD CONSTRAINT users_choices_fk1    FOREIGN KEY (choices_id)  REFERENCES choices(id);

ALTER TABLE questions       ADD CONSTRAINT questions_fk0        FOREIGN KEY (creator)     REFERENCES users(id);
ALTER TABLE questions       ADD CONSTRAINT questions_fk1        FOREIGN KEY (event_id)    REFERENCES events(id);

ALTER TABLE users_messages  ADD CONSTRAINT users_messages_fk0   FOREIGN KEY (user_id)     REFERENCES users(id);
ALTER TABLE users_messages  ADD CONSTRAINT users_messages_fk1   FOREIGN KEY (message_id)  REFERENCES messages(id);

ALTER TABLE choices         ADD CONSTRAINT choices_fk0          FOREIGN KEY (question_id) REFERENCES questions(id);

ALTER TABLE payment         ADD CONSTRAINT payment_fk0          FOREIGN KEY (user_id)     REFERENCES users(id);
ALTER TABLE payment         ADD CONSTRAINT payment_fk1          FOREIGN KEY (event_id)    REFERENCES events(id);

