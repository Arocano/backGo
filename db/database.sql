create database if not exists TaxiGo ;

use TaxiGo ;
CREATE TABLE `clientes` (
  `usuario` varchar(50) PRIMARY KEY,
  `contrasenia` varchar(20),
  `nombre` varchar(50),
  `apellido` varchar(50)
);

CREATE TABLE `taxistas` (
  `usuario` varchar(50) PRIMARY KEY,
  `contrasenia` varchar(20),
  `nombre` varchar(50),
  `apellido` varchar(50),
  `cooperativa` varchar(50),
  `estado` varchar(50)
);

CREATE TABLE `control_taxistas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `taxista` varchar(50),
  `hora_entrada` datetime,
  `hora_salida` datetime
);

CREATE TABLE `solicitudes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `usuario` varchar(50),
  `calle_principal` varchar(100),
  `calle_secundaria` varchar(100),
  `referencia` varchar(100),
  `barrio_sector` varchar(100),
  `informacion_adicional` varchar(300)
);

CREATE TABLE `estado_solicitudes` (
  `id_solicitud` int,
  `taxista_asignado` varchar(50),
  `estado` int
);

CREATE TABLE `estados` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `estado` varchar(20)
);

ALTER TABLE `solicitudes` ADD FOREIGN KEY (`usuario`) REFERENCES `clientes` (`usuario`);

ALTER TABLE `estado_solicitudes` ADD FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudes` (`id`);

ALTER TABLE `estado_solicitudes` ADD FOREIGN KEY (`taxista_asignado`) REFERENCES `taxistas` (`usuario`);

ALTER TABLE `estado_solicitudes` ADD FOREIGN KEY (`estado`) REFERENCES `estados` (`id`);

ALTER TABLE `control_taxistas` ADD FOREIGN KEY (`taxista`) REFERENCES `taxistas` (`usuario`);


insert into taxistas values
(usuarioPrueba,12345,prueba,apruena,cooperativa,disponible);


insert into estados (id,estado) values (0,"pendiente");
insert into estados (id,estado) values (1,"aceptado");
insert into estados (id,estado) values (2,"cancelado");
