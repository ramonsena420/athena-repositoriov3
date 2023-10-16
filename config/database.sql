DROP DATABASE IF exists `athenashop` ;
CREATE DATABASE `athenashop`;
USE `athenashop`;

CREATE TABLE `anunciante` (
  id_anun int NOT NULL,
  nome_anun varchar(100) NOT NULL,
  empresa_anun varchar(100) NOT NULL,
  cnpj_anun varchar(50) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_tipo_usu int(11) foreign key 
);

INSERT INTO `anunciante` (`id_anun`, `nome_anun`, `empresa_anun`, `cnpj_anun`,`created_at`,`id_tipo_usu`) VALUES
();

DROP TABLE IF EXISTS `tipo_usuario`;

CREATE TABLE `tipo_usuario` (
  id_tipo_usu int(11) primary key,
  tipo_usu varchar(25) DEFAULT NULL,
  descricao_usu varchar(155) DEFAULT NULL,
  status_tipo_usu int DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  id_usu int primary key,
  nome_usu varchar(45) NOT NULL,
  user_usu varchar(45) NOT NULL,
  email_usu varchar(60) NOT NULL,
  senha_usu varchar(50) NOT NULL,
  confirmar_usu varchar(50) NOT NULL,
  tel_usu varchar(14) DEFAULT NULL,
  created_at_usu timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_tipo_usu int(11) foreign key 
);

LOCK TABLES `usuario` WRITE;

INSERT INTO `usuario` (`id_usu`, `nome_usu`, `user_usu`,`email_usu`, `senha_usu`, `confirmar_usu`,`tel_usu`, `created_at_usu`) VALUES
();

ALTER TABLE `anunciante` ADD PRIMARY KEY (`id_anun`);

ALTER TABLE `anunciante` MODIFY `id_anun` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
,
DROP TABLE IF exists `produtos`;

CREATE TABLE `produtos`(
id_prod int(11) primary key,
cor_prod int(11),
descr_prod varchar(300),
tamanho_prod varchar(30),
estoque varchar(1000),
preco_prod decimal(10,2),
FOREIGN KEY (cod_cat_prod) REFERENCES `cat_produto` (cod_cat_prod) 
);

INSERT INTO  produtos (id_prod, cor_prod, descr_prod, tamanho_prod, estoque, preco_prod, cod_cat_prod) VALUES ();

DROP TABLE IF exists`compra`;

CREATE TABLE `compra`(
id_compra int(11) primary key,
Foreing Key (cod_paga) References `tipo_pagamnt`,
Foreing Key (id_prod) references `produtos`,
Foreing key (cep) references `endereco`,
rast_compra int(11),
status_compra int(25)
);

INSERT INTO compra (id_compra, cod_paga, id_prod, cep, rast_compra, status_compra) VALUES ();

DROP TABLE IF exists`tipo_pagamnt`;

CREATE TABLE `tipo_pagamnt`(
cod_paga int(11) primary key,
cartao_debito int (12),
cartao_credito int(12),
pix int(20),
dinheiro decimal (10,2)
);

INSERT tipo_pagamnt (cod_paga, cartao_debito, cartao_credito, pix, dinheiro) VALUES ();

DROP TABLE IF exists`cat_produto`;

CREATE TABLE `cat_produto`(
cod_cat_prod
nome_cat_prod
);

INSERT INTO cat_produto (cod_cat_prod, nome_cat_prod) VALUES ();

drop table if exists`endereco`;

CREATE TABLE `endereco`(
cep int(11) primary key,
rua varchar(15),
municipio varchar(128),
numb int(11),
comple varchar(250),
bairro int(9),
estado char (2)
);

INSERT INTO endereco (cep,rua,municipio,numb,comple,bairro,estado) VALUES ();

select * from usuario
