/* to run this file, from the root directory of the project
mysql -u root < server/database/3vnt_mysql_create.sql
... include -p if you set a password
*/

-- uncomment this line to reset the database
DROP DATABASE eventr;

-- uncomment this line to (re-) create database
CREATE DATABASE eventr;

/*--------------------------------------------------------------------------------
before running this file, you can reset your root password by taking the following
  steps (if you forgot your root password)
1. Start mysql without authenticating:
   > mysqld --skip-grant-tables
2. in the mysql prompt, update the user to have the password 'a'
  > update user set password=PASSWORD("a") where User='root';
3. quit
  > \q
4. stop mysql
  > mysqld stop
5. start mysql again and login
  > mysqld start
  > mysql -u root -p
  Enter password: •   # enter a here
-------------------------------------------------------------------------------*/


USE eventr;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  created_at DATETIME NOT NULL,
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
  id int NOT NULL AUTO_INCREMENT,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  event_name varchar(100) NOT NULL,
  event_date DATE,
  event_location varchar(200),
  event_activity varchar(200),
  response_deadline DATE NOT NULL,
  total_cost FLOAT NOT NULL,
  event_host int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users_choices (
  user_id int NOT NULL,
  choices_id int NOT NULL,
  voted int NOT NULL DEFAULT 0,
  vote_time DATETIME NOT NULL
);

CREATE TABLE questions (
  id int NOT NULL AUTO_INCREMENT,
  created_at DATETIME NOT NULL,
  text varchar(140) NOT NULL,
  creator_id int NOT NULL,
  event_id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  created_at DATE NOT NULL,
  text varchar(500) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users_messages (
  user_id int NOT NULL,
  message_id int NOT NULL
);

CREATE TABLE choices (
  id int NOT NULL AUTO_INCREMENT,
  text varchar(140) NOT NULL,
  votesFor int NOT NULL DEFAULT 0,
  maxVotes int NOT NUlL,
  question_id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE payment (
  id int NOT NULL AUTO_INCREMENT,
  created_at DATETIME NOT NULL,
  payment_deadline DATETIME NOT NULL,
  payment_amount FLOAT NOT NULL,
  user_id int NOT NULL,
  event_id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users_users (
  user_id int NOT NULL,
  friend_id int NOT NULL,
  created_at DATETIME NOT NULL
);


ALTER TABLE events_users    ADD CONSTRAINT events_users_fk0     FOREIGN KEY (user_id)     REFERENCES users(id);
ALTER TABLE events_users    ADD CONSTRAINT events_users_fk1     FOREIGN KEY (event_id)    REFERENCES events(id);

ALTER TABLE events          ADD CONSTRAINT events_fk0           FOREIGN KEY (event_host)  REFERENCES users(id);

ALTER TABLE users_choices   ADD CONSTRAINT users_choices_fk0    FOREIGN KEY (user_id)     REFERENCES users(id);
ALTER TABLE users_choices   ADD CONSTRAINT users_choices_fk1    FOREIGN KEY (choices_id)  REFERENCES choices(id);

ALTER TABLE questions       ADD CONSTRAINT questions_fk0        FOREIGN KEY (creator_id)  REFERENCES users(id);
ALTER TABLE questions       ADD CONSTRAINT questions_fk1        FOREIGN KEY (event_id)    REFERENCES events(id);

ALTER TABLE users_messages  ADD CONSTRAINT users_messages_fk0   FOREIGN KEY (user_id)     REFERENCES users(id);
ALTER TABLE users_messages  ADD CONSTRAINT users_messages_fk1   FOREIGN KEY (message_id)  REFERENCES messages(id);

ALTER TABLE choices         ADD CONSTRAINT choices_fk0          FOREIGN KEY (question_id) REFERENCES questions(id);

ALTER TABLE payment         ADD CONSTRAINT payment_fk0          FOREIGN KEY (user_id)     REFERENCES users(id);
ALTER TABLE payment         ADD CONSTRAINT payment_fk1          FOREIGN KEY (event_id)    REFERENCES events(id);

ALTER TABLE users_users     ADD CONSTRAINT users_users_fk0      FOREIGN KEY (user_id)     REFERENCES users(id);
ALTER TABLE users_users     ADD CONSTRAINT users_users_fk1      FOREIGN KEY (user_id)     REFERENCES users(id);
