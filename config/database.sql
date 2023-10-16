DROP DATABASE IF exists `athenashop` ;
CREATE DATABASE `athenashop`;
USE `athenashop`;

CREATE TABLE `anunciante` (
  id_anun int NOT NULL,
  nome_anun varchar(100) NOT NULL,
  empresa_anun varchar(100) NOT NULL,
  cnpj_anun varchar(50) NOT NULL,
  id_tipo_usu  INT DEFAULT '1',
  foreign key (id_tipo_usu) references `tipo_usuario` (id_tipo_usu)
);

INSERT INTO `anunciante` (`id_anun`, `nome_anun`, `empresa_anun`, `cnpj_anun`,`id_tipo_usu`) 
VALUES ('1','Igor Moraes','Athena-shop','09887-1098','anunciante');

DROP TABLE IF EXISTS `tipo_usuario`;

CREATE TABLE `tipo_usuario` (
  id_tipo_usu int(11) primary key,
  tipo_usu varchar(25) DEFAULT NULL,
  descricao_usu varchar(155) DEFAULT NULL,
  status_tipo_usu int DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

insert into `tipo_usuario` () values ();

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  id_usu int primary key,
  nome_usu varchar(45) NOT NULL,
  user_usu varchar(45) NOT NULL,
  email_usu varchar(60) NOT NULL,
  senha_usu varchar(50) NOT NULL,
  tel_usu varchar(14) DEFAULT NULL,
 id_tipo_usu  INT DEFAULT '1',
  foreign key (id_tipo_usu) references `tipo_usuario` (id_tipo_usu)
);

LOCK TABLES `usuario` WRITE;

INSERT INTO `usuario` (`id_usu`, `nome_usu`, `user_usu`,`email_usu`, `senha_usu`,`tel_usu`, `id_tipo_usu`) VALUES
('1','Breno','Pasque','breno@gmail.com','123456','11996307616','Usuario');

ALTER TABLE `anunciante` ADD PRIMARY KEY (`id_anun`);

ALTER TABLE `anunciante` MODIFY `id_anun` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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

INSERT INTO  produtos (id_prod, cor_prod, descr_prod, tamanho_prod, estoque, preco_prod, cod_cat_prod) VALUES ('1','Preto','Mochila escolar de cor preta','40cm por 30cm','20','70','92736589372764738');

DROP TABLE IF exists`compra`;

CREATE TABLE `compra`(
id_compra int(11) primary key,
cod_paga int default '1',
Foreign Key (cod_paga) References `tipo_pagamnt`,
id_prod int default '1',
Foreign Key (id_prod) references `produtos`,
cep int default '1',
Foreign key (cep) references `endereco`,
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
cod_cat_prod varchar(50) primary key,
nome_cat_prod varchar(50)
);

INSERT INTO cat_produto (cod_cat_prod, nome_cat_prod) VALUES ('92736589372764738','Mochila');

drop table if exists`endereco`;

CREATE TABLE `endereco`(
cep int(11) primary key,
rua varchar(200),
municipio varchar(128),
numb varchar(11),
comple varchar(250),
bairro int(9),
estado char (2)
);

INSERT INTO endereco (cep,rua,municipio,numb,comple,bairro,estado) VALUES ('06423-090','Rua do ouvidor ','Barueri','480','Jd dos Altos','SP');

select * from usuario
