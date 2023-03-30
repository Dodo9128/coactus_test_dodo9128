create database coacters_test;
create user 'test'@'localhost' identified by 'testUser';
GRANT ALL PRIVILEGES ON *.* TO 'test'@'localhost' IDENTIFIED BY 'testUser';

INSERT INTO user ('id', 'email', 'password', 'is_driver') VALUES (1, 'guest@guest.com', 'password', false)
INSERT INTO user ('id', 'email', 'password', 'is_driver') VALUES (2, 'guest2@guest2.com', 'password2', true)

INSERT INTO reservation ('id', 'start_location', 'departure_location', 'distance', 'price', 'user', 'reservation_status', 'start_at') VALUES (1, '111.333.222', '222.666.444', '3', 30000, 1, 'yet', '2023-03-30 10:00:00')