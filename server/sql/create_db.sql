/* H2 Database */
DROP TABLE IF EXISTS users;
CREATE  TABLE users (
  userid INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL ,
  password VARCHAR(60) NOT NULL ,
  enabled TINYINT NOT NULL DEFAULT 1 ,
  PRIMARY KEY (userid));

DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles (
  user_role_id INT(11) NOT NULL AUTO_INCREMENT,
  userid INT(11) NOT NULL,
  role VARCHAR(45) NOT NULL,
  PRIMARY KEY (user_role_id),
  UNIQUE KEY uni_username_role (role,userid),
  FOREIGN KEY (userid) REFERENCES users (userid));

DROP TABLE IF EXISTS todos;
CREATE TABLE todos (
  id INT(11) NOT NULL AUTO_INCREMENT,
  value VARCHAR(100),
  createdBy INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (createdBy) REFERENCES users (userid));