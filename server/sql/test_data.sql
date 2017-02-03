INSERT INTO users(username,password,enabled)
VALUES ('chris','$2a$10$yn07qqbq6Yj2KspBfs0R9.UcPTMwFcwEgbJe6Vv3EpNLC189mNknC', true);
INSERT INTO users(username,password,enabled)
VALUES ('bob','$2a$10$yn07qqbq6Yj2KspBfs0R9.UcPTMwFcwEgbJe6Vv3EpNLC189mNknC', true);
 
INSERT INTO user_roles (userid, role)
VALUES ((select userid from users where username = 'bob'), 'ROLE_USER');
INSERT INTO user_roles (userid, role)
VALUES ((select userid from users where username = 'chris'), 'ROLE_ADMIN');
INSERT INTO user_roles (userid, role)
VALUES ((select userid from users where username = 'chris'), 'ROLE_USER');

INSERT INTO todos (value, createdBy)
VALUES ('do this', (select userid from users where username = 'chris'));
INSERT INTO todos (value, createdBy)
VALUES ('then this', (select userid from users where username = 'bob'));