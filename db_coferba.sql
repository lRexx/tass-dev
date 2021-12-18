/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 100411
Source Host           : localhost:3306
Source Database       : db_coferba

Target Server Type    : MYSQL
Target Server Version : 100411
File Encoding         : 65001

Date: 2020-08-17 16:02:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_access_control
-- ----------------------------
DROP TABLE IF EXISTS `tb_access_control`;
CREATE TABLE `tb_access_control` (
  `idAccessControl` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idAccessControl`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_access_control
-- ----------------------------
INSERT INTO `tb_access_control` VALUES ('1', 'Prueba de control de acceso');

-- ----------------------------
-- Table structure for tb_access_control_door
-- ----------------------------
DROP TABLE IF EXISTS `tb_access_control_door`;
CREATE TABLE `tb_access_control_door` (
  `idAccessControlDoor` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idAccessControlDoor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_access_control_door
-- ----------------------------
INSERT INTO `tb_access_control_door` VALUES ('1', 'AC DE PRUEBA 1');
INSERT INTO `tb_access_control_door` VALUES ('2', 'AC DE PRUEBA 2');
INSERT INTO `tb_access_control_door` VALUES ('3', 'AC DE PRUEBA 3');

-- ----------------------------
-- Table structure for tb_addres
-- ----------------------------
DROP TABLE IF EXISTS `tb_addres`;
CREATE TABLE `tb_addres` (
  `idAdress` int(11) NOT NULL AUTO_INCREMENT,
  `nameAdress` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `priceUni` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por unidad',
  `priceManagement` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por Gestion',
  `priceShipping` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por envio ',
  `IdSecurityCode` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'Codigo de verificacion para mostrar direccion a propietarios/inquilinos',
  `IsInDebt` int(11) DEFAULT 0,
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAdress`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- ----------------------------
-- Records of tb_addres
-- ----------------------------
INSERT INTO `tb_addres` VALUES ('1', 'Cramer 1275', '1', '100.00', '0.00', '150.00', null, '0', null);
INSERT INTO `tb_addres` VALUES ('2', 'Blanco Encalada 2355', '1', '0.00', '0.00', '0.00', null, '0', null);
INSERT INTO `tb_addres` VALUES ('3', 'Cabildo 3510', '2', '0.00', '0.00', '0.00', null, '0', null);
INSERT INTO `tb_addres` VALUES ('4', 'Gral. La valle 1920', '2', '0.00', '0.00', '0.00', null, '0', null);
INSERT INTO `tb_addres` VALUES ('5', 'Parana 2568', '3', '0.00', '0.00', '0.00', null, '0', null);
INSERT INTO `tb_addres` VALUES ('6', 'Rivadavia 4530', '3', '0.00', '0.00', '0.00', null, '0', null);
INSERT INTO `tb_addres` VALUES ('11', 'DIRECCION DE PRUEBA', '5', '110.00', '260.00', '170.00', '54321', '0', '595');
INSERT INTO `tb_addres` VALUES ('12', 'DIRECCION DE PRUEBA 2', '5', '260.00', '0.00', '310.00', '12345', '0', '596');

-- ----------------------------
-- Table structure for tb_agents
-- ----------------------------
DROP TABLE IF EXISTS `tb_agents`;
CREATE TABLE `tb_agents` (
  `idAgent` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `agent` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idAgent`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_agents
-- ----------------------------
INSERT INTO `tb_agents` VALUES ('1', 'TASS');

-- ----------------------------
-- Table structure for tb_alarm_batery
-- ----------------------------
DROP TABLE IF EXISTS `tb_alarm_batery`;
CREATE TABLE `tb_alarm_batery` (
  `idAlarmBatery` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nroInternal` varchar(200) DEFAULT NULL,
  `nroFabric` varchar(200) DEFAULT NULL,
  `dateExpired` date DEFAULT NULL,
  `isControlSchedule` int(11) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlarmBatery`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_alarm_batery
-- ----------------------------

-- ----------------------------
-- Table structure for tb_alarm_line_phone
-- ----------------------------
DROP TABLE IF EXISTS `tb_alarm_line_phone`;
CREATE TABLE `tb_alarm_line_phone` (
  `idAlarmLinePhone` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `company` varchar(100) DEFAULT NULL,
  `line` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlarmLinePhone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_alarm_line_phone
-- ----------------------------

-- ----------------------------
-- Table structure for tb_alarm_module_gps
-- ----------------------------
DROP TABLE IF EXISTS `tb_alarm_module_gps`;
CREATE TABLE `tb_alarm_module_gps` (
  `idAlarmModuleGps` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `moduleGpsr` varchar(200) DEFAULT NULL,
  `nroSerieFrabric` varchar(200) DEFAULT NULL,
  `nroSerieInternal` varchar(200) DEFAULT NULL,
  `codeProgram` varchar(200) DEFAULT NULL,
  `portProgram` varchar(200) DEFAULT NULL,
  `passwordAcces` varchar(200) DEFAULT NULL,
  `codePart1` varchar(200) DEFAULT NULL,
  `codePart2` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idAlarmModuleGps`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_alarm_module_gps
-- ----------------------------

-- ----------------------------
-- Table structure for tb_alarm_module_ip
-- ----------------------------
DROP TABLE IF EXISTS `tb_alarm_module_ip`;
CREATE TABLE `tb_alarm_module_ip` (
  `idAlarmModuleIp` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `moduleIp` varchar(100) DEFAULT NULL,
  `nroSerieFrabric` varchar(100) DEFAULT NULL,
  `nroSerieInternal` varchar(100) DEFAULT NULL,
  `ip` int(11) DEFAULT NULL,
  `codeProgrm` varchar(100) DEFAULT NULL,
  `portProgrm` varchar(100) DEFAULT NULL,
  `passwordAcces` varchar(100) DEFAULT NULL,
  `codePart1` varchar(100) DEFAULT NULL,
  `codePart2` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlarmModuleIp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_alarm_module_ip
-- ----------------------------

-- ----------------------------
-- Table structure for tb_alarm_person_alert
-- ----------------------------
DROP TABLE IF EXISTS `tb_alarm_person_alert`;
CREATE TABLE `tb_alarm_person_alert` (
  `idPersonAlert` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fullName` varchar(200) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `stringKey` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `numberUser` varchar(200) DEFAULT NULL,
  `isUserSystem` tinyint(1) DEFAULT 0,
  `idUserSystemFk` int(11) DEFAULT NULL,
  `idClientServicesAlarmsAditionals` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPersonAlert`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_alarm_person_alert
-- ----------------------------

-- ----------------------------
-- Table structure for tb_alarm_person_verific
-- ----------------------------
DROP TABLE IF EXISTS `tb_alarm_person_verific`;
CREATE TABLE `tb_alarm_person_verific` (
  `idPersonVerific` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `isUserSystem` tinyint(1) DEFAULT 0,
  `idUserSystemFk` int(11) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `numberUser` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idPersonVerific`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_alarm_person_verific
-- ----------------------------

-- ----------------------------
-- Table structure for tb_alarm_services_aditionals
-- ----------------------------
DROP TABLE IF EXISTS `tb_alarm_services_aditionals`;
CREATE TABLE `tb_alarm_services_aditionals` (
  `idAlarmServicesAditionals` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `alarmServicesAditionals` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idAlarmServicesAditionals`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_alarm_services_aditionals
-- ----------------------------
INSERT INTO `tb_alarm_services_aditionals` VALUES ('1', 'CONTROL HORARIO');
INSERT INTO `tb_alarm_services_aditionals` VALUES ('2', 'REPORTE MENSUAL AUTOMATICO');
INSERT INTO `tb_alarm_services_aditionals` VALUES ('3', 'REPORTES AUTOMATICOS');
INSERT INTO `tb_alarm_services_aditionals` VALUES ('4', 'VIDEO VERIFICACION');
INSERT INTO `tb_alarm_services_aditionals` VALUES ('5', 'APP');

-- ----------------------------
-- Table structure for tb_alarm_type_client
-- ----------------------------
DROP TABLE IF EXISTS `tb_alarm_type_client`;
CREATE TABLE `tb_alarm_type_client` (
  `idTypeClientAlarm` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `typeClientAlarm` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idTypeClientAlarm`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_alarm_type_client
-- ----------------------------
INSERT INTO `tb_alarm_type_client` VALUES ('1', 'CASA');
INSERT INTO `tb_alarm_type_client` VALUES ('2', 'COMERCIO');
INSERT INTO `tb_alarm_type_client` VALUES ('3', 'INDUSTRIA');
INSERT INTO `tb_alarm_type_client` VALUES ('4', 'OTROS');

-- ----------------------------
-- Table structure for tb_backup_energy
-- ----------------------------
DROP TABLE IF EXISTS `tb_backup_energy`;
CREATE TABLE `tb_backup_energy` (
  `idBackupEnergy` int(11) NOT NULL AUTO_INCREMENT,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `idBatteryFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBackupEnergy`),
  KEY `idClientServicesCameraFk` (`idClientServicesCameraFk`),
  KEY `idBatteryFk` (`idBatteryFk`),
  CONSTRAINT `tb_backup_energy_ibfk_1` FOREIGN KEY (`idClientServicesCameraFk`) REFERENCES `tb_client_services_camera` (`idClientServicesCamera`),
  CONSTRAINT `tb_backup_energy_ibfk_3` FOREIGN KEY (`idBatteryFk`) REFERENCES `tb_products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_backup_energy
-- ----------------------------
INSERT INTO `tb_backup_energy` VALUES ('21', '31', 'nota adicional', '1');
INSERT INTO `tb_backup_energy` VALUES ('22', '31', 'nota adicional', '2');
INSERT INTO `tb_backup_energy` VALUES ('23', '32', 'nota adicional', '1');
INSERT INTO `tb_backup_energy` VALUES ('24', '32', 'nota adicional', '2');

-- ----------------------------
-- Table structure for tb_bakups_order
-- ----------------------------
DROP TABLE IF EXISTS `tb_bakups_order`;
CREATE TABLE `tb_bakups_order` (
  `idBakupsOrder` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bakupsOrder` int(11) DEFAULT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBakupsOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_bakups_order
-- ----------------------------

-- ----------------------------
-- Table structure for tb_battery_install_access_control
-- ----------------------------
DROP TABLE IF EXISTS `tb_battery_install_access_control`;
CREATE TABLE `tb_battery_install_access_control` (
  `idBatteryInstallAccessControl` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesAccessControlFk` int(11) DEFAULT NULL,
  `idBatteryFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBatteryInstallAccessControl`),
  KEY `idClientServicesAccessControlFk` (`idClientServicesAccessControlFk`),
  KEY `idBatteryFk` (`idBatteryFk`),
  CONSTRAINT `tb_battery_install_access_control_ibfk_1` FOREIGN KEY (`idClientServicesAccessControlFk`) REFERENCES `tb_client_services_access_control` (`idClientServicesAccessControl`),
  CONSTRAINT `tb_battery_install_access_control_ibfk_2` FOREIGN KEY (`idBatteryFk`) REFERENCES `tb_products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_battery_install_access_control
-- ----------------------------
INSERT INTO `tb_battery_install_access_control` VALUES ('14', '29', '1');
INSERT INTO `tb_battery_install_access_control` VALUES ('15', '29', '2');

-- ----------------------------
-- Table structure for tb_battery_install_alarm
-- ----------------------------
DROP TABLE IF EXISTS `tb_battery_install_alarm`;
CREATE TABLE `tb_battery_install_alarm` (
  `idBatteryInstallAlarm` int(11) NOT NULL AUTO_INCREMENT,
  `battery` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `nroSerieInternal` int(30) DEFAULT NULL,
  `nroSerieManufacturer` int(30) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  PRIMARY KEY (`idBatteryInstallAlarm`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_battery_install_alarm
-- ----------------------------

-- ----------------------------
-- Table structure for tb_cameras
-- ----------------------------
DROP TABLE IF EXISTS `tb_cameras`;
CREATE TABLE `tb_cameras` (
  `idCamera` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  `portCamera` int(11) DEFAULT NULL,
  `coveredArea` int(11) DEFAULT NULL,
  `locationCamera` int(11) DEFAULT NULL,
  `nroSerieCamera` int(11) DEFAULT NULL,
  `nroFabricCamera` int(11) DEFAULT NULL,
  `dateExpireCamera` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCamera`),
  KEY `idClientServicesCameraFk` (`idClientServicesCameraFk`),
  CONSTRAINT `tb_cameras_ibfk_1` FOREIGN KEY (`idClientServicesCameraFk`) REFERENCES `tb_client_services_camera` (`idClientServicesCamera`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_cameras
-- ----------------------------
INSERT INTO `tb_cameras` VALUES ('11', '16', '21', '2', '0', '5', '48', '2020');
INSERT INTO `tb_cameras` VALUES ('12', '16', '20', '1', '0', null, '47', '2020');
INSERT INTO `tb_cameras` VALUES ('13', '17', '21', '2', '0', '5', '48', '2020');
INSERT INTO `tb_cameras` VALUES ('14', '17', '20', '1', '0', '4', '47', '2020');
INSERT INTO `tb_cameras` VALUES ('15', '18', '21', '2', '0', '5', '48', '2020');
INSERT INTO `tb_cameras` VALUES ('16', '18', '20', '1', '0', '4', '47', '2020');
INSERT INTO `tb_cameras` VALUES ('17', '19', '21', '2', '0', '5', '48', '2020');
INSERT INTO `tb_cameras` VALUES ('18', '19', '20', '1', '0', '4', '47', '2020');
INSERT INTO `tb_cameras` VALUES ('27', '29', '21', '2', '0', '5', '48', '2020');
INSERT INTO `tb_cameras` VALUES ('28', '29', '20', '1', '0', '4', '47', '2020');
INSERT INTO `tb_cameras` VALUES ('29', '30', '21', '2', '0', '5', '48', '2020');
INSERT INTO `tb_cameras` VALUES ('30', '30', '20', '1', '0', '4', '47', '2020');
INSERT INTO `tb_cameras` VALUES ('31', '31', '21', '2', '0', '5', '48', '2020');
INSERT INTO `tb_cameras` VALUES ('32', '31', '20', '1', '0', '4', '47', '2020');
INSERT INTO `tb_cameras` VALUES ('33', '32', '21', '2', '0', '5', '48', '2020');
INSERT INTO `tb_cameras` VALUES ('34', '32', '20', '1', '0', '4', '47', '2020');

-- ----------------------------
-- Table structure for tb_category_departament
-- ----------------------------
DROP TABLE IF EXISTS `tb_category_departament`;
CREATE TABLE `tb_category_departament` (
  `idCategoryDepartament` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `categoryDepartament` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idCategoryDepartament`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_category_departament
-- ----------------------------
INSERT INTO `tb_category_departament` VALUES ('1', 'Departamento');
INSERT INTO `tb_category_departament` VALUES ('2', 'Cochera');
INSERT INTO `tb_category_departament` VALUES ('3', 'Baulera');
INSERT INTO `tb_category_departament` VALUES ('4', 'Local');
INSERT INTO `tb_category_departament` VALUES ('5', 'Porteria');
INSERT INTO `tb_category_departament` VALUES ('6', 'Mixto');

-- ----------------------------
-- Table structure for tb_clients
-- ----------------------------
DROP TABLE IF EXISTS `tb_clients`;
CREATE TABLE `tb_clients` (
  `idClient` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientTypeFk` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `addressLat` varchar(100) DEFAULT NULL,
  `addressLon` varchar(100) DEFAULT NULL,
  `idAgentFk` int(200) DEFAULT NULL,
  `businessName` varchar(200) DEFAULT NULL,
  `CUIT` varchar(30) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `phoneMobile` varchar(200) DEFAULT '' COMMENT 'Telefono movil de un particular',
  `phoneLocal` varchar(200) DEFAULT NULL COMMENT 'Telefono local de un particular',
  `mail` varchar(200) DEFAULT NULL,
  `observation` varchar(500) DEFAULT NULL,
  `pageWeb` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `mailFronKey` varchar(100) DEFAULT NULL,
  `observationOrderKey` varchar(500) DEFAULT NULL,
  `isNotCliente` tinyint(1) DEFAULT 0,
  `idClientAdminFk` int(11) DEFAULT NULL,
  `mailServiceTecnic` varchar(100) DEFAULT NULL,
  `observationSericeTecnic` varchar(100) DEFAULT NULL,
  `mailCollection` varchar(100) DEFAULT NULL,
  `observationCollection` varchar(500) DEFAULT NULL,
  `idClientCompaniFk` int(11) DEFAULT NULL,
  `idZonaFk` int(11) DEFAULT NULL,
  `idClientDepartamentFk` int(11) DEFAULT NULL,
  `idTipoInmuebleFk` int(11) DEFAULT NULL,
  `departmentUnit` int(11) DEFAULT NULL COMMENT 'Designacion de Edificio Tipos {Letras o Numeros}',
  `departmentCorrelation` int(11) DEFAULT NULL COMMENT 'Designacion de correlacion {por piso o todo el edificio}',
  PRIMARY KEY (`idClient`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_clients
-- ----------------------------
INSERT INTO `tb_clients` VALUES ('17', '1', 'Administracion 2000', 'AV DR RICARDO BALBIN 4033', '-34.55490995935', '-58.487112924078', '1', 'Administracion 2000 S.A', '324245325234-43', '37', '1', null, null, null, '', 'administracion2000.com.ar', '2020-04-25 22:49:21', null, '1', 'llaves@administracion2000.com.ar', '', '0', '1', 'servicio@administracion2000.com.ar', '', 'admin@administracion2000.com.ar', '', '1', '0', '0', '0', null, null);
INSERT INTO `tb_clients` VALUES ('18', '2', 'GARCIA DEL RIO 4044', 'GARCIA DEL RIO 4044', '-34.554323584571', '-58.484865178333', '1', null, null, '35', '1', null, null, null, '', null, '2020-04-26 17:57:56', null, '1', 'llaves@administracion2000.com.ar', 'Probando', '0', '17', 'servicio@administracion2000.com.ar', 'Probando', 'admin@administracion2000.com.ar', 'Probando', null, null, null, null, null, null);
INSERT INTO `tb_clients` VALUES ('22', '3', 'Inversiones J&C', 'JUANA AZURDUY 2170', '-34.5493526756', '-58.464684760605', '1', 'Inversiones JC S.A', '2132132133-33', '42', '1', null, null, null, '', 'inversionesjc.com.ar', '2020-04-27 00:02:35', null, '1', null, null, '0', null, 'services@inversionesjc.com.ar', '', 'admin@inversionesjc.com.ar', '', null, null, null, null, null, null);
INSERT INTO `tb_clients` VALUES ('23', '1', 'ROM', 'AV SAN JUAN 3582', '-34.625401211531', '-58.415853330413', '1', 'FIGUEROA RUBINOS LEANDRO GASTON', '20309473788', '16', '1', null, null, null, '', '', '2020-04-27 18:13:36', null, '1', 'jm.lauria@esteticalauria.com.ar', '', '0', '0', 'jm.lauria@esteticalauria.com.ar', '', 'jm.lauria@esteticalauria.com.ar', '', '0', null, null, null, null, null);
INSERT INTO `tb_clients` VALUES ('24', '1', 'PRUEBA3', 'AV CORRIENTES 3030', '-34.604215776516', '-58.408138089139', '1', 'PEDRO PEREZ SA', '20354875458', '1', '1', null, null, null, '', 'WWW.infobae.com.ar', '2020-05-25 22:14:30', null, '1', 'gerencia@seguridadtass.com.ar', '.', '0', '0', 'gerencia@seguridadtass.com.ar', '.', 'gerencia@seguridadtass.com.ar', '.', '0', null, null, null, null, null);
INSERT INTO `tb_clients` VALUES ('41', '1', 'Inversiones Inmobiliarias H&A', 'GARCIA DEL RIO 4044', '-34.554323584571', '-58.484865178333', '1', 'Inversiones Inmobiliarias H&A', '30-324324-34', '37', '1', null, null, null, '', 'invmobiliariaha.com.ar', '2020-07-19 02:19:58', null, '1', 'llaves@invmobiliariaha.com.ar', '', '0', '0', 'services@invmobiliariaha.com.ar', '', 'admin@invmobiliariaha.com.ar', '', '0', null, '18', '1', null, null);
INSERT INTO `tb_clients` VALUES ('52', '2', 'JUANA AZURDUY 2170', 'JUANA AZURDUY 2170', '-34.5493526756', '-58.464684760605', null, null, null, '42', '1', null, null, null, null, null, '2020-07-20 00:46:41', null, '0', null, null, '1', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `tb_clients` VALUES ('54', '1', 'Juana Propíedades & Asociados', 'JUANA AZURDUY 2170', '-34.5493526756', '-58.464684760605', '1', 'Juana Propíedades & Asociados', '20-234234324-2', '42', '1', null, null, null, '', 'jpropasociados.com.ar', '2020-07-20 01:04:54', null, '1', 'keys@jpropasociados.com.ar', '', '0', '0', 'services@jpropasociados.com.ar', '', 'admin@jpropasociados.com.ar', '', '0', '1', '13', '1', null, null);
INSERT INTO `tb_clients` VALUES ('56', '2', 'BLANCO ENCALADA 3275', 'BLANCO ENCALADA 3275', '-34.564306266114', '-58.467654013277', '0', null, null, '40', '1', null, null, null, '', null, '2020-07-20 01:33:25', null, '1', 'llaves@administracion2000.com.ar', '', '0', '17', 'servicio@administracion2000.com.ar', '', 'admin@administracion2000.com.ar', '', null, '1', null, null, null, null);
INSERT INTO `tb_clients` VALUES ('59', '2', 'AYACUCHO 559', 'AYACUCHO 559', '-34.672338830277', '-58.703013781913', null, null, null, '921', '2', null, null, null, null, null, '2020-07-20 23:03:55', null, '0', null, null, '1', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `tb_clients` VALUES ('60', '3', 'CocaCola Inc', 'AYACUCHO 559', '-34.672338830277', '-58.703013781913', '1', 'CocaCola Inc', '30-2324243232-22', '921', '2', null, null, null, '', 'cocacola.com.ar', '2020-07-20 23:03:55', null, '1', null, null, '0', null, 'services@cocacola.com.ar', '', 'payments@cocacola.com.ar', '', null, '1', '45', null, null, null);
INSERT INTO `tb_clients` VALUES ('61', '4', 'AV CORDOBA 4562', 'AV CORDOBA 4562', '-34.594512272762', '-58.429723462258', null, null, null, '9', '1', null, null, null, '', null, '2020-07-21 01:06:13', null, '1', null, null, '0', null, 'services@cocacola.com.ar', '', 'payments@cocacola.com.ar', '', '60', '1', null, null, null, null);
INSERT INTO `tb_clients` VALUES ('64', '2', 'ESTOMBA 3445', 'ESTOMBA 3445', '-34.558352598331', '-58.48126375303', null, null, null, '37', '1', null, null, null, null, null, '2020-07-21 02:52:21', null, '0', null, null, '1', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `tb_clients` VALUES ('65', '5', 'Victor Machado', 'ESTOMBA 3445', '-34.558352598331', '-58.48126375303', '1', null, null, '37', '1', null, null, null, '', null, '2020-07-21 02:52:21', null, '1', null, null, '0', null, '', null, '', null, null, '1', '47', null, null, null);
INSERT INTO `tb_clients` VALUES ('66', '2', 'ESTOMBA 2333', 'ESTOMBA 2333', null, null, null, null, null, '37', '1', null, null, null, null, null, '2020-07-21 02:52:21', null, '0', null, null, '1', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `tb_clients` VALUES ('67', '2', 'MANUELA PEDRAZA 3553', 'MANUELA PEDRAZA 3553', '-34.557124872056', '-58.47640255313', '0', null, null, '42', '1', null, null, null, '', null, '2020-07-21 03:10:26', null, '1', 'llaves@administracion2000.com.ar', '', '0', '17', 'servicio@administracion2000.com.ar', '', 'admin@administracion2000.com.ar', '', null, '1', null, null, null, null);
INSERT INTO `tb_clients` VALUES ('68', '3', 'Pepsi', 'GARCIA DEL RIO 4044', '-34.554323584571', '-58.484865178333', '1', 'Pepsi AR', 'asdasdasasfas', '35', '1', null, null, null, '', 'pepsi.com.ar', '2020-07-21 03:12:44', null, '1', null, null, '0', null, 'servicios@pepsi.com.ar', '', 'cobranza@pepsi.com.ar', '', null, '1', '0', null, null, null);
INSERT INTO `tb_clients` VALUES ('69', '4', 'AV CABILDO 2556', 'AV CABILDO 2556', '-34.55781945647', '-58.46035069506', null, null, null, '40', '1', null, null, null, '', null, '2020-07-21 03:15:53', null, '1', null, null, '0', null, 'services@cocacola.com.ar', '', 'payments@cocacola.com.ar', '', '60', '1', null, null, null, null);
INSERT INTO `tb_clients` VALUES ('70', '2', 'BESARES 3043', 'BESARES 3043', '-34.547324859982', '-58.476917358848', '0', null, null, '1', '1', null, null, null, '', null, '2020-07-24 18:29:15', null, '1', 'llaves@administracion2000.com.ar', '', '0', '17', 'servicio@administracion2000.com.ar', '', 'admin@administracion2000.com.ar', '', null, '1', null, null, null, null);
INSERT INTO `tb_clients` VALUES ('71', '2', 'AV DR RICARDO BALBIN 3050', 'AV DR RICARDO BALBIN 3050', '-34.559197916175', '-58.473636367845', '0', null, null, '37', '1', null, null, null, '', null, '2020-07-24 18:33:34', null, '1', 'keys@jpropasociados.com.ar', '', '0', '54', 'services@jpropasociados.com.ar', '', 'admin@jpropasociados.com.ar', '', null, '1', null, null, null, null);
INSERT INTO `tb_clients` VALUES ('72', '5', 'Probando', null, null, null, '1', null, null, '0', '0', null, null, null, '', null, '2020-08-05 23:45:11', null, '1', null, null, '0', null, '', null, '', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for tb_clients_phones
-- ----------------------------
DROP TABLE IF EXISTS `tb_clients_phones`;
CREATE TABLE `tb_clients_phones` (
  `idClientPhones` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idClientPhones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_clients_phones
-- ----------------------------

-- ----------------------------
-- Table structure for tb_clients_tickets
-- ----------------------------
DROP TABLE IF EXISTS `tb_clients_tickets`;
CREATE TABLE `tb_clients_tickets` (
  `idTicketsCliets` int(11) NOT NULL AUTO_INCREMENT,
  `idTicketKf` int(11) DEFAULT NULL,
  `idClientKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTicketsCliets`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_clients_tickets
-- ----------------------------
INSERT INTO `tb_clients_tickets` VALUES ('1', '19', '2');
INSERT INTO `tb_clients_tickets` VALUES ('2', '19', '3');
INSERT INTO `tb_clients_tickets` VALUES ('3', '19', '1');
INSERT INTO `tb_clients_tickets` VALUES ('4', '20', '2');
INSERT INTO `tb_clients_tickets` VALUES ('5', '20', '3');
INSERT INTO `tb_clients_tickets` VALUES ('6', '20', '1');
INSERT INTO `tb_clients_tickets` VALUES ('7', '21', '2');
INSERT INTO `tb_clients_tickets` VALUES ('8', '21', '3');
INSERT INTO `tb_clients_tickets` VALUES ('9', '21', '1');
INSERT INTO `tb_clients_tickets` VALUES ('10', '22', '2');
INSERT INTO `tb_clients_tickets` VALUES ('11', '22', '3');
INSERT INTO `tb_clients_tickets` VALUES ('12', '22', '1');
INSERT INTO `tb_clients_tickets` VALUES ('13', '23', '2');
INSERT INTO `tb_clients_tickets` VALUES ('14', '23', '3');
INSERT INTO `tb_clients_tickets` VALUES ('15', '23', '1');

-- ----------------------------
-- Table structure for tb_client_address_particular
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_address_particular`;
CREATE TABLE `tb_client_address_particular` (
  `idAddressParticular` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `depto` varchar(100) DEFAULT NULL,
  `isBuilding` int(11) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL,
  `clarification` varchar(200) DEFAULT NULL,
  `idParticularDepartamentKf` int(11) DEFAULT NULL COMMENT 'Id del departamento dependiendo del tipo de inmueble',
  `idZonaFk` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idAddressParticular`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_address_particular
-- ----------------------------
INSERT INTO `tb_client_address_particular` VALUES ('1', '12', 'TEST', 'depto', '1', '1', '1', 'TEST', null, null);
INSERT INTO `tb_client_address_particular` VALUES ('2', '12', 'TEST', 'depto', '1', '1', '1', 'TEST', null, null);
INSERT INTO `tb_client_address_particular` VALUES ('3', '12', 'TEST', 'depto', '1', '1', '1', 'TEST', null, null);
INSERT INTO `tb_client_address_particular` VALUES ('4', '12', 'TEST', 'depto', '1', '1', '1', 'TEST', null, null);
INSERT INTO `tb_client_address_particular` VALUES ('5', '21', 'TEST', 'depto', '1', '1', '1', 'TEST', null, null);
INSERT INTO `tb_client_address_particular` VALUES ('6', '21', 'TEST', 'depto', '1', '1', '1', 'TEST', null, null);
INSERT INTO `tb_client_address_particular` VALUES ('7', '28', 'TEST', 'depto', '1', '1', '1', 'TEST', null, null);
INSERT INTO `tb_client_address_particular` VALUES ('8', '28', 'TEST', 'depto', '1', '1', '1', 'TEST', null, null);
INSERT INTO `tb_client_address_particular` VALUES ('9', '29', 'TEST2', 'depto', '1', '1', '1', 'TEST', null, null);
INSERT INTO `tb_client_address_particular` VALUES ('10', '29', 'TEST3', 'depto', '1', '1', '1', 'TEST', null, null);

-- ----------------------------
-- Table structure for tb_client_authorizing
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_authorizing`;
CREATE TABLE `tb_client_authorizing` (
  `idClientAuthorizing` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idUserFk` int(11) DEFAULT NULL,
  `isLevel1` tinyint(1) DEFAULT 0,
  `isLevel2` tinyint(1) DEFAULT 0,
  `idClientFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientAuthorizing`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_authorizing
-- ----------------------------

-- ----------------------------
-- Table structure for tb_client_billing_information
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_billing_information`;
CREATE TABLE `tb_client_billing_information` (
  `idBillingInfo` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `businessNameBilling` varchar(200) DEFAULT NULL,
  `cuitBilling` varchar(50) DEFAULT NULL,
  `idLocationBillingFk` int(11) DEFAULT NULL,
  `idProvinceBillingFk` int(11) DEFAULT NULL,
  `idTypeTaxFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBillingInfo`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_billing_information
-- ----------------------------
INSERT INTO `tb_client_billing_information` VALUES ('1', '1', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('2', '3', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('3', '4', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('4', '5', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('5', '6', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('6', '7', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('7', '8', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('8', '9', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('9', '10', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('10', '11', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('11', '12', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('12', '13', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('13', '14', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('14', '15', 'Administracion Uno s.a', '23432432434-4', '42', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('15', '16', 'administracion dos s.a', '3243243244-4', '37', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('16', '17', 'administracion dos s.a', '3243243244-4', '37', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('17', '18', 'administracion tres s.a', '213213213-4', '921', '2', '2');
INSERT INTO `tb_client_billing_information` VALUES ('18', '19', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('19', '15', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('20', '16', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('21', '17', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('22', '18', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('23', '19', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('24', '20', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('25', '21', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('26', '23', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('27', '24', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('28', '26', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('29', '28', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('30', '29', 'text', 'text', '1', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('31', '39', 'Inversiones Inmobiliarias H&A', '30-324324-34', '37', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('32', '40', 'Inversiones Inmobiliarias H&A', '30-324324-34', '37', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('33', '41', 'Inversiones Inmobiliarias H&A', '30-324324-34', '37', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('34', '43', 'Augusto Propiedades S&A', '30-2343242332-3', '35', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('35', '45', 'Juana Propíedades & Asociados', '20-234234324-2', '42', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('36', '47', 'Juana Propíedades & Asociados', '20-234234324-2', '42', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('37', '49', 'Juana Propíedades & Asociados', '20-234234324-2', '42', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('38', '51', 'Juana Propíedades & Asociados', '20-234234324-2', '42', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('39', '53', 'Juana Propíedades & Asociados', '20-234234324-2', '42', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('40', '54', 'Juana Propíedades & Asociados', '20-234234324-2', '42', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('41', '55', 'BLANCO ENCALADA 3275 S.A', '20-234324324-33', '40', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('42', '56', 'BLANCO ENCALADA 3275 S.A', '20-234324324-33', '40', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('43', '58', 'CocaCola Inc', '30-2324243232-22', '921', '2', '2');
INSERT INTO `tb_client_billing_information` VALUES ('44', '60', 'CocaCola Inc', '30-2324243232-22', '921', '2', '2');
INSERT INTO `tb_client_billing_information` VALUES ('45', '61', 'CocaCola Inc', '30-2324243232-22', '921', '2', '2');
INSERT INTO `tb_client_billing_information` VALUES ('46', '63', 'Victor Machado', '20-95690981-4', '37', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('47', '65', 'Victor Machado', '20-95690981-4', '37', '1', '1');
INSERT INTO `tb_client_billing_information` VALUES ('48', '67', 'MANUELA PEDRAZA 3553 S.A', '20-3243242343-3', '42', '1', '3');
INSERT INTO `tb_client_billing_information` VALUES ('49', '68', 'Pepsi AR', 'asdasdasasfas', '35', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('50', '69', 'CocaCola Inc', '30-2324243232-22', '921', '2', '2');
INSERT INTO `tb_client_billing_information` VALUES ('51', '70', 'Besares y Asociados S.A', '20-3423232-2', '1', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('52', '71', 'Consorcio Balbin 3050', '30-3432433434-3', '37', '1', '2');
INSERT INTO `tb_client_billing_information` VALUES ('53', '72', 'Probando', '32-343432423-3', '37', '1', '3');

-- ----------------------------
-- Table structure for tb_client_camera
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_camera`;
CREATE TABLE `tb_client_camera` (
  `idClientCamera` int(11) NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idClientCamera`),
  KEY `idClientServicesCameraFk` (`idClientServicesCameraFk`),
  CONSTRAINT `tb_client_camera_ibfk_1` FOREIGN KEY (`idClientServicesCameraFk`) REFERENCES `tb_client_services_camera` (`idClientServicesCamera`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_client_camera
-- ----------------------------
INSERT INTO `tb_client_camera` VALUES ('1', '1', '25', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('2', '1', '25', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('3', '1', '26', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('4', '1', '26', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('5', '1', '27', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('6', '1', '27', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('7', '1', '28', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('8', '1', '28', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('9', '1', '29', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('10', '1', '29', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('11', '1', '30', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('12', '1', '30', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('13', '1', '31', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('14', '1', '31', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('15', '1', '32', 'ale', 'aleUser', '1234');
INSERT INTO `tb_client_camera` VALUES ('16', '1', '32', 'ale', 'aleUser', '1234');

-- ----------------------------
-- Table structure for tb_client_departament
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_departament`;
CREATE TABLE `tb_client_departament` (
  `idClientDepartament` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `floor` varchar(11) DEFAULT NULL,
  `departament` varchar(11) DEFAULT NULL,
  `idCategoryDepartamentFk` int(11) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `numberUNF` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientDepartament`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_departament
-- ----------------------------
INSERT INTO `tb_client_departament` VALUES ('1', null, null, null, null, null, '2019-10-22 18:10:26', null);
INSERT INTO `tb_client_departament` VALUES ('4', '18', '1', 'A', '1', '1', '2020-03-06 15:00:01', null);
INSERT INTO `tb_client_departament` VALUES ('5', '18', '1', 'B', '1', '1', '2020-03-06 15:00:01', null);
INSERT INTO `tb_client_departament` VALUES ('6', '18', '2', 'C', '1', '1', '2020-03-06 15:00:03', null);
INSERT INTO `tb_client_departament` VALUES ('7', '18', '2', 'D', '1', '1', '2020-03-06 15:00:03', null);
INSERT INTO `tb_client_departament` VALUES ('8', '18', '3', 'E', '1', '1', '2020-03-06 15:01:13', null);
INSERT INTO `tb_client_departament` VALUES ('9', '18', '3', 'F', '1', '1', '2020-03-06 15:01:13', null);
INSERT INTO `tb_client_departament` VALUES ('13', '52', '8', 'b', '1', '1', '2020-07-20 00:46:41', null);
INSERT INTO `tb_client_departament` VALUES ('14', '56', 'co', '1', '2', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('15', '56', 'ba', '1', '3', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('16', '56', 'lo', '1', '4', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('17', '56', 'pb', '1', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('18', '56', 'pb', '2', '5', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('19', '56', '1', 'A', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('20', '56', '1', 'B', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('21', '56', '1', 'C', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('22', '56', '1', 'D', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('23', '56', '1', 'E', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('24', '56', '2', 'A', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('25', '56', '2', 'B', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('26', '56', '2', 'C', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('27', '56', '2', 'D', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('28', '56', '2', 'E', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('29', '56', '3', 'A', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('30', '56', '3', 'B', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('31', '56', '3', 'C', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('32', '56', '3', 'D', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('33', '56', '3', 'E', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('34', '56', '4', 'A', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('35', '56', '4', 'B', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('36', '56', '4', 'C', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('37', '56', '4', 'D', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('38', '56', '4', 'E', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('39', '56', '5', 'A', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('40', '56', '5', 'B', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('41', '56', '5', 'C', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('42', '56', '5', 'D', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('43', '56', '5', 'E', '1', '1', '2020-07-20 01:33:25', '0');
INSERT INTO `tb_client_departament` VALUES ('44', '57', '4', 'd', '1', '1', '2020-07-20 20:10:58', null);
INSERT INTO `tb_client_departament` VALUES ('45', '59', '5', 'a', '1', '1', '2020-07-20 23:03:55', null);
INSERT INTO `tb_client_departament` VALUES ('46', '62', '1', 'a', '1', '1', '2020-07-21 02:32:23', null);
INSERT INTO `tb_client_departament` VALUES ('47', '64', '1', 'a', '1', '1', '2020-07-21 02:52:21', null);
INSERT INTO `tb_client_departament` VALUES ('48', '66', null, null, null, '1', '2020-07-21 02:52:21', null);
INSERT INTO `tb_client_departament` VALUES ('49', '67', 'pb', '1', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('50', '67', 'pb', '2', '5', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('51', '67', '1', '1', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('52', '67', '1', '2', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('53', '67', '1', '3', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('54', '67', '1', '4', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('55', '67', '1', '5', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('56', '67', '2', '6', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('57', '67', '2', '7', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('58', '67', '2', '8', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('59', '67', '2', '9', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('60', '67', '2', '10', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('61', '67', '3', '11', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('62', '67', '3', '12', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('63', '67', '3', '13', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('64', '67', '3', '14', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('65', '67', '3', '15', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('66', '67', '4', '16', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('67', '67', '4', '17', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('68', '67', '4', '18', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('69', '67', '4', '19', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('70', '67', '4', '20', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('71', '67', '5', '21', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('72', '67', '5', '22', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('73', '67', '5', '23', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('74', '67', '5', '24', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('75', '67', '5', '25', '1', '1', '2020-07-21 03:10:26', '0');
INSERT INTO `tb_client_departament` VALUES ('76', '70', 'pb', '1', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('77', '70', 'pb', '2', '5', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('78', '70', '1', 'A', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('79', '70', '1', 'B', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('80', '70', '1', 'C', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('81', '70', '1', 'D', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('82', '70', '1', 'E', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('83', '70', '2', 'A', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('84', '70', '2', 'B', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('85', '70', '2', 'C', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('86', '70', '2', 'D', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('87', '70', '2', 'E', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('88', '70', '3', 'A', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('89', '70', '3', 'B', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('90', '70', '3', 'C', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('91', '70', '3', 'D', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('92', '70', '3', 'E', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('93', '70', '4', 'A', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('94', '70', '4', 'B', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('95', '70', '4', 'C', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('96', '70', '4', 'D', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('97', '70', '4', 'E', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('98', '70', '5', 'A', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('99', '70', '5', 'B', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('100', '70', '5', 'C', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('101', '70', '5', 'D', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('102', '70', '5', 'E', '1', '1', '2020-07-24 18:29:15', '0');
INSERT INTO `tb_client_departament` VALUES ('103', '71', 'pb', '1', '5', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('104', '71', '1', 'A', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('105', '71', '1', 'B', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('106', '71', '1', 'C', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('107', '71', '1', 'D', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('108', '71', '1', 'E', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('109', '71', '2', 'A', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('110', '71', '2', 'B', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('111', '71', '2', 'C', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('112', '71', '2', 'D', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('113', '71', '2', 'E', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('114', '71', '3', 'A', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('115', '71', '3', 'B', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('116', '71', '3', 'C', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('117', '71', '3', 'D', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('118', '71', '3', 'E', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('119', '71', '4', 'A', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('120', '71', '4', 'B', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('121', '71', '4', 'C', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('122', '71', '4', 'D', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('123', '71', '4', 'E', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('124', '71', '5', 'A', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('125', '71', '5', 'B', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('126', '71', '5', 'C', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('127', '71', '5', 'D', '1', '1', '2020-07-24 18:33:34', '0');
INSERT INTO `tb_client_departament` VALUES ('128', '71', '5', 'E', '1', '1', '2020-07-24 18:33:34', '0');

-- ----------------------------
-- Table structure for tb_client_files_list
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_files_list`;
CREATE TABLE `tb_client_files_list` (
  `idClientFiles` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientfK` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `urlFile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idClientFiles`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_files_list
-- ----------------------------

-- ----------------------------
-- Table structure for tb_client_functional_units
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_functional_units`;
CREATE TABLE `tb_client_functional_units` (
  `idFunctionalUnits` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `identifier` varchar(100) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idProviceFk` int(11) DEFAULT NULL,
  `idTaxTypeFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idFunctionalUnits`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_functional_units
-- ----------------------------

-- ----------------------------
-- Table structure for tb_client_phone_contact
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_phone_contact`;
CREATE TABLE `tb_client_phone_contact` (
  `idClientPhoneFk` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `phoneTag` varchar(80) DEFAULT NULL COMMENT 'Etiqueta del telefono de contacto Ejmp: Guardia/Urgencia',
  `phoneContact` varchar(80) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientPhoneFk`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_phone_contact
-- ----------------------------
INSERT INTO `tb_client_phone_contact` VALUES ('1', 'comercial', '11232423343', '17');
INSERT INTO `tb_client_phone_contact` VALUES ('2', 'comercial', '112324324325', '20');
INSERT INTO `tb_client_phone_contact` VALUES ('4', 'comercial', '1123222222222', '22');
INSERT INTO `tb_client_phone_contact` VALUES ('5', 'comercial', '1150311207', '23');
INSERT INTO `tb_client_phone_contact` VALUES ('6', 'guardia', '1150311208', '23');
INSERT INTO `tb_client_phone_contact` VALUES ('121', 'comercial', '11234324323', '39');
INSERT INTO `tb_client_phone_contact` VALUES ('122', 'urgente', '11234234323', '39');
INSERT INTO `tb_client_phone_contact` VALUES ('123', 'comercial', '11234324323', '40');
INSERT INTO `tb_client_phone_contact` VALUES ('124', 'urgente', '11234234323', '40');
INSERT INTO `tb_client_phone_contact` VALUES ('125', 'comercial', '11324234324', '41');
INSERT INTO `tb_client_phone_contact` VALUES ('126', 'comercial', '1134324343566', '43');
INSERT INTO `tb_client_phone_contact` VALUES ('127', 'urgente', '1123423435334', '43');
INSERT INTO `tb_client_phone_contact` VALUES ('128', 'comercial', '112343243244', '45');
INSERT INTO `tb_client_phone_contact` VALUES ('129', 'comercial', '112343243244', '47');
INSERT INTO `tb_client_phone_contact` VALUES ('130', 'comercial', '112343243244', '49');
INSERT INTO `tb_client_phone_contact` VALUES ('131', 'comercial', '112343243244', '51');
INSERT INTO `tb_client_phone_contact` VALUES ('132', 'comercial', '112343243244', '53');
INSERT INTO `tb_client_phone_contact` VALUES ('133', 'comercial', '112343243244', '54');
INSERT INTO `tb_client_phone_contact` VALUES ('134', 'comercial', '1124234324324', '58');
INSERT INTO `tb_client_phone_contact` VALUES ('135', 'comercial', '1132423432254', '60');
INSERT INTO `tb_client_phone_contact` VALUES ('136', 'mobile', '112342343222', '65');
INSERT INTO `tb_client_phone_contact` VALUES ('137', 'local', '112342343244', '65');
INSERT INTO `tb_client_phone_contact` VALUES ('138', 'comercial', '11223423423432', '68');

-- ----------------------------
-- Table structure for tb_client_schedule_atention
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_schedule_atention`;
CREATE TABLE `tb_client_schedule_atention` (
  `idScheduleAtention` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClienteFk` int(11) DEFAULT NULL,
  `day` varchar(11) DEFAULT '' COMMENT 'Dia de la semana',
  `fronAm` time DEFAULT NULL,
  `toAm` time DEFAULT NULL,
  `fronPm` time DEFAULT NULL,
  `toPm` time DEFAULT NULL,
  PRIMARY KEY (`idScheduleAtention`)
) ENGINE=InnoDB AUTO_INCREMENT=439 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_schedule_atention
-- ----------------------------
INSERT INTO `tb_client_schedule_atention` VALUES ('293', '17', 'Lunes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('294', '17', 'Martes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('295', '17', 'Miercoles', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('296', '17', 'Jueves', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('297', '17', 'Viernes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('298', '17', 'Sabado', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('299', '18', 'Lunes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('300', '18', 'Martes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('301', '18', 'Miercoles', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('302', '18', 'Jueves', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('303', '18', 'Viernes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('304', '18', 'Sabado', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('305', '18', 'Domingo', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('306', '19', 'Lunes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('307', '19', 'Martes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('308', '19', 'Miercoles', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('309', '19', 'Jueves', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('310', '19', 'Viernes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('311', '19', 'Sabado', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('312', '19', 'Domingo', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('313', '20', 'Lunes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('314', '20', 'Martes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('315', '20', 'Miercoles', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('316', '20', 'Jueves', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('317', '20', 'Viernes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('318', '20', 'Sabado', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('319', '20', 'Domingo', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('320', '22', 'Lunes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('321', '22', 'Martes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('322', '22', 'Miercoles', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('323', '22', 'Jueves', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('324', '22', 'Viernes', '00:00:09', '00:00:13', '00:00:14', '00:00:18');
INSERT INTO `tb_client_schedule_atention` VALUES ('325', '23', 'Lunes', null, '00:00:00', '00:00:17', '00:00:20');
INSERT INTO `tb_client_schedule_atention` VALUES ('326', '23', 'Martes', null, '00:00:00', '00:00:17', '00:00:20');
INSERT INTO `tb_client_schedule_atention` VALUES ('327', '23', 'Miercoles', null, '00:00:00', '00:00:17', '00:00:20');
INSERT INTO `tb_client_schedule_atention` VALUES ('328', '23', 'Jueves', null, '00:00:00', '00:00:17', '00:00:20');
INSERT INTO `tb_client_schedule_atention` VALUES ('329', '23', 'Viernes', null, '00:00:00', '00:00:17', '00:00:20');
INSERT INTO `tb_client_schedule_atention` VALUES ('330', '24', 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('331', '24', 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('332', '24', 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('333', '24', 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('334', '24', 'Sabado', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('335', '25', 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('336', '25', 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('337', '25', 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('338', '25', 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('339', '26', 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('340', '26', 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('341', '39', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('342', '39', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('343', '39', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('344', '39', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('345', '39', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('346', '40', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('347', '40', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('348', '40', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('349', '40', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('350', '40', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('351', '41', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('352', '41', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('353', '41', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('354', '41', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('355', '41', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('356', '43', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('357', '43', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('358', '43', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('359', '43', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('360', '43', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('361', '45', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('362', '45', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('363', '45', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('364', '45', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('365', '45', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('366', '47', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('367', '47', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('368', '47', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('369', '47', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('370', '47', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('371', '49', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('372', '49', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('373', '49', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('374', '49', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('375', '49', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('376', '51', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('377', '51', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('378', '51', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('379', '51', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('380', '51', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('381', '53', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('382', '53', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('383', '53', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('384', '53', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('385', '53', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('386', '54', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('387', '54', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('388', '54', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('389', '54', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('390', '54', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('391', '56', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('392', '56', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('393', '56', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('394', '56', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('395', '56', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('396', '58', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('397', '58', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('398', '58', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('399', '58', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('400', '58', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('401', '60', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('402', '60', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('403', '60', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('404', '60', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('405', '60', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('406', '61', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('407', '61', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('408', '61', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('409', '61', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('410', '61', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('411', '61', 'Sabado', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('412', '67', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('413', '67', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('414', '67', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('415', '67', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('416', '67', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('417', '68', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('418', '68', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('419', '68', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('420', '68', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('421', '68', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('422', '68', 'Sabado', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('423', '68', 'Domingo', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('424', '69', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('425', '69', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('426', '69', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('427', '69', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('428', '69', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('429', '70', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('430', '70', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('431', '70', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('432', '70', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('433', '70', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('434', '71', 'Lunes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('435', '71', 'Martes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('436', '71', 'Miercoles', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('437', '71', 'Jueves', '09:00:00', '12:00:00', '13:00:00', '18:00:00');
INSERT INTO `tb_client_schedule_atention` VALUES ('438', '71', 'Viernes', '09:00:00', '12:00:00', '13:00:00', '18:00:00');

-- ----------------------------
-- Table structure for tb_client_services
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_services`;
CREATE TABLE `tb_client_services` (
  `idClientServices` int(11) NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `idTipeServiceFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientServices`),
  KEY `idTipeServiceFk` (`idTipeServiceFk`),
  CONSTRAINT `tb_client_services_ibfk_1` FOREIGN KEY (`idTipeServiceFk`) REFERENCES `tb_type_services` (`idTypeServices`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_services
-- ----------------------------
INSERT INTO `tb_client_services` VALUES ('43', '1', '1');
INSERT INTO `tb_client_services` VALUES ('44', '1', '1');
INSERT INTO `tb_client_services` VALUES ('45', '1', '1');
INSERT INTO `tb_client_services` VALUES ('46', '1', '1');
INSERT INTO `tb_client_services` VALUES ('47', '1', '1');
INSERT INTO `tb_client_services` VALUES ('48', '1', '1');
INSERT INTO `tb_client_services` VALUES ('49', '1', '1');
INSERT INTO `tb_client_services` VALUES ('50', '1', '1');
INSERT INTO `tb_client_services` VALUES ('51', '1', '1');
INSERT INTO `tb_client_services` VALUES ('52', '1', '1');
INSERT INTO `tb_client_services` VALUES ('53', '1', '1');
INSERT INTO `tb_client_services` VALUES ('54', '1', '1');
INSERT INTO `tb_client_services` VALUES ('55', '1', '1');
INSERT INTO `tb_client_services` VALUES ('56', '1', '1');
INSERT INTO `tb_client_services` VALUES ('57', '1', '1');

-- ----------------------------
-- Table structure for tb_client_services_access_control
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_services_access_control`;
CREATE TABLE `tb_client_services_access_control` (
  `idClientServicesAccessControl` int(11) NOT NULL AUTO_INCREMENT,
  `idDoorFk` int(11) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `idAccessControlFk` int(11) DEFAULT NULL,
  `idInputReaderFk` int(11) DEFAULT NULL,
  `locationGabinet` text DEFAULT NULL,
  `idFontFk` int(11) DEFAULT NULL,
  `aclaration` text DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `lock` varchar(200) DEFAULT NULL,
  `ouputReader` varchar(200) DEFAULT NULL,
  `ouputButom` varchar(200) DEFAULT NULL,
  `isOuputReader` tinyint(1) DEFAULT 0,
  `isOuputButom` tinyint(1) DEFAULT 0,
  `isBlocklingScrew` tinyint(1) DEFAULT 0,
  `idEmergencyButtonFk` int(11) DEFAULT NULL,
  `idShutdownKeyFk` int(11) DEFAULT NULL,
  `acaration2` text DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `addressLat` varchar(100) DEFAULT NULL,
  `addressLon` varchar(100) DEFAULT NULL,
  `portNumberRouter` varchar(200) DEFAULT NULL,
  `addressClient` varchar(100) DEFAULT NULL,
  `addressVpn` varchar(100) DEFAULT NULL,
  `addressClientLat` varchar(100) DEFAULT NULL,
  `addressClientLon` varchar(100) DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `useVpn` varchar(100) DEFAULT NULL,
  `passVpn` varchar(100) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `portHttp` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesAccessControl`),
  KEY `idDoorFk` (`idDoorFk`),
  KEY `idAccessControlFk` (`idAccessControlFk`),
  KEY `idInputReaderFk` (`idInputReaderFk`),
  KEY `idFontFk` (`idFontFk`),
  KEY `idTypeMaintenanceFk` (`idTypeMaintenanceFk`),
  KEY `idEmergencyButtonFk` (`idEmergencyButtonFk`),
  KEY `tb_client_services_access_control_ibfk_7` (`idShutdownKeyFk`),
  CONSTRAINT `tb_client_services_access_control_ibfk_1` FOREIGN KEY (`idDoorFk`) REFERENCES `tb_access_control_door` (`idAccessControlDoor`),
  CONSTRAINT `tb_client_services_access_control_ibfk_2` FOREIGN KEY (`idAccessControlFk`) REFERENCES `tb_access_control` (`idAccessControl`),
  CONSTRAINT `tb_client_services_access_control_ibfk_3` FOREIGN KEY (`idInputReaderFk`) REFERENCES `tb_input_reader` (`idInputReader`),
  CONSTRAINT `tb_client_services_access_control_ibfk_4` FOREIGN KEY (`idFontFk`) REFERENCES `tb_font` (`idFonf`),
  CONSTRAINT `tb_client_services_access_control_ibfk_5` FOREIGN KEY (`idTypeMaintenanceFk`) REFERENCES `tb_type_maintenance` (`idTypeMaintenance`),
  CONSTRAINT `tb_client_services_access_control_ibfk_6` FOREIGN KEY (`idEmergencyButtonFk`) REFERENCES `tb_emergency_button` (`idEmergencyButton`),
  CONSTRAINT `tb_client_services_access_control_ibfk_7` FOREIGN KEY (`idShutdownKeyFk`) REFERENCES `tb_shutdown_key` (`idShutdownKey`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_services_access_control
-- ----------------------------
INSERT INTO `tb_client_services_access_control` VALUES ('29', '1', '1', '0000-00-00', '0000-00-00', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1');

-- ----------------------------
-- Table structure for tb_client_services_alarms
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_services_alarms`;
CREATE TABLE `tb_client_services_alarms` (
  `idClientServicesAlarms` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `companyMonitor` varchar(200) DEFAULT NULL,
  `numberPay` varchar(50) DEFAULT NULL,
  `alarmPanel` varchar(50) DEFAULT NULL,
  `alarmKeyboard` varchar(11) DEFAULT NULL,
  `countZone` int(11) DEFAULT NULL,
  `panelAlarm` varchar(200) DEFAULT NULL,
  `keyboardAlarm` varchar(200) DEFAULT NULL,
  `countZoneIntaled` int(11) DEFAULT NULL,
  `isLinePhone` tinyint(1) DEFAULT 0,
  `isModuleIp` tinyint(1) DEFAULT 0,
  `isModuleGps` tinyint(1) DEFAULT 0,
  `observation` text DEFAULT NULL,
  PRIMARY KEY (`idClientServicesAlarms`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_services_alarms
-- ----------------------------

-- ----------------------------
-- Table structure for tb_client_services_alarms_aditional
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_services_alarms_aditional`;
CREATE TABLE `tb_client_services_alarms_aditional` (
  `idClientServicesAlarmsAditionals` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idTypeClientAlarmFk` int(11) DEFAULT NULL,
  `idUserChargeFk` int(11) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `lateralStreets` varchar(200) DEFAULT NULL,
  `rearStreets` varchar(200) DEFAULT NULL,
  `idAlarmServicesAditionalsFk` int(11) DEFAULT NULL,
  `mailFornReport` varchar(100) DEFAULT NULL,
  `fron1` time DEFAULT NULL,
  `fron2` time DEFAULT NULL,
  `fron3` time DEFAULT NULL,
  `fron4` time DEFAULT NULL,
  `fron5` time DEFAULT NULL,
  `fron6` time DEFAULT NULL,
  `fron7` time DEFAULT NULL,
  `to1` time DEFAULT NULL,
  `to2` time DEFAULT NULL,
  `to3` time DEFAULT NULL,
  `to4` time DEFAULT NULL,
  `to5` time DEFAULT NULL,
  `to6` time DEFAULT NULL,
  `to7` time DEFAULT NULL,
  `fron11` time DEFAULT NULL,
  `fron22` time DEFAULT NULL,
  `fron33` time DEFAULT NULL,
  `fron44` time DEFAULT NULL,
  `fron55` time DEFAULT NULL,
  `fron66` time DEFAULT NULL,
  `fron77` time DEFAULT NULL,
  `to11` time DEFAULT NULL,
  `to22` time DEFAULT NULL,
  `to33` time DEFAULT NULL,
  `to44` time DEFAULT NULL,
  `to55` time DEFAULT NULL,
  `to66` time DEFAULT NULL,
  `to77` time DEFAULT NULL,
  `idFormatTramitioFk` int(11) DEFAULT NULL,
  `isAutomatic` tinyint(1) DEFAULT 0,
  `hourAutomatic` int(11) DEFAULT NULL,
  `numberUserAsalt` int(11) DEFAULT NULL,
  `passAsalt` varchar(100) DEFAULT NULL,
  `police` varchar(100) DEFAULT NULL,
  `phonePolice` varchar(100) DEFAULT NULL,
  `serviceEmergencyMedical` varchar(100) DEFAULT NULL,
  `numberPartner` int(11) DEFAULT NULL,
  `plaint` varchar(100) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  PRIMARY KEY (`idClientServicesAlarmsAditionals`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_services_alarms_aditional
-- ----------------------------

-- ----------------------------
-- Table structure for tb_client_services_camera
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_services_camera`;
CREATE TABLE `tb_client_services_camera` (
  `idClientServicesCamera` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `idDvrNvr_tb_prod_classFk` int(11) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `locationLat` varchar(200) DEFAULT NULL,
  `locationLon` varchar(200) DEFAULT NULL,
  `maxCamera` int(11) DEFAULT NULL,
  `numberPortRouter` int(11) DEFAULT NULL,
  `addressVpn` varchar(200) DEFAULT NULL,
  `nroPort1` int(11) DEFAULT NULL,
  `nroPort2` int(11) DEFAULT NULL,
  `namePort1` varchar(200) DEFAULT NULL,
  `namePort2` varchar(200) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `addessClient` varchar(100) DEFAULT NULL,
  `addessClientLat` varchar(100) DEFAULT NULL,
  `addessClientLot` varchar(100) DEFAULT NULL,
  `portHttp` int(11) DEFAULT NULL,
  `namePort` varchar(100) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesCamera`),
  KEY `idClientServicesFk` (`idClientServicesFk`),
  KEY `idTypeMaintenanceFk` (`idTypeMaintenanceFk`),
  KEY `idDvrNvr_tb_prod_classFk` (`idDvrNvr_tb_prod_classFk`),
  CONSTRAINT `tb_client_services_camera_ibfk_1` FOREIGN KEY (`idClientServicesFk`) REFERENCES `tb_client_services` (`idClientServices`),
  CONSTRAINT `tb_client_services_camera_ibfk_2` FOREIGN KEY (`idTypeMaintenanceFk`) REFERENCES `tb_type_maintenance` (`idTypeMaintenance`),
  CONSTRAINT `tb_client_services_camera_ibfk_3` FOREIGN KEY (`idDvrNvr_tb_prod_classFk`) REFERENCES `tb_products_classification` (`idProductClassification`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_services_camera
-- ----------------------------
INSERT INTO `tb_client_services_camera` VALUES ('16', '1', '1', '1', '2020-03-21', '2020-03-21', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', null);
INSERT INTO `tb_client_services_camera` VALUES ('17', '1', '1', '1', '2020-03-21', '2020-03-21', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', null);
INSERT INTO `tb_client_services_camera` VALUES ('18', '1', '1', '1', '2020-03-21', '2020-03-21', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', null);
INSERT INTO `tb_client_services_camera` VALUES ('19', '1', '1', '1', '2020-03-21', '2020-03-21', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', null);
INSERT INTO `tb_client_services_camera` VALUES ('29', '1', '1', '1', '2020-03-21', '2020-03-21', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '43');
INSERT INTO `tb_client_services_camera` VALUES ('30', '1', '1', '1', '2020-03-21', '2020-03-21', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '45');
INSERT INTO `tb_client_services_camera` VALUES ('31', '1', '1', '1', '2020-03-21', '2020-03-21', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '52');
INSERT INTO `tb_client_services_camera` VALUES ('32', '1', '1', '1', '2020-03-21', '2020-03-21', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '53');

-- ----------------------------
-- Table structure for tb_client_services_gps
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_services_gps`;
CREATE TABLE `tb_client_services_gps` (
  `idClientServicesGps` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeGpsFk` int(11) DEFAULT NULL,
  `typeMaintenance` text DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `modem` varchar(200) DEFAULT NULL,
  `idInternetCompanyFk` int(11) DEFAULT NULL COMMENT 'Empresa',
  `nroLine` varchar(200) DEFAULT NULL,
  `nroChip` varchar(200) DEFAULT NULL,
  `idServiceAsociateFk` int(11) DEFAULT NULL,
  `nroSerieInternal` varchar(200) DEFAULT NULL,
  `nroSerieManufacturer` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesGps`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_services_gps
-- ----------------------------
INSERT INTO `tb_client_services_gps` VALUES ('12', '50', '1', 'pser', '2020-03-31', '2020-03-31', '1', '1', '1', '1', '1', '1', '1', '1');
INSERT INTO `tb_client_services_gps` VALUES ('13', '55', '1', 'pser', '2020-03-31', '2020-03-31', '1', '1', '1', '1', '1', '1', '1', '1');

-- ----------------------------
-- Table structure for tb_client_services_internet
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_services_internet`;
CREATE TABLE `tb_client_services_internet` (
  `idClientServicesInternet` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeInternetFk` int(11) DEFAULT NULL,
  `typeMaintenance` text DEFAULT NULL,
  `idServiceFk` int(11) DEFAULT NULL,
  `idServiceAsociateFk` int(11) DEFAULT NULL,
  `idRouterInternetFk` int(11) DEFAULT NULL,
  `numberSeria` varchar(100) DEFAULT NULL,
  `userAdmin` varchar(100) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `idInternetCompanyFk` int(11) DEFAULT NULL,
  `modenMark` varchar(100) DEFAULT '',
  `dateDown` date DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `isDown` tinyint(1) DEFAULT 0,
  `port` decimal(11,0) DEFAULT NULL,
  `passAdmin` varchar(200) DEFAULT NULL,
  `nroSerieInternal` varchar(200) DEFAULT NULL,
  `nroSerieManufacturer` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesInternet`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_services_internet
-- ----------------------------
INSERT INTO `tb_client_services_internet` VALUES ('10', '51', '1', 'psa', '1', '1', '1', '1', '1', '1', '1', '1', '2020-03-19', '2020-03-19', '1', '1', '1', '1', '1');
INSERT INTO `tb_client_services_internet` VALUES ('11', '54', '1', 'psa', '1', '1', '1', '1', '1', '1', '1', '1', '2020-03-19', '2020-03-19', '1', '1', '1', '1', '1');

-- ----------------------------
-- Table structure for tb_client_services_smart_panic
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_services_smart_panic`;
CREATE TABLE `tb_client_services_smart_panic` (
  `idClientServicesSmartPanic` int(11) NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `idCompanyMonitorFK` int(11) DEFAULT NULL,
  `sucribeNumber` varchar(200) NOT NULL,
  `idDetinationOfLicenseFk` int(11) DEFAULT NULL,
  `idDepartmentFk` int(11) DEFAULT NULL,
  `countNewLicense` int(11) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  PRIMARY KEY (`idClientServicesSmartPanic`),
  KEY `idDetinationOfLicenseFk` (`idDetinationOfLicenseFk`),
  KEY `idDepartmentFk` (`idDepartmentFk`),
  CONSTRAINT `tb_client_services_smart_panic_ibfk_1` FOREIGN KEY (`idDetinationOfLicenseFk`) REFERENCES `tb_detination_of_license` (`idDetinationOfLicense`),
  CONSTRAINT `tb_client_services_smart_panic_ibfk_2` FOREIGN KEY (`idDepartmentFk`) REFERENCES `tb_department` (`idDepartment`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_services_smart_panic
-- ----------------------------
INSERT INTO `tb_client_services_smart_panic` VALUES ('6', '48', 'Nombre de Prueba', '1', '2020-04-01', '2020-04-01', '1', '1', '1', '1', '1', '1', 'Observación de prueba');
INSERT INTO `tb_client_services_smart_panic` VALUES ('7', '49', 'Nombre de Prueba', '1', '2020-04-01', '2020-04-01', '1', '1', '1', '1', '1', '1', 'Observación de prueba');
INSERT INTO `tb_client_services_smart_panic` VALUES ('8', '56', 'Nombre de Prueba', '1', '2020-04-01', '2020-04-01', '1', '1', '1', '1', '1', '1', 'Observación de prueba');
INSERT INTO `tb_client_services_smart_panic` VALUES ('9', '57', 'Nombre de Prueba', '1', '2020-04-01', '2020-04-01', '1', '1', '1', '1', '1', '1', 'Observación de prueba');

-- ----------------------------
-- Table structure for tb_client_services_totem
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_services_totem`;
CREATE TABLE `tb_client_services_totem` (
  `idClientServicesTotem` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `item_SE` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `idCompanyFk` int(11) DEFAULT NULL,
  `dvr_nvr` varchar(100) DEFAULT NULL,
  `addresss` varchar(100) DEFAULT NULL,
  `latAddress` varchar(100) DEFAULT NULL,
  `lonAddress` varchar(100) DEFAULT NULL,
  `maxCamera` int(11) DEFAULT NULL,
  `idTotenModelFk` int(11) DEFAULT NULL,
  `tipeMaintenance_SE` int(11) DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `numerFertilizer` varchar(100) DEFAULT NULL,
  `numberPort` varchar(100) DEFAULT NULL,
  `addreesVpn` varchar(100) DEFAULT NULL,
  `namePort1` varchar(100) DEFAULT NULL,
  `numberPort1` varchar(100) DEFAULT NULL,
  `namePort2` varchar(100) DEFAULT NULL,
  `numberPort2` varchar(100) DEFAULT NULL,
  `addressClientInter` varchar(100) DEFAULT NULL,
  `portHttpInter` varchar(100) DEFAULT NULL,
  `namePortInter` varchar(100) DEFAULT NULL,
  `numberPortInter` varchar(100) DEFAULT NULL,
  `observatioGeneral` text DEFAULT NULL,
  PRIMARY KEY (`idClientServicesTotem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_services_totem
-- ----------------------------

-- ----------------------------
-- Table structure for tb_client_type
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_type`;
CREATE TABLE `tb_client_type` (
  `idClientType` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ClientType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idClientType`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_type
-- ----------------------------
INSERT INTO `tb_client_type` VALUES ('1', 'Administracion');
INSERT INTO `tb_client_type` VALUES ('2', 'Edificio');
INSERT INTO `tb_client_type` VALUES ('3', 'Empresa');
INSERT INTO `tb_client_type` VALUES ('4', 'Sucursal');
INSERT INTO `tb_client_type` VALUES ('5', 'Particular');

-- ----------------------------
-- Table structure for tb_client_type_services
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_type_services`;
CREATE TABLE `tb_client_type_services` (
  `idClientTypeServices` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `clientTypeServices` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idClientTypeServices`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_type_services
-- ----------------------------
INSERT INTO `tb_client_type_services` VALUES ('1', 'CONTROL DE ACCESO');
INSERT INTO `tb_client_type_services` VALUES ('2', 'INTERNET');
INSERT INTO `tb_client_type_services` VALUES ('3', 'GPS');
INSERT INTO `tb_client_type_services` VALUES ('4', 'TOTEM');
INSERT INTO `tb_client_type_services` VALUES ('5', 'ALARMAS');
INSERT INTO `tb_client_type_services` VALUES ('6', 'CAMARAS');
INSERT INTO `tb_client_type_services` VALUES ('7', 'SMART PANIC');

-- ----------------------------
-- Table structure for tb_client_ufc
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_ufc`;
CREATE TABLE `tb_client_ufc` (
  `idUfd` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `identificador` varchar(200) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idTypeTaxFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUfd`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_ufc
-- ----------------------------
INSERT INTO `tb_client_ufc` VALUES ('1', 'test1', '1', '14', '1');
INSERT INTO `tb_client_ufc` VALUES ('2', 'test2', '1', '14', '1');
INSERT INTO `tb_client_ufc` VALUES ('7', 'EDITADO 111', '1', '4', '1');
INSERT INTO `tb_client_ufc` VALUES ('8', 'test2', '1', '4', '1');

-- ----------------------------
-- Table structure for tb_client_users
-- ----------------------------
DROP TABLE IF EXISTS `tb_client_users`;
CREATE TABLE `tb_client_users` (
  `idClientUsers` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `idUserFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idClientUsers`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_client_users
-- ----------------------------
INSERT INTO `tb_client_users` VALUES ('1', '2', '1', null);
INSERT INTO `tb_client_users` VALUES ('2', '2', '2', null);
INSERT INTO `tb_client_users` VALUES ('7', '1', '1', null);
INSERT INTO `tb_client_users` VALUES ('8', '1', '2', null);
INSERT INTO `tb_client_users` VALUES ('11', '5', '1', null);
INSERT INTO `tb_client_users` VALUES ('12', '5', '2', null);
INSERT INTO `tb_client_users` VALUES ('13', '1', '1', null);
INSERT INTO `tb_client_users` VALUES ('14', '1', '2', null);
INSERT INTO `tb_client_users` VALUES ('15', '1', '1', null);
INSERT INTO `tb_client_users` VALUES ('16', '1', '2', null);
INSERT INTO `tb_client_users` VALUES ('17', '1', '1', null);
INSERT INTO `tb_client_users` VALUES ('18', '1', '2', null);
INSERT INTO `tb_client_users` VALUES ('19', '14', '1', null);
INSERT INTO `tb_client_users` VALUES ('20', '14', '2', null);
INSERT INTO `tb_client_users` VALUES ('21', '1', '1', null);
INSERT INTO `tb_client_users` VALUES ('22', '1', '2', null);
INSERT INTO `tb_client_users` VALUES ('23', '1', '1', null);
INSERT INTO `tb_client_users` VALUES ('24', '1', '2', null);
INSERT INTO `tb_client_users` VALUES ('25', '1', '1', null);
INSERT INTO `tb_client_users` VALUES ('26', '1', '2', null);
INSERT INTO `tb_client_users` VALUES ('27', '19', '1', null);
INSERT INTO `tb_client_users` VALUES ('28', '19', '2', null);
INSERT INTO `tb_client_users` VALUES ('29', '20', '1', null);
INSERT INTO `tb_client_users` VALUES ('30', '20', '2', null);
INSERT INTO `tb_client_users` VALUES ('31', '23', '1', null);
INSERT INTO `tb_client_users` VALUES ('32', '23', '2', null);
INSERT INTO `tb_client_users` VALUES ('33', '24', '1', null);
INSERT INTO `tb_client_users` VALUES ('34', '24', '2', null);
INSERT INTO `tb_client_users` VALUES ('35', '26', '1', null);
INSERT INTO `tb_client_users` VALUES ('36', '26', '2', null);

-- ----------------------------
-- Table structure for tb_company
-- ----------------------------
DROP TABLE IF EXISTS `tb_company`;
CREATE TABLE `tb_company` (
  `idCompany` int(11) NOT NULL AUTO_INCREMENT,
  `nameCompany` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  `tlfCompany` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'TELEFONO DE LA EMPRESA O ADMINISTRACION',
  `mail_services` varchar(200) COLLATE utf8_swedish_ci DEFAULT '',
  `mail_request` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `mail_admin` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `isEdit` tinyint(11) DEFAULT 0,
  PRIMARY KEY (`idCompany`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- ----------------------------
-- Records of tb_company
-- ----------------------------
INSERT INTO `tb_company` VALUES ('1', 'Carlos Castaño', null, null, 'servicios@carloscastanoooo.com', 'pedidos@carloscastanoooo.com', 'admin@carloscastanoooo.com', '1');
INSERT INTO `tb_company` VALUES ('2', 'Talcahuano Propiedades', null, null, 'servicio@talcahuanossss.com', 'pedidos@talcahuanossss.com', 'admin@talcahuanossss.com', '1');
INSERT INTO `tb_company` VALUES ('3', 'Toyota', null, null, 'servicio@toyotaa.com', 'Pedidos@toyotaa.com', 'admin@toyotaa.com', '1');
INSERT INTO `tb_company` VALUES ('5', 'ADMINISTRACION DE PRUEBA', '686', null, 'angelgabrielceballos@gmail.com', 'angelgabrielceballos@gmail.com', 'angelgabrielceballos@gmail.com', '0');

-- ----------------------------
-- Table structure for tb_company_type_keychains
-- ----------------------------
DROP TABLE IF EXISTS `tb_company_type_keychains`;
CREATE TABLE `tb_company_type_keychains` (
  `idKey` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idAddressKf` int(11) DEFAULT NULL,
  `item` varchar(200) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT 0.00,
  PRIMARY KEY (`idKey`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_company_type_keychains
-- ----------------------------
INSERT INTO `tb_company_type_keychains` VALUES ('1', '11', 'Llaveros', '10.99');
INSERT INTO `tb_company_type_keychains` VALUES ('2', '11', 'Sticket Vehicular', '10.99');
INSERT INTO `tb_company_type_keychains` VALUES ('3', '11', 'Credencial Movil', '10.99');
INSERT INTO `tb_company_type_keychains` VALUES ('4', '12', 'Llaveros', '10.99');
INSERT INTO `tb_company_type_keychains` VALUES ('5', '12', 'Sticket Vehicular', '10.99');
INSERT INTO `tb_company_type_keychains` VALUES ('6', '5', 'Credencial Movil', '10.99');
INSERT INTO `tb_company_type_keychains` VALUES ('7', null, null, null);

-- ----------------------------
-- Table structure for tb_department
-- ----------------------------
DROP TABLE IF EXISTS `tb_department`;
CREATE TABLE `tb_department` (
  `idDepartment` int(11) NOT NULL AUTO_INCREMENT,
  `idAdressKf` int(255) DEFAULT NULL,
  `departmentFloor` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `deparmentNumber` int(11) DEFAULT NULL,
  `deparmentDescription` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `idUserAdminRKf` int(11) DEFAULT NULL,
  `idUserAdminPropietariKf` int(11) DEFAULT NULL,
  `idUserKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT 0,
  `isRequesLowByProp` tinyint(4) DEFAULT 0,
  `SA_ID_DEPARMENT` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDepartment`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_department
-- ----------------------------
INSERT INTO `tb_department` VALUES ('1', '1', 'Porteria', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('2', '1', '1-A', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('3', '1', '1-B', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('4', '1', '2-A', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('5', '1', '2-B', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('6', '1', '3-A', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('7', '1', '3-B', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('8', '1', '4-A', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('9', '1', '4-B', '0', '', '1', '1', null, '71', '1', '0', null);
INSERT INTO `tb_department` VALUES ('10', '1', '5-A', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('11', '1', '5-B', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('12', '2', '6-A', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('13', '2', '6-B', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('14', '2', '7-A', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('15', '2', '7-B', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('16', '2', '8-A', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('17', '3', '8-B', '0', '', '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('18', '2', 'Porteria', '0', null, '1', '1', null, '92', '1', '0', null);
INSERT INTO `tb_department` VALUES ('19', '3', 'Porteria', '0', null, '1', '1', null, null, '0', '0', null);
INSERT INTO `tb_department` VALUES ('100', '11', '01-A', null, null, null, null, null, '71', '1', '0', '14143');
INSERT INTO `tb_department` VALUES ('101', '11', '01-B', null, null, null, null, null, null, '0', '0', '14144');
INSERT INTO `tb_department` VALUES ('102', '11', '01-C', null, null, null, null, null, null, '0', '0', '14145');
INSERT INTO `tb_department` VALUES ('103', '11', '02-A', null, null, null, null, null, '75', '1', '0', '14146');
INSERT INTO `tb_department` VALUES ('104', '11', '02-B', null, null, null, null, null, null, '0', '0', '14147');
INSERT INTO `tb_department` VALUES ('105', '11', '02-C', null, null, null, null, null, null, '0', '0', '14148');
INSERT INTO `tb_department` VALUES ('106', '11', '03-A', null, null, null, null, null, null, '0', '0', '14149');
INSERT INTO `tb_department` VALUES ('107', '11', '03-B', null, null, null, null, null, null, '0', '0', '14150');
INSERT INTO `tb_department` VALUES ('108', '11', '03-C', null, null, null, null, null, '78', '1', '0', '14151');
INSERT INTO `tb_department` VALUES ('109', '11', '04-A', null, null, null, null, null, null, '0', '0', '14152');
INSERT INTO `tb_department` VALUES ('110', '11', '04-B', null, null, null, null, null, null, '0', '0', '14153');
INSERT INTO `tb_department` VALUES ('111', '11', '04-C', null, null, null, null, null, null, '0', '0', '14154');
INSERT INTO `tb_department` VALUES ('112', '11', '05-A', null, null, null, null, null, null, '0', '0', '14155');
INSERT INTO `tb_department` VALUES ('113', '11', '05-B', null, null, null, null, null, null, '0', '0', '14156');
INSERT INTO `tb_department` VALUES ('114', '11', '05-C', null, null, null, null, null, null, '0', '0', '14157');
INSERT INTO `tb_department` VALUES ('115', '11', 'PB-A', null, null, null, null, null, null, '1', '0', '14158');
INSERT INTO `tb_department` VALUES ('116', '12', 'PB-01', null, null, null, null, null, '73', '1', '0', '14159');
INSERT INTO `tb_department` VALUES ('117', '12', 'PB-02', null, null, null, null, null, null, '0', '0', '14160');
INSERT INTO `tb_department` VALUES ('118', '12', '01-01', null, null, null, null, null, '85', '0', '0', '14161');
INSERT INTO `tb_department` VALUES ('119', '12', '01-02', null, null, null, null, null, null, '0', '0', '14162');
INSERT INTO `tb_department` VALUES ('120', '12', '02-01', null, null, null, null, null, '71', '1', '0', '14163');
INSERT INTO `tb_department` VALUES ('121', '12', '02-02', null, null, null, null, null, null, '0', '0', '14164');
INSERT INTO `tb_department` VALUES ('122', '12', '03-01', null, null, null, null, null, '76', '1', '0', '14165');
INSERT INTO `tb_department` VALUES ('123', '12', '03-02', null, null, null, null, null, null, '0', '0', '14166');
INSERT INTO `tb_department` VALUES ('124', '12', '04-01', null, null, null, null, null, null, '0', '0', '14167');
INSERT INTO `tb_department` VALUES ('125', '12', '04-02', null, null, null, null, null, null, '0', '0', '14168');
INSERT INTO `tb_department` VALUES ('126', '12', '05-01', null, null, null, null, null, null, '0', '0', '14169');
INSERT INTO `tb_department` VALUES ('127', '12', '05-02', null, null, null, null, null, null, '0', '0', '14170');
INSERT INTO `tb_department` VALUES ('128', '12', '06-01', null, null, null, null, null, null, '0', '0', '14171');
INSERT INTO `tb_department` VALUES ('129', '12', '06-02', null, null, null, null, null, null, '0', '0', '14172');
INSERT INTO `tb_department` VALUES ('130', '12', '07-01', null, null, null, null, null, null, '0', '0', '14173');
INSERT INTO `tb_department` VALUES ('131', '12', '07-02', null, null, null, null, null, null, '0', '0', '14174');
INSERT INTO `tb_department` VALUES ('132', '12', '08-01', null, null, null, null, null, null, '0', '0', '14175');
INSERT INTO `tb_department` VALUES ('133', '12', '08-02', null, null, null, null, null, null, '0', '0', '14176');
INSERT INTO `tb_department` VALUES ('134', '12', '09-01', null, null, null, null, null, null, '0', '0', '14177');
INSERT INTO `tb_department` VALUES ('135', '12', '09-02', null, null, null, null, null, null, '0', '0', '14178');
INSERT INTO `tb_department` VALUES ('136', '12', '10-01', null, null, null, null, null, null, '0', '0', '14179');
INSERT INTO `tb_department` VALUES ('137', '12', '10-02', null, null, null, null, null, null, '0', '0', '14180');
INSERT INTO `tb_department` VALUES ('138', '12', '11-ENCARGADO', null, null, null, null, null, null, '0', '0', '14181');
INSERT INTO `tb_department` VALUES ('139', '12', 'ADM-ADM', null, null, null, null, null, null, '0', '0', '14182');

-- ----------------------------
-- Table structure for tb_detination_of_license
-- ----------------------------
DROP TABLE IF EXISTS `tb_detination_of_license`;
CREATE TABLE `tb_detination_of_license` (
  `idDetinationOfLicense` int(11) NOT NULL AUTO_INCREMENT,
  `detinationOfLicense` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idDetinationOfLicense`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_detination_of_license
-- ----------------------------
INSERT INTO `tb_detination_of_license` VALUES ('1', 'PROPIETARIO / HABITANTE');
INSERT INTO `tb_detination_of_license` VALUES ('2', 'ENCARGADO');
INSERT INTO `tb_detination_of_license` VALUES ('3', 'ADMINISTRACION DE CONSORCIO');

-- ----------------------------
-- Table structure for tb_divice_opening
-- ----------------------------
DROP TABLE IF EXISTS `tb_divice_opening`;
CREATE TABLE `tb_divice_opening` (
  `idDiviceOpening` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `diviceOpening` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idDiviceOpening`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_divice_opening
-- ----------------------------
INSERT INTO `tb_divice_opening` VALUES ('1', 'Llavero marien');
INSERT INTO `tb_divice_opening` VALUES ('2', 'Llavero hid');
INSERT INTO `tb_divice_opening` VALUES ('3', 'Llavero hid ex');
INSERT INTO `tb_divice_opening` VALUES ('4', 'Llaver pct ss');
INSERT INTO `tb_divice_opening` VALUES ('5', 'Stiker Vehicular ');
INSERT INTO `tb_divice_opening` VALUES ('6', 'Movible hid');
INSERT INTO `tb_divice_opening` VALUES ('7', 'Movible hid ex');

-- ----------------------------
-- Table structure for tb_emergency_button
-- ----------------------------
DROP TABLE IF EXISTS `tb_emergency_button`;
CREATE TABLE `tb_emergency_button` (
  `idEmergencyButton` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idEmergencyButton`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_emergency_button
-- ----------------------------
INSERT INTO `tb_emergency_button` VALUES ('1', 'PULSADOR DE EMERGENCIA 1');
INSERT INTO `tb_emergency_button` VALUES ('2', 'PULSADOR DE EMERGENCIA 2');

-- ----------------------------
-- Table structure for tb_font
-- ----------------------------
DROP TABLE IF EXISTS `tb_font`;
CREATE TABLE `tb_font` (
  `idFonf` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idFonf`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_font
-- ----------------------------
INSERT INTO `tb_font` VALUES ('1', 'PRUEBA DE FUENTE');

-- ----------------------------
-- Table structure for tb_format_tramitio
-- ----------------------------
DROP TABLE IF EXISTS `tb_format_tramitio`;
CREATE TABLE `tb_format_tramitio` (
  `idFormatTramitio` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `formatTramitio` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idFormatTramitio`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_format_tramitio
-- ----------------------------
INSERT INTO `tb_format_tramitio` VALUES ('1', 'CONTACT-ID');
INSERT INTO `tb_format_tramitio` VALUES ('2', '4+2');
INSERT INTO `tb_format_tramitio` VALUES ('3', 'SIA');
INSERT INTO `tb_format_tramitio` VALUES ('4', 'CID');

-- ----------------------------
-- Table structure for tb_input_reader
-- ----------------------------
DROP TABLE IF EXISTS `tb_input_reader`;
CREATE TABLE `tb_input_reader` (
  `idInputReader` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idInputReader`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_input_reader
-- ----------------------------
INSERT INTO `tb_input_reader` VALUES ('1', 'LECTOR DE SALIDA');
INSERT INTO `tb_input_reader` VALUES ('2', 'PULSADOR DE SALIDA');

-- ----------------------------
-- Table structure for tb_internet_company
-- ----------------------------
DROP TABLE IF EXISTS `tb_internet_company`;
CREATE TABLE `tb_internet_company` (
  `idInternetCompany` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `internetCompany` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idInternetCompany`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_internet_company
-- ----------------------------
INSERT INTO `tb_internet_company` VALUES ('1', 'TELECENTRO');
INSERT INTO `tb_internet_company` VALUES ('2', 'FIBERTEL');
INSERT INTO `tb_internet_company` VALUES ('3', 'MOVISTAR');

-- ----------------------------
-- Table structure for tb_location
-- ----------------------------
DROP TABLE IF EXISTS `tb_location`;
CREATE TABLE `tb_location` (
  `idLocation` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `location` varchar(100) DEFAULT NULL,
  `idProvinceFK` int(11) DEFAULT NULL COMMENT 'ID DE LA PROVINCIA A LA QUE SE ASOCIA LA LOCALIDAD',
  PRIMARY KEY (`idLocation`)
) ENGINE=InnoDB AUTO_INCREMENT=943 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_location
-- ----------------------------
INSERT INTO `tb_location` VALUES ('1', 'CIUDAD DE BUENOS AIRES', '1');
INSERT INTO `tb_location` VALUES ('2', 'CONSTITUCION', '1');
INSERT INTO `tb_location` VALUES ('3', 'MONSERRAT', '1');
INSERT INTO `tb_location` VALUES ('4', 'PUERTO MADERO', '1');
INSERT INTO `tb_location` VALUES ('5', 'RETIRO', '1');
INSERT INTO `tb_location` VALUES ('6', 'SAN NICOLAS', '1');
INSERT INTO `tb_location` VALUES ('7', 'SAN TELMO', '1');
INSERT INTO `tb_location` VALUES ('8', 'RECOLETA', '1');
INSERT INTO `tb_location` VALUES ('9', 'BALVANERA', '1');
INSERT INTO `tb_location` VALUES ('10', 'SAN CRISTOBAL', '1');
INSERT INTO `tb_location` VALUES ('11', 'BARRACAS', '1');
INSERT INTO `tb_location` VALUES ('12', 'BOCA', '1');
INSERT INTO `tb_location` VALUES ('13', 'NUEVA POMPEYA', '1');
INSERT INTO `tb_location` VALUES ('14', 'PARQUE PATRICIOS', '1');
INSERT INTO `tb_location` VALUES ('15', 'ALMAGRO', '1');
INSERT INTO `tb_location` VALUES ('16', 'BOEDO', '1');
INSERT INTO `tb_location` VALUES ('17', 'CABALLITO', '1');
INSERT INTO `tb_location` VALUES ('18', 'FLORES', '1');
INSERT INTO `tb_location` VALUES ('19', 'PARQUE CHACABUCO', '1');
INSERT INTO `tb_location` VALUES ('20', 'VILLA LUGANO', '1');
INSERT INTO `tb_location` VALUES ('21', 'VILLA RIACHUELO', '1');
INSERT INTO `tb_location` VALUES ('22', 'VILLA SOLDATI', '1');
INSERT INTO `tb_location` VALUES ('23', 'LINIERS', '1');
INSERT INTO `tb_location` VALUES ('24', 'MATADEROS', '1');
INSERT INTO `tb_location` VALUES ('25', 'PARQUE AVELLANEDA', '1');
INSERT INTO `tb_location` VALUES ('26', 'FLORESTA', '1');
INSERT INTO `tb_location` VALUES ('27', 'MONTE CASTRO', '1');
INSERT INTO `tb_location` VALUES ('28', 'VELEZ SARSFIELD', '1');
INSERT INTO `tb_location` VALUES ('29', 'VERSALLES', '1');
INSERT INTO `tb_location` VALUES ('30', 'VILLA LURO', '1');
INSERT INTO `tb_location` VALUES ('31', 'VILLA REAL', '1');
INSERT INTO `tb_location` VALUES ('32', 'VILLA DEL PARQUE', '1');
INSERT INTO `tb_location` VALUES ('33', 'VILLA DEVOTO', '1');
INSERT INTO `tb_location` VALUES ('34', 'VILLA GENERAL MITRE', '1');
INSERT INTO `tb_location` VALUES ('35', 'VILLA SANTA RITA', '1');
INSERT INTO `tb_location` VALUES ('36', 'COGHLAN', '1');
INSERT INTO `tb_location` VALUES ('37', 'SAAVEDRA', '1');
INSERT INTO `tb_location` VALUES ('38', 'VILLA PUEYRREDON', '1');
INSERT INTO `tb_location` VALUES ('39', 'VILLA URQUIZA', '1');
INSERT INTO `tb_location` VALUES ('40', 'BELGRANO', '1');
INSERT INTO `tb_location` VALUES ('41', 'COLEGIALES', '1');
INSERT INTO `tb_location` VALUES ('42', 'NUÑEZ', '1');
INSERT INTO `tb_location` VALUES ('43', 'PALERMO', '1');
INSERT INTO `tb_location` VALUES ('44', 'AGRONOMIA', '1');
INSERT INTO `tb_location` VALUES ('45', 'CHACARITA', '1');
INSERT INTO `tb_location` VALUES ('46', 'PARQUE CHAS', '1');
INSERT INTO `tb_location` VALUES ('47', 'PATERNAL', '1');
INSERT INTO `tb_location` VALUES ('48', 'VILLA CRESPO', '1');
INSERT INTO `tb_location` VALUES ('49', 'VILLA ORTUZAR', '1');
INSERT INTO `tb_location` VALUES ('50', 'CARHUE', '2');
INSERT INTO `tb_location` VALUES ('51', 'COLONIA SAN MIGUEL ARCANGEL', '2');
INSERT INTO `tb_location` VALUES ('52', 'DELFIN HUERGO', '2');
INSERT INTO `tb_location` VALUES ('53', 'ESPARTILLAR', '2');
INSERT INTO `tb_location` VALUES ('54', 'ESTEBAN AGUSTIN GASCON', '2');
INSERT INTO `tb_location` VALUES ('55', 'LA PALA', '2');
INSERT INTO `tb_location` VALUES ('56', 'MAZA', '2');
INSERT INTO `tb_location` VALUES ('57', 'RIVERA', '2');
INSERT INTO `tb_location` VALUES ('58', 'VILLA MARGARITA', '2');
INSERT INTO `tb_location` VALUES ('59', 'YUTUYACO', '2');
INSERT INTO `tb_location` VALUES ('60', 'ADOLFO GONZALES CHAVES', '2');
INSERT INTO `tb_location` VALUES ('61', 'DE LA GARMA', '2');
INSERT INTO `tb_location` VALUES ('62', 'JUAN E. BARRA', '2');
INSERT INTO `tb_location` VALUES ('63', 'VASQUEZ', '2');
INSERT INTO `tb_location` VALUES ('64', 'ALBERTI', '2');
INSERT INTO `tb_location` VALUES ('65', 'CORONEL SEGUI', '2');
INSERT INTO `tb_location` VALUES ('66', 'MECHITA', '2');
INSERT INTO `tb_location` VALUES ('67', 'PLA', '2');
INSERT INTO `tb_location` VALUES ('68', 'VILLA GRISOLIA', '2');
INSERT INTO `tb_location` VALUES ('69', 'VILLA MARIA', '2');
INSERT INTO `tb_location` VALUES ('70', 'VILLA ORTIZ', '2');
INSERT INTO `tb_location` VALUES ('71', 'ADROGUE', '2');
INSERT INTO `tb_location` VALUES ('72', 'BURZACO', '2');
INSERT INTO `tb_location` VALUES ('73', 'CLAYPOLE', '2');
INSERT INTO `tb_location` VALUES ('74', 'DON ORIONE', '2');
INSERT INTO `tb_location` VALUES ('75', 'GLEW', '2');
INSERT INTO `tb_location` VALUES ('76', 'JOSE MARMOL', '2');
INSERT INTO `tb_location` VALUES ('77', 'LONGCHAMPS', '2');
INSERT INTO `tb_location` VALUES ('78', 'MALVINAS ARGENTINAS', '2');
INSERT INTO `tb_location` VALUES ('79', 'MINISTRO RIVADAVIA', '2');
INSERT INTO `tb_location` VALUES ('80', 'RAFAEL CALZADA', '2');
INSERT INTO `tb_location` VALUES ('81', 'SAN FRANCISCO SOLANO', '2');
INSERT INTO `tb_location` VALUES ('82', 'SAN JOSE', '2');
INSERT INTO `tb_location` VALUES ('83', 'AREA CINTURON ECOLOGICO', '2');
INSERT INTO `tb_location` VALUES ('84', 'AVELLANEDA', '2');
INSERT INTO `tb_location` VALUES ('85', 'CRUCESITA', '2');
INSERT INTO `tb_location` VALUES ('86', 'DOCK SUD', '2');
INSERT INTO `tb_location` VALUES ('87', 'GERLI', '2');
INSERT INTO `tb_location` VALUES ('88', 'PIÑEYRO', '2');
INSERT INTO `tb_location` VALUES ('89', 'SARANDI', '2');
INSERT INTO `tb_location` VALUES ('90', 'VILLA DOMINICO', '2');
INSERT INTO `tb_location` VALUES ('91', 'WILDE', '2');
INSERT INTO `tb_location` VALUES ('92', 'AYACUCHO', '2');
INSERT INTO `tb_location` VALUES ('93', 'LA CONSTANCIA', '2');
INSERT INTO `tb_location` VALUES ('94', 'SOLANET', '2');
INSERT INTO `tb_location` VALUES ('95', 'UDAQUIOLA', '2');
INSERT INTO `tb_location` VALUES ('96', 'ARIEL', '2');
INSERT INTO `tb_location` VALUES ('97', 'AZUL', '2');
INSERT INTO `tb_location` VALUES ('98', 'CACHARI', '2');
INSERT INTO `tb_location` VALUES ('99', 'CHILLAR', '2');
INSERT INTO `tb_location` VALUES ('100', '16 DE JULIO', '2');
INSERT INTO `tb_location` VALUES ('101', 'BAHIA BLANCA', '2');
INSERT INTO `tb_location` VALUES ('102', 'GRÜNBEIN', '2');
INSERT INTO `tb_location` VALUES ('103', 'INGENIERO WHITE', '2');
INSERT INTO `tb_location` VALUES ('104', 'VILLA BORDEAU', '2');
INSERT INTO `tb_location` VALUES ('105', 'VILLA ESPORA', '2');
INSERT INTO `tb_location` VALUES ('106', 'CABILDO', '2');
INSERT INTO `tb_location` VALUES ('107', 'GENERAL DANIEL CERRI', '2');
INSERT INTO `tb_location` VALUES ('108', 'BALCARCE', '2');
INSERT INTO `tb_location` VALUES ('109', 'LOS PINOS', '2');
INSERT INTO `tb_location` VALUES ('110', 'NAPALEOFU', '2');
INSERT INTO `tb_location` VALUES ('111', 'RAMOS OTERO', '2');
INSERT INTO `tb_location` VALUES ('112', 'SAN AGUSTIN', '2');
INSERT INTO `tb_location` VALUES ('113', 'VILLA LAGUNA LA BRAVA', '2');
INSERT INTO `tb_location` VALUES ('114', 'BARADERO', '2');
INSERT INTO `tb_location` VALUES ('115', 'IRINEO PORTELA', '2');
INSERT INTO `tb_location` VALUES ('116', 'SANTA COLOMA', '2');
INSERT INTO `tb_location` VALUES ('117', 'VILLA ALSINA', '2');
INSERT INTO `tb_location` VALUES ('118', 'ARRECIFES', '2');
INSERT INTO `tb_location` VALUES ('119', 'TODD', '2');
INSERT INTO `tb_location` VALUES ('120', 'VI¥A', '2');
INSERT INTO `tb_location` VALUES ('121', 'BARKER', '2');
INSERT INTO `tb_location` VALUES ('122', 'BENITO JUAREZ', '2');
INSERT INTO `tb_location` VALUES ('123', 'LOPEZ', '2');
INSERT INTO `tb_location` VALUES ('124', 'TEDIN URIBURU', '2');
INSERT INTO `tb_location` VALUES ('125', 'VILLA CACIQUE', '2');
INSERT INTO `tb_location` VALUES ('126', 'BERAZATEGUI', '2');
INSERT INTO `tb_location` VALUES ('127', 'BERAZATEGUI OESTE', '2');
INSERT INTO `tb_location` VALUES ('128', 'CARLOS TOMAS SOURIGUES', '2');
INSERT INTO `tb_location` VALUES ('129', 'EL PATO', '2');
INSERT INTO `tb_location` VALUES ('130', 'GUILLERMO ENRIQUE HUDSON', '2');
INSERT INTO `tb_location` VALUES ('131', 'JUAN MARIA GUTIERREZ', '2');
INSERT INTO `tb_location` VALUES ('132', 'PEREYRA', '2');
INSERT INTO `tb_location` VALUES ('133', 'PLATANOS', '2');
INSERT INTO `tb_location` VALUES ('134', 'RANELAGH', '2');
INSERT INTO `tb_location` VALUES ('135', 'VILLA ESPAÑA', '2');
INSERT INTO `tb_location` VALUES ('136', 'BARRIO BANCO PROVINCIA', '2');
INSERT INTO `tb_location` VALUES ('137', 'BARRIO EL CARMEN (ESTE)', '2');
INSERT INTO `tb_location` VALUES ('138', 'BARRIO UNIVERSITARIO', '2');
INSERT INTO `tb_location` VALUES ('139', 'BERISSO', '2');
INSERT INTO `tb_location` VALUES ('140', 'LOS TALAS', '2');
INSERT INTO `tb_location` VALUES ('141', 'VILLA ARGÜELLO', '2');
INSERT INTO `tb_location` VALUES ('142', 'VILLA DOLORES', '2');
INSERT INTO `tb_location` VALUES ('143', 'VILLA INDEPENDENCIA', '2');
INSERT INTO `tb_location` VALUES ('144', 'VILLA NUEVA', '2');
INSERT INTO `tb_location` VALUES ('145', 'VILLA PORTEÑA', '2');
INSERT INTO `tb_location` VALUES ('146', 'VILLA PROGRESO', '2');
INSERT INTO `tb_location` VALUES ('147', 'VILLA SAN CARLOS', '2');
INSERT INTO `tb_location` VALUES ('148', 'VILLA ZULA', '2');
INSERT INTO `tb_location` VALUES ('149', 'HALE', '2');
INSERT INTO `tb_location` VALUES ('150', 'JUAN F. IBARRA', '2');
INSERT INTO `tb_location` VALUES ('151', 'PAULA', '2');
INSERT INTO `tb_location` VALUES ('152', 'PIROVANO', '2');
INSERT INTO `tb_location` VALUES ('153', 'SAN CARLOS DE BOLIVAR', '2');
INSERT INTO `tb_location` VALUES ('154', 'URDAMPILLETA', '2');
INSERT INTO `tb_location` VALUES ('155', 'VILLA LYNCH PUEYRREDON', '2');
INSERT INTO `tb_location` VALUES ('156', 'ASAMBLEA', '2');
INSERT INTO `tb_location` VALUES ('157', 'BRAGADO', '2');
INSERT INTO `tb_location` VALUES ('158', 'COMODORO PY', '2');
INSERT INTO `tb_location` VALUES ('159', 'GENERAL O\'BRIEN', '2');
INSERT INTO `tb_location` VALUES ('160', 'IRALA', '2');
INSERT INTO `tb_location` VALUES ('161', 'LA LIMPIA', '2');
INSERT INTO `tb_location` VALUES ('162', 'MAXIMO FERNANDEZ', '2');
INSERT INTO `tb_location` VALUES ('163', 'MECHITA', '2');
INSERT INTO `tb_location` VALUES ('164', 'OLASCOAGA', '2');
INSERT INTO `tb_location` VALUES ('165', 'WARNES', '2');
INSERT INTO `tb_location` VALUES ('166', 'ALTAMIRANO', '2');
INSERT INTO `tb_location` VALUES ('167', 'BARRIO EL MIRADOR', '2');
INSERT INTO `tb_location` VALUES ('168', 'BARRIO LAS GOLONDRINAS', '2');
INSERT INTO `tb_location` VALUES ('169', 'BARRIO LOS BOSQUECITOS', '2');
INSERT INTO `tb_location` VALUES ('170', 'BARRIO PARQUE LAS ACACIAS', '2');
INSERT INTO `tb_location` VALUES ('171', 'CAMPOS DE ROCA', '2');
INSERT INTO `tb_location` VALUES ('172', 'CORONEL BRANDSEN', '2');
INSERT INTO `tb_location` VALUES ('173', 'CLUB DE CAMPO LAS MALVINAS', '2');
INSERT INTO `tb_location` VALUES ('174', 'GOMEZ', '2');
INSERT INTO `tb_location` VALUES ('175', 'JEPPENER', '2');
INSERT INTO `tb_location` VALUES ('176', 'OLIDEN', '2');
INSERT INTO `tb_location` VALUES ('177', 'POSADA DE LOS LAGOS', '2');
INSERT INTO `tb_location` VALUES ('178', 'SAMBOROMBON', '2');
INSERT INTO `tb_location` VALUES ('179', 'ALTO LOS CARDALES', '2');
INSERT INTO `tb_location` VALUES ('180', 'BARRIO LOS PIONEROS', '2');
INSERT INTO `tb_location` VALUES ('181', 'CAMPANA', '2');
INSERT INTO `tb_location` VALUES ('182', 'CHACRAS DEL RIO LUJAN', '2');
INSERT INTO `tb_location` VALUES ('183', 'LOMAS DEL RIO LUJAN', '2');
INSERT INTO `tb_location` VALUES ('184', 'ALEJANDRO PETION', '2');
INSERT INTO `tb_location` VALUES ('185', 'BARRIO EL TALADRO', '2');
INSERT INTO `tb_location` VALUES ('186', 'CA¥UELAS', '2');
INSERT INTO `tb_location` VALUES ('187', 'GOBERNADOR UDAONDO', '2');
INSERT INTO `tb_location` VALUES ('188', 'BARRIO BELGRANO', '2');
INSERT INTO `tb_location` VALUES ('189', 'MAXIMO PAZ', '2');
INSERT INTO `tb_location` VALUES ('190', 'SANTA ROSA', '2');
INSERT INTO `tb_location` VALUES ('191', 'URIBELARREA', '2');
INSERT INTO `tb_location` VALUES ('192', 'VICENTE CASARES', '2');
INSERT INTO `tb_location` VALUES ('193', 'CAPITAN SARMIENTO', '2');
INSERT INTO `tb_location` VALUES ('194', 'LA LUISA', '2');
INSERT INTO `tb_location` VALUES ('195', 'BELLOCQ', '2');
INSERT INTO `tb_location` VALUES ('196', 'CADRET', '2');
INSERT INTO `tb_location` VALUES ('197', 'CARLOS CASARES', '2');
INSERT INTO `tb_location` VALUES ('198', 'COLONIA MAURICIO', '2');
INSERT INTO `tb_location` VALUES ('199', 'HORTENSIA', '2');
INSERT INTO `tb_location` VALUES ('200', 'LA SOFIA', '2');
INSERT INTO `tb_location` VALUES ('201', 'MAURICIO HIRSCH', '2');
INSERT INTO `tb_location` VALUES ('202', 'MOCTEZUMA', '2');
INSERT INTO `tb_location` VALUES ('203', 'ORDOQUI', '2');
INSERT INTO `tb_location` VALUES ('204', 'SANTO TOMAS', '2');
INSERT INTO `tb_location` VALUES ('205', 'SMITH', '2');
INSERT INTO `tb_location` VALUES ('206', 'CARLOS TEJEDOR', '2');
INSERT INTO `tb_location` VALUES ('207', 'COLONIA SERE', '2');
INSERT INTO `tb_location` VALUES ('208', 'CURARU', '2');
INSERT INTO `tb_location` VALUES ('209', 'TIMOTE', '2');
INSERT INTO `tb_location` VALUES ('210', 'TRES ALGARROBOS', '2');
INSERT INTO `tb_location` VALUES ('211', 'CARMEN DE ARECO', '2');
INSERT INTO `tb_location` VALUES ('212', 'PUEBLO GOUIN', '2');
INSERT INTO `tb_location` VALUES ('213', 'TRES SARGENTOS', '2');
INSERT INTO `tb_location` VALUES ('214', 'CASTELLI', '2');
INSERT INTO `tb_location` VALUES ('215', 'CENTRO GUERRERO', '2');
INSERT INTO `tb_location` VALUES ('216', 'CERRO DE LA GLORIA (CANAL 15)', '2');
INSERT INTO `tb_location` VALUES ('217', 'COLON', '2');
INSERT INTO `tb_location` VALUES ('218', 'EL ARBOLITO', '2');
INSERT INTO `tb_location` VALUES ('219', 'PEARSON', '2');
INSERT INTO `tb_location` VALUES ('220', 'SARASA', '2');
INSERT INTO `tb_location` VALUES ('221', 'BAJO HONDO', '2');
INSERT INTO `tb_location` VALUES ('222', 'BALNEARIO PEHUEN CO', '2');
INSERT INTO `tb_location` VALUES ('223', 'PAGO CHICO', '2');
INSERT INTO `tb_location` VALUES ('224', 'PUNTA ALTA', '2');
INSERT INTO `tb_location` VALUES ('225', 'PUNTA ALTA', '2');
INSERT INTO `tb_location` VALUES ('226', 'VILLA DEL MAR', '2');
INSERT INTO `tb_location` VALUES ('227', 'VILLA GENERAL ARIAS', '2');
INSERT INTO `tb_location` VALUES ('228', 'APARICIO', '2');
INSERT INTO `tb_location` VALUES ('229', 'BALNEARIO MARISOL', '2');
INSERT INTO `tb_location` VALUES ('230', 'CORONEL DORREGO', '2');
INSERT INTO `tb_location` VALUES ('231', 'EL PERDIDO', '2');
INSERT INTO `tb_location` VALUES ('232', 'FARO', '2');
INSERT INTO `tb_location` VALUES ('233', 'IRENE', '2');
INSERT INTO `tb_location` VALUES ('234', 'ORIENTE', '2');
INSERT INTO `tb_location` VALUES ('235', 'LA RUTA', '2');
INSERT INTO `tb_location` VALUES ('236', 'SAN ROMAN', '2');
INSERT INTO `tb_location` VALUES ('237', 'CORONEL PRINGLES', '2');
INSERT INTO `tb_location` VALUES ('238', 'EL DIVISORIO', '2');
INSERT INTO `tb_location` VALUES ('239', 'EL PENSAMIENTO', '2');
INSERT INTO `tb_location` VALUES ('240', 'INDIO RICO', '2');
INSERT INTO `tb_location` VALUES ('241', 'LARTIGAU', '2');
INSERT INTO `tb_location` VALUES ('242', 'CASCADAS', '2');
INSERT INTO `tb_location` VALUES ('243', 'CORONEL SUAREZ', '2');
INSERT INTO `tb_location` VALUES ('244', 'CURA MALAL', '2');
INSERT INTO `tb_location` VALUES ('245', 'D\'ORBIGNY', '2');
INSERT INTO `tb_location` VALUES ('246', 'HUANGUELEN', '2');
INSERT INTO `tb_location` VALUES ('247', 'PASMAN', '2');
INSERT INTO `tb_location` VALUES ('248', 'SAN JOSE', '2');
INSERT INTO `tb_location` VALUES ('249', 'SANTA MARIA', '2');
INSERT INTO `tb_location` VALUES ('250', 'SANTA TRINIDAD', '2');
INSERT INTO `tb_location` VALUES ('251', 'VILLA LA ARCADIA', '2');
INSERT INTO `tb_location` VALUES ('252', 'CASTILLA', '2');
INSERT INTO `tb_location` VALUES ('253', 'CHACABUCO', '2');
INSERT INTO `tb_location` VALUES ('254', 'LOS ANGELES', '2');
INSERT INTO `tb_location` VALUES ('255', 'O\'HIGGINS', '2');
INSERT INTO `tb_location` VALUES ('256', 'RAWSON', '2');
INSERT INTO `tb_location` VALUES ('257', 'BARRIO LOMAS ALTAS', '2');
INSERT INTO `tb_location` VALUES ('258', 'CHASCOMUS', '2');
INSERT INTO `tb_location` VALUES ('259', 'BARRIO SAN CAYETANO', '2');
INSERT INTO `tb_location` VALUES ('260', 'LAGUNA VITEL', '2');
INSERT INTO `tb_location` VALUES ('261', 'MANUEL J. COBO', '2');
INSERT INTO `tb_location` VALUES ('262', 'VILLA PARQUE GIRADO', '2');
INSERT INTO `tb_location` VALUES ('263', 'BENITEZ', '2');
INSERT INTO `tb_location` VALUES ('264', 'CHIVILCOY', '2');
INSERT INTO `tb_location` VALUES ('265', 'EMILIO AYARZA', '2');
INSERT INTO `tb_location` VALUES ('266', 'GOROSTIAGA', '2');
INSERT INTO `tb_location` VALUES ('267', 'LA RICA', '2');
INSERT INTO `tb_location` VALUES ('268', 'MOQUEHUA', '2');
INSERT INTO `tb_location` VALUES ('269', 'RAMON BIAUS', '2');
INSERT INTO `tb_location` VALUES ('270', 'SAN SEBASTIAN', '2');
INSERT INTO `tb_location` VALUES ('271', 'ANDANT', '2');
INSERT INTO `tb_location` VALUES ('272', 'ARBOLEDAS', '2');
INSERT INTO `tb_location` VALUES ('273', 'DAIREAUX', '2');
INSERT INTO `tb_location` VALUES ('274', 'LA LARGA', '2');
INSERT INTO `tb_location` VALUES ('275', 'SALAZAR', '2');
INSERT INTO `tb_location` VALUES ('276', 'DOLORES', '2');
INSERT INTO `tb_location` VALUES ('277', 'SEVIGNE', '2');
INSERT INTO `tb_location` VALUES ('278', 'DIQUE Nº 1', '2');
INSERT INTO `tb_location` VALUES ('279', 'ENSENADA', '2');
INSERT INTO `tb_location` VALUES ('280', 'ISLA SANTIAGO (OESTE)', '2');
INSERT INTO `tb_location` VALUES ('281', 'PUNTA LARA', '2');
INSERT INTO `tb_location` VALUES ('282', 'VILLA CATELA', '2');
INSERT INTO `tb_location` VALUES ('283', 'BELEN DE ESCOBAR', '2');
INSERT INTO `tb_location` VALUES ('284', 'EL CAZADOR', '2');
INSERT INTO `tb_location` VALUES ('285', 'GARIN', '2');
INSERT INTO `tb_location` VALUES ('286', 'INGENIERO MASCHWITZ', '2');
INSERT INTO `tb_location` VALUES ('287', 'LOMA VERDE', '2');
INSERT INTO `tb_location` VALUES ('288', 'MATHEU', '2');
INSERT INTO `tb_location` VALUES ('289', 'MAQUINISTA F. SAVIO ESTE', '2');
INSERT INTO `tb_location` VALUES ('290', 'CANNING', '2');
INSERT INTO `tb_location` VALUES ('291', 'EL JAGÜEL', '2');
INSERT INTO `tb_location` VALUES ('292', 'LUIS GUILLON', '2');
INSERT INTO `tb_location` VALUES ('293', 'MONTE GRANDE', '2');
INSERT INTO `tb_location` VALUES ('294', '9 DE ABRIL', '2');
INSERT INTO `tb_location` VALUES ('295', 'ARROYO DE LA CRUZ', '2');
INSERT INTO `tb_location` VALUES ('296', 'CAPILLA DEL SE¥OR', '2');
INSERT INTO `tb_location` VALUES ('297', 'DIEGO GAYNOR', '2');
INSERT INTO `tb_location` VALUES ('298', 'LOS CARDALES', '2');
INSERT INTO `tb_location` VALUES ('299', 'PARADA ORLANDO', '2');
INSERT INTO `tb_location` VALUES ('300', 'EL REMANSO', '2');
INSERT INTO `tb_location` VALUES ('301', 'PARADA ROBLES', '2');
INSERT INTO `tb_location` VALUES ('302', 'PAVON', '2');
INSERT INTO `tb_location` VALUES ('303', 'AEROPUERTO INTERNACIONAL EZEIZA', '2');
INSERT INTO `tb_location` VALUES ('304', 'CANNING', '2');
INSERT INTO `tb_location` VALUES ('305', 'CARLOS SPEGAZZINI', '2');
INSERT INTO `tb_location` VALUES ('306', 'JOSE MARIA EZEIZA', '2');
INSERT INTO `tb_location` VALUES ('307', 'LA UNION', '2');
INSERT INTO `tb_location` VALUES ('308', 'TRISTAN SUAREZ', '2');
INSERT INTO `tb_location` VALUES ('309', 'BOSQUES', '2');
INSERT INTO `tb_location` VALUES ('310', 'ESTANISLAO SEVERO ZEBALLOS', '2');
INSERT INTO `tb_location` VALUES ('311', 'FLORENCIO VARELA', '2');
INSERT INTO `tb_location` VALUES ('312', 'GOBERNADOR JULIO A. COSTA', '2');
INSERT INTO `tb_location` VALUES ('313', 'INGENIERO JUAN ALLAN', '2');
INSERT INTO `tb_location` VALUES ('314', 'VILLA BROWN', '2');
INSERT INTO `tb_location` VALUES ('315', 'VILLA SAN LUIS', '2');
INSERT INTO `tb_location` VALUES ('316', 'VILLA SANTA ROSA', '2');
INSERT INTO `tb_location` VALUES ('317', 'VILLA VATTEONE', '2');
INSERT INTO `tb_location` VALUES ('318', 'EL TROPEZON', '2');
INSERT INTO `tb_location` VALUES ('319', 'LA CAPILLA', '2');
INSERT INTO `tb_location` VALUES ('320', 'BLAQUIER', '2');
INSERT INTO `tb_location` VALUES ('321', 'FLORENTINO AMEGHINO', '2');
INSERT INTO `tb_location` VALUES ('322', 'PORVENIR', '2');
INSERT INTO `tb_location` VALUES ('323', 'CENTINELA DEL MAR', '2');
INSERT INTO `tb_location` VALUES ('324', 'COMANDANTE NICANOR OTAMENDI', '2');
INSERT INTO `tb_location` VALUES ('325', 'MAR DEL SUR', '2');
INSERT INTO `tb_location` VALUES ('326', 'MECHONGUE', '2');
INSERT INTO `tb_location` VALUES ('327', 'MIRAMAR', '2');
INSERT INTO `tb_location` VALUES ('328', 'GENERAL ALVEAR', '2');
INSERT INTO `tb_location` VALUES ('329', 'ARRIBE¥OS', '2');
INSERT INTO `tb_location` VALUES ('330', 'ASCENSION', '2');
INSERT INTO `tb_location` VALUES ('331', 'ESTACION ARENALES', '2');
INSERT INTO `tb_location` VALUES ('332', 'FERRE', '2');
INSERT INTO `tb_location` VALUES ('333', 'GENERAL ARENALES', '2');
INSERT INTO `tb_location` VALUES ('334', 'LA ANGELITA', '2');
INSERT INTO `tb_location` VALUES ('335', 'LA TRINIDAD', '2');
INSERT INTO `tb_location` VALUES ('336', 'GENERAL BELGRANO', '2');
INSERT INTO `tb_location` VALUES ('337', 'GORCHS', '2');
INSERT INTO `tb_location` VALUES ('338', 'GENERAL GUIDO', '2');
INSERT INTO `tb_location` VALUES ('339', 'LABARDEN', '2');
INSERT INTO `tb_location` VALUES ('340', 'BARRIO KENNEDY', '2');
INSERT INTO `tb_location` VALUES ('341', 'GENERAL JUAN MADARIAGA', '2');
INSERT INTO `tb_location` VALUES ('342', 'GENERAL LA MADRID', '2');
INSERT INTO `tb_location` VALUES ('343', 'LA COLINA', '2');
INSERT INTO `tb_location` VALUES ('344', 'LAS MARTINETAS', '2');
INSERT INTO `tb_location` VALUES ('345', 'LIBANO', '2');
INSERT INTO `tb_location` VALUES ('346', 'PONTAUT', '2');
INSERT INTO `tb_location` VALUES ('347', 'GENERAL HORNOS', '2');
INSERT INTO `tb_location` VALUES ('348', 'GENERAL LAS HERAS', '2');
INSERT INTO `tb_location` VALUES ('349', 'LA CHOZA', '2');
INSERT INTO `tb_location` VALUES ('350', 'PLOMER', '2');
INSERT INTO `tb_location` VALUES ('351', 'VILLARS', '2');
INSERT INTO `tb_location` VALUES ('352', 'GENERAL LAVALLE', '2');
INSERT INTO `tb_location` VALUES ('353', 'PAVON', '2');
INSERT INTO `tb_location` VALUES ('354', 'BARRIO RIO SALADO', '2');
INSERT INTO `tb_location` VALUES ('355', 'LOMA VERDE', '2');
INSERT INTO `tb_location` VALUES ('356', 'RANCHOS', '2');
INSERT INTO `tb_location` VALUES ('357', 'VILLANUEVA', '2');
INSERT INTO `tb_location` VALUES ('358', 'COLONIA SAN RICARDO', '2');
INSERT INTO `tb_location` VALUES ('359', 'GENERAL PINTO', '2');
INSERT INTO `tb_location` VALUES ('360', 'GERMANIA', '2');
INSERT INTO `tb_location` VALUES ('361', 'GUNTHER', '2');
INSERT INTO `tb_location` VALUES ('362', 'VILLA FRANCIA', '2');
INSERT INTO `tb_location` VALUES ('363', 'VILLA ROTH', '2');
INSERT INTO `tb_location` VALUES ('364', 'BARRIO EL BOQUERON', '2');
INSERT INTO `tb_location` VALUES ('365', 'BARRIO LA GLORIA', '2');
INSERT INTO `tb_location` VALUES ('366', 'BARRIO SANTA PAULA', '2');
INSERT INTO `tb_location` VALUES ('367', 'BATAN', '2');
INSERT INTO `tb_location` VALUES ('368', 'CHAPADMALAL', '2');
INSERT INTO `tb_location` VALUES ('369', 'EL MARQUESADO', '2');
INSERT INTO `tb_location` VALUES ('370', 'ESTACION CHAPADMALAL', '2');
INSERT INTO `tb_location` VALUES ('371', 'CAMET', '2');
INSERT INTO `tb_location` VALUES ('372', 'ESTACION CAMET', '2');
INSERT INTO `tb_location` VALUES ('373', 'MAR DEL PLATA', '2');
INSERT INTO `tb_location` VALUES ('374', 'PUNTA MOGOTES', '2');
INSERT INTO `tb_location` VALUES ('375', 'BARRIO EL CASAL', '2');
INSERT INTO `tb_location` VALUES ('376', 'SIERRA DE LOS PADRES', '2');
INSERT INTO `tb_location` VALUES ('377', 'BARRIO COLINAS VERDES', '2');
INSERT INTO `tb_location` VALUES ('378', 'BARRIO EL COYUNCO', '2');
INSERT INTO `tb_location` VALUES ('379', 'SIERRA DE LOS PADRES', '2');
INSERT INTO `tb_location` VALUES ('380', 'GENERAL RODRIGUEZ', '2');
INSERT INTO `tb_location` VALUES ('381', 'BARRIO MORABO', '2');
INSERT INTO `tb_location` VALUES ('382', 'BARRIO RUTA 24 KM. 10', '2');
INSERT INTO `tb_location` VALUES ('383', 'C.C. BOSQUE REAL', '2');
INSERT INTO `tb_location` VALUES ('384', 'GENERAL RODRGUEZ', '2');
INSERT INTO `tb_location` VALUES ('385', 'BARRIO PARQUE GENERAL SAN MARTIN', '2');
INSERT INTO `tb_location` VALUES ('386', 'BILLINGHURST', '2');
INSERT INTO `tb_location` VALUES ('387', 'CIUDAD DEL LIBERTADOR GENERAL SAN MARTIN', '2');
INSERT INTO `tb_location` VALUES ('388', 'CIUDAD JARDIN EL LIBERTADOR', '2');
INSERT INTO `tb_location` VALUES ('389', 'VILLA AYACUCHO', '2');
INSERT INTO `tb_location` VALUES ('390', 'VILLA BALLESTER', '2');
INSERT INTO `tb_location` VALUES ('391', 'VILLA BERNARDO MONTEAGUDO', '2');
INSERT INTO `tb_location` VALUES ('392', 'VILLA CHACABUCO', '2');
INSERT INTO `tb_location` VALUES ('393', 'VILLA CORONEL JOSE M. ZAPIOLA', '2');
INSERT INTO `tb_location` VALUES ('394', 'VILLA GENERAL ANTONIO J. DE SUCRE', '2');
INSERT INTO `tb_location` VALUES ('395', 'VILLA GENERAL EUGENIO NECOCHEA', '2');
INSERT INTO `tb_location` VALUES ('396', 'VILLA GENERAL JOSE TOMAS GUIDO', '2');
INSERT INTO `tb_location` VALUES ('397', 'VILLA GENERAL JUAN G. LAS HERAS', '2');
INSERT INTO `tb_location` VALUES ('398', 'VILLA GODOY CRUZ', '2');
INSERT INTO `tb_location` VALUES ('399', 'VILLA GRANADEROS DE SAN MARTIN', '2');
INSERT INTO `tb_location` VALUES ('400', 'VILLA GREGORIA MATORRAS', '2');
INSERT INTO `tb_location` VALUES ('401', 'VILLA JOSE LEON SUAREZ', '2');
INSERT INTO `tb_location` VALUES ('402', 'VILLA JUAN MARTIN DE PUEYRREDON', '2');
INSERT INTO `tb_location` VALUES ('403', 'VILLA LIBERTAD', '2');
INSERT INTO `tb_location` VALUES ('404', 'VILLA LYNCH', '2');
INSERT INTO `tb_location` VALUES ('405', 'VILLA MAIPU', '2');
INSERT INTO `tb_location` VALUES ('406', 'VILLA MARIA IRENE DE LOS REMEDIOS DE ESCALADA', '2');
INSERT INTO `tb_location` VALUES ('407', 'VILLA MARQUES ALEJANDRO MARIA DE AGUADO', '2');
INSERT INTO `tb_location` VALUES ('408', 'VILLA PARQUE PRESIDENTE FIGUEROA ALCORTA', '2');
INSERT INTO `tb_location` VALUES ('409', 'VILLA PARQUE SAN LORENZO', '2');
INSERT INTO `tb_location` VALUES ('410', 'VILLA SAN ANDRES', '2');
INSERT INTO `tb_location` VALUES ('411', 'VILLA YAPEYU', '2');
INSERT INTO `tb_location` VALUES ('412', 'BAIGORRITA', '2');
INSERT INTO `tb_location` VALUES ('413', 'LA DELFINA', '2');
INSERT INTO `tb_location` VALUES ('414', 'LOS TOLDOS', '2');
INSERT INTO `tb_location` VALUES ('415', 'SAN EMILIO', '2');
INSERT INTO `tb_location` VALUES ('416', 'ZAVALIA', '2');
INSERT INTO `tb_location` VALUES ('417', 'BANDERALO', '2');
INSERT INTO `tb_location` VALUES ('418', 'CA¥ADA SECA', '2');
INSERT INTO `tb_location` VALUES ('419', 'CORONEL CHARLONE', '2');
INSERT INTO `tb_location` VALUES ('420', 'EMILIO V. BUNGE', '2');
INSERT INTO `tb_location` VALUES ('421', 'GENERAL VILLEGAS', '2');
INSERT INTO `tb_location` VALUES ('422', 'MASSEY', '2');
INSERT INTO `tb_location` VALUES ('423', 'PICHINCHA', '2');
INSERT INTO `tb_location` VALUES ('424', 'PIEDRITAS', '2');
INSERT INTO `tb_location` VALUES ('425', 'SANTA ELEODORA', '2');
INSERT INTO `tb_location` VALUES ('426', 'SANTA REGINA', '2');
INSERT INTO `tb_location` VALUES ('427', 'VILLA SABOYA', '2');
INSERT INTO `tb_location` VALUES ('428', 'VILLA SAUZE', '2');
INSERT INTO `tb_location` VALUES ('429', 'ARROYO VENADO', '2');
INSERT INTO `tb_location` VALUES ('430', 'CASBAS', '2');
INSERT INTO `tb_location` VALUES ('431', 'GARRE', '2');
INSERT INTO `tb_location` VALUES ('432', 'GUAMINI', '2');
INSERT INTO `tb_location` VALUES ('433', 'LAGUNA ALSINA', '2');
INSERT INTO `tb_location` VALUES ('434', 'HENDERSON', '2');
INSERT INTO `tb_location` VALUES ('435', 'HERRERA VEGAS', '2');
INSERT INTO `tb_location` VALUES ('436', 'HURLINGHAM', '2');
INSERT INTO `tb_location` VALUES ('437', 'VILLA SANTOS TESEI', '2');
INSERT INTO `tb_location` VALUES ('438', 'WILLIAM C. MORRIS', '2');
INSERT INTO `tb_location` VALUES ('439', 'ITUZAINGO CENTRO', '2');
INSERT INTO `tb_location` VALUES ('440', 'ITUZAINGO SUR', '2');
INSERT INTO `tb_location` VALUES ('441', 'VILLA GOBERNADOR UDAONDO', '2');
INSERT INTO `tb_location` VALUES ('442', 'DEL VISO', '2');
INSERT INTO `tb_location` VALUES ('443', 'JOSE C. PAZ', '2');
INSERT INTO `tb_location` VALUES ('444', 'TORTUGUITAS', '2');
INSERT INTO `tb_location` VALUES ('445', 'AGUSTIN ROCA', '2');
INSERT INTO `tb_location` VALUES ('446', 'AGUSTINA', '2');
INSERT INTO `tb_location` VALUES ('447', 'BALNEARIO LAGUNA DE GOMEZ', '2');
INSERT INTO `tb_location` VALUES ('448', 'FORTIN TIBURCIO', '2');
INSERT INTO `tb_location` VALUES ('449', 'JUNIN', '2');
INSERT INTO `tb_location` VALUES ('450', 'LA AGRARIA', '2');
INSERT INTO `tb_location` VALUES ('451', 'LAPLACETTE', '2');
INSERT INTO `tb_location` VALUES ('452', 'MORSE', '2');
INSERT INTO `tb_location` VALUES ('453', 'SAFORCADA', '2');
INSERT INTO `tb_location` VALUES ('454', 'LAS TONINAS', '2');
INSERT INTO `tb_location` VALUES ('455', 'AGUAS VERDES', '2');
INSERT INTO `tb_location` VALUES ('456', 'LUCILA DEL MAR', '2');
INSERT INTO `tb_location` VALUES ('457', 'MAR DE AJO', '2');
INSERT INTO `tb_location` VALUES ('458', 'MAR DE AJO NORTE', '2');
INSERT INTO `tb_location` VALUES ('459', 'SAN BERNARDO', '2');
INSERT INTO `tb_location` VALUES ('460', 'SAN CLEMENTE DEL TUYU', '2');
INSERT INTO `tb_location` VALUES ('461', 'MAR DEL TUYU', '2');
INSERT INTO `tb_location` VALUES ('462', 'SANTA TERESITA', '2');
INSERT INTO `tb_location` VALUES ('463', 'ALDO BONZI', '2');
INSERT INTO `tb_location` VALUES ('464', 'CIUDAD EVITA', '2');
INSERT INTO `tb_location` VALUES ('465', 'GONZALEZ CATAN', '2');
INSERT INTO `tb_location` VALUES ('466', 'GREGORIO DE LAFERRERE', '2');
INSERT INTO `tb_location` VALUES ('467', 'ISIDRO CASANOVA', '2');
INSERT INTO `tb_location` VALUES ('468', 'LA TABLADA', '2');
INSERT INTO `tb_location` VALUES ('469', 'LOMAS DEL MIRADOR', '2');
INSERT INTO `tb_location` VALUES ('470', 'RAFAEL CASTILLO', '2');
INSERT INTO `tb_location` VALUES ('471', 'RAMOS MEJIA', '2');
INSERT INTO `tb_location` VALUES ('472', 'SAN JUSTO', '2');
INSERT INTO `tb_location` VALUES ('473', 'TAPIALES', '2');
INSERT INTO `tb_location` VALUES ('474', '20 DE JUNIO', '2');
INSERT INTO `tb_location` VALUES ('475', 'VILLA EDUARDO MADERO', '2');
INSERT INTO `tb_location` VALUES ('476', 'VILLA LUZURIAGA', '2');
INSERT INTO `tb_location` VALUES ('477', 'VIRREY DEL PINO', '2');
INSERT INTO `tb_location` VALUES ('478', 'GERLI', '2');
INSERT INTO `tb_location` VALUES ('479', 'LANUS ESTE', '2');
INSERT INTO `tb_location` VALUES ('480', 'LANUS OESTE', '2');
INSERT INTO `tb_location` VALUES ('481', 'MONTE CHINGOLO', '2');
INSERT INTO `tb_location` VALUES ('482', 'REMEDIOS ESCALADA DE SAN MARTIN', '2');
INSERT INTO `tb_location` VALUES ('483', 'VALENTIN ALSINA', '2');
INSERT INTO `tb_location` VALUES ('484', 'COUNTRY CLUB EL RODEO', '2');
INSERT INTO `tb_location` VALUES ('485', 'IGNACIO CORREAS', '2');
INSERT INTO `tb_location` VALUES ('486', 'ABASTO', '2');
INSERT INTO `tb_location` VALUES ('487', 'ANGEL ETCHEVERRY', '2');
INSERT INTO `tb_location` VALUES ('488', 'ARANA', '2');
INSERT INTO `tb_location` VALUES ('489', 'ARTURO SEGUI', '2');
INSERT INTO `tb_location` VALUES ('490', 'BARRIO EL CARMEN (OESTE)', '2');
INSERT INTO `tb_location` VALUES ('491', 'BARRIO GAMBIER', '2');
INSERT INTO `tb_location` VALUES ('492', 'BARRIO LAS MALVINAS', '2');
INSERT INTO `tb_location` VALUES ('493', 'BARRIO LAS QUINTAS', '2');
INSERT INTO `tb_location` VALUES ('494', 'CITY BELL', '2');
INSERT INTO `tb_location` VALUES ('495', 'EL RETIRO', '2');
INSERT INTO `tb_location` VALUES ('496', 'JOAQUIN GORINA', '2');
INSERT INTO `tb_location` VALUES ('497', 'JOSE HERNANDEZ', '2');
INSERT INTO `tb_location` VALUES ('498', 'JOSE MELCHOR ROMERO', '2');
INSERT INTO `tb_location` VALUES ('499', 'LA CUMBRE', '2');
INSERT INTO `tb_location` VALUES ('500', 'LA PLATA', '2');
INSERT INTO `tb_location` VALUES ('501', 'LISANDRO OLMOS', '2');
INSERT INTO `tb_location` VALUES ('502', 'LOS HORNOS', '2');
INSERT INTO `tb_location` VALUES ('503', 'MANUEL B. GONNET', '2');
INSERT INTO `tb_location` VALUES ('504', 'RINGUELET', '2');
INSERT INTO `tb_location` VALUES ('505', 'RUFINO DE ELIZALDE', '2');
INSERT INTO `tb_location` VALUES ('506', 'TOLOSA', '2');
INSERT INTO `tb_location` VALUES ('507', 'TRANSRADIO', '2');
INSERT INTO `tb_location` VALUES ('508', 'VILLA ELISA', '2');
INSERT INTO `tb_location` VALUES ('509', 'VILLA ELVIRA', '2');
INSERT INTO `tb_location` VALUES ('510', 'VILLA GARIBALDI', '2');
INSERT INTO `tb_location` VALUES ('511', 'VILLA MONTORO', '2');
INSERT INTO `tb_location` VALUES ('512', 'VILLA PARQUE SICARDI', '2');
INSERT INTO `tb_location` VALUES ('513', 'LOMAS DE COPELLO', '2');
INSERT INTO `tb_location` VALUES ('514', 'BARRIO RUTA SOL', '2');
INSERT INTO `tb_location` VALUES ('515', 'LAPRIDA', '2');
INSERT INTO `tb_location` VALUES ('516', 'PUEBLO NUEVO', '2');
INSERT INTO `tb_location` VALUES ('517', 'PUEBLO SAN JORGE', '2');
INSERT INTO `tb_location` VALUES ('518', 'CORONEL BOERR', '2');
INSERT INTO `tb_location` VALUES ('519', 'EL TRIGO', '2');
INSERT INTO `tb_location` VALUES ('520', 'LAS FLORES', '2');
INSERT INTO `tb_location` VALUES ('521', 'PARDO', '2');
INSERT INTO `tb_location` VALUES ('522', 'ALBERDI VIEJO', '2');
INSERT INTO `tb_location` VALUES ('523', 'EL DORADO', '2');
INSERT INTO `tb_location` VALUES ('524', 'FORTIN ACHA', '2');
INSERT INTO `tb_location` VALUES ('525', 'JUAN BAUTISTA ALBERDI', '2');
INSERT INTO `tb_location` VALUES ('526', 'LEANDRO N. ALEM', '2');
INSERT INTO `tb_location` VALUES ('527', 'VEDIA', '2');
INSERT INTO `tb_location` VALUES ('528', 'ARENAZA', '2');
INSERT INTO `tb_location` VALUES ('529', 'BAYAUCA', '2');
INSERT INTO `tb_location` VALUES ('530', 'BERMUDEZ', '2');
INSERT INTO `tb_location` VALUES ('531', 'CARLOS SALAS', '2');
INSERT INTO `tb_location` VALUES ('532', 'CORONEL MARTINEZ DE HOZ', '2');
INSERT INTO `tb_location` VALUES ('533', 'EL TRIUNFO', '2');
INSERT INTO `tb_location` VALUES ('534', 'LAS TOSCAS', '2');
INSERT INTO `tb_location` VALUES ('535', 'LINCOLN', '2');
INSERT INTO `tb_location` VALUES ('536', 'PASTEUR', '2');
INSERT INTO `tb_location` VALUES ('537', 'ROBERTS', '2');
INSERT INTO `tb_location` VALUES ('538', 'TRIUNVIRATO', '2');
INSERT INTO `tb_location` VALUES ('539', 'ARENAS VERDES', '2');
INSERT INTO `tb_location` VALUES ('540', 'LICENCIADO MATIENZO', '2');
INSERT INTO `tb_location` VALUES ('541', 'LOBERIA', '2');
INSERT INTO `tb_location` VALUES ('542', 'PIERES', '2');
INSERT INTO `tb_location` VALUES ('543', 'SAN MANUEL', '2');
INSERT INTO `tb_location` VALUES ('544', 'TAMANGUEYU', '2');
INSERT INTO `tb_location` VALUES ('545', 'ANTONIO CARBONI', '2');
INSERT INTO `tb_location` VALUES ('546', 'ELVIRA', '2');
INSERT INTO `tb_location` VALUES ('547', 'LAGUNA DE LOBOS', '2');
INSERT INTO `tb_location` VALUES ('548', 'LOBOS', '2');
INSERT INTO `tb_location` VALUES ('549', 'SALVADOR MARIA', '2');
INSERT INTO `tb_location` VALUES ('550', 'BANFIELD', '2');
INSERT INTO `tb_location` VALUES ('551', 'LLAVALLOL', '2');
INSERT INTO `tb_location` VALUES ('552', 'LOMAS DE ZAMORA', '2');
INSERT INTO `tb_location` VALUES ('553', 'TEMPERLEY', '2');
INSERT INTO `tb_location` VALUES ('554', 'TURDERA', '2');
INSERT INTO `tb_location` VALUES ('555', 'VILLA CENTENARIO', '2');
INSERT INTO `tb_location` VALUES ('556', 'VILLA FIORITO', '2');
INSERT INTO `tb_location` VALUES ('557', 'CARLOS KEEN', '2');
INSERT INTO `tb_location` VALUES ('558', 'CLUB DE CAMPO LOS PUENTES', '2');
INSERT INTO `tb_location` VALUES ('559', 'LUJAN', '2');
INSERT INTO `tb_location` VALUES ('560', 'BARRIO LAS CASUARINAS', '2');
INSERT INTO `tb_location` VALUES ('561', 'CORTINES', '2');
INSERT INTO `tb_location` VALUES ('562', 'LEZICA Y TORREZURI', '2');
INSERT INTO `tb_location` VALUES ('563', 'LUJAN', '2');
INSERT INTO `tb_location` VALUES ('564', 'VILLA FLANDRIA NORTE (PUEBLO NUEVO)', '2');
INSERT INTO `tb_location` VALUES ('565', 'VILLA FLANDRIA SUR (EST. JAUREGUI)', '2');
INSERT INTO `tb_location` VALUES ('566', 'COUNTRY CLUB LAS PRADERAS', '2');
INSERT INTO `tb_location` VALUES ('567', 'OPEN DOOR', '2');
INSERT INTO `tb_location` VALUES ('568', 'OLIVERA', '2');
INSERT INTO `tb_location` VALUES ('569', 'TORRES', '2');
INSERT INTO `tb_location` VALUES ('570', 'ATALAYA', '2');
INSERT INTO `tb_location` VALUES ('571', 'GENERAL MANSILLA', '2');
INSERT INTO `tb_location` VALUES ('572', 'LOS NARANJOS', '2');
INSERT INTO `tb_location` VALUES ('573', 'MAGDALENA', '2');
INSERT INTO `tb_location` VALUES ('574', 'ROBERTO J. PAYRO', '2');
INSERT INTO `tb_location` VALUES ('575', 'VIEYTES', '2');
INSERT INTO `tb_location` VALUES ('576', 'LAS ARMAS', '2');
INSERT INTO `tb_location` VALUES ('577', 'MAIPU', '2');
INSERT INTO `tb_location` VALUES ('578', 'SANTO DOMINGO', '2');
INSERT INTO `tb_location` VALUES ('579', 'AREA DE PROMOCION EL TRIANGULO', '2');
INSERT INTO `tb_location` VALUES ('580', 'GRAND BOURG', '2');
INSERT INTO `tb_location` VALUES ('581', 'INGENIERO ADOLFO SOURDEAUX', '2');
INSERT INTO `tb_location` VALUES ('582', 'INGENIERO PABLO NOGUES', '2');
INSERT INTO `tb_location` VALUES ('583', 'LOS POLVORINES', '2');
INSERT INTO `tb_location` VALUES ('584', 'TORTUGUITAS', '2');
INSERT INTO `tb_location` VALUES ('585', 'VILLA DE MAYO', '2');
INSERT INTO `tb_location` VALUES ('586', 'CORONEL VIDAL', '2');
INSERT INTO `tb_location` VALUES ('587', 'GENERAL PIRAN', '2');
INSERT INTO `tb_location` VALUES ('588', 'LA ARMONIA', '2');
INSERT INTO `tb_location` VALUES ('589', 'MAR CHIQUITA', '2');
INSERT INTO `tb_location` VALUES ('590', 'LA BALIZA', '2');
INSERT INTO `tb_location` VALUES ('591', 'LA CALETA', '2');
INSERT INTO `tb_location` VALUES ('592', 'MAR DE COBO', '2');
INSERT INTO `tb_location` VALUES ('593', 'ATLANTIDA', '2');
INSERT INTO `tb_location` VALUES ('594', 'CAMET NORTE', '2');
INSERT INTO `tb_location` VALUES ('595', 'FRENTE MAR', '2');
INSERT INTO `tb_location` VALUES ('596', 'PLAYA DORADA', '2');
INSERT INTO `tb_location` VALUES ('597', 'SANTA CLARA DEL MAR', '2');
INSERT INTO `tb_location` VALUES ('598', 'SANTA ELENA', '2');
INSERT INTO `tb_location` VALUES ('599', 'VIVORATA', '2');
INSERT INTO `tb_location` VALUES ('600', 'BARRIO SANTA ROSA', '2');
INSERT INTO `tb_location` VALUES ('601', 'BARRIOS LISANDRO DE LA TORRE Y SANTA MARTA', '2');
INSERT INTO `tb_location` VALUES ('602', 'MARCOS PAZ', '2');
INSERT INTO `tb_location` VALUES ('603', 'GOLDNEY', '2');
INSERT INTO `tb_location` VALUES ('604', 'GOWLAND', '2');
INSERT INTO `tb_location` VALUES ('605', 'MERCEDES', '2');
INSERT INTO `tb_location` VALUES ('606', 'TOMAS JOFRE', '2');
INSERT INTO `tb_location` VALUES ('607', 'LIBERTAD', '2');
INSERT INTO `tb_location` VALUES ('608', 'MARIANO ACOSTA', '2');
INSERT INTO `tb_location` VALUES ('609', 'MERLO', '2');
INSERT INTO `tb_location` VALUES ('610', 'PONTEVEDRA', '2');
INSERT INTO `tb_location` VALUES ('611', 'SAN ANTONIO DE PADUA', '2');
INSERT INTO `tb_location` VALUES ('612', 'ABBOTT', '2');
INSERT INTO `tb_location` VALUES ('613', 'SAN MIGUEL DEL MONTE', '2');
INSERT INTO `tb_location` VALUES ('614', 'ZENON VIDELA DORNA', '2');
INSERT INTO `tb_location` VALUES ('615', 'BALNEARIO SAUCE GRANDE', '2');
INSERT INTO `tb_location` VALUES ('616', 'MONTE HERMOSO', '2');
INSERT INTO `tb_location` VALUES ('617', 'CUARTEL V', '2');
INSERT INTO `tb_location` VALUES ('618', 'FRANCISCO ALVAREZ', '2');
INSERT INTO `tb_location` VALUES ('619', 'LA REJA', '2');
INSERT INTO `tb_location` VALUES ('620', 'MORENO', '2');
INSERT INTO `tb_location` VALUES ('621', 'PASO DEL REY', '2');
INSERT INTO `tb_location` VALUES ('622', 'TRUJUI', '2');
INSERT INTO `tb_location` VALUES ('623', 'CASTELAR', '2');
INSERT INTO `tb_location` VALUES ('624', 'EL PALOMAR', '2');
INSERT INTO `tb_location` VALUES ('625', 'HAEDO', '2');
INSERT INTO `tb_location` VALUES ('626', 'MORON', '2');
INSERT INTO `tb_location` VALUES ('627', 'VILLA SARMIENTO', '2');
INSERT INTO `tb_location` VALUES ('628', 'JOSE JUAN ALMEYRA', '2');
INSERT INTO `tb_location` VALUES ('629', 'LAS MARIANAS', '2');
INSERT INTO `tb_location` VALUES ('630', 'NAVARRO', '2');
INSERT INTO `tb_location` VALUES ('631', 'VILLA MOLL', '2');
INSERT INTO `tb_location` VALUES ('632', 'CLARAZ', '2');
INSERT INTO `tb_location` VALUES ('633', 'ENERGIA', '2');
INSERT INTO `tb_location` VALUES ('634', 'JUAN N. FERNANDEZ', '2');
INSERT INTO `tb_location` VALUES ('635', 'NECOCHEA', '2');
INSERT INTO `tb_location` VALUES ('636', 'QUEQUEN', '2');
INSERT INTO `tb_location` VALUES ('637', 'COSTA BONITA', '2');
INSERT INTO `tb_location` VALUES ('638', 'NICANOR OLIVERA', '2');
INSERT INTO `tb_location` VALUES ('639', 'RAMON SANTAMARINA', '2');
INSERT INTO `tb_location` VALUES ('640', 'ALFREDO DEMARCHI', '2');
INSERT INTO `tb_location` VALUES ('641', 'CARLOS MARIA NAON', '2');
INSERT INTO `tb_location` VALUES ('642', '12 DE OCTUBRE', '2');
INSERT INTO `tb_location` VALUES ('643', 'DUDIGNAC', '2');
INSERT INTO `tb_location` VALUES ('644', 'LA AURORA', '2');
INSERT INTO `tb_location` VALUES ('645', 'MANUEL B. GONNET', '2');
INSERT INTO `tb_location` VALUES ('646', 'MARCELINO UGARTE', '2');
INSERT INTO `tb_location` VALUES ('647', 'MOREA', '2');
INSERT INTO `tb_location` VALUES ('648', 'NORUMBEGA', '2');
INSERT INTO `tb_location` VALUES ('649', '9 DE JULIO', '2');
INSERT INTO `tb_location` VALUES ('650', 'PATRICIOS', '2');
INSERT INTO `tb_location` VALUES ('651', 'VILLA GENERAL FOURNIER', '2');
INSERT INTO `tb_location` VALUES ('652', 'BLANCAGRANDE', '2');
INSERT INTO `tb_location` VALUES ('653', 'COLONIA NIEVAS', '2');
INSERT INTO `tb_location` VALUES ('654', 'COLONIA SAN MIGUEL', '2');
INSERT INTO `tb_location` VALUES ('655', 'ESPIGAS', '2');
INSERT INTO `tb_location` VALUES ('656', 'HINOJO', '2');
INSERT INTO `tb_location` VALUES ('657', 'COLONIA HINOJO', '2');
INSERT INTO `tb_location` VALUES ('658', 'HINOJO', '2');
INSERT INTO `tb_location` VALUES ('659', 'OLAVARRIA', '2');
INSERT INTO `tb_location` VALUES ('660', 'RECALDE', '2');
INSERT INTO `tb_location` VALUES ('661', 'SANTA LUISA', '2');
INSERT INTO `tb_location` VALUES ('662', 'SIERRA CHICA', '2');
INSERT INTO `tb_location` VALUES ('663', 'SIERRAS BAYAS', '2');
INSERT INTO `tb_location` VALUES ('664', 'VILLA ARRIETA', '2');
INSERT INTO `tb_location` VALUES ('665', 'VILLA ALFREDO FORTABAT', '2');
INSERT INTO `tb_location` VALUES ('666', 'VILLA LA SERRANIA', '2');
INSERT INTO `tb_location` VALUES ('667', 'BAHIA SAN BLAS', '2');
INSERT INTO `tb_location` VALUES ('668', 'CARDENAL CAGLIERO', '2');
INSERT INTO `tb_location` VALUES ('669', 'CARMEN DE PATAGONES', '2');
INSERT INTO `tb_location` VALUES ('670', 'JOSE B. CASAS', '2');
INSERT INTO `tb_location` VALUES ('671', 'JUAN A. PRADERE', '2');
INSERT INTO `tb_location` VALUES ('672', 'STROEDER', '2');
INSERT INTO `tb_location` VALUES ('673', 'VILLALONGA', '2');
INSERT INTO `tb_location` VALUES ('674', 'CAPITAN CASTRO', '2');
INSERT INTO `tb_location` VALUES ('675', 'CHICLANA', '2');
INSERT INTO `tb_location` VALUES ('676', 'FRANCISCO MADERO', '2');
INSERT INTO `tb_location` VALUES ('677', 'INOCENCIO SOSA', '2');
INSERT INTO `tb_location` VALUES ('678', 'JUAN JOSE PASO', '2');
INSERT INTO `tb_location` VALUES ('679', 'MAGDALA', '2');
INSERT INTO `tb_location` VALUES ('680', 'MONES CAZON', '2');
INSERT INTO `tb_location` VALUES ('681', 'NUEVA PLATA', '2');
INSERT INTO `tb_location` VALUES ('682', 'PEHUAJO', '2');
INSERT INTO `tb_location` VALUES ('683', 'SAN BERNARDO', '2');
INSERT INTO `tb_location` VALUES ('684', 'BOCAYUVA', '2');
INSERT INTO `tb_location` VALUES ('685', 'DE BARY', '2');
INSERT INTO `tb_location` VALUES ('686', 'PELLEGRINI', '2');
INSERT INTO `tb_location` VALUES ('687', 'ACEVEDO', '2');
INSERT INTO `tb_location` VALUES ('688', 'FONTEZUELA', '2');
INSERT INTO `tb_location` VALUES ('689', 'GUERRICO', '2');
INSERT INTO `tb_location` VALUES ('690', 'JUAN A. DE LA PE¥A', '2');
INSERT INTO `tb_location` VALUES ('691', 'JUAN ANCHORENA', '2');
INSERT INTO `tb_location` VALUES ('692', 'LA VIOLETA', '2');
INSERT INTO `tb_location` VALUES ('693', 'MANUEL OCAMPO', '2');
INSERT INTO `tb_location` VALUES ('694', 'MARIANO BENITEZ', '2');
INSERT INTO `tb_location` VALUES ('695', 'MARIANO H. ALFONZO', '2');
INSERT INTO `tb_location` VALUES ('696', 'PERGAMINO', '2');
INSERT INTO `tb_location` VALUES ('697', 'PINZON', '2');
INSERT INTO `tb_location` VALUES ('698', 'RANCAGUA', '2');
INSERT INTO `tb_location` VALUES ('699', 'VILLA ANGELICA', '2');
INSERT INTO `tb_location` VALUES ('700', 'VILLA SAN JOSE', '2');
INSERT INTO `tb_location` VALUES ('701', 'CASALINS', '2');
INSERT INTO `tb_location` VALUES ('702', 'PILA', '2');
INSERT INTO `tb_location` VALUES ('703', 'DEL VISO', '2');
INSERT INTO `tb_location` VALUES ('704', 'FATIMA', '2');
INSERT INTO `tb_location` VALUES ('705', 'LA LONJA', '2');
INSERT INTO `tb_location` VALUES ('706', 'LOS CACHORROS', '2');
INSERT INTO `tb_location` VALUES ('707', 'MANZANARES', '2');
INSERT INTO `tb_location` VALUES ('708', 'MANZONE', '2');
INSERT INTO `tb_location` VALUES ('709', 'MAQUINISTA F. SAVIO (OESTE)', '2');
INSERT INTO `tb_location` VALUES ('710', 'PILAR', '2');
INSERT INTO `tb_location` VALUES ('711', 'PRESIDENTE DERQUI', '2');
INSERT INTO `tb_location` VALUES ('712', 'ROBERTO DE VICENZO', '2');
INSERT INTO `tb_location` VALUES ('713', 'SANTA TERESA', '2');
INSERT INTO `tb_location` VALUES ('714', 'TORTUGUITAS', '2');
INSERT INTO `tb_location` VALUES ('715', 'VILLA ASTOLFI', '2');
INSERT INTO `tb_location` VALUES ('716', 'VILLA ROSA', '2');
INSERT INTO `tb_location` VALUES ('717', 'ZELAYA', '2');
INSERT INTO `tb_location` VALUES ('718', 'CARILO', '2');
INSERT INTO `tb_location` VALUES ('719', 'OSTENDE', '2');
INSERT INTO `tb_location` VALUES ('720', 'PINAMAR', '2');
INSERT INTO `tb_location` VALUES ('721', 'VALERIA DEL MAR', '2');
INSERT INTO `tb_location` VALUES ('722', 'BARRIO AMERICA UNIDA', '2');
INSERT INTO `tb_location` VALUES ('723', 'GUERNICA', '2');
INSERT INTO `tb_location` VALUES ('724', 'AZOPARDO', '2');
INSERT INTO `tb_location` VALUES ('725', 'BORDENAVE', '2');
INSERT INTO `tb_location` VALUES ('726', 'DARREGUEIRA', '2');
INSERT INTO `tb_location` VALUES ('727', '17 DE AGOSTO', '2');
INSERT INTO `tb_location` VALUES ('728', 'ESTELA', '2');
INSERT INTO `tb_location` VALUES ('729', 'FELIPE SOLA', '2');
INSERT INTO `tb_location` VALUES ('730', 'LOPEZ LECUBE', '2');
INSERT INTO `tb_location` VALUES ('731', 'PUAN', '2');
INSERT INTO `tb_location` VALUES ('732', 'SAN GERMAN', '2');
INSERT INTO `tb_location` VALUES ('733', 'VILLA CASTELAR', '2');
INSERT INTO `tb_location` VALUES ('734', 'VILLA IRIS', '2');
INSERT INTO `tb_location` VALUES ('735', 'ALVAREZ JONTE', '2');
INSERT INTO `tb_location` VALUES ('736', 'PIPINAS', '2');
INSERT INTO `tb_location` VALUES ('737', 'PUNTA INDIO', '2');
INSERT INTO `tb_location` VALUES ('738', 'VERONICA', '2');
INSERT INTO `tb_location` VALUES ('739', 'BERNAL', '2');
INSERT INTO `tb_location` VALUES ('740', 'BERNAL OESTE', '2');
INSERT INTO `tb_location` VALUES ('741', 'DON BOSCO', '2');
INSERT INTO `tb_location` VALUES ('742', 'EZPELETA', '2');
INSERT INTO `tb_location` VALUES ('743', 'EZPELETA OESTE', '2');
INSERT INTO `tb_location` VALUES ('744', 'QUILMES', '2');
INSERT INTO `tb_location` VALUES ('745', 'QUILMES OESTE', '2');
INSERT INTO `tb_location` VALUES ('746', 'SAN FRANCISCO SOLANO', '2');
INSERT INTO `tb_location` VALUES ('747', 'VILLA LA FLORIDA', '2');
INSERT INTO `tb_location` VALUES ('748', 'EL PARAISO', '2');
INSERT INTO `tb_location` VALUES ('749', 'LAS BAHAMAS', '2');
INSERT INTO `tb_location` VALUES ('750', 'PEREZ MILLAN', '2');
INSERT INTO `tb_location` VALUES ('751', 'RAMALLO', '2');
INSERT INTO `tb_location` VALUES ('752', 'VILLA GENERAL SAVIO', '2');
INSERT INTO `tb_location` VALUES ('753', 'VILLA RAMALLO', '2');
INSERT INTO `tb_location` VALUES ('754', 'RAUCH', '2');
INSERT INTO `tb_location` VALUES ('755', 'AMERICA', '2');
INSERT INTO `tb_location` VALUES ('756', 'FORTIN OLAVARRIA', '2');
INSERT INTO `tb_location` VALUES ('757', 'GONZALEZ MORENO', '2');
INSERT INTO `tb_location` VALUES ('758', 'MIRA PAMPA', '2');
INSERT INTO `tb_location` VALUES ('759', 'ROOSEVELT', '2');
INSERT INTO `tb_location` VALUES ('760', 'SAN MAURICIO', '2');
INSERT INTO `tb_location` VALUES ('761', 'SANSINENA', '2');
INSERT INTO `tb_location` VALUES ('762', 'SUNDBLAD', '2');
INSERT INTO `tb_location` VALUES ('763', 'LA BEBA', '2');
INSERT INTO `tb_location` VALUES ('764', 'LAS CARABELAS', '2');
INSERT INTO `tb_location` VALUES ('765', 'LOS INDIOS', '2');
INSERT INTO `tb_location` VALUES ('766', 'RAFAEL OBLIGADO', '2');
INSERT INTO `tb_location` VALUES ('767', 'ROBERTO CANO', '2');
INSERT INTO `tb_location` VALUES ('768', 'ROJAS', '2');
INSERT INTO `tb_location` VALUES ('769', 'BARRIO LAS MARGARITAS', '2');
INSERT INTO `tb_location` VALUES ('770', 'ROJAS', '2');
INSERT INTO `tb_location` VALUES ('771', 'VILLA PARQUE CECIR', '2');
INSERT INTO `tb_location` VALUES ('772', 'ESTACION SOL DE MAYO', '2');
INSERT INTO `tb_location` VALUES ('773', 'VILLA MANUEL POMAR', '2');
INSERT INTO `tb_location` VALUES ('774', 'CARLOS BEGUERIE', '2');
INSERT INTO `tb_location` VALUES ('775', 'ROQUE PEREZ', '2');
INSERT INTO `tb_location` VALUES ('776', 'ARROYO CORTO', '2');
INSERT INTO `tb_location` VALUES ('777', 'COLONIA SAN MARTIN', '2');
INSERT INTO `tb_location` VALUES ('778', 'DUFAUR', '2');
INSERT INTO `tb_location` VALUES ('779', 'ESPARTILLAR (E)', '2');
INSERT INTO `tb_location` VALUES ('780', 'GOYENA', '2');
INSERT INTO `tb_location` VALUES ('781', 'LAS ENCADENADAS', '2');
INSERT INTO `tb_location` VALUES ('782', 'PIGUE', '2');
INSERT INTO `tb_location` VALUES ('783', 'SAAVEDRA', '2');
INSERT INTO `tb_location` VALUES ('784', 'ALVAREZ DE TOLEDO', '2');
INSERT INTO `tb_location` VALUES ('785', 'CAZON', '2');
INSERT INTO `tb_location` VALUES ('786', 'DEL CARRIL', '2');
INSERT INTO `tb_location` VALUES ('787', 'POLVAREDAS', '2');
INSERT INTO `tb_location` VALUES ('788', 'SALADILLO', '2');
INSERT INTO `tb_location` VALUES ('789', 'ARROYO DULCE', '2');
INSERT INTO `tb_location` VALUES ('790', 'BERDIER', '2');
INSERT INTO `tb_location` VALUES ('791', 'GAHAN', '2');
INSERT INTO `tb_location` VALUES ('792', 'INES INDART', '2');
INSERT INTO `tb_location` VALUES ('793', 'LA INVENCIBLE', '2');
INSERT INTO `tb_location` VALUES ('794', 'SALTO', '2');
INSERT INTO `tb_location` VALUES ('795', 'QUENUMA', '2');
INSERT INTO `tb_location` VALUES ('796', 'SALLIQUELO', '2');
INSERT INTO `tb_location` VALUES ('797', 'AZCUENAGA', '2');
INSERT INTO `tb_location` VALUES ('798', 'CULULLU', '2');
INSERT INTO `tb_location` VALUES ('799', 'FRANKLIN', '2');
INSERT INTO `tb_location` VALUES ('800', 'SAN ANDRES DE GILES', '2');
INSERT INTO `tb_location` VALUES ('801', 'SOLIS', '2');
INSERT INTO `tb_location` VALUES ('802', 'VILLA ESPIL', '2');
INSERT INTO `tb_location` VALUES ('803', 'VILLA RUIZ', '2');
INSERT INTO `tb_location` VALUES ('804', 'DUGGAN', '2');
INSERT INTO `tb_location` VALUES ('805', 'SAN ANTONIO DE ARECO', '2');
INSERT INTO `tb_location` VALUES ('806', 'VILLA LIA', '2');
INSERT INTO `tb_location` VALUES ('807', 'BALNEARIO SAN CAYETANO', '2');
INSERT INTO `tb_location` VALUES ('808', 'OCHANDIO', '2');
INSERT INTO `tb_location` VALUES ('809', 'SAN CAYETANO', '2');
INSERT INTO `tb_location` VALUES ('810', 'SAN FERNANDO', '2');
INSERT INTO `tb_location` VALUES ('811', 'VICTORIA', '2');
INSERT INTO `tb_location` VALUES ('812', 'VIRREYES', '2');
INSERT INTO `tb_location` VALUES ('813', 'ACASSUSO', '2');
INSERT INTO `tb_location` VALUES ('814', 'BECCAR', '2');
INSERT INTO `tb_location` VALUES ('815', 'BOULOGNE SUR MER', '2');
INSERT INTO `tb_location` VALUES ('816', 'MARTINEZ', '2');
INSERT INTO `tb_location` VALUES ('817', 'SAN ISIDRO', '2');
INSERT INTO `tb_location` VALUES ('818', 'VILLA ADELINA', '2');
INSERT INTO `tb_location` VALUES ('819', 'BELLA VISTA', '2');
INSERT INTO `tb_location` VALUES ('820', 'CAMPO DE MAYO', '2');
INSERT INTO `tb_location` VALUES ('821', 'MUÑIZ', '2');
INSERT INTO `tb_location` VALUES ('822', 'SAN MIGUEL', '2');
INSERT INTO `tb_location` VALUES ('823', 'CONESA', '2');
INSERT INTO `tb_location` VALUES ('824', 'EREZCANO', '2');
INSERT INTO `tb_location` VALUES ('825', 'GENERAL ROJO', '2');
INSERT INTO `tb_location` VALUES ('826', 'LA EMILIA', '2');
INSERT INTO `tb_location` VALUES ('827', 'VILLA CAMPI', '2');
INSERT INTO `tb_location` VALUES ('828', 'VILLA CANTO', '2');
INSERT INTO `tb_location` VALUES ('829', 'VILLA RICCIO', '2');
INSERT INTO `tb_location` VALUES ('830', 'CAMPOS SALLES', '2');
INSERT INTO `tb_location` VALUES ('831', 'SAN NICOLAS DE LOS ARROYOS', '2');
INSERT INTO `tb_location` VALUES ('832', 'VILLA ESPERANZA', '2');
INSERT INTO `tb_location` VALUES ('833', 'GOBERNADOR CASTRO', '2');
INSERT INTO `tb_location` VALUES ('834', 'INGENIERO MONETA', '2');
INSERT INTO `tb_location` VALUES ('835', 'OBLIGADO', '2');
INSERT INTO `tb_location` VALUES ('836', 'PUEBLO DOYLE', '2');
INSERT INTO `tb_location` VALUES ('837', 'RIO TALA', '2');
INSERT INTO `tb_location` VALUES ('838', 'SAN PEDRO', '2');
INSERT INTO `tb_location` VALUES ('839', 'SANTA LUCIA', '2');
INSERT INTO `tb_location` VALUES ('840', 'ALEJANDRO KORN', '2');
INSERT INTO `tb_location` VALUES ('841', 'SAN VICENTE', '2');
INSERT INTO `tb_location` VALUES ('842', 'DOMSELAAR', '2');
INSERT INTO `tb_location` VALUES ('843', 'GENERAL RIVAS', '2');
INSERT INTO `tb_location` VALUES ('844', 'SUIPACHA', '2');
INSERT INTO `tb_location` VALUES ('845', 'DE LA CANAL', '2');
INSERT INTO `tb_location` VALUES ('846', 'GARDEY', '2');
INSERT INTO `tb_location` VALUES ('847', 'MARIA IGNACIA', '2');
INSERT INTO `tb_location` VALUES ('848', 'TANDIL', '2');
INSERT INTO `tb_location` VALUES ('849', 'CROTTO', '2');
INSERT INTO `tb_location` VALUES ('850', 'TAPALQUE', '2');
INSERT INTO `tb_location` VALUES ('851', 'VELLOSO', '2');
INSERT INTO `tb_location` VALUES ('852', 'BENAVIDEZ', '2');
INSERT INTO `tb_location` VALUES ('853', 'DIQUE LUJAN', '2');
INSERT INTO `tb_location` VALUES ('854', 'DON TORCUATO ESTE', '2');
INSERT INTO `tb_location` VALUES ('855', 'DON TORCUATO OESTE', '2');
INSERT INTO `tb_location` VALUES ('856', 'EL TALAR', '2');
INSERT INTO `tb_location` VALUES ('857', 'GENERAL PACHECO', '2');
INSERT INTO `tb_location` VALUES ('858', 'LOS TRONCOS DEL TALAR', '2');
INSERT INTO `tb_location` VALUES ('859', 'RICARDO ROJAS', '2');
INSERT INTO `tb_location` VALUES ('860', 'RINCON DE MILBERG', '2');
INSERT INTO `tb_location` VALUES ('861', 'TIGRE', '2');
INSERT INTO `tb_location` VALUES ('862', 'GENERAL CONESA', '2');
INSERT INTO `tb_location` VALUES ('863', 'CHASICO', '2');
INSERT INTO `tb_location` VALUES ('864', 'SALDUNGARAY', '2');
INSERT INTO `tb_location` VALUES ('865', 'SIERRA DE LA VENTANA', '2');
INSERT INTO `tb_location` VALUES ('866', 'TORNQUIST', '2');
INSERT INTO `tb_location` VALUES ('867', 'TRES PICOS', '2');
INSERT INTO `tb_location` VALUES ('868', 'VILLA SERRANA LA GRUTA', '2');
INSERT INTO `tb_location` VALUES ('869', 'VILLA VENTANA', '2');
INSERT INTO `tb_location` VALUES ('870', 'BERUTTI', '2');
INSERT INTO `tb_location` VALUES ('871', 'GIRODIAS', '2');
INSERT INTO `tb_location` VALUES ('872', 'LA CARRETA', '2');
INSERT INTO `tb_location` VALUES ('873', '30 DE AGOSTO', '2');
INSERT INTO `tb_location` VALUES ('874', 'TRENQUE LAUQUEN', '2');
INSERT INTO `tb_location` VALUES ('875', 'TRONGE', '2');
INSERT INTO `tb_location` VALUES ('876', 'BALNEARIO ORENSE', '2');
INSERT INTO `tb_location` VALUES ('877', 'CLAROMECO', '2');
INSERT INTO `tb_location` VALUES ('878', 'DUNAMAR', '2');
INSERT INTO `tb_location` VALUES ('879', 'COPETONAS', '2');
INSERT INTO `tb_location` VALUES ('880', 'LIN CALEL', '2');
INSERT INTO `tb_location` VALUES ('881', 'MICAELA CASCALLARES', '2');
INSERT INTO `tb_location` VALUES ('882', 'ORENSE', '2');
INSERT INTO `tb_location` VALUES ('883', 'RETA', '2');
INSERT INTO `tb_location` VALUES ('884', 'SAN FRANCISCO DE BELLOCQ', '2');
INSERT INTO `tb_location` VALUES ('885', 'SAN MAYOL', '2');
INSERT INTO `tb_location` VALUES ('886', 'TRES ARROYOS', '2');
INSERT INTO `tb_location` VALUES ('887', 'VILLA RODRIGUEZ', '2');
INSERT INTO `tb_location` VALUES ('888', 'CASEROS', '2');
INSERT INTO `tb_location` VALUES ('889', 'CHURRUCA', '2');
INSERT INTO `tb_location` VALUES ('890', 'CIUDAD JARDIN LOMAS DEL PALOMAR', '2');
INSERT INTO `tb_location` VALUES ('891', 'CIUDADELA', '2');
INSERT INTO `tb_location` VALUES ('892', 'EL LIBERTADOR', '2');
INSERT INTO `tb_location` VALUES ('893', 'JOSE INGENIEROS', '2');
INSERT INTO `tb_location` VALUES ('894', 'LOMA HERMOSA', '2');
INSERT INTO `tb_location` VALUES ('895', 'MARTIN CORONADO', '2');
INSERT INTO `tb_location` VALUES ('896', '11 DE SEPTIEMBRE', '2');
INSERT INTO `tb_location` VALUES ('897', 'PABLO PODESTA', '2');
INSERT INTO `tb_location` VALUES ('898', 'REMEDIOS DE ESCALADA', '2');
INSERT INTO `tb_location` VALUES ('899', 'SAENZ PEÑA', '2');
INSERT INTO `tb_location` VALUES ('900', 'SANTOS LUGARES', '2');
INSERT INTO `tb_location` VALUES ('901', 'VILLA BOSCH (EST. JUAN MARIA BOSCH)', '2');
INSERT INTO `tb_location` VALUES ('902', 'VILLA RAFFO', '2');
INSERT INTO `tb_location` VALUES ('903', 'INGENIERO THOMPSON', '2');
INSERT INTO `tb_location` VALUES ('904', 'TRES LOMAS', '2');
INSERT INTO `tb_location` VALUES ('905', 'AGUSTIN MOSCONI', '2');
INSERT INTO `tb_location` VALUES ('906', 'DEL VALLE', '2');
INSERT INTO `tb_location` VALUES ('907', 'ERNESTINA', '2');
INSERT INTO `tb_location` VALUES ('908', 'GOBERNADOR UGARTE', '2');
INSERT INTO `tb_location` VALUES ('909', 'LUCAS MONTEVERDE', '2');
INSERT INTO `tb_location` VALUES ('910', 'NORBERTO DE LA RIESTRA', '2');
INSERT INTO `tb_location` VALUES ('911', 'PEDERNALES', '2');
INSERT INTO `tb_location` VALUES ('912', 'SAN ENRIQUE', '2');
INSERT INTO `tb_location` VALUES ('913', 'VALDES', '2');
INSERT INTO `tb_location` VALUES ('914', '25 DE MAYO', '2');
INSERT INTO `tb_location` VALUES ('915', 'CARAPACHAY', '2');
INSERT INTO `tb_location` VALUES ('916', 'FLORIDA', '2');
INSERT INTO `tb_location` VALUES ('917', 'FLORIDA OESTE', '2');
INSERT INTO `tb_location` VALUES ('918', 'LA LUCILA', '2');
INSERT INTO `tb_location` VALUES ('919', 'MUNRO', '2');
INSERT INTO `tb_location` VALUES ('920', 'OLIVOS', '2');
INSERT INTO `tb_location` VALUES ('921', 'VICENTE LOPEZ', '2');
INSERT INTO `tb_location` VALUES ('922', 'VILLA ADELINA', '2');
INSERT INTO `tb_location` VALUES ('923', 'VILLA MARTELLI', '2');
INSERT INTO `tb_location` VALUES ('924', 'MAR AZUL', '2');
INSERT INTO `tb_location` VALUES ('925', 'MAR DE LAS PAMPAS', '2');
INSERT INTO `tb_location` VALUES ('926', 'VILLA GESELL', '2');
INSERT INTO `tb_location` VALUES ('927', 'ARGERICH', '2');
INSERT INTO `tb_location` VALUES ('928', 'COLONIA SAN ADOLFO', '2');
INSERT INTO `tb_location` VALUES ('929', 'COUNTRY LOS MEDANOS', '2');
INSERT INTO `tb_location` VALUES ('930', 'HILARIO ASCASUBI', '2');
INSERT INTO `tb_location` VALUES ('931', 'JUAN COUSTE', '2');
INSERT INTO `tb_location` VALUES ('932', 'MAYOR BURATOVICH', '2');
INSERT INTO `tb_location` VALUES ('933', 'MEDANOS', '2');
INSERT INTO `tb_location` VALUES ('934', 'PEDRO LURO', '2');
INSERT INTO `tb_location` VALUES ('935', 'TENIENTE ORIGONE', '2');
INSERT INTO `tb_location` VALUES ('936', 'COUNTRY CLUB EL CASCO', '2');
INSERT INTO `tb_location` VALUES ('937', 'ESCALADA', '2');
INSERT INTO `tb_location` VALUES ('938', 'LIMA', '2');
INSERT INTO `tb_location` VALUES ('939', 'ZARATE', '2');
INSERT INTO `tb_location` VALUES ('940', 'BARRIO SAAVEDRA', '2');
INSERT INTO `tb_location` VALUES ('941', 'ZARATE', '2');
INSERT INTO `tb_location` VALUES ('942', 'BARRIO RUTA 24 KILOMETRO 10', '2');

-- ----------------------------
-- Table structure for tb_modules
-- ----------------------------
DROP TABLE IF EXISTS `tb_modules`;
CREATE TABLE `tb_modules` (
  `idModule` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idModule`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_modules
-- ----------------------------
INSERT INTO `tb_modules` VALUES ('1', 'monitor');
INSERT INTO `tb_modules` VALUES ('2', 'llaveros');
INSERT INTO `tb_modules` VALUES ('3', 'edificios');
INSERT INTO `tb_modules` VALUES ('4', 'configuracion');
INSERT INTO `tb_modules` VALUES ('5', 'perfil de usuario');
INSERT INTO `tb_modules` VALUES ('6', 'cliente');
INSERT INTO `tb_modules` VALUES ('7', 'servicio');
INSERT INTO `tb_modules` VALUES ('8', 'producto');

-- ----------------------------
-- Table structure for tb_opcion_low
-- ----------------------------
DROP TABLE IF EXISTS `tb_opcion_low`;
CREATE TABLE `tb_opcion_low` (
  `idOpcionLowTicket` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `opcionLowTicket` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idOpcionLowTicket`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- ----------------------------
-- Records of tb_opcion_low
-- ----------------------------
INSERT INTO `tb_opcion_low` VALUES ('1', 'LLaveros a dar de baja');
INSERT INTO `tb_opcion_low` VALUES ('2', 'LLaveros en mi poder');

-- ----------------------------
-- Table structure for tb_pick_receive
-- ----------------------------
DROP TABLE IF EXISTS `tb_pick_receive`;
CREATE TABLE `tb_pick_receive` (
  `idWhoPickUp` int(11) DEFAULT NULL,
  `nameWhoPickUp` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- ----------------------------
-- Records of tb_pick_receive
-- ----------------------------
INSERT INTO `tb_pick_receive` VALUES ('1', 'Titular');
INSERT INTO `tb_pick_receive` VALUES ('2', 'Encargado');
INSERT INTO `tb_pick_receive` VALUES ('3', 'Tercera persona');

-- ----------------------------
-- Table structure for tb_products
-- ----------------------------
DROP TABLE IF EXISTS `tb_products`;
CREATE TABLE `tb_products` (
  `idProduct` int(11) NOT NULL AUTO_INCREMENT,
  `descriptionProduct` varchar(200) DEFAULT NULL,
  `codigoFabric` varchar(200) DEFAULT NULL,
  `brand` varchar(200) DEFAULT NULL,
  `model` varchar(200) DEFAULT NULL,
  `idProductClassificationFk` varchar(200) DEFAULT NULL,
  `isNumberSerieFabric` tinyint(1) DEFAULT 0,
  `isNumberSerieInternal` tinyint(1) DEFAULT 0,
  `isDateExpiration` tinyint(1) DEFAULT 0,
  `isControlSchedule` tinyint(1) DEFAULT 0,
  `priceFabric` decimal(18,2) DEFAULT 0.00,
  `idStatusFk` int(11) DEFAULT 1,
  PRIMARY KEY (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_products
-- ----------------------------
INSERT INTO `tb_products` VALUES ('1', '2Ejemplo3111', 'Ejemplo', 'Ejemplo', 'Ejemplo', '5', '1', '0', '1', '1', '120.38', '1');
INSERT INTO `tb_products` VALUES ('2', 'Ejemplo2', 'Ejemplo', 'Ejemplo', 'Ejemplo', '5', '1', '0', '0', '0', '120.38', '1');
INSERT INTO `tb_products` VALUES ('3', 'Ejemplo3', 'Ejemplo', 'Ejemplo', 'Ejemplo', '5', '1', '0', '1', '0', '120.38', '-1');
INSERT INTO `tb_products` VALUES ('4', '2Ejemplo3', 'Ejemplo', 'Ejemplo', 'Ejemplo', '5', '1', '0', '1', '1', '120.38', '1');
INSERT INTO `tb_products` VALUES ('5', '2Ejemdplo3', 'Ejemplo', 'Ejemplo', 'Ejemplo', '5', '1', '0', '1', '1', '120.38', '1');

-- ----------------------------
-- Table structure for tb_products_classification
-- ----------------------------
DROP TABLE IF EXISTS `tb_products_classification`;
CREATE TABLE `tb_products_classification` (
  `idProductClassification` int(11) NOT NULL AUTO_INCREMENT,
  `classification` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idProductClassification`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_products_classification
-- ----------------------------
INSERT INTO `tb_products_classification` VALUES ('1', 'CONTROL DE ACCESOS');
INSERT INTO `tb_products_classification` VALUES ('2', 'CERRADURA');
INSERT INTO `tb_products_classification` VALUES ('3', 'LECTOR');
INSERT INTO `tb_products_classification` VALUES ('4', 'FUENTE');
INSERT INTO `tb_products_classification` VALUES ('5', 'BATERIA');
INSERT INTO `tb_products_classification` VALUES ('6', 'PULSADOR DE EMERGENCIA');
INSERT INTO `tb_products_classification` VALUES ('7', 'TECLA DE APAGADO');
INSERT INTO `tb_products_classification` VALUES ('8', 'DVR');
INSERT INTO `tb_products_classification` VALUES ('9', 'NVR');
INSERT INTO `tb_products_classification` VALUES ('10', 'UPS');
INSERT INTO `tb_products_classification` VALUES ('11', 'CAMARA');
INSERT INTO `tb_products_classification` VALUES ('12', 'PANEL DE ALARMA');
INSERT INTO `tb_products_classification` VALUES ('13', 'TECLADO DE ALARMA');
INSERT INTO `tb_products_classification` VALUES ('14', 'SENSOR DE ALARMA');
INSERT INTO `tb_products_classification` VALUES ('15', 'MODULO IP DE ALARMA');
INSERT INTO `tb_products_classification` VALUES ('16', 'MODULO GPRS DE ALARMA');
INSERT INTO `tb_products_classification` VALUES ('17', 'ROUTER');
INSERT INTO `tb_products_classification` VALUES ('18', 'MODEM');

-- ----------------------------
-- Table structure for tb_products_divice_opening
-- ----------------------------
DROP TABLE IF EXISTS `tb_products_divice_opening`;
CREATE TABLE `tb_products_divice_opening` (
  `idProductsDiviceOpening` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idDiviceOpeningFk` int(11) DEFAULT NULL,
  `idProductFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProductsDiviceOpening`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_products_divice_opening
-- ----------------------------
INSERT INTO `tb_products_divice_opening` VALUES ('5', '2', '2');
INSERT INTO `tb_products_divice_opening` VALUES ('6', '3', '2');
INSERT INTO `tb_products_divice_opening` VALUES ('7', '4', '2');
INSERT INTO `tb_products_divice_opening` VALUES ('8', '5', '2');
INSERT INTO `tb_products_divice_opening` VALUES ('9', '2', '3');
INSERT INTO `tb_products_divice_opening` VALUES ('10', '3', '3');
INSERT INTO `tb_products_divice_opening` VALUES ('11', '4', '3');
INSERT INTO `tb_products_divice_opening` VALUES ('12', '5', '3');
INSERT INTO `tb_products_divice_opening` VALUES ('13', '2', '4');
INSERT INTO `tb_products_divice_opening` VALUES ('14', '3', '4');
INSERT INTO `tb_products_divice_opening` VALUES ('15', '4', '4');
INSERT INTO `tb_products_divice_opening` VALUES ('16', '5', '4');
INSERT INTO `tb_products_divice_opening` VALUES ('21', '2', '1');
INSERT INTO `tb_products_divice_opening` VALUES ('22', '3', '1');
INSERT INTO `tb_products_divice_opening` VALUES ('23', '4', '1');
INSERT INTO `tb_products_divice_opening` VALUES ('24', '5', '1');
INSERT INTO `tb_products_divice_opening` VALUES ('25', '2', '5');
INSERT INTO `tb_products_divice_opening` VALUES ('26', '3', '5');
INSERT INTO `tb_products_divice_opening` VALUES ('27', '4', '5');
INSERT INTO `tb_products_divice_opening` VALUES ('28', '5', '5');

-- ----------------------------
-- Table structure for tb_profile
-- ----------------------------
DROP TABLE IF EXISTS `tb_profile`;
CREATE TABLE `tb_profile` (
  `idProfile` int(11) unsigned NOT NULL,
  `nameProfile` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idProfile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_profile
-- ----------------------------
INSERT INTO `tb_profile` VALUES ('1', 'TASS');
INSERT INTO `tb_profile` VALUES ('2', 'Empresa');
INSERT INTO `tb_profile` VALUES ('3', 'Propietario');
INSERT INTO `tb_profile` VALUES ('4', 'Admin Consorsio');
INSERT INTO `tb_profile` VALUES ('5', 'Inquilino');
INSERT INTO `tb_profile` VALUES ('6', 'Encargado');

-- ----------------------------
-- Table structure for tb_profiles
-- ----------------------------
DROP TABLE IF EXISTS `tb_profiles`;
CREATE TABLE `tb_profiles` (
  `idProfiles` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `idStatus` int(11) DEFAULT 1,
  PRIMARY KEY (`idProfiles`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_profiles
-- ----------------------------
INSERT INTO `tb_profiles` VALUES ('8', 'Admin', '1');
INSERT INTO `tb_profiles` VALUES ('9', 'PERFIL UNo', '1');
INSERT INTO `tb_profiles` VALUES ('10', 'PERFIL dos', '1');

-- ----------------------------
-- Table structure for tb_profiles_modules
-- ----------------------------
DROP TABLE IF EXISTS `tb_profiles_modules`;
CREATE TABLE `tb_profiles_modules` (
  `idProfileModule` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idProfilesFk` int(11) DEFAULT NULL,
  `idModuleFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProfileModule`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_profiles_modules
-- ----------------------------
INSERT INTO `tb_profiles_modules` VALUES ('33', '9', '1');
INSERT INTO `tb_profiles_modules` VALUES ('34', '9', '2');
INSERT INTO `tb_profiles_modules` VALUES ('35', '10', '1');
INSERT INTO `tb_profiles_modules` VALUES ('36', '10', '2');
INSERT INTO `tb_profiles_modules` VALUES ('37', '8', '1');
INSERT INTO `tb_profiles_modules` VALUES ('38', '8', '2');
INSERT INTO `tb_profiles_modules` VALUES ('39', '8', '3');
INSERT INTO `tb_profiles_modules` VALUES ('40', '8', '4');
INSERT INTO `tb_profiles_modules` VALUES ('41', '8', '5');
INSERT INTO `tb_profiles_modules` VALUES ('42', '8', '6');
INSERT INTO `tb_profiles_modules` VALUES ('43', '8', '7');
INSERT INTO `tb_profiles_modules` VALUES ('44', '8', '8');

-- ----------------------------
-- Table structure for tb_province
-- ----------------------------
DROP TABLE IF EXISTS `tb_province`;
CREATE TABLE `tb_province` (
  `idProvince` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `province` varchar(200) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProvince`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_province
-- ----------------------------
INSERT INTO `tb_province` VALUES ('1', 'Ciudad Autonoma de Buenos Aires', null);
INSERT INTO `tb_province` VALUES ('2', 'Buenos Aires', null);
INSERT INTO `tb_province` VALUES ('3', 'Misiones', null);
INSERT INTO `tb_province` VALUES ('4', 'San Luis', null);
INSERT INTO `tb_province` VALUES ('5', 'San Juan', null);
INSERT INTO `tb_province` VALUES ('6', 'Entre Rios', null);
INSERT INTO `tb_province` VALUES ('7', 'Santa Cruz', null);
INSERT INTO `tb_province` VALUES ('8', 'Rio Negro', null);
INSERT INTO `tb_province` VALUES ('9', 'Chubut', null);
INSERT INTO `tb_province` VALUES ('10', 'Cordoba', null);
INSERT INTO `tb_province` VALUES ('11', 'Mendoza', null);
INSERT INTO `tb_province` VALUES ('12', 'La Rioja', null);
INSERT INTO `tb_province` VALUES ('13', 'Catamarca', null);
INSERT INTO `tb_province` VALUES ('14', 'La Pampa', null);
INSERT INTO `tb_province` VALUES ('15', 'Santiago del Estero', null);
INSERT INTO `tb_province` VALUES ('16', 'Corrientes', null);
INSERT INTO `tb_province` VALUES ('17', 'Santa Fe', null);
INSERT INTO `tb_province` VALUES ('18', 'Tucuman', null);
INSERT INTO `tb_province` VALUES ('19', 'Neuquen', null);
INSERT INTO `tb_province` VALUES ('20', 'Salta', null);
INSERT INTO `tb_province` VALUES ('21', 'Chaco', null);
INSERT INTO `tb_province` VALUES ('22', 'Formosa', null);
INSERT INTO `tb_province` VALUES ('23', 'Jujuy', null);
INSERT INTO `tb_province` VALUES ('24', 'Tierra del Fuego, Antartida e Islas del Atlántico Sur', null);

-- ----------------------------
-- Table structure for tb_reason_disabled_item
-- ----------------------------
DROP TABLE IF EXISTS `tb_reason_disabled_item`;
CREATE TABLE `tb_reason_disabled_item` (
  `idReasonDisabledItem` int(11) NOT NULL AUTO_INCREMENT,
  `reasonDisabledItem` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idReasonDisabledItem`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_reason_disabled_item
-- ----------------------------
INSERT INTO `tb_reason_disabled_item` VALUES ('1', 'ROBO');
INSERT INTO `tb_reason_disabled_item` VALUES ('2', 'EXTRAVIO');
INSERT INTO `tb_reason_disabled_item` VALUES ('3', 'FALLA DEL LLAVERO');

-- ----------------------------
-- Table structure for tb_request
-- ----------------------------
DROP TABLE IF EXISTS `tb_request`;
CREATE TABLE `tb_request` (
  `idRequest` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `RequestName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idRequest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_request
-- ----------------------------

-- ----------------------------
-- Table structure for tb_router_internet
-- ----------------------------
DROP TABLE IF EXISTS `tb_router_internet`;
CREATE TABLE `tb_router_internet` (
  `idRouterInternet` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `numberSeriaInternal` text DEFAULT NULL,
  `numberSeriaFrabic` text DEFAULT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idRouterInternet`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_router_internet
-- ----------------------------
INSERT INTO `tb_router_internet` VALUES ('1', '441jjh14458g4h', 'fgh5hfg4hgf54h', 'cisco router');
INSERT INTO `tb_router_internet` VALUES ('2', '5454jkkkk', '1op7788888', 'TP LINK');

-- ----------------------------
-- Table structure for tb_sensors_alarm
-- ----------------------------
DROP TABLE IF EXISTS `tb_sensors_alarm`;
CREATE TABLE `tb_sensors_alarm` (
  `idSensorsAlarm` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `numberZoneSensor` varchar(200) DEFAULT NULL,
  `area` text DEFAULT NULL,
  `nroZoneTamper` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `locationLat` varchar(200) DEFAULT NULL,
  `locationLon` varchar(200) DEFAULT NULL,
  `dvr` varchar(200) DEFAULT NULL,
  `idCameraFk` int(11) DEFAULT NULL,
  `nroInterno` varchar(200) DEFAULT NULL,
  `nroFrabric` varchar(200) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSensorsAlarm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_sensors_alarm
-- ----------------------------

-- ----------------------------
-- Table structure for tb_services
-- ----------------------------
DROP TABLE IF EXISTS `tb_services`;
CREATE TABLE `tb_services` (
  `idService` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `service` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idService`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_services
-- ----------------------------
INSERT INTO `tb_services` VALUES ('1', 'INSTALACION');
INSERT INTO `tb_services` VALUES ('2', 'MANTENIMIENTO');
INSERT INTO `tb_services` VALUES ('3', 'REPARACION');

-- ----------------------------
-- Table structure for tb_services_camera_users
-- ----------------------------
DROP TABLE IF EXISTS `tb_services_camera_users`;
CREATE TABLE `tb_services_camera_users` (
  `idServicesCameraUsers` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idUserFk` int(11) DEFAULT NULL,
  `idClientServicesCamera` int(11) DEFAULT NULL,
  PRIMARY KEY (`idServicesCameraUsers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_services_camera_users
-- ----------------------------

-- ----------------------------
-- Table structure for tb_shutdown_key
-- ----------------------------
DROP TABLE IF EXISTS `tb_shutdown_key`;
CREATE TABLE `tb_shutdown_key` (
  `idShutdownKey` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idShutdownKey`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_shutdown_key
-- ----------------------------
INSERT INTO `tb_shutdown_key` VALUES ('1', 'TECLA DE APAGADO 1');
INSERT INTO `tb_shutdown_key` VALUES ('2', 'TECLA DE APAGADO 2');
INSERT INTO `tb_shutdown_key` VALUES ('3', 'TECLA DE APAGADO 3');

-- ----------------------------
-- Table structure for tb_smart_panic_license_pivote
-- ----------------------------
DROP TABLE IF EXISTS `tb_smart_panic_license_pivote`;
CREATE TABLE `tb_smart_panic_license_pivote` (
  `idPivoteLicense` int(11) NOT NULL AUTO_INCREMENT,
  `idClientServicesSmartPanicFk` int(11) NOT NULL,
  `idUserLinceseFk` int(11) NOT NULL,
  PRIMARY KEY (`idPivoteLicense`),
  KEY `idClientServicesSmartPanicFk` (`idClientServicesSmartPanicFk`),
  KEY `idUserLinceseFk` (`idUserLinceseFk`),
  CONSTRAINT `tb_smart_panic_license_pivote_ibfk_1` FOREIGN KEY (`idClientServicesSmartPanicFk`) REFERENCES `tb_client_services_smart_panic` (`idClientServicesSmartPanic`),
  CONSTRAINT `tb_smart_panic_license_pivote_ibfk_2` FOREIGN KEY (`idUserLinceseFk`) REFERENCES `tb_user_license` (`idUserLicense`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_smart_panic_license_pivote
-- ----------------------------

-- ----------------------------
-- Table structure for tb_status
-- ----------------------------
DROP TABLE IF EXISTS `tb_status`;
CREATE TABLE `tb_status` (
  `idStatusTenant` int(255) NOT NULL,
  `statusTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatusTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tb_status
-- ----------------------------
INSERT INTO `tb_status` VALUES ('-1', 'Eliminado');
INSERT INTO `tb_status` VALUES ('0', 'Inactivo');
INSERT INTO `tb_status` VALUES ('1', 'Activo');

-- ----------------------------
-- Table structure for tb_statusticket
-- ----------------------------
DROP TABLE IF EXISTS `tb_statusticket`;
CREATE TABLE `tb_statusticket` (
  `idStatus` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `statusName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tb_statusticket
-- ----------------------------
INSERT INTO `tb_statusticket` VALUES ('-1', 'Rechazado', '100');
INSERT INTO `tb_statusticket` VALUES ('1', 'Finalizado', '101');
INSERT INTO `tb_statusticket` VALUES ('10', 'Programado', '3');
INSERT INTO `tb_statusticket` VALUES ('2', 'Autorizacion Pendiente', '100');
INSERT INTO `tb_statusticket` VALUES ('3', 'Aprobado', '100');
INSERT INTO `tb_statusticket` VALUES ('4', 'Pendiente de envio ', '1');
INSERT INTO `tb_statusticket` VALUES ('5', 'En Ruta', '103');
INSERT INTO `tb_statusticket` VALUES ('6', 'Cancelado', '101');
INSERT INTO `tb_statusticket` VALUES ('7', 'Listo para Retirar', '2');
INSERT INTO `tb_statusticket` VALUES ('8', 'Solicitado', '3');
INSERT INTO `tb_statusticket` VALUES ('9', 'Pendiente', '102');

-- ----------------------------
-- Table structure for tb_sys_code
-- ----------------------------
DROP TABLE IF EXISTS `tb_sys_code`;
CREATE TABLE `tb_sys_code` (
  `idCode` int(11) DEFAULT NULL,
  `code` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `description` varchar(3) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_sys_code
-- ----------------------------
INSERT INTO `tb_sys_code` VALUES ('1', '280', 'TK');

-- ----------------------------
-- Table structure for tb_sys_param
-- ----------------------------
DROP TABLE IF EXISTS `tb_sys_param`;
CREATE TABLE `tb_sys_param` (
  `idParam` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idParam`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- ----------------------------
-- Records of tb_sys_param
-- ----------------------------
INSERT INTO `tb_sys_param` VALUES ('1', 'sistemaonline@coferba.com.ar', 'USUARIO SMT MAIL');
INSERT INTO `tb_sys_param` VALUES ('2', 'Sistema2018Online', 'CLAVE SMT MAIL');
INSERT INTO `tb_sys_param` VALUES ('6', '20:00', 'HORA DE MAIL DE VERIFICACION DE MAIL PARA ADMINISTRADORES DE CONSORCIO');
INSERT INTO `tb_sys_param` VALUES ('7', 'ventas@coferba.com.ar', 'MAIL DE VENTAS');
INSERT INTO `tb_sys_param` VALUES ('8', 'tecnica@coferba.com.ar', 'MAIL SERVICO TECNICO');
INSERT INTO `tb_sys_param` VALUES ('9', 'cobranzas@coferba.com.ar', 'MAIL FACTURACION');
INSERT INTO `tb_sys_param` VALUES ('10', 'administracion@coferba.com.ar', 'MAIL ADMINISTRATIVO');
INSERT INTO `tb_sys_param` VALUES ('11', 'ULTIMA CONEXION SISTEMA ADMIN', '00:00:00');

-- ----------------------------
-- Table structure for tb_tax
-- ----------------------------
DROP TABLE IF EXISTS `tb_tax`;
CREATE TABLE `tb_tax` (
  `idTypeTax` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `typeTax` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idTypeTax`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_tax
-- ----------------------------
INSERT INTO `tb_tax` VALUES ('1', 'CONSUMIDOR FINAL');
INSERT INTO `tb_tax` VALUES ('2', 'RESP. INSCRIPTO');
INSERT INTO `tb_tax` VALUES ('3', 'MONOTRIBUTO');
INSERT INTO `tb_tax` VALUES ('4', 'EXENTO');

-- ----------------------------
-- Table structure for tb_tickets
-- ----------------------------
DROP TABLE IF EXISTS `tb_tickets`;
CREATE TABLE `tb_tickets` (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `dateCreated` timestamp NULL DEFAULT current_timestamp(),
  `dateRecibeCompany` datetime DEFAULT NULL,
  `idStatusTicketKf` int(11) DEFAULT 2,
  `codTicket` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` int(11) NOT NULL COMMENT 'ID DEL TIPO DE TICKET',
  `idRequestKf` int(11) NOT NULL,
  `idUserTenantKf` int(11) DEFAULT NULL COMMENT 'ID DEL INQUILINO',
  `idOWnerKf` int(11) DEFAULT NULL COMMENT 'ID DEL PROPIETARIO',
  `idUserAdminKf` int(11) DEFAULT NULL COMMENT 'ID ADMIN COFERBA',
  `idUserCompany` int(11) DEFAULT NULL COMMENT 'ID USUARIO EMPRESA',
  `idUserEnterpriceKf` int(11) NOT NULL COMMENT 'ID ADMIN CONSORCIO',
  `idUserAttendantKf` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO',
  `numberItemes` int(11) DEFAULT NULL COMMENT 'CANTIDAD DE LLAVEROS O ELEMENTOS ',
  `idTypeOfKeysKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'ID DE LOS TIPOS DE LLAVEROS A SOLICITAR',
  `itemToDisabled` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'CODIGO Y TIPO DE LOS LLAVEROS A DAR DE BAJA',
  `idReasonDisabledItemKf` int(11) DEFAULT NULL COMMENT 'Razon Cancelar item',
  `idTypeOuther` int(11) DEFAULT NULL COMMENT 'TIPO DE CONSULTA',
  `mailContactConsult` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'MAIL DE CONTACTO PARA CONSULTAS',
  `SA_NRO_ORDER` int(255) DEFAULT NULL COMMENT 'ID DE NUMERO DE ORDEN QUE SERA ASIGNADO POR EL SISTEMA LOCAL',
  `descriptionComment` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `descriptionOrder` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'DESCRIPCION DEL PEDIDO',
  `isCommentOrDesccriptionChange` int(4) DEFAULT NULL,
  `idTypeServicesKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO SERVICIO SOBRE EL CUAL SE SOLICITA EL SERVICIO TECNICO',
  `totalService` decimal(18,2) DEFAULT 0.00 COMMENT 'MONTO TOTAL DEL SERVICIO',
  `addressConsul` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idOpcionLowTicketKf` int(11) DEFAULT NULL,
  `idTypeOfOptionKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO DE SOLICITUD -ENCARGADO/OTRO/EDIFICIO',
  `idCompanyKf` int(11) DEFAULT NULL,
  `idAdressKf` int(11) DEFAULT NULL COMMENT 'DIRECCION DEL TICKET',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'ID DEL DEPARTAMENTO',
  `idUserCancelTicket` int(11) DEFAULT NULL,
  `isCancelRequested` int(4) DEFAULT NULL COMMENT 'NOTIFICA A COFERBA SOBRE LA CANCELACION SUJETA A APROBACION',
  `reasonForCancelTicket` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'NOTA INDICANDO LA RAZON DE LA CANCELACION DEL TICKET',
  `dateCancel` datetime DEFAULT NULL,
  `idUserApprovedTicket` int(11) DEFAULT NULL,
  `dateRecibedAdmin` datetime DEFAULT NULL,
  `idOtherKf` int(11) DEFAULT NULL COMMENT 'ID DEL ENGARGADO DE TIPO "Otro"',
  `isChangeDeliverylRequested` int(4) DEFAULT NULL COMMENT 'NOTIFICA A COFERBA SOBRE EL CAMBIO DE ENVIO SUJETO A APROBACION',
  `idUserHasChangeTicket` tinyint(4) DEFAULT NULL,
  `idTypeDeliveryKf` int(11) DEFAULT NULL COMMENT 'ID DE LA OPCION DE ENVIO',
  `idWhoPickUp` int(11) DEFAULT NULL,
  `idUserAttendantKfDelivery` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO QUE RECIBE LA LLAVE',
  `thirdPersonNames` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'NOMBRE DE LA TERCERA PERSONA QUE RECIBE O RETIRA',
  `thirdPersonPhone` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'TELEFONO DE LA TERCERA PERSONA',
  `thirdPersonId` int(11) DEFAULT NULL COMMENT 'DNI DE LA TERCERA PERSONA',
  `isNew` tinyint(4) DEFAULT NULL,
  `isAplicate` tinyint(4) DEFAULT NULL,
  `idStatusTicketKfOld` int(11) DEFAULT NULL COMMENT 'ID DEL STATUS EN LA QUE SE ENCONTRABA EL TICKET ANTE DE UNA CANCELACION',
  `sendUserNotification` tinyint(4) DEFAULT NULL COMMENT 'Autorizar a notificar y permitir visualizar pedido al usuario o empresa',
  `totalGestion` decimal(18,2) DEFAULT 0.00,
  `totalLlave` decimal(18,2) DEFAULT 0.00,
  `totalEnvio` decimal(18,2) DEFAULT 0.00,
  `urlToken` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'URL TOKEN UTILIZADO PARA APROBAR O RECHAZAR UN PEDIDO',
  PRIMARY KEY (`idTicket`)
) ENGINE=MyISAM AUTO_INCREMENT=148 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_tickets
-- ----------------------------
INSERT INTO `tb_tickets` VALUES ('131', '2019-09-09 22:48:42', null, '2', 'TK-00000264', '1', '0', '82', '0', '31', null, '0', '0', '1', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '270.99', null, '1', null, null, '5', '11', '100', null, null, null, null, null, null, '0', null, null, '1', '1', null, null, null, null, '1', null, null, '1', '260.00', '10.99', '0.00', 'VWMWNeeu2oIFapiJnXpb');
INSERT INTO `tb_tickets` VALUES ('132', '2019-09-09 23:00:40', null, '2', 'TK-00000265', '1', '0', '74', '71', '0', null, '0', '0', '1', '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '320.99', null, '3', null, null, '5', '12', '120', null, null, null, null, null, null, '0', null, null, '2', '2', '77', null, null, null, '1', null, null, null, '0.00', '10.99', '310.00', 'AgYvWzRJ.BioZdKAZ6-h');
INSERT INTO `tb_tickets` VALUES ('133', '2019-09-10 13:45:28', null, '2', 'TK-00000266', '1', '0', '0', '71', '0', null, '0', '0', '2', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '451.98', null, '3', null, null, '5', '11', '100', null, null, null, null, null, null, '0', null, null, '2', '3', null, 'Carolina Vasquez', '112243242344', '95929321', '1', null, null, null, '260.00', '21.98', '170.00', 'mWGfB0Zck4.mGJStLnol');
INSERT INTO `tb_tickets` VALUES ('134', '2019-09-10 14:05:14', null, '2', 'TK-00000267', '1', '0', '0', '0', '31', null, '0', '84', '2', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', null, null, null, null, '', null, '1', null, '281.98', null, '1', null, '1', '5', '11', '0', null, null, null, null, null, null, '0', null, null, '1', '1', null, null, null, null, '1', null, null, '1', '260.00', '21.98', '0.00', 'hUAAX:216vPAKcA0lZgP');
INSERT INTO `tb_tickets` VALUES ('135', '2019-09-10 14:11:52', null, '2', 'TK-00000268', '1', '0', '0', '0', '31', null, '0', '76', '1', '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '320.99', null, '1', null, '1', '5', '12', '0', null, null, null, null, null, null, '0', null, null, '2', '2', '77', null, null, null, '1', null, null, '1', '0.00', '10.99', '310.00', '6.g3DR0TYX54F8jubqWa');
INSERT INTO `tb_tickets` VALUES ('136', '2019-09-10 22:18:35', null, '2', 'TK-00000269', '1', '0', '0', '71', '31', null, '0', '0', '1', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '270.99', null, '1', null, null, '5', '11', '100', null, null, null, null, null, null, '0', null, null, '1', '1', null, null, null, null, '1', null, null, '1', '260.00', '10.99', '0.00', 'Qv4eEcdelsCe97BZAEx8');
INSERT INTO `tb_tickets` VALUES ('137', '2019-09-10 22:20:51', null, '3', 'TK-00000270', '1', '0', '0', '71', '31', null, '0', '0', '1', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '270.99', null, '1', null, null, '5', '11', '100', null, null, null, null, '1', '2020-07-30 04:41:48', '0', null, null, '1', '1', null, null, null, null, '1', null, null, '1', '260.00', '10.99', '0.00', '9IVjBWqHs.O1qjeP1k8V');
INSERT INTO `tb_tickets` VALUES ('138', '2019-09-10 22:25:05', null, '3', 'TK-00000271', '1', '0', '0', '71', '31', null, '0', '0', '2', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '451.98', null, '1', null, null, '5', '11', '100', null, null, null, null, '1', '2020-07-30 04:41:44', '0', null, null, '2', '2', '89', null, null, null, '1', null, null, '1', '260.00', '21.98', '170.00', 'T7M3fmxLYARN-LuMz0v1');
INSERT INTO `tb_tickets` VALUES ('139', '2019-09-10 22:26:43', null, '3', 'TK-00000272', '1', '0', '0', '71', '31', null, '0', '0', '2', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '451.98', null, '1', null, null, '5', '11', '100', null, null, null, null, '31', '2019-09-11 03:30:03', '0', null, null, '2', '2', '84', null, null, null, '1', null, null, '1', '260.00', '21.98', '170.00', '5OK79n3RuzsjDbHIJ1QI');
INSERT INTO `tb_tickets` VALUES ('140', '2019-09-10 22:27:36', null, '3', 'TK-00000273', '1', '0', '0', '71', '31', null, '0', '0', '2', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '281.98', null, '1', null, null, '5', '11', '100', null, null, null, null, '31', '2019-09-11 03:30:00', '0', null, null, '1', '1', null, null, null, null, '1', null, null, '1', '260.00', '21.98', '0.00', 'VayOcRo.yvAxwjEw647H');
INSERT INTO `tb_tickets` VALUES ('141', '2019-09-10 22:29:14', null, '3', 'TK-00000274', '1', '0', '0', '71', '31', null, '0', '0', '2', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '451.98', null, '1', null, null, '5', '11', '100', null, null, null, null, '31', '2019-09-11 03:29:58', '0', null, null, '2', '2', '78', null, null, null, '1', null, null, '1', '260.00', '21.98', '170.00', 'cDQsHZraOMIjwFfyObvo');
INSERT INTO `tb_tickets` VALUES ('142', '2019-09-10 22:31:06', null, '3', 'TK-00000275', '1', '0', '0', '71', '31', null, '0', '0', '2', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '451.98', null, '1', null, null, '5', '11', '100', null, null, null, null, '1', '2020-07-30 04:41:38', '0', null, null, '2', '2', '84', null, null, null, '1', null, null, '1', '260.00', '21.98', '170.00', 'ZQhaJab_lapt3T:4r9gf');
INSERT INTO `tb_tickets` VALUES ('143', '2019-09-10 23:34:58', null, '3', 'TK-00000276', '1', '0', '0', '71', '31', null, '0', '0', '1', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '270.99', null, '1', null, null, '5', '11', '100', null, null, null, null, '1', '2020-07-30 04:41:32', '0', null, null, '1', '1', null, null, null, null, '1', null, null, '1', '260.00', '10.99', '0.00', 'sxN1zFdxa47GUjVtvZj3');
INSERT INTO `tb_tickets` VALUES ('144', '2019-09-10 23:41:02', null, '3', 'TK-00000277', '1', '0', '0', '71', '31', null, '0', '0', '1', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '440.99', null, '1', null, null, '5', '11', '100', null, null, null, null, '1', '2020-07-30 04:41:27', '0', null, null, '2', '2', '75', null, null, null, '1', null, null, '1', '260.00', '10.99', '170.00', '--RfxK.mYUf7DrK21_kn');
INSERT INTO `tb_tickets` VALUES ('145', '2019-09-10 23:42:50', null, '3', 'TK-00000278', '1', '0', '0', '71', '31', null, '0', '0', '1', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '100.99', null, '1', null, null, '5', '11', '100', null, null, null, null, '1', '2020-03-19 03:36:58', '0', null, '1', '1', '1', null, null, null, null, '1', null, null, '1', '260.00', '10.99', '0.00', 'fQKigD_OB1WbFX4ohqe.');
INSERT INTO `tb_tickets` VALUES ('146', '2019-09-10 23:54:26', null, '6', 'TK-00000279', '1', '0', '0', '71', '31', null, '0', '0', '1', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '100.99', null, '1', null, null, '5', '11', '100', '1', null, 'ghfghf', '2020-03-19 03:37:53', null, null, '0', null, '1', '1', '1', null, null, null, null, '1', null, null, '1', '260.00', '10.99', '0.00', 'h5RgaRWBPbxSsdGq:73g');
INSERT INTO `tb_tickets` VALUES ('129', '2019-09-06 23:56:49', null, '3', 'TK-00000262', '1', '0', '0', '71', '0', null, '0', '0', '2', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '281.98', null, '3', null, null, '5', '11', '100', null, null, null, null, '31', '2019-09-07 05:19:56', '0', null, null, '1', '1', null, null, null, null, '1', null, null, null, '260.00', '21.98', '0.00', 'tRHY0xO-xpP7ozeu1FJg');
INSERT INTO `tb_tickets` VALUES ('130', '2019-09-07 00:35:58', null, '2', 'TK-00000263', '1', '0', '0', '0', '31', null, '0', '0', '1', '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', null, null, null, null, null, null, null, null, '440.99', null, '1', null, '2', '5', '11', '0', null, null, null, null, null, null, '0', null, null, '2', '2', '89', null, null, null, '1', null, null, '1', '260.00', '10.99', '170.00', 'l7:LyXlS9ksUfLmp7y6E');
INSERT INTO `tb_tickets` VALUES ('147', '2020-08-05 23:54:06', null, '3', 'TK-00000280', '3', '0', null, null, '1', null, '0', null, null, 'null', 'null', null, null, null, null, 'r435', 'rttrytrytrytrytry', '1', '1', null, null, '1', null, null, '5', '12', null, null, null, null, null, '1', '2020-08-06 04:54:33', null, null, null, null, null, null, null, null, null, '1', null, null, '0', null, null, null, null);

-- ----------------------------
-- Table structure for tb_tipo_inmueble
-- ----------------------------
DROP TABLE IF EXISTS `tb_tipo_inmueble`;
CREATE TABLE `tb_tipo_inmueble` (
  `idTipoInmueble` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idTipoInmueble`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_tipo_inmueble
-- ----------------------------
INSERT INTO `tb_tipo_inmueble` VALUES ('1', 'Departamento');
INSERT INTO `tb_tipo_inmueble` VALUES ('2', 'Casa');
INSERT INTO `tb_tipo_inmueble` VALUES ('3', 'Local');

-- ----------------------------
-- Table structure for tb_tmp_delivery_data
-- ----------------------------
DROP TABLE IF EXISTS `tb_tmp_delivery_data`;
CREATE TABLE `tb_tmp_delivery_data` (
  `idTmpDeliveryData` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID DE LA INFO TEMPORAL ASOCIADO A UN TICKET',
  `tmp_idTicketKf` int(11) NOT NULL COMMENT 'ID DEL TICKET ',
  `tmp_thirdPersonNames` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'NOMBRE DE LA TERCERA PERSONA QUE RECIBE O RETIRA',
  `tmp_thirdPersonPhone` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'TELEFONO DE LA TERCERA PERSONA',
  `tmp_thirdPersonId` int(11) DEFAULT NULL COMMENT 'DNI DE LA TERCERA PERSONA',
  `tmp_idUserAttendantKfDelivery` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO QUE RECIBE LA LLAVE',
  `tmp_idTypeDeliveryKf` int(11) DEFAULT NULL,
  `tmp_totalService` decimal(18,2) DEFAULT NULL,
  `tmp_idWhoPickUpKf` int(11) DEFAULT NULL,
  `tmp_idUserRequestChOrCancel` int(11) DEFAULT NULL COMMENT 'ID DEL USUARIO QUE SOLICITA EL CAMBIO DE ENVIO O CANCELACION',
  `tmp_reasonForCancelTicket` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tmp_isChApproved` int(4) DEFAULT NULL COMMENT 'VALOR SUMINISTRADO POR SISTEMA LOCAL COFERBA',
  `tmp_isCancelApproved` int(4) DEFAULT NULL COMMENT 'VALOR SUMINISTRADO POR SISTEMA LOCAL COFERBA',
  `tmp_isChOrCancelApplied` int(4) DEFAULT NULL,
  `dateOfRequestByUser` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`idTmpDeliveryData`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- ----------------------------
-- Records of tb_tmp_delivery_data
-- ----------------------------

-- ----------------------------
-- Table structure for tb_totem_model
-- ----------------------------
DROP TABLE IF EXISTS `tb_totem_model`;
CREATE TABLE `tb_totem_model` (
  `idTotenModel` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `totenModel` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`idTotenModel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_totem_model
-- ----------------------------

-- ----------------------------
-- Table structure for tb_typetenant
-- ----------------------------
DROP TABLE IF EXISTS `tb_typetenant`;
CREATE TABLE `tb_typetenant` (
  `idTypeTenant` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `typeTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_typetenant
-- ----------------------------
INSERT INTO `tb_typetenant` VALUES ('1', 'Propietario');
INSERT INTO `tb_typetenant` VALUES ('2', 'Inquilino');

-- ----------------------------
-- Table structure for tb_typeticket
-- ----------------------------
DROP TABLE IF EXISTS `tb_typeticket`;
CREATE TABLE `tb_typeticket` (
  `idTypeTicket` int(11) NOT NULL AUTO_INCREMENT,
  `TypeTicketName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTicket`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_typeticket
-- ----------------------------
INSERT INTO `tb_typeticket` VALUES ('1', 'ALTA DE LLAVEROS');
INSERT INTO `tb_typeticket` VALUES ('2', 'BAJA DE LLAVEROS');
INSERT INTO `tb_typeticket` VALUES ('3', 'SERVICIO TECNICO');
INSERT INTO `tb_typeticket` VALUES ('4', 'OTRAS SOLICITUDES O CONSULTAS');

-- ----------------------------
-- Table structure for tb_type_attendant
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_attendant`;
CREATE TABLE `tb_type_attendant` (
  `idTyepeAttendant` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nameTypeAttendant` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idTyepeAttendant`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- ----------------------------
-- Records of tb_type_attendant
-- ----------------------------
INSERT INTO `tb_type_attendant` VALUES ('1', 'Otro');
INSERT INTO `tb_type_attendant` VALUES ('2', 'Titular');
INSERT INTO `tb_type_attendant` VALUES ('3', 'Suplente');
INSERT INTO `tb_type_attendant` VALUES ('4', 'Ayudante');
INSERT INTO `tb_type_attendant` VALUES ('5', 'Intendente');

-- ----------------------------
-- Table structure for tb_type_delivery
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_delivery`;
CREATE TABLE `tb_type_delivery` (
  `idTypeDelivery` int(11) DEFAULT NULL,
  `typeDelivery` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_type_delivery
-- ----------------------------
INSERT INTO `tb_type_delivery` VALUES ('1', 'RETIRO POR OFICINA', null);
INSERT INTO `tb_type_delivery` VALUES ('2', 'ENTREGA EN EL EDIFICIO', null);

-- ----------------------------
-- Table structure for tb_type_gps
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_gps`;
CREATE TABLE `tb_type_gps` (
  `idTypeGps` int(11) NOT NULL AUTO_INCREMENT,
  `typeGps` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idTypeGps`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_type_gps
-- ----------------------------
INSERT INTO `tb_type_gps` VALUES ('1', 'GPS 1');
INSERT INTO `tb_type_gps` VALUES ('2', 'GPS 2');
INSERT INTO `tb_type_gps` VALUES ('3', 'GPS 3');

-- ----------------------------
-- Table structure for tb_type_internet
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_internet`;
CREATE TABLE `tb_type_internet` (
  `idTypeInternet` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `typeInternet` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`idTypeInternet`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_type_internet
-- ----------------------------
INSERT INTO `tb_type_internet` VALUES ('1', 'CABLEMODEM');
INSERT INTO `tb_type_internet` VALUES ('2', 'SATELITAL');
INSERT INTO `tb_type_internet` VALUES ('3', 'FIBRA');

-- ----------------------------
-- Table structure for tb_type_maintenance
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_maintenance`;
CREATE TABLE `tb_type_maintenance` (
  `idTypeMaintenance` int(11) NOT NULL AUTO_INCREMENT,
  `typeMaintenance` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idTypeMaintenance`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_type_maintenance
-- ----------------------------
INSERT INTO `tb_type_maintenance` VALUES ('1', 'PRUEBA DE TIPO DE MANTENIMIENTO');

-- ----------------------------
-- Table structure for tb_type_outher
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_outher`;
CREATE TABLE `tb_type_outher` (
  `idTypeOuther` int(11) NOT NULL,
  `TypeOuther` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeOuther`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_type_outher
-- ----------------------------
INSERT INTO `tb_type_outher` VALUES ('1', 'VENTA');
INSERT INTO `tb_type_outher` VALUES ('2', 'LLAVEROS');
INSERT INTO `tb_type_outher` VALUES ('3', 'SERVICIOS TECNICOS');
INSERT INTO `tb_type_outher` VALUES ('4', 'FACTURACION');
INSERT INTO `tb_type_outher` VALUES ('5', 'ADMINISTRATIVAS');
INSERT INTO `tb_type_outher` VALUES ('6', 'SEGURIDAD');

-- ----------------------------
-- Table structure for tb_type_services
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_services`;
CREATE TABLE `tb_type_services` (
  `idTypeServices` int(11) NOT NULL AUTO_INCREMENT,
  `typeServices` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `SA_ID_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTypeServices`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_type_services
-- ----------------------------
INSERT INTO `tb_type_services` VALUES ('1', 'Cambio de Camara', null);
INSERT INTO `tb_type_services` VALUES ('2', 'Cambio de Lector de llave HID', null);
INSERT INTO `tb_type_services` VALUES ('3', 'Cambio de Cerradura Electromagnetica', null);
INSERT INTO `tb_type_services` VALUES ('4', 'Cambio de Lector de llave HID', null);
INSERT INTO `tb_type_services` VALUES ('5', 'Cambio de Molinete', null);
INSERT INTO `tb_type_services` VALUES ('6', 'Cambio de Control de Acceso', null);

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `fullNameUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `emailUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneNumberUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneLocalNumberUser` varchar(25) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `passwordUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) unsigned DEFAULT NULL,
  `dateCreated` timestamp NULL DEFAULT current_timestamp(),
  `idCompanyKf` int(11) DEFAULT NULL,
  `resetPasword` tinyint(4) DEFAULT 0,
  `idAddresKf` int(11) DEFAULT NULL,
  `idTyepeAttendantKf` int(11) unsigned DEFAULT NULL COMMENT 'TIPO DE ENCARGADO',
  `descOther` text COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'ENCARGADO DE TIPO OTRO',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'DEPARTAMENTO DE EL INQUILINO O PROPIETARIO',
  `isDepartmentApproved` tinyint(4) DEFAULT NULL COMMENT 'APROBADO O NO  EL DEPARTAMENTO DEL INQUILINO',
  `isEdit` tinyint(11) DEFAULT 0,
  `requireAuthentication` tinyint(11) DEFAULT 1,
  `idTypeTenantKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) unsigned DEFAULT NULL,
  `tokenMail` varchar(300) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `isConfirmatedMail` tinyint(4) DEFAULT 0,
  `SA_ID` int(11) DEFAULT NULL,
  `idSysProfileFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  KEY `idProfileKf` (`idProfileKf`),
  KEY `idAddresKf` (`idAddresKf`),
  KEY `idCompanyKf` (`idCompanyKf`),
  CONSTRAINT `tb_user_ibfk_1` FOREIGN KEY (`idProfileKf`) REFERENCES `tb_profile` (`idProfile`) ON UPDATE NO ACTION,
  CONSTRAINT `tb_user_ibfk_2` FOREIGN KEY (`idAddresKf`) REFERENCES `tb_addres` (`idAdress`),
  CONSTRAINT `tb_user_ibfk_3` FOREIGN KEY (`idCompanyKf`) REFERENCES `tb_company` (`idCompany`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('1', 'admin sistema', 'soporte@coferba.com.ar', '(054) 9 11 2323-2323', '91124759596', 'fe703d258c7ef5f50b71e06565a65aa07194907f', '1', '2018-02-16 09:01:22', null, '0', null, null, null, null, null, '1', null, null, '1', null, '1', null, '8');
INSERT INTO `tb_user` VALUES ('71', 'David Eduardo Rincon', 'davideduardo.luengo@hotmail.com', '', '1122333444555666', '870e8768d555d80e0aeb44870c081f5563d90bd3', '3', '2018-10-21 23:33:22', '5', '0', '11', null, null, null, null, '0', null, '1', '1', '3Jh0NuqLHa', '1', null, null);
INSERT INTO `tb_user` VALUES ('72', 'leandro figueroa', 'lean.figueroa@gmail.com', '123213213213213', '123213213213213', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', '5', '2018-10-29 13:27:43', '5', '0', '12', null, null, '117', '1', '0', null, '2', '1', 'JbuVXny0Jr', '1', null, null);
INSERT INTO `tb_user` VALUES ('73', 'leandro2 figueroa2', 'leandro.figueroa@coferba.com.ar', '1122356388', '123213213213213', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', '3', '2018-10-29 13:48:52', '5', '0', '12', null, null, null, null, '1', null, '1', '1', 'OLtCaObFgO', '1', null, null);
INSERT INTO `tb_user` VALUES ('74', 'inquilino prueba', 'rexx84@gmail.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', '5', '2018-10-29 13:58:23', '5', '0', '12', null, null, '120', '1', '0', null, '2', '1', 'XTrpLMkZiG', '1', null, null);
INSERT INTO `tb_user` VALUES ('75', 'Encargado Prueba', 'encargadoprueba@asdasda', '123213213213213', '1123232434333423', 'c4f9fcd7be6b041073f1b23a2bf80bd1d831292e', '6', '2018-12-19 14:30:57', '5', '1', '11', '4', null, '103', '1', '1', '1', '2', '1', 'gQuGxR2Zoo', '1', null, null);
INSERT INTO `tb_user` VALUES ('76', 'Roberto Higuera', 'rhiguera@fffff.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', '6', '2019-01-18 01:10:24', '5', '0', '12', '2', null, null, null, '0', '1', '1', '1', 'ZWsfbNEEXB', '1', null, null);
INSERT INTO `tb_user` VALUES ('77', 'Esteban Moreli', 'emoreli@akjsdsadas.com', '123213213213213', '11233243253243', '44b07ccf74fd8a488be0b4aa0593beff5ac6f3ef', '6', '2019-01-18 01:31:36', '5', '1', '12', '3', null, null, null, '1', '0', '0', '1', 'uQzz412uH5', '1', null, null);
INSERT INTO `tb_user` VALUES ('78', 'Victor Gonzalez', 'vgonzalez@asdadsadwq.com', '77788787878', '', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', '6', '2019-01-18 01:33:07', '5', '0', '11', '2', null, null, null, '1', '1', '1', '1', '69bMxpjXQ8', '1', null, null);
INSERT INTO `tb_user` VALUES ('79', 'Sofia Rincon', 'sofia.rincon@asdasdsad.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', '4', '2019-01-22 01:06:32', '5', '0', null, null, null, null, null, '0', '0', null, '1', 'NaUwCkVwH4', '1', null, null);
INSERT INTO `tb_user` VALUES ('80', 'Daniela Becerra', 'daniela.becerra@hoasdsad.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', '5', '2019-02-10 22:23:37', '5', '0', null, null, null, null, '1', '1', null, '2', '1', 'hXLcQRwWGn', '1', null, null);
INSERT INTO `tb_user` VALUES ('81', 'probando', 'probando@probando.com', '123213123213', '', 'f11131b2bcdf821dc9ff69b38e2712541439b9f8', '5', '2019-07-27 14:29:15', '5', '1', '11', null, null, '108', '1', '1', null, '2', '1', 'lxUXCkdgnZ', '1', null, null);
INSERT INTO `tb_user` VALUES ('82', 'asdsadas', 'asdsad@asdsad.com', '', '12321311312', 'b9f4327bafdb162ed16fe0d6d4a50bde306ee08e', '5', '2019-07-27 14:51:24', '5', '1', '11', null, null, '100', '1', '1', null, '2', '1', 'HCU6UgT88X', '1', null, null);
INSERT INTO `tb_user` VALUES ('83', 'erewrrewrew', 'wqewqew@asdsad.com', '', '121321321', '7be5fac0585900a65effd04d887cc62022b16a20', '5', '2019-07-27 15:38:43', null, '1', null, null, null, null, null, '1', null, '2', '1', 'yZAGdjTOLv', '1', null, null);
INSERT INTO `tb_user` VALUES ('84', 'Arturo Michelena', 'amichelena@asdas.com', '', '11232142132132', 'fc604011dbac13b0f6f0b89c81c0efe0271530c1', '6', '2019-07-27 15:59:58', '5', '1', '11', '2', null, null, null, '1', '0', '0', '1', 'WuYJFO1DZD', '1', null, null);
INSERT INTO `tb_user` VALUES ('85', 'Fernando Angulo', 'david.rincon.oracle@gmail.com', '', '123213213', '78d16ced1eedb4f436c83a861c91e052aaf3699f', '3', '2019-07-27 21:43:16', '5', '1', '12', null, null, null, null, '0', null, '1', '1', '7gVmCe4f3J', '1', null, null);
INSERT INTO `tb_user` VALUES ('86', 'David Eduardo Rincon', 'davideduardo.luengo2@hotmail.com', '', '01122356388', 'fa399d74e61282062d50aaf7eb6a9afc1b21f314', '5', '2019-08-21 00:20:44', '1', '1', '1', null, null, '2', '1', '1', null, '2', '1', 'K67aipTQu2', '1', null, null);
INSERT INTO `tb_user` VALUES ('87', 'Ernesto Araujo', 'earaujo@asdsad.com', '', '111232324324324', '5365642294a7a05378e5e13cd44fa91c5f9b546a', '6', '2019-08-29 20:12:26', '1', '1', '1', '2', null, null, null, '1', '0', '0', '1', 'FLTvvGz5wZ', '1', null, null);
INSERT INTO `tb_user` VALUES ('88', 'Gabriel Gonzalez', 'ggonzalez@hotmail.com', '', '112322424233', 'e47ed8dab1b69a560435c3f4bff9d2679ab12233', '6', '2019-08-29 20:13:21', '1', '1', '2', '2', null, null, null, '1', '0', '0', '1', 'WM7HECe4EL', '1', null, null);
INSERT INTO `tb_user` VALUES ('89', 'Dionisio Machado', 'dmachado@asdasd.com', '121232132134', '112143435556', '80662a250c92f9c05b965cbff69785fdc404d0c4', '6', '2019-08-29 20:22:06', '5', '1', '11', '1', 'Plomero', null, null, '1', '0', null, '1', 'YJh6f8Gxb0', '1', null, null);
INSERT INTO `tb_user` VALUES ('90', 'prueba', 'prueba', 'prueba', null, '508bbdcf90061f63832be9aeaeb508ed1da6bd6b', '1', '2019-11-09 16:25:55', null, '1', null, null, null, null, null, null, null, null, '0', 'fxvMqFzwGK', '0', null, '8');
INSERT INTO `tb_user` VALUES ('91', 'prueba', 'sfsdfdsfdfds', 'prueba', null, '13a6d4daa92304298f07df965a8e71a42a6d2047', '1', '2019-11-09 16:26:53', null, '1', null, null, null, null, null, null, null, '0', '0', 'FAMIVpMRxv', '0', null, '8');
INSERT INTO `tb_user` VALUES ('92', 'German Malaver', 'german.malaver@asdasd.com', '1123432432444', '1123423432432', '6956aa2ea365aa0cf67ba52265436016d751bd3e', '6', '2020-07-10 20:32:47', '1', '1', '2', '2', null, null, null, '1', null, '1', '1', '8S3z3UtLlR', '1', null, null);

-- ----------------------------
-- Table structure for tb_user_license
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_license`;
CREATE TABLE `tb_user_license` (
  `idUserLicense` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `key` varchar(100) DEFAULT NULL,
  `isAndroidOperantSystem` tinyint(1) DEFAULT 1,
  `profileUser` int(11) DEFAULT NULL,
  `idClientServicesSmartPanicFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUserLicense`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user_license
-- ----------------------------
INSERT INTO `tb_user_license` VALUES ('1', '1', '1', '1', '1', '1', '1', null);
INSERT INTO `tb_user_license` VALUES ('2', '1', '1', '1', '1', '1', '1', null);
INSERT INTO `tb_user_license` VALUES ('3', '1', '1', '1', '1', '1', '1', null);
INSERT INTO `tb_user_license` VALUES ('4', '1', '1', '1', '1', '1', '1', null);
INSERT INTO `tb_user_license` VALUES ('5', '1', '1', '1', '1', '1', '1', null);
INSERT INTO `tb_user_license` VALUES ('6', '1', '1', '1', '1', '1', '1', null);

-- ----------------------------
-- Table structure for tb_zonas
-- ----------------------------
DROP TABLE IF EXISTS `tb_zonas`;
CREATE TABLE `tb_zonas` (
  `idZona` int(11) NOT NULL AUTO_INCREMENT,
  `n_zona` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `costo_envio` float DEFAULT NULL,
  `valor_envio` float DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`idZona`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_zonas
-- ----------------------------
INSERT INTO `tb_zonas` VALUES ('1', '1', 'zona', '450', '100', '1');
INSERT INTO `tb_zonas` VALUES ('2', '2', 'zona', '300', '140', '1');
INSERT INTO `tb_zonas` VALUES ('3', '3', 'zona', '200', '130', '1');
SET FOREIGN_KEY_CHECKS=1;
