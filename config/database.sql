DROP DATABASE IF exists `athenashop`;
CREATE DATABASE `athenashop`;
USE `athenashop`;

CREATE TABLE `anunciante` (
  `id_anun` int NOT NULL,
  `nome_anun` varchar(100) NOT NULL,
  `empresa_anun` varchar(100) NOT NULL,
  `email_anun` varchar(50) NOT NULL,
  `senha_anun` varchar(50) DEFAULT NULL,
  `cnpj_anun` varchar(50) NOT NULL,
  `tel_anun` varchar(14) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `anunciante` (`id_anun`, `nome_anun`, `empresa_anun`, `email_anun`, `cnpj_anun`, `tel_anun`,`created_at`) VALUES
(1, 'Igor Moraes', 'Igor Serviços LTDA', 'igor@gmail.com', '31.139.805/0001-44', '11973438910','2023-06-28 21:13:25');

CREATE TABLE `tipo_usu` (
  `id_tipo_usu` int NOT NULL AUTO_INCREMENT,
  `tipo_usu` varchar(25) DEFAULT NULL,
  `descricao_usu` varchar(160) DEFAULT NULL,
  `status_tipo_usu` int DEFAULT '1',
  PRIMARY KEY(`id_tipo_usu`)
)ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuario` (
  `id_usu`int primary key,
  `nome_usu` varchar(45) NOT NULL,
  `user_usu` varchar(45) NOT NULL,
  `email_usu` varchar(60) NOT NULL,
  `senha_usu` varchar(50) NOT NULL,
  `confirmar_usu` varchar(50) NOT NULL,
  `tipo_usu` int NOT NULL DEFAULT '1',
  `tel_usu` varchar(14) DEFAULT NULL,
  `created_at_usu` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `usuario` (`id_usu`, `nome_usu`, `user_usu`,`email_usu`, `senha_usu`, `confirmar_usu`,`tel_usu`, `created_at_usu`) VALUES
(1, 'Breno Pasquevitz', 'Pasque','BePasqueTava@gmail.com', '987654','987654','11996307616', '2023-06-28 21:10:31');

ALTER TABLE `anunciante` ADD PRIMARY KEY (`id_anun`);

ALTER TABLE `anunciante` MODIFY `id_anun` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

CREATE TABLE `pedido`(
`cod_ped` int(11) primary key NOT NULL,
`cod_usu` int(11)NOT NULL,
`valor_total` DOUBLE (9,2)NOT NULL,
`cod_end_cobr` int(11) NOT NULL,
`cod_end_ent` int(11) NOT NULL,
`cod_status` int(11) NOT NULL,
`data_status` timestamp NOT NULL
);

CREATE TABLE `produtos`(
`id_prod` int primary key,
`preco_venda` decimal(10,2),
`min_estoque` smallint,
`nome_prod` varchar(45),
`foto` Varchar(45)
);

CREATE TABLE `email`(
`id_email` varchar(45) primary key
);

CREATE TABLE `telefone`(
`num_cel` varchar(14) primary key
);

CREATE TABLE `venda`(
`data_venda` date,
`ìd_venda` int(11) primary key,
`vlr_venda` decimal(8,2)
);

CREATE TABLE`venda_itens`(
`id_venda_itens` int primary key,
`quant_itens` int,
`preco_custo` varchar(10),
`preco_uni` decimal(10,2)
);

CREATE TABLE `cartao_debito`(
`num_cartao`int	(16) primary key,
`nome_cart` varchar(50),
`validade_cart`date,
`cvv` numeric(3)
);

CREATE TABLE `cartao_credito`(
`num_cartao_credito`int	(16) primary key,
`nome_cart_credito` varchar(50),
`validade_cart_credito`date,
`cvv_credito`numeric(3)
);

CREATE TABLE `entrega`(
`cod_entrega` int(11) primary key,
`previsao` date,
`cod_status` int(11),
`data_status` timestamp	
);

CREATE TABLE `tipo_pagamnt`(
`cod_tipo_pagmt` int(11) primary key NOT NULL,      
`nome_tipo_pagmt` varchar(45) NOT NULL
);

CREATE TABLE `tracking`(
`id_track` int primary key,
`nome_produto` varchar(45),
`descricao_produto` varchar(45),
`cod_barra_prod` varchar(45)
);

CREATE TABLE `status`(

);

CREATE TABLE `cat_produto`(
`id_cat_prod` int(11) primary key,
`nome_cat_prod` varchar(50)
);


CREATE TABLE `endereco`(

);

CREATE TABLE `bairro`(

);

CREATE TABLE `cidade`(

);

CREATE TABLE `estado`(

);

CREATE TABLE `servico`(

);

CREATE TABLE `solicitante`(

);

CREATE TABLE `ponto`(

);