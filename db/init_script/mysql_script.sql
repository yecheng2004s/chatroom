/*
create database log;
use log;
alter database log character set utf8; 
CREATE TABLE errors(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date DATETIME NOT NULL DEFAULT now(),
    userid VARCHAR(50) NULL,
    message VARCHAR(1000) NOT NULL,
    stack TEXT NULL
);
CREATE TABLE logs(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date DATETIME NOT NULL DEFAULT now(),
    message VARCHAR(1000) NOT NULL
);
Commit;
*/

CREATE DATABASE chatroom;
use chatroom;
alter database chatroom character set utf8;
CREATE TABLE salts(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userid CHAR(24) UNIQUE KEY NOT NULL,
    salt CHAR(32) NOT NULL
);