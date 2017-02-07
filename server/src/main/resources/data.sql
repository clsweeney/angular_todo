SET @USER = 'admin';
SET @DEFAULT_PASSWORD = '$2a$10$yn07qqbq6Yj2KspBfs0R9.UcPTMwFcwEgbJe6Vv3EpNLC189mNknC';
MERGE INTO users(username, password, enabled)
	KEY(username)
	VALUES (@USER, ifnull((select password from users where username=@USER),@DEFAULT_PASSWORD), true);

SET @USER = 'demo';
MERGE INTO users(username, password, enabled)
	KEY(username)
	VALUES (@USER, ifnull((select password from users where username=@USER),@DEFAULT_PASSWORD), true);

MERGE INTO user_roles(userid, role)
	KEY(userid)
	VALUES ((select userid from users where username = 'demo'), 'ROLE_USER');
	
MERGE INTO user_roles(userid, role)
	KEY(userid)
	VALUES ((select userid from users where username = 'admin'), 'ROLE_ADMIN');

MERGE INTO user_roles(userid, role)
	KEY(userid)
	VALUES ((select userid from users where username = 'admin'), 'ROLE_USER');

--INSERT INTO todos (value, createdBy)
--	VALUES ('do this', (select userid from users where username = 'chris'));
--	
--INSERT INTO todos (value, createdBy)
--	VALUES ('then this', (select userid from users where username = 'bob'));