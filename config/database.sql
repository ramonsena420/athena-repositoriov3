
DROP DATABASE IF exists `athenashop` ;
CREATE DATABASE `athenashop`;
USE `athenashop`;

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE usuarios (
  id int primary key auto_increment,
  nome varchar(255) NOT NULL,
  email varchar(60) NOT NULL,
  senha longtext NOT NULL,
  telefone varchar(20) DEFAULT NULL
);

LOCK TABLES `usuarios` WRITE;

INSERT INTO `usuarios` (`id`, `nome`,`email`, `senha`,`telefone`) VALUES
('1','Gabriel','morgado@gmail.com','123456','11930205357');







