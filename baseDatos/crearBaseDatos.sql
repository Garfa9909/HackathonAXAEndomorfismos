DROP DATABASE IF EXISTS municipiosDB;
CREATE DATABASE municipiosDB;
USE municipiosDB;

CREATE TABLE municipio(
CODAUTO INT,
CPRO INT,
CMUN INT,
DC INT,
NOMBRE varchar(150)
);

LOAD DATA INFILE '/var/lib/mysql-files/diccionario24.csv'
INTO TABLE municipio
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
