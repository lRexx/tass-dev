-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2021 a las 07:25:55
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_coferba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_access_control`
--

CREATE TABLE `tb_access_control` (
  `idAccessControl` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_access_control`
--

INSERT INTO `tb_access_control` (`idAccessControl`, `titulo`) VALUES
(1, 'Prueba de control de acceso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_access_control_door`
--

CREATE TABLE `tb_access_control_door` (
  `idAccessControlDoor` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_access_control_door`
--

INSERT INTO `tb_access_control_door` (`idAccessControlDoor`, `titulo`) VALUES
(1, 'Principal'),
(2, 'Cochera'),
(3, 'Servicio'),
(4, 'Terraza'),
(5, 'Escalera'),
(6, 'Sum'),
(7, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_addres`
--

CREATE TABLE `tb_addres` (
  `idAdress` int(11) NOT NULL,
  `nameAdress` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `priceUni` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por unidad',
  `priceManagement` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por Gestion',
  `priceShipping` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por envio ',
  `IdSecurityCode` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'Codigo de verificacion para mostrar direccion a propietarios/inquilinos',
  `IsInDebt` int(11) DEFAULT 0,
  `SA_ID_COMPANY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_addres`
--

INSERT INTO `tb_addres` (`idAdress`, `nameAdress`, `idCompanyKf`, `priceUni`, `priceManagement`, `priceShipping`, `IdSecurityCode`, `IsInDebt`, `SA_ID_COMPANY`) VALUES
(1, 'Cramer 1275', 1, '100.00', '0.00', '150.00', NULL, 0, NULL),
(2, 'Blanco Encalada 2355', 1, '0.00', '0.00', '0.00', NULL, 0, NULL),
(3, 'Cabildo 3510', 2, '0.00', '0.00', '0.00', NULL, 0, NULL),
(4, 'Gral. La valle 1920', 2, '0.00', '0.00', '0.00', NULL, 0, NULL),
(5, 'Parana 2568', 3, '0.00', '0.00', '0.00', NULL, 0, NULL),
(6, 'Rivadavia 4530', 3, '0.00', '0.00', '0.00', NULL, 0, NULL),
(11, 'DIRECCION DE PRUEBA', 5, '110.00', '260.00', '170.00', '54321', 0, 595),
(12, 'DIRECCION DE PRUEBA 2', 5, '260.00', '0.00', '310.00', '12345', 0, 596);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_agents`
--

CREATE TABLE `tb_agents` (
  `idAgent` int(11) UNSIGNED NOT NULL,
  `agent` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_agents`
--

INSERT INTO `tb_agents` (`idAgent`, `agent`) VALUES
(1, 'TASS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_batery`
--

CREATE TABLE `tb_alarm_batery` (
  `idAlarmBatery` int(11) UNSIGNED NOT NULL,
  `idProductoFk` int(11) NOT NULL,
  `nroInternal` varchar(200) DEFAULT NULL,
  `nroFabric` varchar(200) DEFAULT NULL,
  `dateExpired` varchar(50) DEFAULT '',
  `fkidClientServicesAlarms` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_alarm_batery`
--

INSERT INTO `tb_alarm_batery` (`idAlarmBatery`, `idProductoFk`, `nroInternal`, `nroFabric`, `dateExpired`, `fkidClientServicesAlarms`) VALUES
(75, 17, '23432432324232342', '3434234234234334', NULL, 55),
(76, 9, '777777777777777777777', '77777777777777777777', '31/12/2025', 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_line_phone`
--

CREATE TABLE `tb_alarm_line_phone` (
  `idAlarmLinePhone` int(11) UNSIGNED NOT NULL,
  `company` varchar(100) DEFAULT NULL,
  `line` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_alarm_line_phone`
--

INSERT INTO `tb_alarm_line_phone` (`idAlarmLinePhone`, `company`, `line`, `idClientServicesAlarmsFk`, `fk_idDatoAdicionalAlarma`) VALUES
(47, 'Movistar', '1123423423423', NULL, 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_module_gps`
--

CREATE TABLE `tb_alarm_module_gps` (
  `idAlarmModuleGps` int(11) UNSIGNED NOT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `moduleGprs` varchar(200) DEFAULT NULL,
  `nroSerieFrabric` varchar(200) DEFAULT NULL,
  `nroSerieInternal` varchar(200) DEFAULT NULL,
  `codeProgram` varchar(200) DEFAULT NULL,
  `portProgram` varchar(200) DEFAULT NULL,
  `passwordAcces` varchar(200) DEFAULT NULL,
  `codePart1` varchar(200) DEFAULT NULL,
  `codePart2` varchar(200) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_module_ip`
--

CREATE TABLE `tb_alarm_module_ip` (
  `idAlarmModuleIp` int(11) UNSIGNED NOT NULL,
  `moduleIp` varchar(100) DEFAULT NULL,
  `nroSerieFrabric` varchar(100) DEFAULT NULL,
  `nroSerieInternal` varchar(100) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `codeProgrm` varchar(100) DEFAULT NULL,
  `portProgrm` varchar(100) DEFAULT NULL,
  `passwordAcces` varchar(100) DEFAULT NULL,
  `codePart1` varchar(100) DEFAULT NULL,
  `codePart2` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_alarm_module_ip`
--

INSERT INTO `tb_alarm_module_ip` (`idAlarmModuleIp`, `moduleIp`, `nroSerieFrabric`, `nroSerieInternal`, `ip`, `codeProgrm`, `portProgrm`, `passwordAcces`, `codePart1`, `codePart2`, `idClientServicesAlarmsFk`, `fk_idDatoAdicionalAlarma`) VALUES
(51, '26', '666666666666666666666', '677777777777777777777', '127.0.0.1', '12345', '8080', '123123123', '12312312312', '123123123123', NULL, 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_person_alert`
--

CREATE TABLE `tb_alarm_person_alert` (
  `idPersonAlert` int(11) UNSIGNED NOT NULL,
  `fullName` varchar(200) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `stringKey` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `numberUser` varchar(200) DEFAULT NULL,
  `isUserSystem` tinyint(1) DEFAULT 0,
  `idUserSystemFk` int(11) DEFAULT NULL,
  `idClientServicesAlarmsAditionals` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_person_verific`
--

CREATE TABLE `tb_alarm_person_verific` (
  `idPersonVerific` int(11) UNSIGNED NOT NULL,
  `isUserSystem` tinyint(1) DEFAULT 0,
  `idUserSystemFk` int(11) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `numberUser` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_services_aditionals`
--

CREATE TABLE `tb_alarm_services_aditionals` (
  `idAlarmServicesAditionals` int(11) UNSIGNED NOT NULL,
  `alarmServicesAditionals` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_alarm_services_aditionals`
--

INSERT INTO `tb_alarm_services_aditionals` (`idAlarmServicesAditionals`, `alarmServicesAditionals`) VALUES
(1, 'CONTROL HORARIO'),
(2, 'REPORTE MENSUAL AUTOMATICO'),
(3, 'REPORTES AUTOMATICOS'),
(4, 'VIDEO VERIFICACION'),
(5, 'APP');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_type_client`
--

CREATE TABLE `tb_alarm_type_client` (
  `idTypeClientAlarm` int(11) UNSIGNED NOT NULL,
  `typeClientAlarm` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_alarm_type_client`
--

INSERT INTO `tb_alarm_type_client` (`idTypeClientAlarm`, `typeClientAlarm`) VALUES
(1, 'CASA'),
(2, 'COMERCIO'),
(3, 'INDUSTRIA'),
(4, 'OTROS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_backup_energy`
--

CREATE TABLE `tb_backup_energy` (
  `idBackupEnergy` int(11) NOT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `idBatteryFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_backup_energy`
--

INSERT INTO `tb_backup_energy` (`idBackupEnergy`, `idClientServicesFk`, `description`, `idBatteryFk`) VALUES
(74, 50, 'Bateria Alarma 12v 7ah 7a Recargable', 9),
(75, 50, 'Ups Estabilizador Lyonn 800va', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_backup_energy_totem`
--

CREATE TABLE `tb_backup_energy_totem` (
  `idBackupEnergyTotem` int(11) NOT NULL,
  `idClientServicesTotemFk` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `idBatteryFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_backup_energy_totem`
--

INSERT INTO `tb_backup_energy_totem` (`idBackupEnergyTotem`, `idClientServicesTotemFk`, `description`, `idBatteryFk`) VALUES
(145, 28, NULL, 9),
(146, 28, NULL, 17),
(147, 28, 'BATERIA', 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_bakups_order`
--

CREATE TABLE `tb_bakups_order` (
  `idBakupsOrder` int(11) UNSIGNED NOT NULL,
  `bakupsOrder` int(11) DEFAULT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_battery_install_access_control`
--

CREATE TABLE `tb_battery_install_access_control` (
  `idBatteryInstallAccessControl` int(11) UNSIGNED NOT NULL,
  `idClientServicesAccessControlFk` int(11) DEFAULT NULL,
  `idBatteryFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_battery_install_access_control`
--

INSERT INTO `tb_battery_install_access_control` (`idBatteryInstallAccessControl`, `idClientServicesAccessControlFk`, `idBatteryFk`) VALUES
(115, 102, 9),
(116, 102, 9),
(117, 102, 14),
(119, 103, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_battery_install_alarm`
--

CREATE TABLE `tb_battery_install_alarm` (
  `idBatteryInstallAlarm` int(11) NOT NULL,
  `battery` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `nroSerieInternal` int(30) DEFAULT NULL,
  `nroSerieManufacturer` int(30) DEFAULT NULL,
  `dateUp` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cameras`
--

CREATE TABLE `tb_cameras` (
  `idCamera` int(11) UNSIGNED NOT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  `portCamera` int(11) DEFAULT NULL,
  `coveredArea` varchar(255) DEFAULT '',
  `locationCamera` varchar(255) DEFAULT '',
  `nroSerieCamera` varchar(255) DEFAULT '',
  `nroFabricCamera` varchar(255) DEFAULT '',
  `dateExpireCamera` varchar(255) DEFAULT '',
  `idProductFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_cameras`
--

INSERT INTO `tb_cameras` (`idCamera`, `idClientServicesCameraFk`, `portCamera`, `coveredArea`, `locationCamera`, `nroSerieCamera`, `nroFabricCamera`, `dateExpireCamera`, `idProductFk`) VALUES
(86, 50, 1, 'Prueba', 'Prueba', '12845493589', '12845493589', NULL, 18),
(87, 50, 2, 'Prueba 2', 'Prueba 2', '23457689876', '23457689876', NULL, 18),
(88, 50, 3, 'Prueba 3', 'Prueba 3', '23456789675', '23456789675', NULL, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cameras_totem`
--

CREATE TABLE `tb_cameras_totem` (
  `idCameraTotem` int(11) UNSIGNED NOT NULL,
  `idClientServicesCameraTotemFk` int(11) DEFAULT NULL,
  `portCamera` int(11) DEFAULT NULL,
  `coveredArea` varchar(255) DEFAULT '',
  `locationCamera` varchar(255) DEFAULT '',
  `nroSerieCamera` varchar(255) DEFAULT '',
  `nroFabricCamera` varchar(255) DEFAULT '',
  `dateExpireCamera` varchar(255) DEFAULT '',
  `idProductFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_cameras_totem`
--

INSERT INTO `tb_cameras_totem` (`idCameraTotem`, `idClientServicesCameraTotemFk`, `portCamera`, `coveredArea`, `locationCamera`, `nroSerieCamera`, `nroFabricCamera`, `dateExpireCamera`, `idProductFk`) VALUES
(220, 28, 1, 'Probando', 'Probando', '23423434532423432', '23423434532423432', NULL, 18),
(221, 28, 3, 'Probando', 'Probando', '34543564364564365476', '34543564364564365476', NULL, 18),
(222, 28, 4, 'Probando', 'Probando', '5678877565476734754687', '5678877565476734754687', NULL, 18),
(223, 28, 2, 'Probando', 'Probando', '12345356579099098', '12345356579099098', NULL, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_category_departament`
--

CREATE TABLE `tb_category_departament` (
  `idCategoryDepartament` int(11) UNSIGNED NOT NULL,
  `categoryDepartament` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_category_departament`
--

INSERT INTO `tb_category_departament` (`idCategoryDepartament`, `categoryDepartament`) VALUES
(1, 'Departamento'),
(2, 'Cochera'),
(3, 'Baulera'),
(4, 'Local'),
(5, 'Porteria'),
(6, 'Mixto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_clients`
--

CREATE TABLE `tb_clients` (
  `idClient` int(11) UNSIGNED NOT NULL,
  `idClientTypeFk` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `addressLat` varchar(100) DEFAULT NULL,
  `addressLon` varchar(100) DEFAULT NULL,
  `idAgentFk` int(200) DEFAULT NULL,
  `businessName` varchar(200) DEFAULT NULL,
  `idClientAssociated_SE` int(11) DEFAULT NULL,
  `CUIT` varchar(30) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `phoneMobile` varchar(200) DEFAULT NULL COMMENT 'Telefono movil de un particular',
  `phoneLocal` varchar(200) DEFAULT NULL COMMENT 'Telefono local de un particular',
  `mail` varchar(200) DEFAULT NULL,
  `observation` varchar(500) DEFAULT NULL,
  `pageWeb` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
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
  `departmentCorrelation` int(11) DEFAULT NULL COMMENT 'Designacion de correlacion {por piso o todo el edificio}'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_clients`
--

INSERT INTO `tb_clients` (`idClient`, `idClientTypeFk`, `name`, `address`, `addressLat`, `addressLon`, `idAgentFk`, `businessName`, `idClientAssociated_SE`, `CUIT`, `idLocationFk`, `idProvinceFk`, `phoneMobile`, `phoneLocal`, `mail`, `observation`, `pageWeb`, `created_at`, `update_at`, `idStatusFk`, `mailFronKey`, `observationOrderKey`, `isNotCliente`, `idClientAdminFk`, `mailServiceTecnic`, `observationSericeTecnic`, `mailCollection`, `observationCollection`, `idClientCompaniFk`, `idZonaFk`, `idClientDepartamentFk`, `idTipoInmuebleFk`, `departmentUnit`, `departmentCorrelation`) VALUES
(1, 2, 'GABRIELA MISTRAL 4099', 'GABRIELA MISTRAL 4099', '-34.596312317965', '-58.516365731706', NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, '2020-07-24 00:37:02', NULL, 0, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 'DUGGANCO MARSAN', 'GABRIELA MISTRAL 4099', '-34.596312317965', '-58.516365731706', 1, 'CARLOS MARSAN', NULL, '20-10550239-8', 1, 1, NULL, NULL, NULL, '', 'www.marsan.com.ar', '2020-07-24 00:37:02', NULL, 1, 'dugganco@gmail.com', '', 0, 0, 'dugganco@gmail.com', '', 'duggancopagos@gmail.com', '', 0, 1, 1, 1, NULL, NULL),
(3, 2, 'SAN PEDRITO 636', 'SAN PEDRITO 636', '-34.638248176437', '-58.466290724568', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-24 00:48:46', NULL, 1, 'dugganco@gmail.com', '', 0, 2, 'dugganco@gmail.com', '', 'duggancopagos@gmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(4, 2, 'AV MONROE 3846', 'AV MONROE 3846', '-34.566909593671', '-58.473782463583', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-24 15:21:35', NULL, 1, 'dugganco@gmail.com', '', 0, 2, 'dugganco@gmail.com', '', 'duggancopagos@gmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(5, 2, 'DR LUIS BELAUSTEGUI 1115', 'DR LUIS BELAUSTEGUI 1115', '-34.60552842687767', '-58.45638311971346', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-24 15:26:02', NULL, 1, 'dugganco@gmail.com', '', 0, 2, 'dugganco@gmail.com', '', 'duggancopagos@gmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(6, 2, 'AV SAN JUAN 3688', 'AV SAN JUAN 3688', '-34.625635395556', '-58.417501922526', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-24 15:36:39', NULL, 1, 'dugganco@gmail.com', '', 0, 2, 'dugganco@gmail.com', '', 'duggancopagos@gmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(7, 2, 'REPUBLICA ARABE SIRIA 2763', 'REPUBLICA ARABE SIRIA 2763', '-34.58273652608', '-58.415093425803', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-24 15:47:16', NULL, 1, 'dugganco@gmail.com', '', 0, 2, 'dugganco@gmail.com', '', 'duggancopagos@gmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(8, 2, 'AV SAN JUAN 3655', 'AV SAN JUAN 3655', '-34.62555820985', '-58.416969238364', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-24 15:56:29', NULL, 1, 'dugganco@gmail.com', '', 0, 2, 'dugganco@gmail.com', '', 'duggancopagos@gmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(9, 2, 'URUGUAY 1038', 'URUGUAY 1038', '-34.596555598811', '-58.387099762717', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-24 16:03:23', NULL, 1, 'dugganco@gmail.com', '', 0, 2, 'dugganco@gmail.com', '', 'duggancopagos@gmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(10, 2, 'ARREGUI 3146', 'ARREGUI 3146', '-34.607451066225', '-58.489197639921', NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, '2020-07-24 16:10:47', NULL, 0, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 1, 'CONSTANZA TETTAMANTI', 'ARREGUI 3146', '-34.607451066225', '-58.489197639921', 1, 'CONSTANZA TETTAMANTI', 134534583, '27-25790019-9', 1, 1, NULL, NULL, NULL, 'prueba', '', '2020-07-24 16:10:47', '2021-03-25 14:01:27', 1, 'administracion@adctettamanti.com.ar', 'prueba', 0, 0, 'administracion@adctettamanti.com.ar', 'prueba', 'administracion@adctettamanti.com.ar', 'prueba', 0, 1, 232, 1, NULL, NULL),
(12, 2, 'LAVALLE 357', 'LAVALLE 357', '-34.601997409805', '-58.371944634111', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, 'Observaciones Generales (new)', NULL, '2020-07-24 16:16:00', '2021-05-21 05:33:56', 1, 'administracion@adctettamanti.com.ar', 'Observaciones de pedidos de llaveros (new)', 0, 11, 'administracion@adctettamanti.com.ar', 'Observaciones de servicios técnicos (new)', 'administracion@adctettamanti.com.ar', 'Observaciones de Cobranzas (new)', NULL, 1, NULL, NULL, 2, 3),
(13, 2, 'MANUEL UGARTE 3580', 'MANUEL UGARTE 3580', '-34.562495783889', '-58.473842045079', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-24 16:21:15', '2020-09-05 02:22:09', 1, 'administracion@adctettamanti.com.ar', 'prueba', 0, 11, 'administracion@adctettamanti.com.ar', '', 'administracion@adctettamanti.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(14, 2, 'HIDALGO 462', 'HIDALGO 462', '-34.614010711042', '-58.439875711967', NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, '2020-07-24 22:32:36', NULL, 0, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 1, 'ESTUDIO MARJBEIN-SUCHMON', 'HIDALGO 462', '-34.614010711042', '-58.439875711967', 1, 'DORA SILVIA MARJBEIN', 135643543, '27-11018302-5', 1, 1, NULL, NULL, NULL, '', '', '2020-07-24 22:32:36', '2021-03-28 01:39:05', 1, 'proveedores@em-s.com.ar', '', 0, 0, 'proveedores@em-s.com.ar', '', 'proveedores@em-s.com.ar', '', 0, 1, 351, 1, NULL, NULL),
(16, 2, 'AV EVA PERON 1155', 'AV EVA PERON 1155', '-34.630617058881', '-58.441633624559', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-24 22:38:17', NULL, 1, 'proveedores@em-s.com.ar', '', 0, 15, 'proveedores@em-s.com.ar', '', 'proveedores@em-s.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(17, 2, 'JULIAN ALVAREZ 647', 'JULIAN ALVAREZ 647', '-34.599024958043', '-58.433565151432', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-24 22:45:01', '2020-09-07 23:23:14', 1, 'proveedores@em-s.com.ar', '', 0, 15, 'proveedores@em-s.com.ar', '', 'proveedores@em-s.com.ar', '', NULL, 1, NULL, NULL, 1, 1),
(18, 2, 'HUMBERTO 1 2630', 'HUMBERTO 1 2630', '-34.622350637143', '-58.401702364025', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-27 15:54:50', '2021-05-24 19:34:54', 1, 'proveedores@em-s.com.ar', '', 0, 15, 'proveedores@em-s.com.ar', '', 'proveedores@em-s.com.ar', '', NULL, 1, NULL, NULL, 2, 2),
(19, 2, 'GURRUCHAGA 2230', 'GURRUCHAGA 2230', '-34.585151263659', '-58.42288892944', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-27 16:04:08', NULL, 1, 'proveedores@em-s.com.ar', '', 0, 15, 'proveedores@em-s.com.ar', '', 'proveedores@em-s.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(20, 2, 'NEUQUEN 554', 'NEUQUEN 554', '-36.663492212454', '-56.684565495017', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-27 16:09:23', NULL, 1, 'proveedores@em-s.com.ar', '', 0, 15, 'proveedores@em-s.com.ar', '', 'proveedores@em-s.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(21, 2, 'PLANES 636', 'PLANES 636', '-34.609259386073', '-58.441812083249', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-27 16:19:25', NULL, 1, 'proveedores@em-s.com.ar', '', 0, 15, 'proveedores@em-s.com.ar', '', 'proveedores@em-s.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(22, 2, 'SOLER 4196', 'SOLER 4196', '-34.590089325845', '-58.420209648228', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-27 16:37:21', NULL, 1, 'proveedores@em-s.com.ar', '', 0, 15, 'proveedores@em-s.com.ar', '', 'proveedores@em-s.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(23, 2, 'HIDALGO 619', 'HIDALGO 619', '-34.612366139591', '-58.440569517803', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-27 17:01:29', NULL, 1, 'proveedores@em-s.com.ar', '', 0, 15, 'proveedores@em-s.com.ar', '', 'proveedores@em-s.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(24, 2, 'ARGERICH 1723', 'ARGERICH 1723', '-34.61488205388', '-58.480494908741', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-27 17:06:33', NULL, 1, 'proveedores@em-s.com.ar', '', 0, 15, 'proveedores@em-s.com.ar', '', 'proveedores@em-s.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(25, 2, 'VIRREY DEL PINO 4130', 'VIRREY DEL PINO 4130', '-34.576279462042', '-58.47115818738', NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, '2020-07-27 17:20:17', NULL, 0, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, 1, 'REYES CHOLAKIAN', 'VIRREY DEL PINO 4130', '-34.576279462042', '-58.47115818738', 1, 'SEBASTIAN REYES', NULL, '20-22472909-0', 1, 1, NULL, NULL, NULL, 'Probando', '', '2020-07-27 17:20:17', '2021-05-19 05:27:21', 1, 'admreyescholakian@gmail.com', 'Probando', 0, 0, 'admreyescholakian@gmail.com', 'Probando', 'admreyescholakian@gmail.com', 'Probando', 0, 1, 617, 1, NULL, NULL),
(27, 2, 'AV FEDERICO LACROZE 3541', 'AV FEDERICO LACROZE 3541', '-34.580871507962', '-58.451187995348', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-28 21:00:18', NULL, 1, 'admreyescholakian@gmail.com', '', 0, 26, 'admreyescholakian@gmail.com', '', 'admreyescholakian@gmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(28, 2, 'GUEVARA 456', 'GUEVARA 456', '-34.586609107101', '-58.451108912433', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-28 21:05:25', NULL, 1, 'admreyescholakian@gmail.com', '', 0, 26, 'admreyescholakian@gmail.com', '', 'admreyescholakian@gmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(29, 2, 'MENDOZA 5123', 'MENDOZA 5123', '-34.577352270774', '-58.484039386476', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-28 21:23:17', NULL, 1, 'admreyescholakian@gmail.com', '', 0, 26, 'admreyescholakian@gmail.com', '', 'admreyescholakian@gmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(30, 2, 'AV RIVADAVIA 2358', 'AV RIVADAVIA 2358', '-34.609760181381', '-58.399901004654', NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, '2020-07-30 23:49:44', NULL, 0, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(31, 1, 'GRUPO BETA', 'AV RIVADAVIA 2358', '-34.609760181381', '-58.399901004654', 1, 'FRANCISCA ELENA ANTONELLI', NULL, '27-13071755-7', 1, 1, NULL, NULL, NULL, '', '', '2020-07-30 23:49:44', NULL, 1, 'consorcios@grupobeta.com.ar', '', 0, 0, 'consorcios@grupobeta.com.ar', '', 'consorcios@grupobeta.com.ar', '', 0, 1, 712, 1, NULL, NULL),
(32, 2, 'VENEZUELA 1867', 'VENEZUELA 1867', '-34.614994141794', '-58.392704942701', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-31 16:44:31', NULL, 1, 'consorcios@grupobeta.com.ar', '', 0, 31, 'consorcios@grupobeta.com.ar', '', 'consorcios@grupobeta.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(33, 2, 'CHARCAS 2956', 'CHARCAS 2956', '-34.593294765959', '-58.407892065368', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-31 16:57:08', NULL, 1, 'consorcios@grupobeta.com.ar', '', 0, 31, 'consorcios@grupobeta.com.ar', '', 'consorcios@grupobeta.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(34, 2, 'AV SANTA FE 2086', 'AV SANTA FE 2086', '-34.595587631448', '-58.397203472386', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-07-31 17:04:55', NULL, 1, 'consorcios@grupobeta.com.ar', '', 0, 31, 'consorcios@grupobeta.com.ar', '', 'consorcios@grupobeta.com.ar', '', NULL, 1, NULL, NULL, NULL, NULL),
(35, 2, 'CHILE 2154', 'CHILE 2154', '-34.617267693675', '-58.396904886312', 0, NULL, 2147483647, NULL, 1, 1, NULL, NULL, NULL, 'Observaciones Generales', NULL, '2020-07-31 17:40:30', '2021-05-24 19:31:31', 1, 'consorcios@grupobeta.com.ar', 'Observaciones de pedidos de llaveros', 0, 26, 'consorcios@grupobeta.com.ar', 'Observaciones de servicios técnicos', 'consorcios@grupobeta.com.ar', 'Observaciones de Cobranzas', NULL, 1, NULL, NULL, 2, 2),
(36, 1, 'ALIPRANDI PALENA', 'YATAY 120', '-34.612744100574', '-58.428597216874', 1, 'MARIA FERNANDA ALIPRANDI', NULL, '27-20009140-5', 1, 1, NULL, NULL, NULL, '', '', '2020-08-13 21:07:19', NULL, 1, 'aliprandi_palena@hotmail.com', '', 0, 0, 'aliprandi_palena@hotmail.com', '', 'aliprandi_palena@hotmail.com', '', 0, 1, NULL, 3, NULL, NULL),
(37, 2, 'BOGADO 4538', 'BOGADO 4538', '-34.604973522529', '-58.429553867589', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-08-13 21:16:53', NULL, 1, 'aliprandi_palena@hotmail.com', '', 0, 36, 'aliprandi_palena@hotmail.com', '', 'aliprandi_palena@hotmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(38, 2, 'SAN JOSE DE CALASANZ 481', 'SAN JOSE DE CALASANZ 481', '-34.624428090988', '-58.437713587696', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-08-13 21:59:09', NULL, 1, 'aliprandi_palena@hotmail.com', '', 0, 36, 'aliprandi_palena@hotmail.com', '', 'aliprandi_palena@hotmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(39, 2, 'VALLE 1215', 'VALLE 1215', '-34.625393441154', '-58.444797164656', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-08-13 22:05:21', NULL, 1, 'aliprandi_palena@hotmail.com', '', 0, 36, 'aliprandi_palena@hotmail.com', '', 'aliprandi_palena@hotmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(40, 2, 'AV RIVADAVIA 4965', 'AV RIVADAVIA 4965', '-34.617896441747', '-58.435550242969', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-08-13 22:18:58', NULL, 1, 'aliprandi_palena@hotmail.com', '', 0, 36, 'aliprandi_palena@hotmail.com', '', 'aliprandi_palena@hotmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(41, 2, 'MALVINAS ARGENTINAS 251', 'MALVINAS ARGENTINAS 251', '-34.62755403111', '-58.450679583446', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-08-13 22:23:57', NULL, 1, 'aliprandi_palena@hotmail.com', '', 0, 36, 'aliprandi_palena@hotmail.com', '', 'aliprandi_palena@hotmail.com', '', NULL, 1, NULL, NULL, NULL, NULL),
(42, 2, 'HORTIGUERA 473', 'HORTIGUERA 473', '-34.628049430079', '-58.44512915586', 0, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, '', NULL, '2020-08-13 22:28:31', NULL, 1, 'aliprandi_palena@hotmail.com', '', 0, 36, 'aliprandi_palena@hotmail.com', '', 'aliprandi_palena@hotmail.com', '', NULL, 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_clients_phones`
--

CREATE TABLE `tb_clients_phones` (
  `idClientPhones` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_clients_tickets`
--

CREATE TABLE `tb_clients_tickets` (
  `idTicketsCliets` int(11) NOT NULL,
  `idTicketKf` int(11) DEFAULT NULL,
  `idClientKf` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_address_particular`
--

CREATE TABLE `tb_client_address_particular` (
  `idAddressParticular` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `depto` varchar(100) DEFAULT NULL,
  `isBuilding` int(11) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL,
  `clarification` varchar(200) DEFAULT NULL,
  `idParticularDepartamentKf` int(11) DEFAULT NULL COMMENT 'Id del departamento dependiendo del tipo de inmueble',
  `idZonaFk` varchar(255) DEFAULT NULL,
  `idTipoInmuebleFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_authorizing`
--

CREATE TABLE `tb_client_authorizing` (
  `idClientAuthorizing` int(11) UNSIGNED NOT NULL,
  `idUserFk` int(11) DEFAULT NULL,
  `isLevel1` tinyint(1) DEFAULT 0,
  `isLevel2` tinyint(1) DEFAULT 0,
  `idClientFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_billing_information`
--

CREATE TABLE `tb_client_billing_information` (
  `idBillingInfo` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `businessAddress` varchar(200) DEFAULT NULL,
  `businessNameBilling` varchar(200) DEFAULT NULL,
  `cuitBilling` varchar(50) DEFAULT NULL,
  `idLocationBillingFk` int(11) DEFAULT NULL,
  `idProvinceBillingFk` int(11) DEFAULT NULL,
  `idTypeTaxFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_billing_information`
--

INSERT INTO `tb_client_billing_information` (`idBillingInfo`, `idClientFk`, `businessAddress`, `businessNameBilling`, `cuitBilling`, `idLocationBillingFk`, `idProvinceBillingFk`, `idTypeTaxFk`) VALUES
(1, 2, NULL, 'CARLOS MARSAN', '20-10550239-8', 1, 1, 2),
(2, 3, NULL, 'CONSORCIO SAN PEDRITO 636', '30-66123727-5', 1, 1, 2),
(3, 4, NULL, 'CONSORCIO MONROE 3846/48', '30-70999275-5', 1, 1, 1),
(4, 5, NULL, 'CONSORCIO BELAUSTEGUI 1115', '30-71158873-2', 1, 1, 1),
(5, 6, NULL, 'CONSORCIO SAN JUAN 3688', '30-66303996-9', 1, 1, 1),
(6, 7, NULL, 'CONSORCIOS REPUBLICA ARABE SIRIA 2763', '33-53891758-9', 1, 1, 1),
(7, 8, NULL, 'CONSORCIO AV. SAN JUAN 3655', '30-59623849-8', 1, 1, 1),
(8, 9, NULL, 'CONSORCIO URUGUAY 1038/42', '30-53595230-9', 1, 1, 1),
(9, 11, 'ARREGUI 3146', 'CONSTANZA TETTAMANTI', '27-25790019-9', 1, 1, 2),
(10, 12, 'LAVALLE 357', 'CONSORCIO LAVALLE 357', '30-53414898-0', 1, 1, 1),
(11, 13, 'MANUEL UGARTE 3580', 'CONSORCIO UGARTE 3580', '30-71112623-2', 1, 1, 1),
(12, 15, 'HIDALGO 462', 'DORA SILVIA MARJBEIN', '27-11018302-5', 1, 1, 3),
(13, 16, 'AV EVA PERON 1155', 'CONSORCIO EVA PERON 1155', '30-71550934-9', 1, 1, 1),
(14, 17, 'JULIAN ALVAREZ 647', 'CONSORCIO JULIAN ALVAREZ 647', '30-61287840-0', 1, 1, 1),
(15, 18, 'HUMBERTO 1 2630', 'CONSORCIO HUMBERTO PRIMO 2630', '33-52229082-9', 1, 1, 1),
(16, 19, NULL, 'CONSORCIO GURRUCHAGA 2230', '30-66155337-1', 1, 1, 1),
(17, 20, NULL, 'CONSORCIO NEUQUEN 554', '30-58020580-8', 1, 1, 1),
(18, 21, NULL, 'CONSORCIO PLANES 636', '30-53772707-8', 1, 1, 1),
(19, 22, NULL, 'CONSORCIO SOLER 4196/98', '30-62687526-9', 1, 1, 1),
(20, 23, NULL, 'CONSORCIO HIDALGO 619/23', '30-68254780-0', 1, 1, 1),
(21, 24, NULL, 'ARGERICH 1723 S.A.', '30-71515362-5', 1, 1, 2),
(22, 26, 'VIRREY DEL PINO 4130', 'SEBASTIAN REYES', '20-22472909-0', 1, 1, 3),
(23, 27, NULL, 'CONSORCIO AV. FEDERICO LACROZE 3541/45', '30-71469960-8', 1, 1, 1),
(24, 28, NULL, 'CONSORCIO GUEVARA 456/60', '30-71469967-5', 1, 1, 1),
(25, 29, NULL, 'CONSORCIO AV. MENDOZA 5123/5125', '30-71605813-8', 1, 1, 1),
(26, 31, NULL, 'FRANCISCA ELENA ANTONELLI', '27-13071755-7', 1, 1, 2),
(27, 32, NULL, 'CONSORCIO VENEZUELA 1867/69', '30-55692953-6', 1, 1, 1),
(28, 33, NULL, 'CONSORCIO CHARCAS 2956', '30-54533701-7', 1, 1, 1),
(29, 34, NULL, 'CONSORCIO SANTA FE 2086', '30-59272355-3', 1, 1, 1),
(30, 35, 'CHILE 2154', 'CONSORCIO CHILE 2154', '30-55993131-0', 1, 1, 1),
(31, 36, NULL, 'MARIA FERNANDA ALIPRANDI', '27-20009140-5', 1, 1, 3),
(32, 37, NULL, 'CONSORCIO BOGADO 4538', '30-71117670-1', 1, 1, 1),
(33, 38, NULL, 'CONSORCIO SAN JOSE DE CALASANZ 481', '30-71425179-8', 1, 1, 1),
(34, 39, NULL, 'CONSORCIO VALLE 1215', '30-71219834-2', 1, 1, 1),
(35, 40, NULL, 'CONSORCIO RIVADAVIA 4965', '30-53581480-1', 1, 1, 1),
(36, 41, NULL, 'CONSORCIO MALVINAS ARGENTINAS 251/253/255', '30-67895315-2', 1, 1, 1),
(37, 42, NULL, 'CONSORCIO HORTIGUERA 473/475', 'CONSORCIO HORTIGUERA 473/475', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_camera`
--

CREATE TABLE `tb_client_camera` (
  `idClientCamera` int(11) NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `userProfile` varchar(255) DEFAULT NULL,
  `qrBase64` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_client_camera`
--

INSERT INTO `tb_client_camera` (`idClientCamera`, `idClientFk`, `idClientServicesCameraFk`, `name`, `user`, `pass`, `userProfile`, `qrBase64`) VALUES
(71, 76, 50, 'Roberto Higuera', 'robertoh', 'admin', 'admin', 'data:image/png;base64,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');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_departament`
--

CREATE TABLE `tb_client_departament` (
  `idClientDepartament` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `floor` varchar(11) DEFAULT NULL,
  `departament` varchar(11) DEFAULT NULL,
  `idCategoryDepartamentFk` int(11) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `numberUNF` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_departament`
--

INSERT INTO `tb_client_departament` (`idClientDepartament`, `idClientFk`, `floor`, `departament`, `idCategoryDepartamentFk`, `idStatusFk`, `created_at`, `numberUNF`) VALUES
(1, 1, '2', 'A', 1, 1, '2020-07-24 00:37:02', NULL),
(2, 3, 'pb', '1', 5, 1, '2020-07-24 00:48:46', 0),
(3, 3, '1', 'A', 1, 1, '2020-07-24 00:48:46', 0),
(4, 3, '1', 'B', 1, 1, '2020-07-24 00:48:46', 0),
(5, 3, '1', 'C', 1, 1, '2020-07-24 00:48:46', 0),
(6, 3, '1', 'D', 1, 1, '2020-07-24 00:48:46', 0),
(7, 3, '1', 'E', 1, 1, '2020-07-24 00:48:46', 0),
(8, 3, '1', 'F', 1, 1, '2020-07-24 00:48:46', 0),
(9, 3, '1', 'G', 1, 1, '2020-07-24 00:48:46', 0),
(10, 3, '2', 'A', 1, 1, '2020-07-24 00:48:46', 0),
(11, 3, '2', 'B', 1, 1, '2020-07-24 00:48:46', 0),
(12, 3, '2', 'C', 1, 1, '2020-07-24 00:48:46', 0),
(13, 3, '2', 'D', 1, 1, '2020-07-24 00:48:46', 0),
(14, 3, '2', 'E', 1, 1, '2020-07-24 00:48:46', 0),
(15, 3, '2', 'F', 1, 1, '2020-07-24 00:48:46', 0),
(16, 3, '2', 'G', 1, 1, '2020-07-24 00:48:46', 0),
(17, 3, '3', 'A', 1, 1, '2020-07-24 00:48:46', 0),
(18, 3, '3', 'B', 1, 1, '2020-07-24 00:48:46', 0),
(19, 3, '3', 'C', 1, 1, '2020-07-24 00:48:46', 0),
(20, 3, '3', 'D', 1, 1, '2020-07-24 00:48:46', 0),
(21, 3, '3', 'E', 1, 1, '2020-07-24 00:48:46', 0),
(22, 3, '3', 'F', 1, 1, '2020-07-24 00:48:46', 0),
(23, 3, '3', 'G', 1, 1, '2020-07-24 00:48:46', 0),
(24, 3, '4', 'A', 1, 1, '2020-07-24 00:48:46', 0),
(25, 3, '4', 'B', 1, 1, '2020-07-24 00:48:46', 0),
(26, 3, '4', 'C', 1, 1, '2020-07-24 00:48:46', 0),
(27, 3, '4', 'D', 1, 1, '2020-07-24 00:48:46', 0),
(28, 3, '4', 'E', 1, 1, '2020-07-24 00:48:46', 0),
(29, 3, '4', 'F', 1, 1, '2020-07-24 00:48:46', 0),
(30, 3, '4', 'G', 1, 1, '2020-07-24 00:48:46', 0),
(31, 3, '5', 'A', 1, 1, '2020-07-24 00:48:46', 0),
(32, 3, '5', 'B', 1, 1, '2020-07-24 00:48:46', 0),
(33, 3, '5', 'C', 1, 1, '2020-07-24 00:48:46', 0),
(34, 3, '5', 'D', 1, 1, '2020-07-24 00:48:46', 0),
(35, 3, '5', 'E', 1, 1, '2020-07-24 00:48:46', 0),
(36, 3, '5', 'F', 1, 1, '2020-07-24 00:48:46', 0),
(37, 3, '5', 'G', 1, 1, '2020-07-24 00:48:46', 0),
(38, 3, '6', 'A', 1, 1, '2020-07-24 00:48:46', 0),
(39, 3, '6', 'B', 1, 1, '2020-07-24 00:48:46', 0),
(40, 3, '6', 'C', 1, 1, '2020-07-24 00:48:46', 0),
(41, 3, '6', 'D', 1, 1, '2020-07-24 00:48:46', 0),
(42, 3, '6', 'E', 1, 1, '2020-07-24 00:48:46', 0),
(43, 3, '6', 'F', 1, 1, '2020-07-24 00:48:46', 0),
(44, 3, '6', 'G', 1, 1, '2020-07-24 00:48:46', 0),
(45, 3, '7', 'A', 1, 1, '2020-07-24 00:48:46', 0),
(46, 3, '7', 'B', 1, 1, '2020-07-24 00:48:46', 0),
(47, 3, '7', 'C', 1, 1, '2020-07-24 00:48:46', 0),
(48, 3, '7', 'D', 1, 1, '2020-07-24 00:48:46', 0),
(49, 3, '7', 'E', 1, 1, '2020-07-24 00:48:47', 0),
(50, 3, '7', 'F', 1, 1, '2020-07-24 00:48:47', 0),
(51, 3, '7', 'G', 1, 1, '2020-07-24 00:48:47', 0),
(52, 3, '8', 'A', 1, 1, '2020-07-24 00:48:47', 0),
(53, 3, '8', 'B', 1, 1, '2020-07-24 00:48:47', 0),
(54, 3, '8', 'C', 1, 1, '2020-07-24 00:48:47', 0),
(55, 3, '8', 'D', 1, 1, '2020-07-24 00:48:47', 0),
(56, 3, '8', 'E', 1, 1, '2020-07-24 00:48:47', 0),
(57, 3, '8', 'F', 1, 1, '2020-07-24 00:48:47', 0),
(58, 3, '8', 'G', 1, 1, '2020-07-24 00:48:47', 0),
(59, 4, 'pb', '1', 1, 1, '2020-07-24 15:21:36', 0),
(60, 4, '1', 'A', 1, 1, '2020-07-24 15:21:36', 0),
(61, 4, '1', 'B', 1, 1, '2020-07-24 15:21:36', 0),
(62, 4, '2', 'A', 1, 1, '2020-07-24 15:21:36', 0),
(63, 4, '2', 'B', 1, 1, '2020-07-24 15:21:36', 0),
(64, 4, '3', 'A', 1, 1, '2020-07-24 15:21:36', 0),
(65, 4, '3', 'B', 1, 1, '2020-07-24 15:21:36', 0),
(66, 4, '4', 'A', 1, 1, '2020-07-24 15:21:36', 0),
(67, 4, '4', 'B', 1, 1, '2020-07-24 15:21:36', 0),
(68, 4, '5', 'A', 1, 1, '2020-07-24 15:21:36', 0),
(69, 4, '5', 'B', 1, 1, '2020-07-24 15:21:36', 0),
(70, 4, '6', 'A', 1, 1, '2020-07-24 15:21:36', 0),
(71, 4, '6', 'B', 1, 1, '2020-07-24 15:21:36', 0),
(72, 4, '7', 'A', 1, 1, '2020-07-24 15:21:36', 0),
(73, 4, '7', 'B', 1, 1, '2020-07-24 15:21:36', 0),
(74, 4, '8', 'A', 1, 1, '2020-07-24 15:21:36', 0),
(75, 4, '8', 'B', 1, 1, '2020-07-24 15:21:36', 0),
(76, 4, '9', 'A', 1, 1, '2020-07-24 15:21:36', 0),
(77, 4, '9', 'B', 1, 1, '2020-07-24 15:21:36', 0),
(78, 5, 'pb', '1', 5, 1, '2020-07-24 15:26:03', 0),
(79, 5, '1', 'A', 1, 1, '2020-07-24 15:26:03', 0),
(80, 5, '1', 'B', 1, 1, '2020-07-24 15:26:03', 0),
(81, 5, '1', 'C', 1, 1, '2020-07-24 15:26:03', 0),
(82, 5, '2', 'A', 1, 1, '2020-07-24 15:26:03', 0),
(83, 5, '2', 'B', 1, 1, '2020-07-24 15:26:03', 0),
(84, 5, '2', 'C', 1, 1, '2020-07-24 15:26:03', 0),
(85, 5, '3', 'A', 1, 1, '2020-07-24 15:26:04', 0),
(86, 5, '3', 'B', 1, 1, '2020-07-24 15:26:04', 0),
(87, 5, '3', 'C', 1, 1, '2020-07-24 15:26:04', 0),
(88, 5, '4', 'A', 1, 1, '2020-07-24 15:26:04', 0),
(89, 5, '4', 'B', 1, 1, '2020-07-24 15:26:04', 0),
(90, 5, '4', 'C', 1, 1, '2020-07-24 15:26:04', 0),
(91, 5, '5', 'A', 1, 1, '2020-07-24 15:26:04', 0),
(92, 5, '5', 'B', 1, 1, '2020-07-24 15:26:04', 0),
(93, 5, '5', 'C', 1, 1, '2020-07-24 15:26:04', 0),
(94, 5, '6', 'A', 1, 1, '2020-07-24 15:26:04', 0),
(95, 5, '6', 'B', 1, 1, '2020-07-24 15:26:04', 0),
(96, 5, '6', 'C', 1, 1, '2020-07-24 15:26:04', 0),
(97, 5, '7', 'A', 1, 1, '2020-07-24 15:26:04', 0),
(98, 5, '7', 'B', 1, 1, '2020-07-24 15:26:04', 0),
(99, 5, '7', 'C', 1, 1, '2020-07-24 15:26:04', 0),
(100, 5, '8', 'A', 1, 1, '2020-07-24 15:26:04', 0),
(101, 5, '8', 'B', 1, 1, '2020-07-24 15:26:04', 0),
(102, 5, '8', 'C', 1, 1, '2020-07-24 15:26:05', 0),
(103, 6, 'lo', '1', 4, 1, '2020-07-24 15:36:39', 0),
(104, 6, 'pb', '1', 5, 1, '2020-07-24 15:36:39', 0),
(105, 6, '1', 'A', 1, 1, '2020-07-24 15:36:39', 0),
(106, 6, '1', 'B', 1, 1, '2020-07-24 15:36:39', 0),
(107, 6, '1', 'C', 1, 1, '2020-07-24 15:36:39', 0),
(108, 6, '2', 'A', 1, 1, '2020-07-24 15:36:39', 0),
(109, 6, '2', 'B', 1, 1, '2020-07-24 15:36:39', 0),
(110, 6, '2', 'C', 1, 1, '2020-07-24 15:36:39', 0),
(111, 6, '3', 'A', 1, 1, '2020-07-24 15:36:39', 0),
(112, 6, '3', 'B', 1, 1, '2020-07-24 15:36:39', 0),
(113, 6, '3', 'C', 1, 1, '2020-07-24 15:36:39', 0),
(114, 6, '4', 'A', 1, 1, '2020-07-24 15:36:39', 0),
(115, 6, '4', 'B', 1, 1, '2020-07-24 15:36:39', 0),
(116, 6, '4', 'C', 1, 1, '2020-07-24 15:36:39', 0),
(117, 6, '5', 'A', 1, 1, '2020-07-24 15:36:39', 0),
(118, 6, '5', 'B', 1, 1, '2020-07-24 15:36:39', 0),
(119, 6, '5', 'C', 1, 1, '2020-07-24 15:36:39', 0),
(120, 6, '6', 'A', 1, 1, '2020-07-24 15:36:39', 0),
(121, 6, '6', 'B', 1, 1, '2020-07-24 15:36:39', 0),
(122, 6, '6', 'C', 1, 1, '2020-07-24 15:36:39', 0),
(123, 6, '7', 'A', 1, 1, '2020-07-24 15:36:39', 0),
(124, 6, '7', 'B', 1, 1, '2020-07-24 15:36:39', 0),
(125, 6, '7', 'C', 1, 1, '2020-07-24 15:36:39', 0),
(126, 6, '8', 'A', 1, 1, '2020-07-24 15:36:39', 0),
(127, 6, '8', 'B', 1, 1, '2020-07-24 15:36:39', 0),
(128, 6, '8', 'C', 1, 1, '2020-07-24 15:36:39', 0),
(129, 6, '9', 'A', 1, 1, '2020-07-24 15:36:39', 0),
(130, 6, '9', 'B', 1, 1, '2020-07-24 15:36:39', 0),
(131, 6, '10', 'A', 1, 1, '2020-07-24 15:36:39', 0),
(132, 6, '10', 'B', 1, 1, '2020-07-24 15:36:39', 0),
(133, 7, 'pb', '1', 1, 1, '2020-07-24 15:47:16', 0),
(134, 7, 'pb', '2', 1, 1, '2020-07-24 15:47:16', 0),
(135, 7, '1', 'A', 1, 1, '2020-07-24 15:47:16', 0),
(136, 7, '1', 'B', 1, 1, '2020-07-24 15:47:16', 0),
(137, 7, '2', 'A', 1, 1, '2020-07-24 15:47:16', 0),
(138, 7, '2', 'B', 1, 1, '2020-07-24 15:47:16', 0),
(139, 7, '3', 'A', 1, 1, '2020-07-24 15:47:16', 0),
(140, 7, '3', 'B', 1, 1, '2020-07-24 15:47:17', 0),
(141, 7, '4', 'A', 1, 1, '2020-07-24 15:47:17', 0),
(142, 7, '4', 'B', 1, 1, '2020-07-24 15:47:17', 0),
(143, 7, '5', 'A', 1, 1, '2020-07-24 15:47:17', 0),
(144, 7, '5', 'B', 1, 1, '2020-07-24 15:47:17', 0),
(145, 7, '6', 'A', 1, 1, '2020-07-24 15:47:17', 0),
(146, 7, '6', 'B', 1, 1, '2020-07-24 15:47:17', 0),
(147, 7, '7', 'A', 1, 1, '2020-07-24 15:47:17', 0),
(148, 7, '7', 'B', 1, 1, '2020-07-24 15:47:17', 0),
(149, 7, '8', 'A', 1, 1, '2020-07-24 15:47:17', 0),
(150, 7, '8', 'B', 1, 1, '2020-07-24 15:47:17', 0),
(151, 7, '9', 'A', 1, 1, '2020-07-24 15:47:17', 0),
(152, 7, '9', 'B', 1, 1, '2020-07-24 15:47:17', 0),
(153, 7, '10', 'A', 1, 1, '2020-07-24 15:47:17', 0),
(154, 7, '10', 'B', 1, 1, '2020-07-24 15:47:17', 0),
(155, 7, '11', 'A', 1, 1, '2020-07-24 15:47:17', 0),
(156, 7, '11', 'B', 1, 1, '2020-07-24 15:47:17', 0),
(157, 7, '12', 'A', 1, 1, '2020-07-24 15:47:17', 0),
(158, 7, '12', 'B', 1, 1, '2020-07-24 15:47:17', 0),
(159, 8, 'pb', '1', 5, 1, '2020-07-24 15:56:29', 0),
(160, 8, '1', 'A', 1, 1, '2020-07-24 15:56:29', 0),
(161, 8, '1', 'B', 1, 1, '2020-07-24 15:56:29', 0),
(162, 8, '1', 'C', 1, 1, '2020-07-24 15:56:29', 0),
(163, 8, '1', 'D', 1, 1, '2020-07-24 15:56:29', 0),
(164, 8, '1', 'E', 1, 1, '2020-07-24 15:56:29', 0),
(165, 8, '1', 'F', 1, 1, '2020-07-24 15:56:29', 0),
(166, 8, '1', 'G', 1, 1, '2020-07-24 15:56:29', 0),
(167, 8, '2', 'A', 1, 1, '2020-07-24 15:56:29', 0),
(168, 8, '2', 'B', 1, 1, '2020-07-24 15:56:29', 0),
(169, 8, '2', 'C', 1, 1, '2020-07-24 15:56:29', 0),
(170, 8, '2', 'D', 1, 1, '2020-07-24 15:56:29', 0),
(171, 8, '2', 'E', 1, 1, '2020-07-24 15:56:29', 0),
(172, 8, '2', 'F', 1, 1, '2020-07-24 15:56:29', 0),
(173, 8, '2', 'G', 1, 1, '2020-07-24 15:56:29', 0),
(174, 8, '3', 'A', 1, 1, '2020-07-24 15:56:29', 0),
(175, 8, '3', 'B', 1, 1, '2020-07-24 15:56:29', 0),
(176, 8, '3', 'C', 1, 1, '2020-07-24 15:56:29', 0),
(177, 8, '3', 'D', 1, 1, '2020-07-24 15:56:29', 0),
(178, 8, '3', 'E', 1, 1, '2020-07-24 15:56:29', 0),
(179, 8, '4', 'A', 1, 1, '2020-07-24 15:56:29', 0),
(180, 8, '4', 'B', 1, 1, '2020-07-24 15:56:29', 0),
(181, 8, '4', 'C', 1, 1, '2020-07-24 15:56:29', 0),
(182, 8, '4', 'D', 1, 1, '2020-07-24 15:56:29', 0),
(183, 8, '4', 'E', 1, 1, '2020-07-24 15:56:29', 0),
(184, 8, '5', 'A', 1, 1, '2020-07-24 15:56:29', 0),
(185, 8, '5', 'B', 1, 1, '2020-07-24 15:56:29', 0),
(186, 8, '5', 'C', 1, 1, '2020-07-24 15:56:29', 0),
(187, 8, '5', 'D', 1, 1, '2020-07-24 15:56:29', 0),
(188, 8, '5', 'E', 1, 1, '2020-07-24 15:56:29', 0),
(189, 8, '6', 'A', 1, 1, '2020-07-24 15:56:29', 0),
(190, 8, '6', 'B', 1, 1, '2020-07-24 15:56:29', 0),
(191, 8, '6', 'C', 1, 1, '2020-07-24 15:56:29', 0),
(192, 8, '6', 'D', 1, 1, '2020-07-24 15:56:29', 0),
(193, 8, '6', 'E', 1, 1, '2020-07-24 15:56:29', 0),
(194, 8, '7', 'A', 1, 1, '2020-07-24 15:56:29', 0),
(195, 8, '7', 'B', 1, 1, '2020-07-24 15:56:29', 0),
(196, 8, '7', 'C', 1, 1, '2020-07-24 15:56:29', 0),
(197, 8, '7', 'D', 1, 1, '2020-07-24 15:56:29', 0),
(198, 8, '7', 'E', 1, 1, '2020-07-24 15:56:29', 0),
(199, 8, '8', 'A', 1, 1, '2020-07-24 15:56:29', 0),
(200, 8, '8', 'B', 1, 1, '2020-07-24 15:56:29', 0),
(201, 8, '8', 'C', 1, 1, '2020-07-24 15:56:29', 0),
(202, 8, '8', 'D', 1, 1, '2020-07-24 15:56:29', 0),
(203, 8, '8', 'E', 1, 1, '2020-07-24 15:56:29', 0),
(204, 8, '9', 'A', 1, 1, '2020-07-24 15:56:29', 0),
(205, 8, '9', 'B', 1, 1, '2020-07-24 15:56:30', 0),
(206, 8, '9', 'C', 1, 1, '2020-07-24 15:56:30', 0),
(207, 8, '9', 'D', 1, 1, '2020-07-24 15:56:30', 0),
(208, 8, '10', 'A', 1, 1, '2020-07-24 15:56:30', 0),
(209, 8, '10', 'B', 1, 1, '2020-07-24 15:56:30', 0),
(210, 8, '10', 'C', 1, 1, '2020-07-24 15:56:30', 0),
(211, 8, '10', 'D', 1, 1, '2020-07-24 15:56:30', 0),
(212, 9, 'pb', '1', 1, 1, '2020-07-24 16:03:23', 0),
(213, 9, '1', 'A', 1, 1, '2020-07-24 16:03:23', 0),
(214, 9, '1', 'B', 1, 1, '2020-07-24 16:03:23', 0),
(215, 9, '2', 'A', 1, 1, '2020-07-24 16:03:23', 0),
(216, 9, '2', 'B', 1, 1, '2020-07-24 16:03:23', 0),
(217, 9, '3', 'A', 1, 1, '2020-07-24 16:03:23', 0),
(218, 9, '3', 'B', 1, 1, '2020-07-24 16:03:23', 0),
(219, 9, '4', 'A', 1, 1, '2020-07-24 16:03:23', 0),
(220, 9, '4', 'B', 1, 1, '2020-07-24 16:03:24', 0),
(221, 9, '5', 'A', 1, 1, '2020-07-24 16:03:24', 0),
(222, 9, '5', 'B', 1, 1, '2020-07-24 16:03:24', 0),
(223, 9, '6', 'A', 1, 1, '2020-07-24 16:03:24', 0),
(224, 9, '6', 'B', 1, 1, '2020-07-24 16:03:24', 0),
(225, 9, '7', 'A', 1, 1, '2020-07-24 16:03:24', 0),
(226, 9, '7', 'B', 1, 1, '2020-07-24 16:03:24', 0),
(227, 9, '8', 'A', 1, 1, '2020-07-24 16:03:24', 0),
(228, 9, '8', 'B', 1, 1, '2020-07-24 16:03:24', 0),
(229, 9, '9', 'A', 1, 1, '2020-07-24 16:03:24', 0),
(230, 9, '9', 'B', 1, 1, '2020-07-24 16:03:24', 0),
(231, 9, '10', 'A', 1, 1, '2020-07-24 16:03:24', 0),
(232, 10, '8', '1', 1, 1, '2020-07-24 16:10:47', 0),
(233, 12, 'pb', '1', 5, 1, '2020-07-24 16:16:00', 0),
(234, 12, '1', '1', 1, 1, '2020-07-24 16:16:00', 0),
(235, 12, '1', '2', 1, 1, '2020-07-24 16:16:00', 0),
(236, 12, '1', '3', 1, 1, '2020-07-24 16:16:00', 0),
(237, 12, '1', '4', 1, 1, '2020-07-24 16:16:00', 0),
(238, 12, '1', '5', 1, 1, '2020-07-24 16:16:00', 0),
(239, 12, '1', '6', 1, 1, '2020-07-24 16:16:00', 0),
(240, 12, '1', '7', 1, 1, '2020-07-24 16:16:00', 0),
(241, 12, '1', '8', 1, 1, '2020-07-24 16:16:00', 0),
(242, 12, '2', '1', 1, 1, '2020-07-24 16:16:00', 0),
(243, 12, '2', '2', 1, 1, '2020-07-24 16:16:00', 0),
(244, 12, '2', '3', 1, 1, '2020-07-24 16:16:00', 0),
(245, 12, '2', '4', 1, 1, '2020-07-24 16:16:00', 0),
(246, 12, '2', '5', 1, 1, '2020-07-24 16:16:00', 0),
(247, 12, '2', '6', 1, 1, '2020-07-24 16:16:00', 0),
(248, 12, '2', '7', 1, 1, '2020-07-24 16:16:00', 0),
(249, 12, '2', '8', 1, 1, '2020-07-24 16:16:00', 0),
(250, 12, '3', '1', 1, 1, '2020-07-24 16:16:00', 0),
(251, 12, '3', '2', 1, 1, '2020-07-24 16:16:00', 0),
(252, 12, '3', '3', 1, 1, '2020-07-24 16:16:00', 0),
(253, 12, '3', '4', 1, 1, '2020-07-24 16:16:00', 0),
(254, 12, '3', '5', 1, 1, '2020-07-24 16:16:00', 0),
(255, 12, '3', '6', 1, 1, '2020-07-24 16:16:00', 0),
(256, 12, '3', '7', 1, 1, '2020-07-24 16:16:00', 0),
(257, 12, '3', '8', 1, 1, '2020-07-24 16:16:00', 0),
(258, 12, '4', '1', 1, 1, '2020-07-24 16:16:00', 0),
(259, 12, '4', '2', 1, 1, '2020-07-24 16:16:00', 0),
(260, 12, '4', '3', 1, 1, '2020-07-24 16:16:00', 0),
(261, 12, '4', '4', 1, 1, '2020-07-24 16:16:00', 0),
(262, 12, '4', '5', 1, 1, '2020-07-24 16:16:00', 0),
(263, 12, '4', '6', 1, 1, '2020-07-24 16:16:00', 0),
(264, 12, '4', '7', 1, 1, '2020-07-24 16:16:00', 0),
(265, 12, '4', '8', 1, 1, '2020-07-24 16:16:00', 0),
(266, 12, '5', '1', 1, 1, '2020-07-24 16:16:00', 0),
(267, 12, '5', '2', 1, 1, '2020-07-24 16:16:00', 0),
(268, 12, '5', '3', 1, 1, '2020-07-24 16:16:00', 0),
(269, 12, '5', '4', 1, 1, '2020-07-24 16:16:00', 0),
(270, 12, '5', '5', 1, 1, '2020-07-24 16:16:00', 0),
(271, 12, '5', '6', 1, 1, '2020-07-24 16:16:00', 0),
(272, 12, '5', '7', 1, 1, '2020-07-24 16:16:00', 0),
(273, 12, '5', '8', 1, 1, '2020-07-24 16:16:00', 0),
(274, 12, '6', '1', 1, 1, '2020-07-24 16:16:00', 0),
(275, 12, '6', '2', 1, 1, '2020-07-24 16:16:00', 0),
(276, 12, '6', '3', 1, 1, '2020-07-24 16:16:00', 0),
(277, 12, '6', '4', 1, 1, '2020-07-24 16:16:00', 0),
(278, 12, '6', '5', 1, 1, '2020-07-24 16:16:00', 0),
(279, 12, '6', '6', 1, 1, '2020-07-24 16:16:00', 0),
(280, 12, '6', '7', 1, 1, '2020-07-24 16:16:00', 0),
(281, 12, '6', '8', 1, 1, '2020-07-24 16:16:00', 0),
(282, 12, '7', '1', 1, 1, '2020-07-24 16:16:00', 0),
(283, 12, '7', '2', 1, 1, '2020-07-24 16:16:00', 0),
(284, 12, '7', '3', 1, 1, '2020-07-24 16:16:00', 0),
(285, 12, '7', '4', 1, 1, '2020-07-24 16:16:00', 0),
(286, 12, '7', '5', 1, 1, '2020-07-24 16:16:00', 0),
(287, 12, '7', '6', 1, 1, '2020-07-24 16:16:00', 0),
(288, 12, '7', '7', 1, 1, '2020-07-24 16:16:00', 0),
(289, 12, '7', '8', 1, 1, '2020-07-24 16:16:00', 0),
(290, 12, '8', '1', 1, 1, '2020-07-24 16:16:00', 0),
(291, 12, '8', '2', 1, 1, '2020-07-24 16:16:00', 0),
(292, 12, '8', '3', 1, 1, '2020-07-24 16:16:00', 0),
(293, 12, '8', '4', 1, 1, '2020-07-24 16:16:00', 0),
(294, 12, '8', '5', 1, 1, '2020-07-24 16:16:00', 0),
(295, 12, '8', '6', 1, 1, '2020-07-24 16:16:00', 0),
(296, 12, '8', '7', 1, 1, '2020-07-24 16:16:00', 0),
(297, 12, '8', '8', 1, 1, '2020-07-24 16:16:01', 0),
(298, 12, '9', '1', 1, 1, '2020-07-24 16:16:01', 0),
(299, 12, '9', '2', 1, 1, '2020-07-24 16:16:01', 0),
(300, 12, '9', '3', 1, 1, '2020-07-24 16:16:01', 0),
(301, 12, '9', '4', 1, 1, '2020-07-24 16:16:01', 0),
(302, 12, '9', '5', 1, 1, '2020-07-24 16:16:01', 0),
(303, 12, '9', '6', 1, 1, '2020-07-24 16:16:01', 0),
(304, 12, '9', '7', 1, 1, '2020-07-24 16:16:01', 0),
(305, 12, '9', '8', 1, 1, '2020-07-24 16:16:01', 0),
(306, 12, '10', '1', 1, 1, '2020-07-24 16:16:01', 0),
(307, 12, '10', '2', 1, 1, '2020-07-24 16:16:01', 0),
(308, 12, '10', '3', 1, 1, '2020-07-24 16:16:01', 0),
(309, 12, '10', '4', 1, 1, '2020-07-24 16:16:01', 0),
(310, 12, '10', '5', 1, 1, '2020-07-24 16:16:01', 0),
(311, 12, '10', '6', 1, 1, '2020-07-24 16:16:01', 0),
(312, 12, '10', '7', 1, 1, '2020-07-24 16:16:01', 0),
(313, 12, '10', '8', 1, 1, '2020-07-24 16:16:01', 0),
(314, 12, '11', '1', 1, 1, '2020-07-24 16:16:01', 0),
(315, 12, '11', '2', 1, 1, '2020-07-24 16:16:01', 0),
(316, 12, '11', '3', 1, 1, '2020-07-24 16:16:01', 0),
(317, 12, '11', '4', 1, 1, '2020-07-24 16:16:01', 0),
(318, 12, '11', '5', 1, 1, '2020-07-24 16:16:01', 0),
(319, 12, '11', '6', 1, 1, '2020-07-24 16:16:01', 0),
(320, 12, '11', '7', 1, 1, '2020-07-24 16:16:01', 0),
(321, 12, '11', '8', 1, 1, '2020-07-24 16:16:01', 0),
(322, 12, '12', '1', 1, 1, '2020-07-24 16:16:01', 0),
(323, 12, '12', '2', 1, 1, '2020-07-24 16:16:01', 0),
(324, 12, '12', '3', 1, 1, '2020-07-24 16:16:01', 0),
(325, 12, '12', '4', 1, 1, '2020-07-24 16:16:01', 0),
(326, 12, '12', '5', 1, 1, '2020-07-24 16:16:01', 0),
(327, 12, '12', '6', 1, 1, '2020-07-24 16:16:01', 0),
(328, 12, '12', '7', 1, 1, '2020-07-24 16:16:01', 0),
(329, 12, '12', '8', 1, 1, '2020-07-24 16:16:01', 0),
(330, 13, 'pb', '1', 5, -1, '2020-07-24 16:21:15', 0),
(331, 13, '1', 'A', 1, 1, '2020-07-24 16:21:15', 0),
(332, 13, '1', 'B', 1, 1, '2020-07-24 16:21:15', 0),
(333, 13, '1', 'C', 1, 1, '2020-07-24 16:21:15', 0),
(334, 13, '1', 'D', 1, 1, '2020-07-24 16:21:15', 0),
(335, 13, '2', 'A', 1, 1, '2020-07-24 16:21:15', 0),
(336, 13, '2', 'B', 1, 1, '2020-07-24 16:21:15', 0),
(337, 13, '2', 'C', 1, 1, '2020-07-24 16:21:15', 0),
(338, 13, '2', 'D', 1, 1, '2020-07-24 16:21:15', 0),
(339, 13, '3', 'A', 1, 1, '2020-07-24 16:21:15', 0),
(340, 13, '3', 'B', 1, 1, '2020-07-24 16:21:15', 0),
(341, 13, '3', 'C', 1, 1, '2020-07-24 16:21:15', 0),
(342, 13, '3', 'D', 1, 1, '2020-07-24 16:21:15', 0),
(343, 13, '4', 'A', 1, 1, '2020-07-24 16:21:15', 0),
(344, 13, '4', 'B', 1, 1, '2020-07-24 16:21:15', 0),
(345, 13, '4', 'C', 1, 1, '2020-07-24 16:21:15', 0),
(346, 13, '4', 'D', 1, 1, '2020-07-24 16:21:15', 0),
(347, 13, '5', 'A', 1, 1, '2020-07-24 16:21:15', 0),
(348, 13, '5', 'B', 1, 1, '2020-07-24 16:21:15', 0),
(349, 13, '5', 'C', 1, 1, '2020-07-24 16:21:15', 0),
(350, 13, '5', 'D', 1, 1, '2020-07-24 16:21:15', 0),
(351, 14, '1', 'A', 1, 1, '2020-07-24 22:32:36', 0),
(352, 16, 'pb', '1', 5, 1, '2020-07-24 22:38:17', 0),
(353, 16, '1', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(354, 16, '1', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(355, 16, '1', 'C', 1, 1, '2020-07-24 22:38:17', 0),
(356, 16, '2', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(357, 16, '2', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(358, 16, '2', 'C', 1, 1, '2020-07-24 22:38:17', 0),
(359, 16, '3', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(360, 16, '3', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(361, 16, '3', 'C', 1, 1, '2020-07-24 22:38:17', 0),
(362, 16, '4', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(363, 16, '4', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(364, 16, '4', 'C', 1, 1, '2020-07-24 22:38:17', 0),
(365, 16, '5', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(366, 16, '5', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(367, 16, '5', 'C', 1, 1, '2020-07-24 22:38:17', 0),
(368, 16, '6', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(369, 16, '6', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(370, 16, '6', 'C', 1, 1, '2020-07-24 22:38:17', 0),
(371, 16, '7', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(372, 16, '7', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(373, 16, '7', 'C', 1, 1, '2020-07-24 22:38:17', 0),
(374, 16, '8', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(375, 16, '8', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(376, 16, '8', 'C', 1, 1, '2020-07-24 22:38:17', 0),
(377, 16, '9', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(378, 16, '9', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(379, 16, '9', 'C', 1, 1, '2020-07-24 22:38:17', 0),
(380, 16, '10', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(381, 16, '10', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(382, 16, '10', 'C', 1, 1, '2020-07-24 22:38:17', 0),
(383, 16, '11', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(384, 16, '11', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(385, 16, '12', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(386, 16, '13', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(387, 16, '13', 'B', 1, 1, '2020-07-24 22:38:17', 0),
(388, 16, '14', 'A', 1, 1, '2020-07-24 22:38:17', 0),
(389, 17, 'pb', '1', 1, -1, '2020-07-24 22:45:01', 0),
(390, 17, 'pb', '2', 1, -1, '2020-07-24 22:45:01', 0),
(391, 17, 'pb', '3', 1, -1, '2020-07-24 22:45:01', 0),
(392, 17, 'pb', '4', 1, -1, '2020-07-24 22:45:01', 0),
(393, 17, 'pb', '5', 1, -1, '2020-07-24 22:45:01', 0),
(394, 17, 'pb', '6', 1, -1, '2020-07-24 22:45:01', 0),
(395, 17, 'pb', '7', 1, -1, '2020-07-24 22:45:01', 0),
(396, 17, 'pb', '8', 1, -1, '2020-07-24 22:45:01', 0),
(397, 17, 'pb', '9', 1, -1, '2020-07-24 22:45:01', 0),
(398, 17, '1', 'A', 1, 1, '2020-07-24 22:45:01', 0),
(399, 17, '1', 'B', 1, 1, '2020-07-24 22:45:01', 0),
(400, 17, '1', 'C', 1, 1, '2020-07-24 22:45:01', 0),
(401, 17, '1', 'D', 1, 1, '2020-07-24 22:45:01', 0),
(402, 17, '2', 'A', 1, 1, '2020-07-24 22:45:01', 0),
(403, 17, '2', 'B', 1, 1, '2020-07-24 22:45:01', 0),
(404, 17, '2', 'C', 1, 1, '2020-07-24 22:45:01', 0),
(405, 17, '2', 'D', 1, 1, '2020-07-24 22:45:01', 0),
(406, 17, '3', 'A', 1, 1, '2020-07-24 22:45:01', 0),
(407, 17, '3', 'B', 1, 1, '2020-07-24 22:45:01', 0),
(408, 17, '3', 'C', 1, 1, '2020-07-24 22:45:01', 0),
(409, 17, '3', 'D', 1, 1, '2020-07-24 22:45:01', 0),
(410, 17, '4', 'A', 1, 1, '2020-07-24 22:45:01', 0),
(411, 17, '4', 'B', 1, 1, '2020-07-24 22:45:01', 0),
(412, 17, '4', 'C', 1, 1, '2020-07-24 22:45:01', 0),
(413, 17, '4', 'D', 1, 1, '2020-07-24 22:45:02', 0),
(414, 17, '5', 'A', 1, 1, '2020-07-24 22:45:02', 0),
(415, 17, '5', 'B', 1, 1, '2020-07-24 22:45:02', 0),
(416, 17, '5', 'C', 1, 1, '2020-07-24 22:45:02', 0),
(417, 17, '5', 'D', 1, 1, '2020-07-24 22:45:02', 0),
(418, 17, '6', 'A', 1, 1, '2020-07-24 22:45:02', 0),
(419, 17, '6', 'B', 1, 1, '2020-07-24 22:45:02', 0),
(420, 17, '6', 'C', 1, 1, '2020-07-24 22:45:02', 0),
(421, 17, '6', 'D', 1, 1, '2020-07-24 22:45:02', 0),
(422, 17, '7', 'A', 1, 1, '2020-07-24 22:45:02', 0),
(423, 17, '7', 'B', 1, 1, '2020-07-24 22:45:02', 0),
(424, 17, '7', 'C', 1, 1, '2020-07-24 22:45:02', 0),
(425, 17, '7', 'D', 1, 1, '2020-07-24 22:45:02', 0),
(426, 17, '8', 'A', 1, 1, '2020-07-24 22:45:02', 0),
(427, 17, '8', 'B', 1, 1, '2020-07-24 22:45:02', 0),
(428, 17, '8', 'C', 1, 1, '2020-07-24 22:45:02', 0),
(429, 17, '8', 'D', 1, 1, '2020-07-24 22:45:02', 0),
(430, 18, 'pb', '1', 1, 1, '2020-07-27 15:54:50', 0),
(431, 18, '1', '3', 1, 1, '2020-07-27 15:54:50', 0),
(432, 18, '1', '4', 1, 1, '2020-07-27 15:54:50', 0),
(433, 18, '1', '5', 1, 1, '2020-07-27 15:54:50', 0),
(434, 18, '1', '5', 1, 1, '2020-07-27 15:54:50', 0),
(435, 18, '2', '6', 1, 1, '2020-07-27 15:54:50', 0),
(436, 18, '2', '7', 1, 1, '2020-07-27 15:54:50', 0),
(437, 18, '2', '8', 1, 1, '2020-07-27 15:54:50', 0),
(438, 18, '3', '9', 1, 1, '2020-07-27 15:54:50', 0),
(439, 18, '3', '10', 1, 1, '2020-07-27 15:54:50', 0),
(440, 18, '3', '11', 1, 1, '2020-07-27 15:54:50', 0),
(441, 18, '4', '12', 1, 1, '2020-07-27 15:54:50', 0),
(442, 18, '4', '13', 1, 1, '2020-07-27 15:54:50', 0),
(443, 18, '4', '14', 1, 1, '2020-07-27 15:54:50', 0),
(444, 18, '5', '15', 1, 1, '2020-07-27 15:54:50', 0),
(445, 18, '5', '16', 1, 1, '2020-07-27 15:54:50', 0),
(446, 18, '5', '17', 1, 1, '2020-07-27 15:54:50', 0),
(447, 18, '6', '18', 1, 1, '2020-07-27 15:54:50', 0),
(448, 18, '6', '19', 1, 1, '2020-07-27 15:54:50', 0),
(449, 18, '6', '20', 1, 1, '2020-07-27 15:54:50', 0),
(450, 18, '7', '21', 1, 1, '2020-07-27 15:54:50', 0),
(451, 18, '7', '22', 1, 1, '2020-07-27 15:54:50', 0),
(452, 18, '7', '23', 1, 1, '2020-07-27 15:54:50', 0),
(453, 18, '8', '24', 1, 1, '2020-07-27 15:54:50', 0),
(454, 18, '8', '25', 1, 1, '2020-07-27 15:54:50', 0),
(455, 18, '8', '26', 1, 1, '2020-07-27 15:54:50', 0),
(456, 18, '9', '27', 1, 1, '2020-07-27 15:54:50', 0),
(457, 18, '9', '28', 1, 1, '2020-07-27 15:54:50', 0),
(458, 18, '9', '29', 1, 1, '2020-07-27 15:54:50', 0),
(459, 18, '10', '30', 1, 1, '2020-07-27 15:54:50', 0),
(460, 19, 'pb', '1', 1, 1, '2020-07-27 16:04:08', 0),
(461, 19, 'pb', '2', 1, 1, '2020-07-27 16:04:08', 0),
(462, 19, '1', '1', 1, 1, '2020-07-27 16:04:08', 0),
(463, 19, '1', '2', 1, 1, '2020-07-27 16:04:08', 0),
(464, 19, '1', '3', 1, 1, '2020-07-27 16:04:08', 0),
(465, 19, '1', '4', 1, 1, '2020-07-27 16:04:08', 0),
(466, 19, '2', '5', 1, 1, '2020-07-27 16:04:08', 0),
(467, 19, '2', '6', 1, 1, '2020-07-27 16:04:08', 0),
(468, 19, '3', '7', 1, 1, '2020-07-27 16:04:08', 0),
(469, 19, '3', '8', 1, 1, '2020-07-27 16:04:08', 0),
(470, 19, '4', '9', 1, 1, '2020-07-27 16:04:08', 0),
(471, 19, '4', '10', 1, 1, '2020-07-27 16:04:08', 0),
(472, 20, 'pb', '1', 1, 1, '2020-07-27 16:09:23', 0),
(473, 20, 'pb', '2', 1, 1, '2020-07-27 16:09:23', 0),
(474, 20, '1', 'A', 1, 1, '2020-07-27 16:09:23', 0),
(475, 20, '1', 'B', 1, 1, '2020-07-27 16:09:23', 0),
(476, 20, '2', 'A', 1, 1, '2020-07-27 16:09:23', 0),
(477, 20, '2', 'B', 1, 1, '2020-07-27 16:09:23', 0),
(478, 20, '3', 'A', 1, 1, '2020-07-27 16:09:23', 0),
(479, 20, '3', 'B', 1, 1, '2020-07-27 16:09:23', 0),
(480, 20, '4', 'A', 1, 1, '2020-07-27 16:09:23', 0),
(481, 20, '4', 'B', 1, 1, '2020-07-27 16:09:23', 0),
(482, 20, '5', 'A', 1, 1, '2020-07-27 16:09:23', 0),
(483, 20, '5', 'B', 1, 1, '2020-07-27 16:09:23', 0),
(484, 20, '6', 'A', 1, 1, '2020-07-27 16:09:23', 0),
(485, 20, '6', 'B', 1, 1, '2020-07-27 16:09:24', 0),
(486, 20, '7', 'A', 1, 1, '2020-07-27 16:09:24', 0),
(487, 20, '7', 'B', 1, 1, '2020-07-27 16:09:24', 0),
(488, 20, '8', 'A', 1, 1, '2020-07-27 16:09:24', 0),
(489, 20, '8', 'B', 1, 1, '2020-07-27 16:09:24', 0),
(490, 21, 'pb', '1', 1, 1, '2020-07-27 16:19:25', 0),
(491, 21, 'pb', '2', 1, 1, '2020-07-27 16:19:25', 0),
(492, 21, 'pb', '3', 1, 1, '2020-07-27 16:19:25', 0),
(493, 21, 'pb', '4', 1, 1, '2020-07-27 16:19:25', 0),
(494, 21, '1', 'A', 1, 1, '2020-07-27 16:19:25', 0),
(495, 21, '1', 'B', 1, 1, '2020-07-27 16:19:25', 0),
(496, 21, '1', 'C', 1, 1, '2020-07-27 16:19:25', 0),
(497, 21, '2', 'A', 1, 1, '2020-07-27 16:19:25', 0),
(498, 21, '2', 'B', 1, 1, '2020-07-27 16:19:25', 0),
(499, 21, '2', 'C', 1, 1, '2020-07-27 16:19:25', 0),
(500, 21, '3', 'A', 1, 1, '2020-07-27 16:19:25', 0),
(501, 21, '3', 'B', 1, 1, '2020-07-27 16:19:25', 0),
(502, 21, '3', 'C', 1, 1, '2020-07-27 16:19:25', 0),
(503, 21, '4', 'A', 1, 1, '2020-07-27 16:19:25', 0),
(504, 21, '4', 'B', 1, 1, '2020-07-27 16:19:25', 0),
(505, 21, '4', 'C', 1, 1, '2020-07-27 16:19:25', 0),
(506, 21, '5', 'A', 1, 1, '2020-07-27 16:19:25', 0),
(507, 21, '5', 'B', 1, 1, '2020-07-27 16:19:25', 0),
(508, 21, '5', 'C', 1, 1, '2020-07-27 16:19:25', 0),
(509, 21, '6', 'A', 1, 1, '2020-07-27 16:19:25', 0),
(510, 21, '6', 'B', 1, 1, '2020-07-27 16:19:25', 0),
(511, 21, '6', 'C', 1, 1, '2020-07-27 16:19:25', 0),
(512, 22, 'pb', '1', 5, 1, '2020-07-27 16:37:21', 0),
(513, 22, '1', 'A', 1, 1, '2020-07-27 16:37:21', 0),
(514, 22, '1', 'B', 1, 1, '2020-07-27 16:37:21', 0),
(515, 22, '2', 'A', 1, 1, '2020-07-27 16:37:21', 0),
(516, 22, '2', 'B', 1, 1, '2020-07-27 16:37:21', 0),
(517, 22, '3', 'A', 1, 1, '2020-07-27 16:37:21', 0),
(518, 22, '3', 'B', 1, 1, '2020-07-27 16:37:21', 0),
(519, 22, '4', 'A', 1, 1, '2020-07-27 16:37:21', 0),
(520, 22, '4', 'B', 1, 1, '2020-07-27 16:37:21', 0),
(521, 22, '5', 'A', 1, 1, '2020-07-27 16:37:21', 0),
(522, 22, '5', 'B', 1, 1, '2020-07-27 16:37:21', 0),
(523, 22, '6', 'A', 1, 1, '2020-07-27 16:37:21', 0),
(524, 22, '6', 'B', 1, 1, '2020-07-27 16:37:21', 0),
(525, 22, '7', 'A', 1, 1, '2020-07-27 16:37:21', 0),
(526, 22, '7', 'B', 1, 1, '2020-07-27 16:37:21', 0),
(527, 22, '8', 'A', 1, 1, '2020-07-27 16:37:21', 0),
(528, 23, 'pb', '1', 1, 1, '2020-07-27 17:01:29', 0),
(529, 23, 'pb', '2', 1, 1, '2020-07-27 17:01:29', 0),
(530, 23, 'pb', '3', 1, 1, '2020-07-27 17:01:29', 0),
(531, 23, 'pb', '4', 1, 1, '2020-07-27 17:01:29', 0),
(532, 23, 'pb', '5', 1, 1, '2020-07-27 17:01:29', 0),
(533, 23, 'pb', '6', 1, 1, '2020-07-27 17:01:29', 0),
(534, 23, 'pb', '7', 1, 1, '2020-07-27 17:01:29', 0),
(535, 23, 'pb', '8', 1, 1, '2020-07-27 17:01:29', 0),
(536, 23, 'pb', '9', 1, 1, '2020-07-27 17:01:29', 0),
(537, 23, '1', 'A', 1, 1, '2020-07-27 17:01:29', 0),
(538, 23, '1', 'B', 1, 1, '2020-07-27 17:01:29', 0),
(539, 23, '1', 'C', 1, 1, '2020-07-27 17:01:29', 0),
(540, 23, '1', 'D', 1, 1, '2020-07-27 17:01:29', 0),
(541, 23, '1', 'E', 1, 1, '2020-07-27 17:01:29', 0),
(542, 23, '1', 'F', 1, 1, '2020-07-27 17:01:29', 0),
(543, 23, '1', 'G', 1, 1, '2020-07-27 17:01:29', 0),
(544, 23, '1', 'I', 1, 1, '2020-07-27 17:01:29', 0),
(545, 23, '2', 'A', 1, 1, '2020-07-27 17:01:29', 0),
(546, 23, '2', 'B', 1, 1, '2020-07-27 17:01:29', 0),
(547, 23, '2', 'C', 1, 1, '2020-07-27 17:01:29', 0),
(548, 23, '2', 'D', 1, 1, '2020-07-27 17:01:29', 0),
(549, 23, '2', 'E', 1, 1, '2020-07-27 17:01:29', 0),
(550, 23, '2', 'F', 1, 1, '2020-07-27 17:01:29', 0),
(551, 23, '2', 'G', 1, 1, '2020-07-27 17:01:29', 0),
(552, 23, '2', 'I', 1, 1, '2020-07-27 17:01:29', 0),
(553, 23, '3', 'A', 1, 1, '2020-07-27 17:01:29', 0),
(554, 23, '3', 'B', 1, 1, '2020-07-27 17:01:29', 0),
(555, 23, '3', 'C', 1, 1, '2020-07-27 17:01:29', 0),
(556, 23, '3', 'D', 1, 1, '2020-07-27 17:01:29', 0),
(557, 23, '3', 'E', 1, 1, '2020-07-27 17:01:29', 0),
(558, 23, '3', 'F', 1, 1, '2020-07-27 17:01:29', 0),
(559, 23, '3', 'G', 1, 1, '2020-07-27 17:01:29', 0),
(560, 23, '3', 'I', 1, 1, '2020-07-27 17:01:29', 0),
(561, 23, '4', 'A', 1, 1, '2020-07-27 17:01:29', 0),
(562, 23, '4', 'B', 1, 1, '2020-07-27 17:01:29', 0),
(563, 23, '4', 'C', 1, 1, '2020-07-27 17:01:29', 0),
(564, 23, '4', 'D', 1, 1, '2020-07-27 17:01:29', 0),
(565, 23, '4', 'E', 1, 1, '2020-07-27 17:01:29', 0),
(566, 23, '4', 'F', 1, 1, '2020-07-27 17:01:29', 0),
(567, 23, '4', 'G', 1, 1, '2020-07-27 17:01:29', 0),
(568, 23, '4', 'I', 1, 1, '2020-07-27 17:01:29', 0),
(569, 23, '5', 'A', 1, 1, '2020-07-27 17:01:29', 0),
(570, 23, '5', 'B', 1, 1, '2020-07-27 17:01:29', 0),
(571, 23, '5', 'C', 1, 1, '2020-07-27 17:01:29', 0),
(572, 23, '5', 'D', 1, 1, '2020-07-27 17:01:29', 0),
(573, 23, '5', 'E', 1, 1, '2020-07-27 17:01:29', 0),
(574, 23, '5', 'F', 1, 1, '2020-07-27 17:01:29', 0),
(575, 23, '5', 'G', 1, 1, '2020-07-27 17:01:29', 0),
(576, 23, '5', 'I', 1, 1, '2020-07-27 17:01:29', 0),
(577, 23, '6', 'A', 1, 1, '2020-07-27 17:01:29', 0),
(578, 23, '6', 'B', 1, 1, '2020-07-27 17:01:29', 0),
(579, 23, '6', 'C', 1, 1, '2020-07-27 17:01:29', 0),
(580, 23, '6', 'D', 1, 1, '2020-07-27 17:01:29', 0),
(581, 23, '6', 'E', 1, 1, '2020-07-27 17:01:29', 0),
(582, 23, '6', 'F', 1, 1, '2020-07-27 17:01:29', 0),
(583, 23, '6', 'G', 1, 1, '2020-07-27 17:01:29', 0),
(584, 23, '6', 'I', 1, 1, '2020-07-27 17:01:29', 0),
(585, 23, '7', 'A', 1, 1, '2020-07-27 17:01:29', 0),
(586, 23, '7', 'B', 1, 1, '2020-07-27 17:01:29', 0),
(587, 23, '7', 'C', 1, 1, '2020-07-27 17:01:29', 0),
(588, 23, '7', 'D', 1, 1, '2020-07-27 17:01:29', 0),
(589, 23, '7', 'E', 1, 1, '2020-07-27 17:01:29', 0),
(590, 23, '7', 'F', 1, 1, '2020-07-27 17:01:29', 0),
(591, 23, '7', 'G', 1, 1, '2020-07-27 17:01:29', 0),
(592, 23, '7', 'I', 1, 1, '2020-07-27 17:01:29', 0),
(593, 23, '8', 'A', 1, 1, '2020-07-27 17:01:29', 0),
(594, 23, '8', 'B', 1, 1, '2020-07-27 17:01:29', 0),
(595, 23, '8', 'C', 1, 1, '2020-07-27 17:01:29', 0),
(596, 23, '8', 'D', 1, 1, '2020-07-27 17:01:29', 0),
(597, 23, '8', 'E', 1, 1, '2020-07-27 17:01:29', 0),
(598, 23, '8', 'F', 1, 1, '2020-07-27 17:01:29', 0),
(599, 23, '8', 'G', 1, 1, '2020-07-27 17:01:29', 0),
(600, 23, '8', 'I', 1, 1, '2020-07-27 17:01:30', 0),
(601, 24, 'pb', '1', 1, 1, '2020-07-27 17:06:33', 0),
(602, 24, '1', 'A', 1, 1, '2020-07-27 17:06:34', 0),
(603, 24, '1', 'B', 1, 1, '2020-07-27 17:06:35', 0),
(604, 24, '1', 'C', 1, 1, '2020-07-27 17:06:36', 0),
(605, 24, '2', 'A', 1, 1, '2020-07-27 17:06:37', 0),
(606, 24, '2', 'B', 1, 1, '2020-07-27 17:06:37', 0),
(607, 24, '3', 'A', 1, 1, '2020-07-27 17:06:37', 0),
(608, 24, '3', 'B', 1, 1, '2020-07-27 17:06:37', 0),
(609, 24, '4', 'A', 1, 1, '2020-07-27 17:06:37', 0),
(610, 24, '4', 'B', 1, 1, '2020-07-27 17:06:37', 0),
(611, 24, '4', 'C', 1, 1, '2020-07-27 17:06:37', 0),
(612, 24, '5', 'A', 1, 1, '2020-07-27 17:06:37', 0),
(613, 24, '5', 'B', 1, 1, '2020-07-27 17:06:37', 0),
(614, 24, '6', 'A', 1, 1, '2020-07-27 17:06:37', 0),
(615, 24, '6', 'B', 1, 1, '2020-07-27 17:06:37', 0),
(616, 24, '7', 'A', 1, 1, '2020-07-27 17:06:37', 0),
(617, 25, '3', 'C', 1, 1, '2020-07-27 17:20:17', NULL),
(618, 27, 'pb', '1', 1, 1, '2020-07-28 21:00:20', 0),
(619, 27, 'pb', '2', 5, 1, '2020-07-28 21:00:20', 0),
(620, 27, '1', 'A', 1, 1, '2020-07-28 21:00:20', 0),
(621, 27, '1', 'B', 1, 1, '2020-07-28 21:00:20', 0),
(622, 27, '1', 'C', 1, 1, '2020-07-28 21:00:20', 0),
(623, 27, '2', 'A', 1, 1, '2020-07-28 21:00:20', 0),
(624, 27, '2', 'B', 1, 1, '2020-07-28 21:00:21', 0),
(625, 27, '2', 'C', 1, 1, '2020-07-28 21:00:21', 0),
(626, 27, '3', 'A', 1, 1, '2020-07-28 21:00:21', 0),
(627, 27, '3', 'B', 1, 1, '2020-07-28 21:00:21', 0),
(628, 27, '3', 'C', 1, 1, '2020-07-28 21:00:21', 0),
(629, 27, '4', 'A', 1, 1, '2020-07-28 21:00:21', 0),
(630, 27, '4', 'B', 1, 1, '2020-07-28 21:00:21', 0),
(631, 27, '4', 'C', 1, 1, '2020-07-28 21:00:22', 0),
(632, 27, '5', 'A', 1, 1, '2020-07-28 21:00:22', 0),
(633, 27, '5', 'B', 1, 1, '2020-07-28 21:00:22', 0),
(634, 27, '5', 'C', 1, 1, '2020-07-28 21:00:22', 0),
(635, 27, '6', 'A', 1, 1, '2020-07-28 21:00:22', 0),
(636, 27, '6', 'B', 1, 1, '2020-07-28 21:00:22', 0),
(637, 27, '6', 'C', 1, 1, '2020-07-28 21:00:22', 0),
(638, 27, '7', 'A', 1, 1, '2020-07-28 21:00:22', 0),
(639, 27, '7', 'B', 1, 1, '2020-07-28 21:00:22', 0),
(640, 27, '7', 'C', 1, 1, '2020-07-28 21:00:22', 0),
(641, 27, '8', 'A', 1, 1, '2020-07-28 21:00:22', 0),
(642, 27, '8', 'B', 1, 1, '2020-07-28 21:00:22', 0),
(643, 27, '8', 'C', 1, 1, '2020-07-28 21:00:22', 0),
(644, 27, '9', 'A', 1, 1, '2020-07-28 21:00:22', 0),
(645, 27, '9', 'B', 1, 1, '2020-07-28 21:00:22', 0),
(646, 27, '9', 'C', 1, 1, '2020-07-28 21:00:22', 0),
(647, 28, 'pb', '1', 5, 1, '2020-07-28 21:05:25', 0),
(648, 28, '1', 'A', 1, 1, '2020-07-28 21:05:25', 0),
(649, 28, '1', 'B', 1, 1, '2020-07-28 21:05:25', 0),
(650, 28, '1', 'C', 1, 1, '2020-07-28 21:05:25', 0),
(651, 28, '1', 'D', 1, 1, '2020-07-28 21:05:25', 0),
(652, 28, '2', 'A', 1, 1, '2020-07-28 21:05:25', 0),
(653, 28, '2', 'B', 1, 1, '2020-07-28 21:05:25', 0),
(654, 28, '2', 'C', 1, 1, '2020-07-28 21:05:25', 0),
(655, 28, '2', 'D', 1, 1, '2020-07-28 21:05:25', 0),
(656, 28, '3', 'A', 1, 1, '2020-07-28 21:05:25', 0),
(657, 28, '3', 'B', 1, 1, '2020-07-28 21:05:25', 0),
(658, 28, '3', 'C', 1, 1, '2020-07-28 21:05:25', 0),
(659, 28, '3', 'D', 1, 1, '2020-07-28 21:05:25', 0),
(660, 28, '4', 'A', 1, 1, '2020-07-28 21:05:25', 0),
(661, 28, '4', 'B', 1, 1, '2020-07-28 21:05:25', 0),
(662, 28, '4', 'C', 1, 1, '2020-07-28 21:05:25', 0),
(663, 28, '4', 'D', 1, 1, '2020-07-28 21:05:25', 0),
(664, 28, '5', 'A', 1, 1, '2020-07-28 21:05:25', 0),
(665, 28, '5', 'B', 1, 1, '2020-07-28 21:05:25', 0),
(666, 28, '5', 'C', 1, 1, '2020-07-28 21:05:25', 0),
(667, 28, '5', 'D', 1, 1, '2020-07-28 21:05:25', 0),
(668, 28, '6', 'A', 1, 1, '2020-07-28 21:05:25', 0),
(669, 28, '6', 'B', 1, 1, '2020-07-28 21:05:25', 0),
(670, 28, '6', 'C', 1, 1, '2020-07-28 21:05:25', 0),
(671, 28, '6', 'D', 1, 1, '2020-07-28 21:05:25', 0),
(672, 28, '7', 'A', 1, 1, '2020-07-28 21:05:25', 0),
(673, 28, '7', 'B', 1, 1, '2020-07-28 21:05:25', 0),
(674, 28, '7', 'C', 1, 1, '2020-07-28 21:05:25', 0),
(675, 28, '7', 'D', 1, 1, '2020-07-28 21:05:25', 0),
(676, 28, '8', 'A', 1, 1, '2020-07-28 21:05:25', 0),
(677, 28, '8', 'B', 1, 1, '2020-07-28 21:05:25', 0),
(678, 28, '8', 'C', 1, 1, '2020-07-28 21:05:26', 0),
(679, 28, '8', 'D', 1, 1, '2020-07-28 21:05:26', 0),
(680, 28, '9', 'A', 1, 1, '2020-07-28 21:05:26', 0),
(681, 28, '9', 'B', 1, 1, '2020-07-28 21:05:26', 0),
(682, 28, '9', 'C', 1, 1, '2020-07-28 21:05:26', 0),
(683, 28, '9', 'D', 1, 1, '2020-07-28 21:05:26', 0),
(684, 28, '10', 'A', 1, 1, '2020-07-28 21:05:26', 0),
(685, 28, '10', 'B', 1, 1, '2020-07-28 21:05:26', 0),
(686, 28, '10', 'C', 1, 1, '2020-07-28 21:05:26', 0),
(687, 28, '10', 'D', 1, 1, '2020-07-28 21:05:26', 0),
(688, 29, 'pb', '1', 1, 1, '2020-07-28 21:23:17', 0),
(689, 29, '1', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(690, 29, '1', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(691, 29, '2', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(692, 29, '2', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(693, 29, '3', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(694, 29, '3', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(695, 29, '4', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(696, 29, '4', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(697, 29, '5', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(698, 29, '5', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(699, 29, '6', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(700, 29, '6', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(701, 29, '7', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(702, 29, '7', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(703, 29, '8', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(704, 29, '8', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(705, 29, '9', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(706, 29, '9', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(707, 29, '10', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(708, 29, '10', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(709, 29, '11', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(710, 29, '11', 'B', 1, 1, '2020-07-28 21:23:17', 0),
(711, 29, '12', 'A', 1, 1, '2020-07-28 21:23:17', 0),
(712, 30, '3', '3', 1, 1, '2020-07-30 23:49:44', NULL),
(713, 32, 'pb', '00', 1, 1, '2020-07-31 16:44:31', 0),
(714, 32, '1', 'A', 1, 1, '2020-07-31 16:44:31', 0),
(715, 32, '1', 'B', 1, 1, '2020-07-31 16:44:31', 0),
(716, 32, '1', 'C', 1, 1, '2020-07-31 16:44:31', 0),
(717, 32, '1', 'D', 1, 1, '2020-07-31 16:44:31', 0),
(718, 32, '1', 'E', 1, 1, '2020-07-31 16:44:31', 0),
(719, 32, '1', 'F', 1, 1, '2020-07-31 16:44:31', 0),
(720, 32, '1', 'G', 1, 1, '2020-07-31 16:44:31', 0),
(721, 32, '2', 'A', 1, 1, '2020-07-31 16:44:31', 0),
(722, 32, '2', 'B', 1, 1, '2020-07-31 16:44:31', 0),
(723, 32, '2', 'C', 1, 1, '2020-07-31 16:44:31', 0),
(724, 32, '2', 'D', 1, 1, '2020-07-31 16:44:31', 0),
(725, 32, '2', 'E', 1, 1, '2020-07-31 16:44:31', 0),
(726, 32, '2', 'F', 1, 1, '2020-07-31 16:44:31', 0),
(727, 32, '2', 'G', 1, 1, '2020-07-31 16:44:31', 0),
(728, 32, '3', 'A', 1, 1, '2020-07-31 16:44:31', 0),
(729, 32, '3', 'B', 1, 1, '2020-07-31 16:44:31', 0),
(730, 32, '3', 'C', 1, 1, '2020-07-31 16:44:31', 0),
(731, 32, '4', 'A', 1, 1, '2020-07-31 16:44:31', 0),
(732, 32, '4', 'B', 1, 1, '2020-07-31 16:44:31', 0),
(733, 32, '4', 'C', 1, 1, '2020-07-31 16:44:31', 0),
(734, 32, '4', 'D', 1, 1, '2020-07-31 16:44:31', 0),
(735, 32, '4', 'E', 1, 1, '2020-07-31 16:44:31', 0),
(736, 32, '5', 'A', 1, 1, '2020-07-31 16:44:31', 0),
(737, 32, '5', 'B', 1, 1, '2020-07-31 16:44:31', 0),
(738, 32, '5', 'C', 1, 1, '2020-07-31 16:44:31', 0),
(739, 32, '5', 'D', 1, 1, '2020-07-31 16:44:31', 0),
(740, 32, '5', 'E', 1, 1, '2020-07-31 16:44:31', 0),
(741, 32, '6', 'A', 1, 1, '2020-07-31 16:44:31', 0),
(742, 32, '6', 'B', 1, 1, '2020-07-31 16:44:31', 0),
(743, 32, '6', 'C', 1, 1, '2020-07-31 16:44:31', 0),
(744, 32, '6', 'D', 1, 1, '2020-07-31 16:44:31', 0),
(745, 32, '7', 'A', 1, 1, '2020-07-31 16:44:31', 0),
(746, 32, '7', 'B', 1, 1, '2020-07-31 16:44:31', 0),
(747, 32, '7', 'C', 1, 1, '2020-07-31 16:44:31', 0),
(748, 32, '7', 'D', 1, 1, '2020-07-31 16:44:31', 0),
(749, 32, '7', 'E', 1, 1, '2020-07-31 16:44:31', 0),
(750, 32, '8', 'A', 1, 1, '2020-07-31 16:44:31', 0),
(751, 32, '8', 'B', 1, 1, '2020-07-31 16:44:31', 0),
(752, 32, '8', 'C', 1, 1, '2020-07-31 16:44:31', 0),
(753, 32, '8', 'D', 1, 1, '2020-07-31 16:44:31', 0),
(754, 32, '8', 'E', 1, 1, '2020-07-31 16:44:31', 0),
(755, 32, '9', 'A', 1, 1, '2020-07-31 16:44:31', 0),
(756, 32, '9', 'B', 1, 1, '2020-07-31 16:44:31', 0),
(757, 32, '9', 'C', 1, 1, '2020-07-31 16:44:31', 0),
(758, 32, '10', 'A', 1, 1, '2020-07-31 16:44:31', 0),
(759, 32, '10', 'B', 1, 1, '2020-07-31 16:44:31', 0),
(760, 32, '10', 'C', 1, 1, '2020-07-31 16:44:31', 0),
(761, 32, '10', 'D', 1, 1, '2020-07-31 16:44:31', 0),
(762, 33, 'pb', 'a', 1, 1, '2020-07-31 16:57:08', 0),
(763, 33, 'pb', 'B', 1, 1, '2020-07-31 16:57:08', 0),
(764, 33, 'pb', 'C', 1, 1, '2020-07-31 16:57:08', 0),
(765, 33, 'pb', 'D', 1, 1, '2020-07-31 16:57:08', 0),
(766, 33, 'pb', 'E', 1, 1, '2020-07-31 16:57:08', 0),
(767, 33, 'pb', 'F', 1, 1, '2020-07-31 16:57:08', 0),
(768, 33, '1', 'A', 1, 1, '2020-07-31 16:57:08', 0),
(769, 33, '1', 'B', 1, 1, '2020-07-31 16:57:08', 0),
(770, 33, '1', 'C', 1, 1, '2020-07-31 16:57:08', 0),
(771, 33, '1', 'D', 1, 1, '2020-07-31 16:57:08', 0),
(772, 33, '1', 'E', 1, 1, '2020-07-31 16:57:08', 0),
(773, 33, '1', 'F', 1, 1, '2020-07-31 16:57:08', 0),
(774, 33, '2', 'A', 1, 1, '2020-07-31 16:57:08', 0),
(775, 33, '2', 'B', 1, 1, '2020-07-31 16:57:08', 0),
(776, 33, '2', 'C', 1, 1, '2020-07-31 16:57:08', 0),
(777, 33, '2', 'D', 1, 1, '2020-07-31 16:57:08', 0),
(778, 33, '2', 'E', 1, 1, '2020-07-31 16:57:08', 0),
(779, 33, '2', 'F', 1, 1, '2020-07-31 16:57:08', 0),
(780, 34, 'pb', 'A', 1, 1, '2020-07-31 17:04:55', 0),
(781, 34, '1', 'A', 1, 1, '2020-07-31 17:04:55', 0),
(782, 34, '1', 'B', 1, 1, '2020-07-31 17:04:55', 0),
(783, 34, '1', 'C', 1, 1, '2020-07-31 17:04:55', 0),
(784, 34, '1', 'D', 1, 1, '2020-07-31 17:04:55', 0),
(785, 34, '2', 'A', 1, 1, '2020-07-31 17:04:55', 0),
(786, 34, '2', 'B', 1, 1, '2020-07-31 17:04:55', 0),
(787, 34, '2', 'C', 1, 1, '2020-07-31 17:04:55', 0),
(788, 34, '2', 'D', 1, 1, '2020-07-31 17:04:55', 0),
(789, 34, '3', 'A', 1, 1, '2020-07-31 17:04:55', 0),
(790, 34, '3', 'B', 1, 1, '2020-07-31 17:04:55', 0),
(791, 34, '3', 'C', 1, 1, '2020-07-31 17:04:55', 0),
(792, 34, '3', 'D', 1, 1, '2020-07-31 17:04:55', 0),
(793, 34, '4', 'A', 1, 1, '2020-07-31 17:04:55', 0),
(794, 34, '4', 'B', 1, 1, '2020-07-31 17:04:55', 0),
(795, 34, '4', 'C', 1, 1, '2020-07-31 17:04:55', 0),
(796, 34, '4', 'D', 1, 1, '2020-07-31 17:04:55', 0),
(797, 34, '5', 'A', 1, 1, '2020-07-31 17:04:55', 0),
(798, 34, '5', 'B', 1, 1, '2020-07-31 17:04:55', 0),
(799, 34, '5', 'C', 1, 1, '2020-07-31 17:04:55', 0),
(800, 34, '5', 'D', 1, 1, '2020-07-31 17:04:55', 0),
(801, 34, '6', 'A', 1, 1, '2020-07-31 17:04:55', 0),
(802, 34, '6', 'B', 1, 1, '2020-07-31 17:04:55', 0),
(803, 34, '6', 'C', 1, 1, '2020-07-31 17:04:55', 0),
(804, 34, '6', 'D', 1, 1, '2020-07-31 17:04:55', 0),
(805, 34, '7', 'A', 1, 1, '2020-07-31 17:04:55', 0),
(806, 34, '7', 'B', 1, 1, '2020-07-31 17:04:55', 0),
(807, 34, '7', 'C', 1, 1, '2020-07-31 17:04:55', 0),
(808, 34, '7', 'D', 1, 1, '2020-07-31 17:04:55', 0),
(809, 34, '8', 'A', 1, 1, '2020-07-31 17:04:55', 0),
(810, 34, '8', 'B', 1, 1, '2020-07-31 17:04:55', 0),
(811, 34, '8', 'C', 1, 1, '2020-07-31 17:04:56', 0),
(812, 34, '8', 'D', 1, 1, '2020-07-31 17:04:56', 0),
(813, 34, '9', 'A', 1, 1, '2020-07-31 17:04:56', 0),
(814, 34, '9', 'B', 1, 1, '2020-07-31 17:04:56', 0),
(815, 34, '9', 'C', 1, 1, '2020-07-31 17:04:56', 0),
(816, 34, '9', 'D', 1, 1, '2020-07-31 17:04:56', 0),
(817, 34, '10', 'A', 1, 1, '2020-07-31 17:04:56', 0),
(818, 34, '10', 'B', 1, 1, '2020-07-31 17:04:56', 0),
(819, 34, '10', 'C', 1, 1, '2020-07-31 17:04:56', 0),
(820, 34, '11', 'A', 1, 1, '2020-07-31 17:04:56', 0),
(821, 34, '11', 'B', 1, 1, '2020-07-31 17:04:56', 0),
(822, 34, '11', 'C', 1, 1, '2020-07-31 17:04:56', 0),
(823, 34, '12', 'A', 1, 1, '2020-07-31 17:04:56', 0),
(824, 34, '12', 'B', 1, 1, '2020-07-31 17:04:56', 0),
(825, 34, '12', 'C', 1, 1, '2020-07-31 17:04:56', 0),
(826, 34, '13', 'A', 1, 1, '2020-07-31 17:04:56', 0),
(827, 34, '14', 'A', 1, 1, '2020-07-31 17:04:56', 0),
(828, 35, '1', 'A', 1, 1, '2020-07-31 17:40:30', 0),
(829, 35, '1', 'B', 1, 1, '2020-07-31 17:40:30', 0),
(830, 35, '1', 'C', 1, 1, '2020-07-31 17:40:30', 0),
(831, 35, '1', 'D', 1, 1, '2020-07-31 17:40:30', 0),
(832, 35, '2', 'A', 1, 1, '2020-07-31 17:40:30', 0),
(833, 35, '2', 'B', 1, 1, '2020-07-31 17:40:30', 0),
(834, 35, '2', 'C', 1, 1, '2020-07-31 17:40:30', 0),
(835, 35, '2', 'D', 1, 1, '2020-07-31 17:40:30', 0),
(836, 35, '3', 'A', 1, 1, '2020-07-31 17:40:30', 0),
(837, 35, '3', 'B', 1, 1, '2020-07-31 17:40:30', 0),
(838, 35, '3', 'C', 1, 1, '2020-07-31 17:40:30', 0),
(839, 35, '3', 'D', 1, 1, '2020-07-31 17:40:30', 0),
(840, 35, '4', 'A', 1, 1, '2020-07-31 17:40:30', 0),
(841, 35, '4', 'B', 1, 1, '2020-07-31 17:40:30', 0),
(842, 35, '4', 'C', 1, 1, '2020-07-31 17:40:30', 0),
(843, 35, '4', 'D', 1, 1, '2020-07-31 17:40:30', 0),
(844, 35, '4', 'E', 1, 1, '2020-07-31 17:40:30', 0),
(845, 35, '5', 'A', 1, 1, '2020-07-31 17:40:30', 0),
(846, 35, '5', 'B', 1, 1, '2020-07-31 17:40:30', 0),
(847, 35, '5', 'C', 1, 1, '2020-07-31 17:40:30', 0),
(848, 35, '5', 'D', 1, 1, '2020-07-31 17:40:30', 0),
(849, 35, '5', 'E', 1, 1, '2020-07-31 17:40:30', 0),
(850, 35, '6', 'A', 1, 1, '2020-07-31 17:40:30', 0),
(851, 35, '6', 'B', 1, 1, '2020-07-31 17:40:30', 0),
(852, 35, '6', 'C', 1, 1, '2020-07-31 17:40:30', 0),
(853, 35, '6', 'D', 1, 1, '2020-07-31 17:40:30', 0),
(854, 35, '6', 'E', 1, 1, '2020-07-31 17:40:30', 0),
(855, 35, '7', 'A', 1, 1, '2020-07-31 17:40:30', 0),
(856, 35, '7', 'B', 1, 1, '2020-07-31 17:40:30', 0),
(857, 35, '7', 'C', 1, 1, '2020-07-31 17:40:30', 0),
(858, 35, '7', 'D', 1, 1, '2020-07-31 17:40:30', 0),
(859, 35, '7', 'E', 1, 1, '2020-07-31 17:40:30', 0),
(860, 35, '8', 'A', 1, 1, '2020-07-31 17:40:30', 0),
(861, 35, '8', 'B', 1, 1, '2020-07-31 17:40:30', 0),
(862, 35, '8', 'C', 1, 1, '2020-07-31 17:40:30', 0),
(863, 35, '8', 'D', 1, 1, '2020-07-31 17:40:30', 0),
(864, 35, '8', 'E', 1, 1, '2020-07-31 17:40:30', 0),
(865, 35, '9', 'A', 1, 1, '2020-07-31 17:40:30', 0),
(866, 35, '9', 'B', 1, 1, '2020-07-31 17:40:30', 0),
(867, 35, '9', 'C', 1, 1, '2020-07-31 17:40:30', 0),
(868, 35, '9', 'D', 1, 1, '2020-07-31 17:40:30', 0),
(869, 35, '10', 'A', 1, 1, '2020-07-31 17:40:30', 0),
(870, 35, '10', 'B', 1, 1, '2020-07-31 17:40:30', 0),
(871, 35, '10', 'D', 1, 1, '2020-07-31 17:40:30', 0),
(872, 37, 'pb', '00', 1, 1, '2020-08-13 21:16:53', 0),
(873, 37, '1', 'A', 1, 1, '2020-08-13 21:16:53', 0),
(874, 37, '1', 'B', 1, 1, '2020-08-13 21:16:53', 0),
(875, 37, '2', 'A', 1, 1, '2020-08-13 21:16:53', 0),
(876, 37, '2', 'B', 1, 1, '2020-08-13 21:16:53', 0),
(877, 37, '3', 'A', 1, 1, '2020-08-13 21:16:53', 0),
(878, 37, '3', 'B', 1, 1, '2020-08-13 21:16:53', 0),
(879, 37, '4', 'A', 1, 1, '2020-08-13 21:16:53', 0),
(880, 37, '4', 'B', 1, 1, '2020-08-13 21:16:53', 0),
(881, 37, '5', 'A', 1, 1, '2020-08-13 21:16:53', 0),
(882, 37, '5', 'B', 1, 1, '2020-08-13 21:16:53', 0),
(883, 37, '6', 'A', 1, 1, '2020-08-13 21:16:53', 0),
(884, 37, '6', 'B', 1, 1, '2020-08-13 21:16:53', 0),
(885, 37, '7', 'A', 1, 1, '2020-08-13 21:16:53', 0),
(886, 37, '7', 'B', 1, 1, '2020-08-13 21:16:53', 0),
(887, 37, '8', 'A', 1, 1, '2020-08-13 21:16:53', 0),
(888, 37, '8', 'B', 1, 1, '2020-08-13 21:16:53', 0),
(889, 38, '1', 'A', 1, 1, '2020-08-13 21:59:09', 0),
(890, 38, '2', 'A', 1, 1, '2020-08-13 21:59:09', 0),
(891, 38, '3', 'A', 1, 1, '2020-08-13 21:59:09', 0),
(892, 38, '4', 'A', 1, 1, '2020-08-13 21:59:09', 0),
(893, 38, '5', 'A', 1, 1, '2020-08-13 21:59:09', 0),
(894, 38, '6', 'A', 1, 1, '2020-08-13 21:59:09', 0),
(895, 38, '7', 'A', 1, 1, '2020-08-13 21:59:09', 0),
(896, 39, '1', 'A', 1, 1, '2020-08-13 22:05:21', 0),
(897, 39, '2', 'A', 1, 1, '2020-08-13 22:05:21', 0),
(898, 39, '3', 'A', 1, 1, '2020-08-13 22:05:21', 0),
(899, 39, '4', 'A', 1, 1, '2020-08-13 22:05:21', 0),
(900, 39, '5', 'A', 1, 1, '2020-08-13 22:05:21', 0),
(901, 39, '6', 'A', 1, 1, '2020-08-13 22:05:21', 0),
(902, 39, '7', 'A', 1, 1, '2020-08-13 22:05:21', 0),
(903, 39, '8', 'A', 1, 1, '2020-08-13 22:05:21', 0),
(904, 39, '9', 'A', 1, 1, '2020-08-13 22:05:21', 0),
(905, 40, '1', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(906, 40, '1', 'B', 1, 1, '2020-08-13 22:18:58', 0),
(907, 40, '1', 'C', 1, 1, '2020-08-13 22:18:58', 0),
(908, 40, '1', 'D', 1, 1, '2020-08-13 22:18:58', 0),
(909, 40, '2', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(910, 40, '2', 'B', 1, 1, '2020-08-13 22:18:58', 0),
(911, 40, '2', 'C', 1, 1, '2020-08-13 22:18:58', 0),
(912, 40, '2', 'D', 1, 1, '2020-08-13 22:18:58', 0),
(913, 40, '3', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(914, 40, '3', 'B', 1, 1, '2020-08-13 22:18:58', 0),
(915, 40, '3', 'C', 1, 1, '2020-08-13 22:18:58', 0),
(916, 40, '3', 'D', 1, 1, '2020-08-13 22:18:58', 0),
(917, 40, '4', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(918, 40, '4', 'B', 1, 1, '2020-08-13 22:18:58', 0),
(919, 40, '4', 'C', 1, 1, '2020-08-13 22:18:58', 0),
(920, 40, '4', 'D', 1, 1, '2020-08-13 22:18:58', 0),
(921, 40, '5', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(922, 40, '5', 'B', 1, 1, '2020-08-13 22:18:58', 0),
(923, 40, '5', 'C', 1, 1, '2020-08-13 22:18:58', 0),
(924, 40, '5', 'D', 1, 1, '2020-08-13 22:18:58', 0),
(925, 40, '6', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(926, 40, '6', 'B', 1, 1, '2020-08-13 22:18:58', 0),
(927, 40, '6', 'C', 1, 1, '2020-08-13 22:18:58', 0),
(928, 40, '6', 'D', 1, 1, '2020-08-13 22:18:58', 0),
(929, 40, '7', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(930, 40, '7', 'B', 1, 1, '2020-08-13 22:18:58', 0),
(931, 40, '7', 'C', 1, 1, '2020-08-13 22:18:58', 0),
(932, 40, '7', 'D', 1, 1, '2020-08-13 22:18:58', 0),
(933, 40, '8', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(934, 40, '8', 'B', 1, 1, '2020-08-13 22:18:58', 0),
(935, 40, '8', 'C', 1, 1, '2020-08-13 22:18:58', 0),
(936, 40, '8', 'D', 1, 1, '2020-08-13 22:18:58', 0),
(937, 40, '9', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(938, 40, '9', 'B', 1, 1, '2020-08-13 22:18:58', 0),
(939, 40, '9', 'C', 1, 1, '2020-08-13 22:18:58', 0),
(940, 40, '9', 'D', 1, 1, '2020-08-13 22:18:58', 0),
(941, 40, '10', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(942, 40, '10', 'B', 1, 1, '2020-08-13 22:18:58', 0),
(943, 40, '10', 'C', 1, 1, '2020-08-13 22:18:58', 0),
(944, 40, '10', 'D', 1, 1, '2020-08-13 22:18:58', 0),
(945, 40, '11', 'A', 1, 1, '2020-08-13 22:18:58', 0),
(946, 41, 'pb', '00', 1, 1, '2020-08-13 22:23:58', 0),
(947, 41, '1', '1', 1, 1, '2020-08-13 22:23:58', 0),
(948, 41, '2', '2', 1, 1, '2020-08-13 22:23:58', 0),
(949, 41, '3', '3', 1, 1, '2020-08-13 22:23:58', 0),
(950, 41, '4', '4', 1, 1, '2020-08-13 22:23:58', 0),
(951, 41, '5', '5', 1, 1, '2020-08-13 22:23:58', 0),
(952, 41, '6', '6', 1, 1, '2020-08-13 22:23:58', 0),
(953, 41, '7', '7', 1, 1, '2020-08-13 22:23:58', 0),
(954, 41, '8', '8', 1, 1, '2020-08-13 22:23:58', 0),
(955, 42, 'pb', '00', 1, 1, '2020-08-13 22:28:31', 0),
(956, 42, '1', 'A', 1, 1, '2020-08-13 22:28:31', 0),
(957, 42, '1', 'B', 1, 1, '2020-08-13 22:28:31', 0),
(958, 42, '2', 'A', 1, 1, '2020-08-13 22:28:32', 0),
(959, 42, '2', 'B', 1, 1, '2020-08-13 22:28:32', 0),
(960, 42, '3', 'A', 1, 1, '2020-08-13 22:28:32', 0),
(961, 42, '3', 'B', 1, 1, '2020-08-13 22:28:32', 0),
(962, 42, '4', 'A', 1, 1, '2020-08-13 22:28:32', 0),
(963, 42, '4', 'B', 1, 1, '2020-08-13 22:28:32', 0),
(964, 42, '5', 'A', 1, 1, '2020-08-13 22:28:32', 0),
(965, 42, '5', 'B', 1, 1, '2020-08-13 22:28:32', 0),
(966, 42, '6', 'A', 1, 1, '2020-08-13 22:28:32', 0),
(967, 42, '6', 'B', 1, 1, '2020-08-13 22:28:32', 0),
(968, 42, '7', 'A', 1, 1, '2020-08-13 22:28:32', 0),
(969, 42, '7', 'B', 1, 1, '2020-08-13 22:28:32', 0),
(970, 17, 'pb', 'A', 1, 1, '2020-09-07 23:23:14', 0),
(971, 17, 'pb', 'a', 6, -1, '2020-09-07 23:23:14', 0),
(972, 17, 'pb', 'B', 1, 1, '2020-09-07 23:23:14', 0),
(973, 17, 'pb', 'b', 6, -1, '2020-09-07 23:23:14', 0),
(974, 17, 'pb', 'c', 6, 1, '2020-09-07 23:23:14', 0),
(975, 17, 'pb', 'd', 6, 1, '2020-09-07 23:23:14', 0),
(976, 17, 'pb', 'C', 1, -1, '2020-09-07 23:23:14', 0),
(977, 17, 'pb', 'e', 6, 1, '2020-09-07 23:23:14', 0),
(978, 17, 'pb', 'D', 1, -1, '2020-09-07 23:23:14', 0),
(979, 17, 'pb', 'f', 6, 1, '2020-09-07 23:23:14', 0);
INSERT INTO `tb_client_departament` (`idClientDepartament`, `idClientFk`, `floor`, `departament`, `idCategoryDepartamentFk`, `idStatusFk`, `created_at`, `numberUNF`) VALUES
(980, 17, 'pb', 'E', 1, -1, '2020-09-07 23:23:14', 0),
(981, 17, 'pb', 'g', 6, 1, '2020-09-07 23:23:14', 0),
(982, 17, 'pb', 'h', 6, 1, '2020-09-07 23:23:14', 0),
(983, 17, 'pb', 'i', 6, 1, '2020-09-07 23:23:14', 0),
(984, 18, '10', '31', 1, 1, '2021-05-24 19:34:54', 0),
(985, 18, '10', '32', 1, 1, '2021-05-24 19:34:54', 0),
(986, 18, 'pb', '2', 1, 1, '2021-05-24 19:35:42', 0),
(987, 18, 'pb', 'PO-1', 5, 1, '2021-05-24 19:35:42', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_files_list`
--

CREATE TABLE `tb_client_files_list` (
  `idClientFiles` int(11) UNSIGNED NOT NULL,
  `idClientfK` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `urlFile` varchar(200) DEFAULT NULL,
  `typeFile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_files_list`
--

INSERT INTO `tb_client_files_list` (`idClientFiles`, `idClientfK`, `title`, `urlFile`, `typeFile`) VALUES
(12, 11, '11_ROG_wallpaper_keystone_3440x1440_20210422.jpg', '/files/11_ROG_wallpaper_keystone_3440x1440_20210422.jpg', 'image/jpeg'),
(14, 11, '11_change_ejecutar_cerrar_-_v_1_20210422.pdf', '/files/11_change_ejecutar_cerrar_-_v_1_20210422.pdf', 'application/pdf'),
(15, 11, '11_change_ejecutar_cerrar_-_v_1_0_20210422.pdf', '/files/11_change_ejecutar_cerrar_-_v_1_0_20210422.pdf', 'application/pdf'),
(16, 11, '11_813526_20210422.jpg', '/files/11_813526_20210422.jpg', 'image/jpeg'),
(19, 11, '11_prueba_titulo_20210424.pdf', '/files/11_prueba_titulo_20210424.pdf', 'application/pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_functional_units`
--

CREATE TABLE `tb_client_functional_units` (
  `idFunctionalUnits` int(11) UNSIGNED NOT NULL,
  `identifier` varchar(100) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idProviceFk` int(11) DEFAULT NULL,
  `idTaxTypeFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_mails`
--

CREATE TABLE `tb_client_mails` (
  `idClientMail` int(10) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `mailTag` varchar(255) DEFAULT NULL,
  `mailContact` varchar(255) DEFAULT NULL,
  `idTipoDeMailFk` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_client_mails`
--

INSERT INTO `tb_client_mails` (`idClientMail`, `idClientFk`, `mailTag`, `mailContact`, `idTipoDeMailFk`, `status`) VALUES
(1, 75, 'prueba', 'prueba@gail.conm', 1, 0),
(2, 77, 'prueba', 'prueba@gail.conm', 1, 0),
(3, 80, 'prueba', 'prueba@gail.conm', 1, 0),
(4, 81, 'prueba', 'prueba@gail.conm', 1, 0),
(5, 82, 'prueba', 'prueba@gail.conm', 1, 0),
(6, 83, 'prueba', 'prueba@gail.conm', 1, 0),
(7, 84, 'prueba', 'prueba@gail.conm', 1, 0),
(8, 85, 'prueba', 'prueba@gail.conm', 1, 0),
(9, 86, 'prueba', 'prueba@gail.conm', 1, 0),
(10, 87, 'prueba', 'prueba@gail.conm', 1, 0),
(11, 88, 'prueba', 'prueba@gail.conm', 1, 0),
(12, 89, 'prueba', 'prueba@gail.conm', 1, 0),
(13, 90, 'prueba', 'prueba@gail.conm', 1, 0),
(17, 98, 'prueba', 'prueba@gail.conm', 1, 0),
(18, 99, 'prueba', 'prueba@gail.conm', 1, 0),
(19, 100, 'prueba', 'prueba@gail.conm', 1, 0),
(20, NULL, 'prueba', 'prueba@gail.conm', 1, 0),
(21, NULL, 'prueba', 'prueba@gail.conm', 1, 0),
(22, NULL, 'prueba', 'prueba@gail.conm', 1, 0),
(23, NULL, 'prueba', 'prueba@gail.conm', 1, 0),
(24, NULL, 'prueba', 'prueba@gail.conm', 1, 0),
(26, 91, 'prueba', 'prueba@gail.conm', 1, 0),
(30, 107, 'prueba', 'prueba@gail.conm', 1, 0),
(34, 1, 'prueba', 'prueba@gail.conm', 1, 0),
(35, 108, NULL, 'llaveros@pruebaadmin.com.ar', 1, 1),
(36, 108, NULL, 'servicios@pruebaadmin.com.ar', 2, 1),
(37, 108, NULL, 'pagos@pruebaadmin.com.ar', 3, 1),
(44, 111, NULL, 'llaves@pruebaadmin2.com.ar', 1, 1),
(45, 111, NULL, 'servicio@pruebaadmin2.com.ar', 2, 1),
(46, 111, NULL, 'pagos@pruebaadmin2.com.ar', 3, 1),
(50, 114, NULL, 'asdsadsad@fdfsdf', 1, 1),
(51, 114, NULL, 'asdsadasd@fdgfgfdg', 2, 1),
(52, 114, NULL, 'asdsadasd@dfsdfdsf', 3, 1),
(72, 22, NULL, 'servicios@inversionesjc.com.ar', 2, 1),
(73, 22, NULL, 'pagos@inversionesjc.com.ar', 3, 1),
(74, 22, NULL, 'admin@inversionesjc.com.ar', 4, 1),
(184, 110, NULL, 'llaves@pruebaadmin2.com.ar', 1, 1),
(185, 110, NULL, 'servicio@pruebaadmin2.com.ar', 2, 1),
(186, 110, NULL, 'pagos@pruebaadmin2.com.ar', 3, 1),
(246, 112, NULL, 'llaves@pruebaadmin2.com.ar', 1, 1),
(247, 112, NULL, 'servicio@pruebaadmin2.com.ar', 2, 1),
(248, 112, NULL, 'pagos@pruebaadmin2.com.ar', 3, 1),
(313, 60, NULL, 'services@ccocacola.com.ar', 2, 1),
(314, 60, NULL, 'pagos@ccocacola.com.ar', 3, 1),
(320, 109, NULL, 'llaveros@pruebaadmin.com.ar', 1, 1),
(321, 109, NULL, 'servicios@pruebaadmin.com.ar', 2, 1),
(322, 109, NULL, 'pagos@pruebaadmin.com.ar', 3, 1),
(323, 109, NULL, 'admin@pruebaadmin.com.ar', 4, 1),
(324, 109, NULL, 'admin@pruebaadmin.com.ar', 5, 1),
(328, 15, NULL, 'llaves@gmaill.com', 1, 1),
(329, 15, NULL, 'services@gmaill.com', 2, 1),
(330, 15, NULL, 'admin@gmaill.com', 4, 1),
(355, 11, NULL, 'llavestettamanti@gmail.com', 1, 1),
(356, 11, NULL, 'serviciostettamanti@gmail.com', 2, 1),
(357, 11, NULL, 'admintettamanti@gmail.com', 4, 1),
(379, 26, NULL, 'SERVICE.CHOLAKIAN@cholakian.com', 2, 1),
(380, 26, NULL, 'KEYS.CHOLAKIAN@cholakian.com', 1, 1),
(381, 26, NULL, 'ADMIN.CHOLAKIAN@cholakian.com', 4, 1),
(412, 12, NULL, 'lavalle357@gmai.com', 1, 1),
(413, 12, NULL, 'lavalle357@gmai.com', 2, 1),
(414, 12, NULL, 'lavalle357@gmai.com', 3, 1),
(415, 12, NULL, 'llavestettamanti@gmail.com', 1, 1),
(416, 12, NULL, 'serviciostettamanti@gmail.com', 2, 1),
(417, 12, NULL, 'admintettamanti@gmail.com', 4, 1),
(418, 35, NULL, 'SERVICE.CHOLAKIAN@cholakian.com', 2, 1),
(419, 35, NULL, 'KEYS.CHOLAKIAN@cholakian.com', 1, 1),
(420, 35, NULL, 'ADMIN.CHOLAKIAN@cholakian.com', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_phone_contact`
--

CREATE TABLE `tb_client_phone_contact` (
  `idClientPhoneFk` int(11) UNSIGNED NOT NULL,
  `phoneTag` varchar(80) DEFAULT NULL COMMENT 'Etiqueta del telefono de contacto Ejmp: Guardia/Urgencia',
  `phoneContact` varchar(80) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_phone_contact`
--

INSERT INTO `tb_client_phone_contact` (`idClientPhoneFk`, `phoneTag`, `phoneContact`, `idClientFk`) VALUES
(1, 'comercial', '45019504', 2),
(5, 'comercial', '45556276', 28),
(6, 'comercial', '45556276', 29),
(7, 'comercial', '4951-8506', 31),
(8, 'comercial', '4952-0757', 31),
(9, 'comercial', '4951-8506', 32),
(10, 'comercial', '4951-8506', 33),
(11, 'comercial', '4951-8506', 34),
(12, 'comercial', '49581624', 36),
(13, 'comercial', '49581473', 36),
(14, 'comercial', '1566619566', 36),
(15, 'comercial', '1550152504', 37),
(17, 'comercial', '4901-6193', 15),
(33, 'comercial', '45028872', 11),
(49, 'comercial', '45556276', 26),
(70, 'comercial', '1123232324', 12),
(71, 'guardia', '1123232324', 12),
(72, 'urgente', '1123232324', 12),
(73, 'comercial', '45028872', 12),
(77, 'comercial', '113453454543', 35),
(78, 'guardia', '113453454543', 35),
(79, 'urgente', '113453454543', 35),
(83, 'comercial', '11231234324', 18),
(84, 'guardia', '11231234324', 18),
(85, 'urgente', '11231234324', 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_schedule_atention`
--

CREATE TABLE `tb_client_schedule_atention` (
  `idScheduleAtention` int(11) UNSIGNED NOT NULL,
  `idClienteFk` int(11) DEFAULT NULL,
  `day` varchar(11) DEFAULT '' COMMENT 'Dia de la semana',
  `fronAm` time DEFAULT NULL,
  `toAm` time DEFAULT NULL,
  `fronPm` time DEFAULT NULL,
  `toPm` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_schedule_atention`
--

INSERT INTO `tb_client_schedule_atention` (`idScheduleAtention`, `idClienteFk`, `day`, `fronAm`, `toAm`, `fronPm`, `toPm`) VALUES
(1, 2, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(2, 2, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(3, 2, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(4, 2, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(5, 2, 'Sabado', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(6, 3, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(7, 3, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(8, 3, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(9, 3, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(10, 4, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(11, 4, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(12, 4, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(13, 4, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(14, 5, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(15, 5, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(16, 5, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(17, 5, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(18, 6, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(19, 6, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(20, 6, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(21, 6, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(22, 6, 'Sabado', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(23, 7, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(24, 7, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(25, 7, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(26, 7, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(27, 8, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(28, 8, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(29, 8, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(30, 8, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(31, 9, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(32, 9, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(33, 9, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(34, 9, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(63, 19, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(64, 19, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(65, 19, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(66, 19, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(71, 21, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(72, 21, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(73, 21, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(74, 21, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(75, 22, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(76, 22, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(77, 22, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(78, 22, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(79, 23, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(80, 23, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(81, 23, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(82, 23, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(83, 24, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(84, 24, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(85, 24, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(86, 24, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(91, 27, 'Martes', '00:00:00', '00:00:00', '17:00:00', '20:00:00'),
(92, 27, 'Miercoles', '00:00:00', '00:00:00', '17:00:00', '20:00:00'),
(93, 27, 'Jueves', '00:00:00', '00:00:00', '17:00:00', '20:00:00'),
(94, 27, 'Viernes', '00:00:00', '00:00:00', '17:00:00', '20:00:00'),
(95, 27, 'Lunes', '00:00:00', '00:00:00', '17:00:00', '20:00:00'),
(96, 28, 'Martes', '00:00:00', '00:00:00', '17:00:00', '20:00:00'),
(97, 28, 'Miercoles', '00:00:00', '00:00:00', '17:00:00', '20:00:00'),
(98, 28, 'Jueves', '00:00:00', '00:00:00', '17:00:00', '20:00:00'),
(99, 28, 'Viernes', '00:00:00', '00:00:00', '17:00:00', '20:00:00'),
(100, 28, 'Lunes', '00:00:00', '00:00:00', '17:00:00', '20:00:00'),
(101, 29, 'Martes', '08:00:00', '00:00:00', '17:00:00', '20:00:00'),
(102, 29, 'Miercoles', '08:00:00', '12:00:00', '18:00:00', '20:00:00'),
(103, 29, 'Jueves', '08:00:00', '00:00:00', '17:00:00', '20:00:00'),
(104, 29, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(105, 29, 'Lunes', '08:00:00', '00:00:00', '17:00:00', '20:00:00'),
(106, 31, 'Lunes', '10:00:00', '13:00:00', '14:00:00', '17:00:00'),
(107, 31, 'Martes', '10:00:00', '13:00:00', '14:00:00', '17:00:00'),
(108, 31, 'Miercoles', '10:00:00', '13:00:00', '14:00:00', '17:00:00'),
(109, 31, 'Jueves', '10:00:00', '13:00:00', '14:00:00', '17:00:00'),
(110, 31, 'Viernes', '10:00:00', '13:00:00', '14:00:00', '17:00:00'),
(111, 32, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(112, 32, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(113, 32, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(114, 32, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(115, 32, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(116, 33, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(117, 33, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(118, 33, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(119, 33, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(120, 33, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(121, 34, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(122, 34, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(123, 34, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(124, 34, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(125, 34, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(131, 36, 'Lunes', '10:00:00', '00:00:00', '00:00:00', '16:00:00'),
(132, 36, 'Martes', '10:00:00', '00:00:00', '00:00:00', '16:00:00'),
(133, 36, 'Miercoles', '10:00:00', '00:00:00', '00:00:00', '16:00:00'),
(134, 36, 'Jueves', '10:00:00', '00:00:00', '00:00:00', '16:00:00'),
(135, 37, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(136, 37, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(137, 37, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(138, 37, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(139, 37, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(140, 38, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(141, 38, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(142, 38, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(143, 38, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(144, 38, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(145, 39, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(146, 39, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(147, 39, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(148, 39, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(149, 39, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(150, 40, 'Lunes', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(151, 40, 'Martes', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(152, 40, 'Miercoles', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(153, 40, 'Jueves', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(154, 40, 'Viernes', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(155, 41, 'Lunes', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(156, 41, 'Martes', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(157, 41, 'Miercoles', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(158, 41, 'Jueves', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(159, 41, 'Viernes', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(160, 42, 'Lunes', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(161, 42, 'Martes', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(162, 42, 'Miercoles', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(163, 42, 'Jueves', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(164, 42, 'Viernes', '07:00:00', '12:00:00', '17:00:00', '20:00:00'),
(170, 13, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(171, 13, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(172, 13, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(173, 13, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(174, 13, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(175, 16, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(176, 16, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(177, 16, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(178, 16, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(179, 16, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(190, 17, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(191, 17, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(192, 17, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(193, 17, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(194, 17, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(195, 15, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(196, 15, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(197, 15, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(198, 15, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(199, 15, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(230, 20, 'Martes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(231, 20, 'Miercoles', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(232, 20, 'Jueves', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(233, 20, 'Viernes', '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(254, 11, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(255, 11, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(256, 11, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(257, 11, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(258, 11, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(284, 26, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(285, 26, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(286, 26, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(287, 26, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(288, 26, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(314, 12, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(315, 12, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(316, 12, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(317, 12, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(318, 12, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(324, 35, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(325, 35, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(326, 35, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(327, 35, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(328, 35, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(334, 18, 'Lunes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(335, 18, 'Martes', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(336, 18, 'Miercoles', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(337, 18, 'Jueves', '08:00:00', '12:00:00', '17:00:00', '20:00:00'),
(338, 18, 'Viernes', '08:00:00', '12:00:00', '17:00:00', '20:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services`
--

CREATE TABLE `tb_client_services` (
  `idClientServices` int(11) NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idTipeServiceFk` int(11) DEFAULT NULL,
  `nameDataBase` varchar(255) DEFAULT NULL,
  `idServicesFk` int(11) DEFAULT NULL,
  `nameId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_services`
--

INSERT INTO `tb_client_services` (`idClientServices`, `idClientFk`, `idTipeServiceFk`, `nameDataBase`, `idServicesFk`, `nameId`) VALUES
(277, 35, 1, 'tb_client_services_access_control', 102, 'idClientServicesAccessControl'),
(278, 35, 2, 'tb_client_services_internet', 39, 'idClientServicesInternet'),
(279, 35, 3, 'tb_client_services_totem', 28, 'idClientServicesTotem'),
(280, 35, 4, 'tb_client_services_camera', 50, 'idClientServicesCamera'),
(281, 35, 6, 'tb_client_services_smart_panic', 24, 'idClientServicesSmartPanic'),
(286, 35, 5, 'tb_client_services_alarms', 55, 'idClientServicesAlarms'),
(287, 34, 2, 'tb_client_services_internet', 40, 'idClientServicesInternet'),
(288, 34, 1, 'tb_client_services_access_control', 103, 'idClientServicesAccessControl');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_access_control`
--

CREATE TABLE `tb_client_services_access_control` (
  `idClientServicesAccessControl` int(11) NOT NULL,
  `idDoorFk` int(11) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `dateDown` varchar(255) DEFAULT NULL,
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
  `portNumberRouter` varchar(200) DEFAULT NULL,
  `addressClient` varchar(100) DEFAULT NULL,
  `addressVpn` varchar(100) DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `useVpn` varchar(100) DEFAULT NULL,
  `passVpn` varchar(100) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `portHttp` varchar(10) DEFAULT '',
  `locationEmergencyButton` varchar(255) DEFAULT NULL,
  `locationOffKey` varchar(255) DEFAULT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_services_access_control`
--

INSERT INTO `tb_client_services_access_control` (`idClientServicesAccessControl`, `idDoorFk`, `idContracAssociated_SE`, `dateUp`, `dateDown`, `idAccessControlFk`, `idInputReaderFk`, `locationGabinet`, `idFontFk`, `aclaration`, `idTypeMaintenanceFk`, `lock`, `ouputReader`, `ouputButom`, `isOuputReader`, `isOuputButom`, `isBlocklingScrew`, `idEmergencyButtonFk`, `idShutdownKeyFk`, `acaration2`, `portNumberRouter`, `addressClient`, `addressVpn`, `user`, `useVpn`, `passVpn`, `pass`, `portHttp`, `locationEmergencyButton`, `locationOffKey`, `idClientServicesFk`) VALUES
(102, 1, 6, '14/03/2021', NULL, 7, 10, 'Sotano', 8, 'Prueba Aclaracion', 1, '6', '10', NULL, 1, NULL, 1, 12, 13, 'Probando Tornillo Bloqueador', '4', 'chile2154.seguridadtass.com.ar', 'chile2154.seguridadtass.com.ar', 'admin', 'admin', 'root', 'root', '8081', 'Prueba ubicación de pulsador de emergencia.', 'Prueba ubicación de Tecla de apagado', 277),
(103, 1, 9, '09/06/2021', NULL, 7, 10, 'Sotano', 8, 'Prueba', 1, '6', '10', NULL, 1, NULL, 1, 12, 13, 'Prueba', 'asdadasd', 'asdasd', 'dsadasd', 'asddasd', 'dasdasdasd', 'dasdasd', 'dasdasd', '0', 'Prueba', 'Prueba', 288);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_alarms`
--

CREATE TABLE `tb_client_services_alarms` (
  `idClientServicesAlarms` int(11) UNSIGNED NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` varchar(255) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `dateDown` varchar(255) DEFAULT NULL,
  `companyMonitor` varchar(200) DEFAULT NULL,
  `numberPay` varchar(50) DEFAULT NULL,
  `panelAlarm` varchar(200) DEFAULT NULL,
  `keyboardAlarm` varchar(200) DEFAULT NULL,
  `countZoneIntaled` int(11) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeConectionRemote` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_services_alarms`
--

INSERT INTO `tb_client_services_alarms` (`idClientServicesAlarms`, `name`, `idContracAssociated_SE`, `idTypeMaintenanceFk`, `dateUp`, `dateDown`, `companyMonitor`, `numberPay`, `panelAlarm`, `keyboardAlarm`, `countZoneIntaled`, `observation`, `idClientServicesFk`, `idTypeConectionRemote`) VALUES
(55, 'Prueba de Alarma', '6', 1, '07/06/2021', '', '1', '123456789', '23', '24', 3, 'Prueba de observacion general del servicio', 286, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_alarms_aditional`
--

CREATE TABLE `tb_client_services_alarms_aditional` (
  `idClientServicesAlarmsAditionals` int(11) UNSIGNED NOT NULL,
  `idTypeClientAlarmFk` int(11) DEFAULT NULL,
  `idUserChargeFk` int(11) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `lateralStreets` varchar(200) DEFAULT NULL,
  `rearStreets` varchar(200) DEFAULT NULL,
  `idAlarmServicesAditionalsFk` int(11) DEFAULT NULL,
  `mailFornReport` varchar(100) DEFAULT NULL,
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
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_camera`
--

CREATE TABLE `tb_client_services_camera` (
  `idClientServicesCamera` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `dateDown` varchar(255) DEFAULT NULL,
  `idDvr_nvrFk` int(11) DEFAULT NULL,
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
  `idClientServicesFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_services_camera`
--

INSERT INTO `tb_client_services_camera` (`idClientServicesCamera`, `name`, `idContracAssociated_SE`, `idTypeMaintenanceFk`, `dateUp`, `dateDown`, `idDvr_nvrFk`, `location`, `locationLat`, `locationLon`, `maxCamera`, `numberPortRouter`, `addressVpn`, `nroPort1`, `nroPort2`, `namePort1`, `namePort2`, `observation`, `addessClient`, `addessClientLat`, `addessClientLot`, `portHttp`, `namePort`, `port`, `idClientServicesFk`) VALUES
(50, 'Prueba de camaras', 6, 1, '24/03/2021', NULL, 16, 'Terraza', NULL, NULL, 3, 6, 'chile2154.seguridadtass.com.ar', 443, 8000, 'HTTPS', 'SERVIDOR', 'Probando nuevo servicio de camaras Modificacion', 'chile2154.seguridadtass.com.ar', NULL, NULL, 8080, 'RTSP', 554, 280);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_gps`
--

CREATE TABLE `tb_client_services_gps` (
  `idClientServicesGps` int(11) UNSIGNED NOT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeGpsFk` int(11) DEFAULT NULL,
  `typeMaintenance` text DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `dateDown` varchar(255) DEFAULT NULL,
  `modem` varchar(200) DEFAULT NULL,
  `idInternetCompanyFk` int(11) DEFAULT NULL COMMENT 'Empresa',
  `nroLine` varchar(200) DEFAULT NULL,
  `nroChip` varchar(200) DEFAULT NULL,
  `idServiceAsociateFk` int(11) DEFAULT NULL,
  `nroSerieInternal` varchar(200) DEFAULT NULL,
  `nroSerieManufacturer` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_internet`
--

CREATE TABLE `tb_client_services_internet` (
  `idClientServicesInternet` int(11) UNSIGNED NOT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeInternetFk` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` text DEFAULT NULL,
  `idServiceFk` int(11) DEFAULT NULL,
  `idServiceAsociateFk` int(11) DEFAULT NULL,
  `idRouterInternetFk` int(11) DEFAULT NULL,
  `userAdmin` varchar(100) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `idInternetCompanyFk` int(11) DEFAULT NULL,
  `idModemInternetFk` varchar(100) DEFAULT '',
  `dateDown` varchar(255) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `isDown` tinyint(1) DEFAULT 0,
  `port` decimal(11,0) DEFAULT NULL,
  `passAdmin` varchar(200) DEFAULT NULL,
  `userWifi` varchar(255) DEFAULT NULL,
  `passWifi` varchar(255) DEFAULT NULL,
  `macAddress` varchar(255) DEFAULT NULL,
  `numberLine` varchar(255) DEFAULT NULL,
  `numberChip` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_services_internet`
--

INSERT INTO `tb_client_services_internet` (`idClientServicesInternet`, `idClientServicesFk`, `idTypeInternetFk`, `idTypeMaintenanceFk`, `idServiceFk`, `idServiceAsociateFk`, `idRouterInternetFk`, `userAdmin`, `idContracAssociated_SE`, `idInternetCompanyFk`, `idModemInternetFk`, `dateDown`, `dateUp`, `isDown`, `port`, `passAdmin`, `userWifi`, `passWifi`, `macAddress`, `numberLine`, `numberChip`) VALUES
(39, 278, 1, '1', 1, 277, 20, 'admin', 6, 1, '19', NULL, '19/03/2021', NULL, '5', 'admin', 'admin', 'admin', 'df-dg-45-64-56-54', NULL, NULL),
(40, 287, 1, '1', 1, 288, 20, 'admin', 9, 1, '19', NULL, '09/06/2021', NULL, '8080', 'admin', 'admin', 'admin', '1d-fs-d2-34-fs-df', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_smart_panic`
--

CREATE TABLE `tb_client_services_smart_panic` (
  `idClientServicesSmartPanic` int(11) NOT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `dateDown` varchar(255) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `idCompanyMonitorFK` int(11) DEFAULT NULL,
  `sucribeNumber` varchar(200) NOT NULL,
  `idDetinationOfLicenseFk` int(11) DEFAULT NULL,
  `idDepartmentFk` int(11) UNSIGNED DEFAULT NULL,
  `idParticularAddressFk` int(11) UNSIGNED DEFAULT NULL,
  `countNewLicense` int(11) DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_services_smart_panic`
--

INSERT INTO `tb_client_services_smart_panic` (`idClientServicesSmartPanic`, `idClientServicesFk`, `name`, `idContracAssociated_SE`, `dateUp`, `dateDown`, `idTypeMaintenanceFk`, `idCompanyMonitorFK`, `sucribeNumber`, `idDetinationOfLicenseFk`, `idDepartmentFk`, `idParticularAddressFk`, `countNewLicense`, `observation`) VALUES
(24, 281, 'Prueba app monitor', 6, '24/03/2021', NULL, 1, 1, '438459357134853', 2, 828, NULL, 2, 'Prueba de nuevo servicio app monitor Modificacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_totem`
--

CREATE TABLE `tb_client_services_totem` (
  `idClientServicesTotem` int(11) UNSIGNED NOT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `item_SE` varchar(100) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT '',
  `dateDown` varchar(255) DEFAULT NULL,
  `idCompanyFk` int(11) DEFAULT NULL,
  `idDvr_nvrFk` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT '',
  `maxCamera` int(11) DEFAULT NULL,
  `idTotenModelFk` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `numberPortRouter` varchar(100) DEFAULT '',
  `addreesVpn` varchar(100) DEFAULT NULL,
  `namePort1` varchar(100) DEFAULT NULL,
  `numberPort1` varchar(100) DEFAULT NULL,
  `namePort2` varchar(100) DEFAULT NULL,
  `numberPort2` varchar(100) DEFAULT NULL,
  `addressClientInter` varchar(100) DEFAULT NULL,
  `portHttpInter` varchar(100) DEFAULT NULL,
  `namePortInter` varchar(100) DEFAULT NULL,
  `numberPortInter` varchar(100) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `numberAbonado` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_services_totem`
--

INSERT INTO `tb_client_services_totem` (`idClientServicesTotem`, `idClientServicesFk`, `name`, `idContracAssociated_SE`, `item_SE`, `dateUp`, `dateDown`, `idCompanyFk`, `idDvr_nvrFk`, `location`, `maxCamera`, `idTotenModelFk`, `idTypeMaintenanceFk`, `numberPortRouter`, `addreesVpn`, `namePort1`, `numberPort1`, `namePort2`, `numberPort2`, `addressClientInter`, `portHttpInter`, `namePortInter`, `numberPortInter`, `observation`, `numberAbonado`) VALUES
(28, 279, 'PRUEBA DE TOTEM', 6, NULL, '22/03/2021', NULL, 1, '16', 'Sala de servicios', 4, 2, 1, '4', 'chile2154.seguridadtass.com.ar', 'HTTPS', '443', 'SERVIDOR', '8000', 'chile2154.seguridadtass.com.ar', '8080', 'RTSP', '554', 'Prueba de modificacion', '438459357134853');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_totem`
--

CREATE TABLE `tb_client_totem` (
  `idClientTotem` int(11) NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idClientServicesTotemFk` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `userProfile` varchar(255) DEFAULT NULL,
  `qrBase64` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_client_totem`
--

INSERT INTO `tb_client_totem` (`idClientTotem`, `idClientFk`, `idClientServicesTotemFk`, `name`, `user`, `pass`, `userProfile`, `qrBase64`) VALUES
(116, 93, 28, 'David Eduardo Rincon Luengo', 'drincon', 'admin', 'admin', 'data:image/png;base64,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'),
(117, NULL, 28, 'Carlos Villalobos', 'carlitos', 'admin', 'admin', 'data:image/png;base64,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');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_type`
--

CREATE TABLE `tb_client_type` (
  `idClientType` int(11) UNSIGNED NOT NULL,
  `ClientType` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_type`
--

INSERT INTO `tb_client_type` (`idClientType`, `ClientType`) VALUES
(1, 'Administracion'),
(2, 'Edificio'),
(3, 'Empresa'),
(4, 'Sucursal'),
(5, 'Particular');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_type_services`
--

CREATE TABLE `tb_client_type_services` (
  `idClientTypeServices` int(11) UNSIGNED NOT NULL,
  `clientTypeServices` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_type_services`
--

INSERT INTO `tb_client_type_services` (`idClientTypeServices`, `clientTypeServices`) VALUES
(1, 'CONTROL DE ACCESO'),
(2, 'INTERNET'),
(3, 'TOTEM'),
(4, 'CAMARAS'),
(5, 'ALARMAS'),
(6, 'APP MONITOREO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_ufc`
--

CREATE TABLE `tb_client_ufc` (
  `idUfd` int(11) UNSIGNED NOT NULL,
  `identificador` varchar(200) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idTypeTaxFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_users`
--

CREATE TABLE `tb_client_users` (
  `idClientUsers` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idUserFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_users`
--

INSERT INTO `tb_client_users` (`idClientUsers`, `idClientFk`, `idUserFk`, `created_at`) VALUES
(1, 2, 1, NULL),
(2, 2, 2, NULL),
(7, 1, 1, NULL),
(8, 1, 2, NULL),
(11, 5, 1, NULL),
(12, 5, 2, NULL),
(13, 1, 1, NULL),
(14, 1, 2, NULL),
(15, 1, 1, NULL),
(16, 1, 2, NULL),
(17, 1, 1, NULL),
(18, 1, 2, NULL),
(19, 14, 1, NULL),
(20, 14, 2, NULL),
(21, 1, 1, NULL),
(22, 1, 2, NULL),
(23, 1, 1, NULL),
(24, 1, 2, NULL),
(25, 1, 1, NULL),
(26, 1, 2, NULL),
(27, 19, 1, NULL),
(28, 19, 2, NULL),
(31, 23, 1, NULL),
(32, 23, 2, NULL),
(33, 24, 1, NULL),
(34, 24, 2, NULL),
(38, 15, 72, NULL),
(48, 11, 93, NULL),
(49, 11, 92, NULL),
(50, 11, 89, NULL),
(59, 26, 80, NULL),
(74, 12, 72, NULL),
(75, 12, 93, NULL),
(76, 12, 92, NULL),
(77, 12, 89, NULL),
(79, 35, 92, NULL),
(80, 35, 80, NULL),
(82, 18, 72, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_company`
--

CREATE TABLE `tb_company` (
  `idCompany` int(11) NOT NULL,
  `nameCompany` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  `tlfCompany` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'TELEFONO DE LA EMPRESA O ADMINISTRACION',
  `mail_services` varchar(200) COLLATE utf8_swedish_ci DEFAULT '',
  `mail_request` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `mail_admin` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `isEdit` tinyint(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_company`
--

INSERT INTO `tb_company` (`idCompany`, `nameCompany`, `SA_ID_COMPANY`, `tlfCompany`, `mail_services`, `mail_request`, `mail_admin`, `isEdit`) VALUES
(1, 'Carlos Castaño', NULL, NULL, 'servicios@carloscastanoooo.com', 'pedidos@carloscastanoooo.com', 'admin@carloscastanoooo.com', 1),
(2, 'Talcahuano Propiedades', NULL, NULL, 'servicio@talcahuanossss.com', 'pedidos@talcahuanossss.com', 'admin@talcahuanossss.com', 1),
(3, 'Toyota', NULL, NULL, 'servicio@toyotaa.com', 'Pedidos@toyotaa.com', 'admin@toyotaa.com', 1),
(5, 'ADMINISTRACION DE PRUEBA', 686, NULL, 'angelgabrielceballos@gmail.com', 'angelgabrielceballos@gmail.com', 'angelgabrielceballos@gmail.com', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_company_type_keychains`
--

CREATE TABLE `tb_company_type_keychains` (
  `idKey` int(11) UNSIGNED NOT NULL,
  `idAddressKf` int(11) DEFAULT NULL,
  `item` varchar(200) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_company_type_keychains`
--

INSERT INTO `tb_company_type_keychains` (`idKey`, `idAddressKf`, `item`, `value`) VALUES
(1, 11, 'Llaveros', '10.99'),
(2, 11, 'Sticket Vehicular', '10.99'),
(3, 11, 'Credencial Movil', '10.99'),
(4, 12, 'Llaveros', '10.99'),
(5, 12, 'Sticket Vehicular', '10.99'),
(6, 5, 'Credencial Movil', '10.99');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_contratos`
--

CREATE TABLE `tb_contratos` (
  `idContrato` int(10) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `fechaFirmaVigencia` varchar(255) DEFAULT NULL,
  `fechaFirmaActivacion` varchar(255) DEFAULT NULL,
  `numeroContrato` varchar(255) DEFAULT NULL,
  `contratoType` int(11) DEFAULT NULL,
  `maintenanceType` int(11) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_contratos`
--

INSERT INTO `tb_contratos` (`idContrato`, `idClientFk`, `fechaFirmaVigencia`, `fechaFirmaActivacion`, `numeroContrato`, `contratoType`, `maintenanceType`, `idStatusFk`) VALUES
(6, 35, '1/3/2021', '18/04/2021', '35-3NC/APP-1321', 3, 1, 1),
(7, 36, '24/3/2021', NULL, '36-3NC/APP-24321', 3, 1, 0),
(9, 34, '8/6/2021', '9/6/2021', '34-2NC/APP-8621', 3, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_datos_adicionales_alarmas`
--

CREATE TABLE `tb_datos_adicionales_alarmas` (
  `idDatoAdicionalAlarma` int(11) NOT NULL,
  `fk_idTipoCliente` int(11) DEFAULT NULL,
  `fk_idEncargado` int(11) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `calles_laterales` text DEFAULT NULL,
  `calle_trasera` text DEFAULT NULL,
  `fk_idServiciosAdicionales` int(11) DEFAULT NULL,
  `mail_reporte` varchar(255) DEFAULT NULL,
  `fk_idFormatoTransmision` int(11) DEFAULT NULL,
  `fk_idAutomarcado` int(11) DEFAULT NULL,
  `n_usuario_asalto` varchar(255) DEFAULT NULL,
  `contrasena_asalto` varchar(255) DEFAULT '',
  `comisaria` varchar(255) DEFAULT NULL,
  `tlf_comisaria` varchar(255) DEFAULT NULL,
  `servicio_emergencia_medica` varchar(255) DEFAULT NULL,
  `n_de_socio` varchar(255) DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL,
  `observacion_general` varchar(255) DEFAULT NULL,
  `horario_automarcado` varchar(255) DEFAULT NULL,
  `fkidClientServicesAlarms` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_datos_adicionales_alarmas`
--

INSERT INTO `tb_datos_adicionales_alarmas` (`idDatoAdicionalAlarma`, `fk_idTipoCliente`, `fk_idEncargado`, `telefono`, `calles_laterales`, `calle_trasera`, `fk_idServiciosAdicionales`, `mail_reporte`, `fk_idFormatoTransmision`, `fk_idAutomarcado`, `n_usuario_asalto`, `contrasena_asalto`, `comisaria`, `tlf_comisaria`, `servicio_emergencia_medica`, `n_de_socio`, `plan`, `observacion_general`, `horario_automarcado`, `fkidClientServicesAlarms`) VALUES
(176, 1, 93, '1122333334', 'Estomba y Tronador', 'Balvin', 1, 'rexx84@gmail.com', 1, 1, 'admin', 'admin', 'n°12', '1123432434234', 'Swiss Medical', '123456789', '210', 'Prueba de observacion de datos adicionales', '10:00', 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_department`
--

CREATE TABLE `tb_department` (
  `idDepartment` int(11) NOT NULL,
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
  `SA_ID_DEPARMENT` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_department`
--

INSERT INTO `tb_department` (`idDepartment`, `idAdressKf`, `departmentFloor`, `deparmentNumber`, `deparmentDescription`, `idStatusKf`, `idUserAdminRKf`, `idUserAdminPropietariKf`, `idUserKf`, `isAprobatedAdmin`, `isRequesLowByProp`, `SA_ID_DEPARMENT`) VALUES
(1, 1, 'Porteria', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(2, 1, '1-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(3, 1, '1-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(4, 1, '2-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(5, 1, '2-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(6, 1, '3-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(7, 1, '3-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(8, 1, '4-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(9, 1, '4-B', 0, '', 1, 1, NULL, 71, 1, 0, NULL),
(10, 1, '5-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(11, 1, '5-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(12, 2, '6-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(13, 2, '6-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(14, 2, '7-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(15, 2, '7-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(16, 2, '8-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(17, 3, '8-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(18, 2, 'Porteria', 0, NULL, 1, 1, NULL, 92, 1, 0, NULL),
(19, 3, 'Porteria', 0, NULL, 1, 1, NULL, NULL, 0, 0, NULL),
(100, 11, '01-A', NULL, NULL, NULL, NULL, NULL, 71, 1, 0, 14143),
(101, 11, '01-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14144),
(102, 11, '01-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14145),
(103, 11, '02-A', NULL, NULL, NULL, NULL, NULL, 75, 1, 0, 14146),
(104, 11, '02-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14147),
(105, 11, '02-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14148),
(106, 11, '03-A', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14149),
(107, 11, '03-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14150),
(108, 11, '03-C', NULL, NULL, NULL, NULL, NULL, 78, 1, 0, 14151),
(109, 11, '04-A', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14152),
(110, 11, '04-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14153),
(111, 11, '04-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14154),
(112, 11, '05-A', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14155),
(113, 11, '05-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14156),
(114, 11, '05-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14157),
(115, 11, 'PB-A', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 14158),
(116, 12, 'PB-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14159),
(117, 12, 'PB-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14160),
(118, 12, '01-01', NULL, NULL, NULL, NULL, NULL, 85, 1, 0, 14161),
(119, 12, '01-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14162),
(120, 12, '02-01', NULL, NULL, NULL, NULL, NULL, 71, 1, 0, 14163),
(121, 12, '02-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14164),
(122, 12, '03-01', NULL, NULL, NULL, NULL, NULL, 76, 1, 0, 14165),
(123, 12, '03-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14166),
(124, 12, '04-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14167),
(125, 12, '04-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14168),
(126, 12, '05-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14169),
(127, 12, '05-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14170),
(128, 12, '06-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14171),
(129, 12, '06-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14172),
(130, 12, '07-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14173),
(131, 12, '07-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14174),
(132, 12, '08-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14175),
(133, 12, '08-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14176),
(134, 12, '09-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14177),
(135, 12, '09-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14178),
(136, 12, '10-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14179),
(137, 12, '10-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14180),
(138, 12, '11-ENCARGADO', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14181),
(139, 12, 'ADM-ADM', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14182);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_detalles_control_acceso`
--

CREATE TABLE `tb_detalles_control_acceso` (
  `idControlAcceso` int(11) NOT NULL,
  `numberSerieFabric` varchar(255) DEFAULT NULL,
  `numberSerieInternal` varchar(255) DEFAULT NULL,
  `dateExpiration` varchar(255) DEFAULT NULL,
  `idProductoFk` int(11) DEFAULT NULL,
  `idServicesFk` int(11) DEFAULT NULL,
  `optAux` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_detalles_control_acceso`
--

INSERT INTO `tb_detalles_control_acceso` (`idControlAcceso`, `numberSerieFabric`, `numberSerieInternal`, `dateExpiration`, `idProductoFk`, `idServicesFk`, `optAux`) VALUES
(746, '324324324324234', '324324324324234', NULL, 19, 278, NULL),
(747, '4657886545676543', '4657886545676543', NULL, 20, 278, NULL),
(844, '234323243242432424', '234323243242432424', NULL, 16, 279, NULL),
(845, '9919191911919', '9919191911919', '31/12/2022', 9, 279, NULL),
(846, '598434583249234', '598434583249234', NULL, 17, 279, NULL),
(847, '0594038345934534', '0594038345934534', '01/01/2022', 14, 279, NULL),
(848, '1111111111111', '1111111111111', NULL, 7, 277, NULL),
(849, '2222222222222', '2222222222222', NULL, 6, 277, NULL),
(850, '33333333333333', '33333333333333', NULL, 10, 277, 'entrance'),
(851, '44444444444444', '44444444444444', '31/12/2022', 8, 277, NULL),
(852, '555555555555555', '555555555555555', NULL, 10, 277, 'exit'),
(853, '777777777777777', '777777777777777', NULL, 12, 277, NULL),
(854, '88888888888888', '88888888888888', NULL, 13, 277, NULL),
(855, '6666666666666666', '6666666666666666', '31/12/2022', 9, 277, NULL),
(856, '888888888888888', '888888888888888', '11/11/1111', 9, 277, NULL),
(858, '46437565435634435643', '46437565435634435643', '10/10/2024', 14, 277, NULL),
(859, '6666666666666666', '6666666666666666', NULL, 16, 280, NULL),
(860, '01010101010100101', '01010101010100101', '01/01/2025', 9, 280, NULL),
(861, '6666666666666666666666666666666', '6666666666666666666666666666666', NULL, 17, 280, NULL),
(891, '222222222222222', '111111111111111111', NULL, 23, 286, NULL),
(892, '444444444444444', '333333333333333', NULL, 24, 286, NULL),
(893, '677777777777777777777', '666666666666666666666', NULL, 26, 286, NULL),
(903, '3123123123123', '1231212321321', NULL, 7, 288, NULL),
(904, '23535234234234324', '234234234235', NULL, 6, 288, NULL),
(905, '235234234234234', '23423423432523', '23/42/3423', 8, 288, NULL),
(906, '5234234234234234', '2423423423523', NULL, 10, 288, 'exit'),
(907, '2342342343243244', '2343243242423234', NULL, 12, 288, NULL),
(908, '234234234324324', '23432324324', NULL, 13, 288, NULL),
(909, '6876867678678768', '678768766787', NULL, 10, 288, 'entrance');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_detination_of_license`
--

CREATE TABLE `tb_detination_of_license` (
  `idDetinationOfLicense` int(11) NOT NULL,
  `detinationOfLicense` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_detination_of_license`
--

INSERT INTO `tb_detination_of_license` (`idDetinationOfLicense`, `detinationOfLicense`) VALUES
(1, 'PROPIETARIO / HABITANTE'),
(2, 'ENCARGADO'),
(3, 'ADMINISTRACION DE CONSORCIO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_divice_opening`
--

CREATE TABLE `tb_divice_opening` (
  `idDiviceOpening` int(11) UNSIGNED NOT NULL,
  `diviceOpening` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_divice_opening`
--

INSERT INTO `tb_divice_opening` (`idDiviceOpening`, `diviceOpening`) VALUES
(1, 'Llavero marien'),
(2, 'Llavero hid'),
(3, 'Llavero hid ex'),
(4, 'Llaver pct ss'),
(5, 'Stiker Vehicular '),
(6, 'Movible hid'),
(7, 'Movible hid ex');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_emergency_button`
--

CREATE TABLE `tb_emergency_button` (
  `idEmergencyButton` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_emergency_button`
--

INSERT INTO `tb_emergency_button` (`idEmergencyButton`, `titulo`) VALUES
(1, 'PULSADOR DE EMERGENCIA 1'),
(2, 'PULSADOR DE EMERGENCIA 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_font`
--

CREATE TABLE `tb_font` (
  `idFonf` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_font`
--

INSERT INTO `tb_font` (`idFonf`, `titulo`) VALUES
(1, 'PRUEBA DE FUENTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_formato_transmision`
--

CREATE TABLE `tb_formato_transmision` (
  `idFormatoTransmision` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_formato_transmision`
--

INSERT INTO `tb_formato_transmision` (`idFormatoTransmision`, `descripcion`) VALUES
(1, 'CONTACT-ID'),
(2, '4+2'),
(3, 'GID'),
(4, 'SIA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_format_tramitio`
--

CREATE TABLE `tb_format_tramitio` (
  `idFormatTramitio` int(11) UNSIGNED NOT NULL,
  `formatTramitio` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_format_tramitio`
--

INSERT INTO `tb_format_tramitio` (`idFormatTramitio`, `formatTramitio`) VALUES
(1, 'CONTACT-ID'),
(2, '4+2'),
(3, 'SIA'),
(4, 'CID');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_franja_horaria_alarmas`
--

CREATE TABLE `tb_franja_horaria_alarmas` (
  `id_franja_horaria` int(11) NOT NULL,
  `day` varchar(255) DEFAULT NULL,
  `fronAm` varchar(255) DEFAULT NULL,
  `toAm` varchar(255) DEFAULT NULL,
  `fronPm` varchar(255) DEFAULT NULL,
  `toPm` varchar(255) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_franja_horaria_alarmas`
--

INSERT INTO `tb_franja_horaria_alarmas` (`id_franja_horaria`, `day`, `fronAm`, `toAm`, `fronPm`, `toPm`, `fk_idDatoAdicionalAlarma`) VALUES
(443, 'Lunes', '09:00', '12:00', '13:00', '18:00', 135),
(444, 'Martes', '09:00', '12:00', '13:00', '18:00', 135),
(445, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 135),
(446, 'Jueves', '09:00', '12:00', '13:00', '18:00', 135),
(447, 'Viernes', '09:00', '12:00', '13:00', '18:00', 135),
(448, 'Sabado', '09:00', '12:00', '13:00', '18:00', 135),
(449, 'Lunes', '09:00', '12:00', '13:00', '18:00', 136),
(450, 'Martes', '09:00', '12:00', '13:00', '18:00', 136),
(451, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 136),
(452, 'Jueves', '09:00', '12:00', '13:00', '18:00', 136),
(453, 'Viernes', '09:00', '12:00', '13:00', '18:00', 136),
(454, 'Sabado', '09:00', '12:00', '13:00', '18:00', 136),
(455, 'Lunes', '09:00', '12:00', '13:00', '18:00', 137),
(456, 'Martes', '09:00', '12:00', '13:00', '18:00', 137),
(457, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 137),
(458, 'Jueves', '09:00', '12:00', '13:00', '18:00', 137),
(459, 'Viernes', '09:00', '12:00', '13:00', '18:00', 137),
(460, 'Sabado', '09:00', '12:00', '13:00', '18:00', 137),
(461, 'Lunes', '09:00', '12:00', '13:00', '18:00', 138),
(462, 'Martes', '09:00', '12:00', '13:00', '18:00', 138),
(463, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 138),
(464, 'Jueves', '09:00', '12:00', '13:00', '18:00', 138),
(465, 'Viernes', '09:00', '12:00', '13:00', '18:00', 138),
(466, 'Sabado', '09:00', '12:00', '13:00', '18:00', 138),
(467, 'Lunes', '09:00', '12:00', '13:00', '18:00', 139),
(468, 'Martes', '09:00', '12:00', '13:00', '18:00', 139),
(469, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 139),
(470, 'Jueves', '09:00', '12:00', '13:00', '18:00', 139),
(471, 'Viernes', '09:00', '12:00', '13:00', '18:00', 139),
(472, 'Sabado', '09:00', '12:00', '13:00', '18:00', 139),
(473, 'Lunes', '09:00', '12:00', '13:00', '18:00', 140),
(474, 'Martes', '09:00', '12:00', '13:00', '18:00', 140),
(475, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 140),
(476, 'Jueves', '09:00', '12:00', '13:00', '18:00', 140),
(477, 'Viernes', '09:00', '12:00', '13:00', '18:00', 140),
(478, 'Lunes', '09:00', '12:00', '13:00', '18:00', 141),
(479, 'Martes', '09:00', '12:00', '13:00', '18:00', 141),
(480, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 141),
(481, 'Jueves', '09:00', '12:00', '13:00', '18:00', 141),
(482, 'Viernes', '09:00', '12:00', '13:00', '18:00', 141),
(483, 'Lunes', '09:00', '12:00', '13:00', '18:00', 142),
(484, 'Martes', '09:00', '12:00', '13:00', '18:00', 142),
(485, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 142),
(486, 'Jueves', '09:00', '12:00', '13:00', '18:00', 142),
(487, 'Viernes', '09:00', '12:00', '13:00', '18:00', 142),
(488, 'Lunes', '09:00', '12:00', '13:00', '18:00', 143),
(489, 'Martes', '09:00', '12:00', '13:00', '18:00', 143),
(490, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 143),
(491, 'Jueves', '09:00', '12:00', '13:00', '18:00', 143),
(492, 'Viernes', '09:00', '12:00', '13:00', '18:00', 143),
(493, 'Lunes', '09:00', '12:00', '13:00', '18:00', 144),
(494, 'Martes', '09:00', '12:00', '13:00', '18:00', 144),
(495, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 144),
(496, 'Jueves', '09:00', '12:00', '13:00', '18:00', 144),
(497, 'Viernes', '09:00', '12:00', '13:00', '18:00', 144),
(498, 'Lunes', '09:00', '12:00', '13:00', '18:00', 145),
(499, 'Martes', '09:00', '12:00', '13:00', '18:00', 145),
(500, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 145),
(501, 'Jueves', '09:00', '12:00', '13:00', '18:00', 145),
(502, 'Viernes', '09:00', '12:00', '13:00', '18:00', 145),
(503, 'Lunes', '09:00', '12:00', '13:00', '18:00', 146),
(504, 'Martes', '09:00', '12:00', '13:00', '18:00', 146),
(505, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 146),
(506, 'Jueves', '09:00', '12:00', '13:00', '18:00', 146),
(507, 'Viernes', '09:00', '12:00', '13:00', '18:00', 146),
(508, 'Lunes', '09:00', '12:00', '13:00', '18:00', 147),
(509, 'Martes', '09:00', '12:00', '13:00', '18:00', 147),
(510, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 147),
(511, 'Jueves', '09:00', '12:00', '13:00', '18:00', 147),
(512, 'Viernes', '09:00', '12:00', '13:00', '18:00', 147),
(513, 'Lunes', '09:00', '12:00', '13:00', '18:00', 148),
(514, 'Martes', '09:00', '12:00', '13:00', '18:00', 148),
(515, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 148),
(516, 'Jueves', '09:00', '12:00', '13:00', '18:00', 148),
(517, 'Viernes', '09:00', '12:00', '13:00', '18:00', 148),
(518, 'Lunes', '09:00', '12:00', '13:00', '18:00', 149),
(519, 'Martes', '09:00', '12:00', '13:00', '18:00', 149),
(520, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 149),
(521, 'Jueves', '09:00', '12:00', '13:00', '18:00', 149),
(522, 'Viernes', '09:00', '12:00', '13:00', '18:00', 149),
(523, 'Lunes', '09:00', '12:00', '13:00', '18:00', 150),
(524, 'Martes', '09:00', '12:00', '13:00', '18:00', 150),
(525, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 150),
(526, 'Jueves', '09:00', '12:00', '13:00', '18:00', 150),
(527, 'Viernes', '09:00', '12:00', '13:00', '18:00', 150),
(528, 'Sabado', '09:00', '12:00', '13:00', '18:00', 150),
(529, 'Lunes', '09:00', '12:00', '13:00', '18:00', 151),
(530, 'Martes', '09:00', '12:00', '13:00', '18:00', 151),
(531, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 151),
(532, 'Jueves', '09:00', '12:00', '13:00', '18:00', 151),
(533, 'Viernes', '09:00', '12:00', '13:00', '18:00', 151),
(534, 'Sabado', '09:00', '12:00', '13:00', '18:00', 151),
(535, 'Lunes', '09:00', '12:00', '13:00', '18:00', 152),
(536, 'Martes', '09:00', '12:00', '13:00', '18:00', 152),
(537, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 152),
(538, 'Jueves', '09:00', '12:00', '13:00', '18:00', 152),
(539, 'Viernes', '09:00', '12:00', '13:00', '18:00', 152),
(540, 'Sabado', '09:00', '12:00', '13:00', '18:00', 152),
(541, 'Lunes', '09:00', '12:00', '13:00', '18:00', 153),
(542, 'Martes', '09:00', '12:00', '13:00', '18:00', 153),
(543, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 153),
(544, 'Jueves', '09:00', '12:00', '13:00', '18:00', 153),
(545, 'Viernes', '09:00', '12:00', '13:00', '18:00', 153),
(546, 'Sabado', '09:00', '12:00', '13:00', '18:00', 153),
(547, 'Lunes', '09:00', '12:00', '13:00', '18:00', 154),
(548, 'Martes', '09:00', '12:00', '13:00', '18:00', 154),
(549, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 154),
(550, 'Jueves', '09:00', '12:00', '13:00', '18:00', 154),
(551, 'Viernes', '09:00', '12:00', '13:00', '18:00', 154),
(552, 'Sabado', '09:00', '12:00', '13:00', '18:00', 154),
(553, 'Lunes', '09:00', '12:00', '13:00', '18:00', 155),
(554, 'Martes', '09:00', '12:00', '13:00', '18:00', 155),
(555, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 155),
(556, 'Jueves', '09:00', '12:00', '13:00', '18:00', 155),
(557, 'Viernes', '09:00', '12:00', '13:00', '18:00', 155),
(558, 'Sabado', '09:00', '12:00', '13:00', '18:00', 155),
(559, 'Lunes', '09:00', '12:00', '13:00', '18:00', 156),
(560, 'Martes', '09:00', '12:00', '13:00', '18:00', 156),
(561, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 156),
(562, 'Jueves', '09:00', '12:00', '13:00', '18:00', 156),
(563, 'Viernes', '09:00', '12:00', '13:00', '18:00', 156),
(564, 'Sabado', '09:00', '12:00', '13:00', '18:00', 156),
(565, 'Lunes', '09:00', '12:00', '13:00', '18:00', 157),
(566, 'Martes', '09:00', '12:00', '13:00', '18:00', 157),
(567, 'Miercoles', '09:00', '12:00', '13:00', '18:00', 157),
(568, 'Jueves', '09:00', '12:00', '13:00', '18:00', 157),
(569, 'Viernes', '09:00', '12:00', '13:00', '18:00', 157),
(570, 'Sabado', '09:00', '12:00', '13:00', '18:00', 157),
(571, 'Lunes', '08:00', '12:00', '17:00', '20:00', 158),
(572, 'Martes', '08:00', '12:00', '17:00', '20:00', 158),
(573, 'Miercoles', '08:00', '12:00', '17:00', '20:00', 158),
(574, 'Jueves', '08:00', '12:00', '17:00', '20:00', 158),
(575, 'Viernes', '08:00', '12:00', '17:00', '20:00', 158),
(576, 'Lunes', '08:00', '12:00', '17:00', '20:00', 159),
(577, 'Martes', '08:00', '12:00', '17:00', '20:00', 159),
(578, 'Miercoles', '08:00', '12:00', '17:00', '20:00', 159),
(579, 'Jueves', '08:00', '12:00', '17:00', '20:00', 159),
(580, 'Viernes', '08:00', '12:00', '17:00', '20:00', 159),
(601, 'Lunes', '08:00', '12:00', '17:00', '20:00', 164),
(602, 'Martes', '08:00', '12:00', '17:00', '20:00', 164),
(603, 'Miercoles', '08:00', '12:00', '17:00', '20:00', 164),
(604, 'Jueves', '08:00', '12:00', '17:00', '20:00', 164),
(605, 'Viernes', '08:00', '12:00', '17:00', '20:00', 164),
(606, 'lunes', '07:00', '12:00', '17:00', '20:00', 165),
(607, 'martes', '07:00', '12:00', '17:00', '20:00', 165),
(608, 'Lunes', '08:00', '12:00', '17:00', '20:00', 166),
(609, 'Martes', '08:00', '12:00', '17:00', '20:00', 166),
(610, 'Miercoles', '08:00', '12:00', '17:00', '20:00', 166),
(611, 'Jueves', '08:00', '12:00', '17:00', '20:00', 166),
(612, 'Viernes', '08:00', '12:00', '17:00', '20:00', 166),
(613, 'Lunes', '08:00', '12:00', '17:00', '20:00', 167),
(614, 'Martes', '08:00', '12:00', '17:00', '20:00', 167),
(615, 'Miercoles', '08:00', '12:00', '17:00', '20:00', 167),
(616, 'Jueves', '08:00', '12:00', '17:00', '20:00', 167),
(617, 'Viernes', '08:00', '12:00', '17:00', '20:00', 167),
(659, 'Lunes', '08:00', '12:00', '17:00', '20:00', 176),
(660, 'Martes', '08:00', '12:00', '17:00', '20:00', 176),
(661, 'Miercoles', '08:00', '12:00', '17:00', '20:00', 176),
(662, 'Jueves', '08:00', '12:00', '17:00', '20:00', 176),
(663, 'Viernes', '08:00', '12:00', '17:00', '20:00', 176),
(664, 'Sabado', '08:00', '12:00', '13:00', '18:00', 176);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_input_reader`
--

CREATE TABLE `tb_input_reader` (
  `idInputReader` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_input_reader`
--

INSERT INTO `tb_input_reader` (`idInputReader`, `titulo`) VALUES
(1, 'LECTOR DE SALIDA'),
(2, 'PULSADOR DE SALIDA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_internet_company`
--

CREATE TABLE `tb_internet_company` (
  `idInternetCompany` int(11) UNSIGNED NOT NULL,
  `internetCompany` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_internet_company`
--

INSERT INTO `tb_internet_company` (`idInternetCompany`, `internetCompany`) VALUES
(1, 'TELECENTRO'),
(2, 'FIBERTEL'),
(3, 'MOVISTAR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_location`
--

CREATE TABLE `tb_location` (
  `idLocation` int(11) UNSIGNED NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `idProvinceFK` int(11) DEFAULT NULL COMMENT 'ID DE LA PROVINCIA A LA QUE SE ASOCIA LA LOCALIDAD'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_location`
--

INSERT INTO `tb_location` (`idLocation`, `location`, `idProvinceFK`) VALUES
(1, 'CIUDAD DE BUENOS AIRES', 1),
(2, 'CONSTITUCION', 1),
(3, 'MONSERRAT', 1),
(4, 'PUERTO MADERO', 1),
(5, 'RETIRO', 1),
(6, 'SAN NICOLAS', 1),
(7, 'SAN TELMO', 1),
(8, 'RECOLETA', 1),
(9, 'BALVANERA', 1),
(10, 'SAN CRISTOBAL', 1),
(11, 'BARRACAS', 1),
(12, 'BOCA', 1),
(13, 'NUEVA POMPEYA', 1),
(14, 'PARQUE PATRICIOS', 1),
(15, 'ALMAGRO', 1),
(16, 'BOEDO', 1),
(17, 'CABALLITO', 1),
(18, 'FLORES', 1),
(19, 'PARQUE CHACABUCO', 1),
(20, 'VILLA LUGANO', 1),
(21, 'VILLA RIACHUELO', 1),
(22, 'VILLA SOLDATI', 1),
(23, 'LINIERS', 1),
(24, 'MATADEROS', 1),
(25, 'PARQUE AVELLANEDA', 1),
(26, 'FLORESTA', 1),
(27, 'MONTE CASTRO', 1),
(28, 'VELEZ SARSFIELD', 1),
(29, 'VERSALLES', 1),
(30, 'VILLA LURO', 1),
(31, 'VILLA REAL', 1),
(32, 'VILLA DEL PARQUE', 1),
(33, 'VILLA DEVOTO', 1),
(34, 'VILLA GENERAL MITRE', 1),
(35, 'VILLA SANTA RITA', 1),
(36, 'COGHLAN', 1),
(37, 'SAAVEDRA', 1),
(38, 'VILLA PUEYRREDON', 1),
(39, 'VILLA URQUIZA', 1),
(40, 'BELGRANO', 1),
(41, 'COLEGIALES', 1),
(42, 'NUÑEZ', 1),
(43, 'PALERMO', 1),
(44, 'AGRONOMIA', 1),
(45, 'CHACARITA', 1),
(46, 'PARQUE CHAS', 1),
(47, 'PATERNAL', 1),
(48, 'VILLA CRESPO', 1),
(49, 'VILLA ORTUZAR', 1),
(50, 'CARHUE', 2),
(51, 'COLONIA SAN MIGUEL ARCANGEL', 2),
(52, 'DELFIN HUERGO', 2),
(53, 'ESPARTILLAR', 2),
(54, 'ESTEBAN AGUSTIN GASCON', 2),
(55, 'LA PALA', 2),
(56, 'MAZA', 2),
(57, 'RIVERA', 2),
(58, 'VILLA MARGARITA', 2),
(59, 'YUTUYACO', 2),
(60, 'ADOLFO GONZALES CHAVES', 2),
(61, 'DE LA GARMA', 2),
(62, 'JUAN E. BARRA', 2),
(63, 'VASQUEZ', 2),
(64, 'ALBERTI', 2),
(65, 'CORONEL SEGUI', 2),
(66, 'MECHITA', 2),
(67, 'PLA', 2),
(68, 'VILLA GRISOLIA', 2),
(69, 'VILLA MARIA', 2),
(70, 'VILLA ORTIZ', 2),
(71, 'ADROGUE', 2),
(72, 'BURZACO', 2),
(73, 'CLAYPOLE', 2),
(74, 'DON ORIONE', 2),
(75, 'GLEW', 2),
(76, 'JOSE MARMOL', 2),
(77, 'LONGCHAMPS', 2),
(78, 'MALVINAS ARGENTINAS', 2),
(79, 'MINISTRO RIVADAVIA', 2),
(80, 'RAFAEL CALZADA', 2),
(81, 'SAN FRANCISCO SOLANO', 2),
(82, 'SAN JOSE', 2),
(83, 'AREA CINTURON ECOLOGICO', 2),
(84, 'AVELLANEDA', 2),
(85, 'CRUCESITA', 2),
(86, 'DOCK SUD', 2),
(87, 'GERLI', 2),
(88, 'PIÑEYRO', 2),
(89, 'SARANDI', 2),
(90, 'VILLA DOMINICO', 2),
(91, 'WILDE', 2),
(92, 'AYACUCHO', 2),
(93, 'LA CONSTANCIA', 2),
(94, 'SOLANET', 2),
(95, 'UDAQUIOLA', 2),
(96, 'ARIEL', 2),
(97, 'AZUL', 2),
(98, 'CACHARI', 2),
(99, 'CHILLAR', 2),
(100, '16 DE JULIO', 2),
(101, 'BAHIA BLANCA', 2),
(102, 'GRÜNBEIN', 2),
(103, 'INGENIERO WHITE', 2),
(104, 'VILLA BORDEAU', 2),
(105, 'VILLA ESPORA', 2),
(106, 'CABILDO', 2),
(107, 'GENERAL DANIEL CERRI', 2),
(108, 'BALCARCE', 2),
(109, 'LOS PINOS', 2),
(110, 'NAPALEOFU', 2),
(111, 'RAMOS OTERO', 2),
(112, 'SAN AGUSTIN', 2),
(113, 'VILLA LAGUNA LA BRAVA', 2),
(114, 'BARADERO', 2),
(115, 'IRINEO PORTELA', 2),
(116, 'SANTA COLOMA', 2),
(117, 'VILLA ALSINA', 2),
(118, 'ARRECIFES', 2),
(119, 'TODD', 2),
(120, 'VI¥A', 2),
(121, 'BARKER', 2),
(122, 'BENITO JUAREZ', 2),
(123, 'LOPEZ', 2),
(124, 'TEDIN URIBURU', 2),
(125, 'VILLA CACIQUE', 2),
(126, 'BERAZATEGUI', 2),
(127, 'BERAZATEGUI OESTE', 2),
(128, 'CARLOS TOMAS SOURIGUES', 2),
(129, 'EL PATO', 2),
(130, 'GUILLERMO ENRIQUE HUDSON', 2),
(131, 'JUAN MARIA GUTIERREZ', 2),
(132, 'PEREYRA', 2),
(133, 'PLATANOS', 2),
(134, 'RANELAGH', 2),
(135, 'VILLA ESPAÑA', 2),
(136, 'BARRIO BANCO PROVINCIA', 2),
(137, 'BARRIO EL CARMEN (ESTE)', 2),
(138, 'BARRIO UNIVERSITARIO', 2),
(139, 'BERISSO', 2),
(140, 'LOS TALAS', 2),
(141, 'VILLA ARGÜELLO', 2),
(142, 'VILLA DOLORES', 2),
(143, 'VILLA INDEPENDENCIA', 2),
(144, 'VILLA NUEVA', 2),
(145, 'VILLA PORTEÑA', 2),
(146, 'VILLA PROGRESO', 2),
(147, 'VILLA SAN CARLOS', 2),
(148, 'VILLA ZULA', 2),
(149, 'HALE', 2),
(150, 'JUAN F. IBARRA', 2),
(151, 'PAULA', 2),
(152, 'PIROVANO', 2),
(153, 'SAN CARLOS DE BOLIVAR', 2),
(154, 'URDAMPILLETA', 2),
(155, 'VILLA LYNCH PUEYRREDON', 2),
(156, 'ASAMBLEA', 2),
(157, 'BRAGADO', 2),
(158, 'COMODORO PY', 2),
(159, 'GENERAL O\'BRIEN', 2),
(160, 'IRALA', 2),
(161, 'LA LIMPIA', 2),
(162, 'MAXIMO FERNANDEZ', 2),
(163, 'MECHITA', 2),
(164, 'OLASCOAGA', 2),
(165, 'WARNES', 2),
(166, 'ALTAMIRANO', 2),
(167, 'BARRIO EL MIRADOR', 2),
(168, 'BARRIO LAS GOLONDRINAS', 2),
(169, 'BARRIO LOS BOSQUECITOS', 2),
(170, 'BARRIO PARQUE LAS ACACIAS', 2),
(171, 'CAMPOS DE ROCA', 2),
(172, 'CORONEL BRANDSEN', 2),
(173, 'CLUB DE CAMPO LAS MALVINAS', 2),
(174, 'GOMEZ', 2),
(175, 'JEPPENER', 2),
(176, 'OLIDEN', 2),
(177, 'POSADA DE LOS LAGOS', 2),
(178, 'SAMBOROMBON', 2),
(179, 'ALTO LOS CARDALES', 2),
(180, 'BARRIO LOS PIONEROS', 2),
(181, 'CAMPANA', 2),
(182, 'CHACRAS DEL RIO LUJAN', 2),
(183, 'LOMAS DEL RIO LUJAN', 2),
(184, 'ALEJANDRO PETION', 2),
(185, 'BARRIO EL TALADRO', 2),
(186, 'CA¥UELAS', 2),
(187, 'GOBERNADOR UDAONDO', 2),
(188, 'BARRIO BELGRANO', 2),
(189, 'MAXIMO PAZ', 2),
(190, 'SANTA ROSA', 2),
(191, 'URIBELARREA', 2),
(192, 'VICENTE CASARES', 2),
(193, 'CAPITAN SARMIENTO', 2),
(194, 'LA LUISA', 2),
(195, 'BELLOCQ', 2),
(196, 'CADRET', 2),
(197, 'CARLOS CASARES', 2),
(198, 'COLONIA MAURICIO', 2),
(199, 'HORTENSIA', 2),
(200, 'LA SOFIA', 2),
(201, 'MAURICIO HIRSCH', 2),
(202, 'MOCTEZUMA', 2),
(203, 'ORDOQUI', 2),
(204, 'SANTO TOMAS', 2),
(205, 'SMITH', 2),
(206, 'CARLOS TEJEDOR', 2),
(207, 'COLONIA SERE', 2),
(208, 'CURARU', 2),
(209, 'TIMOTE', 2),
(210, 'TRES ALGARROBOS', 2),
(211, 'CARMEN DE ARECO', 2),
(212, 'PUEBLO GOUIN', 2),
(213, 'TRES SARGENTOS', 2),
(214, 'CASTELLI', 2),
(215, 'CENTRO GUERRERO', 2),
(216, 'CERRO DE LA GLORIA (CANAL 15)', 2),
(217, 'COLON', 2),
(218, 'EL ARBOLITO', 2),
(219, 'PEARSON', 2),
(220, 'SARASA', 2),
(221, 'BAJO HONDO', 2),
(222, 'BALNEARIO PEHUEN CO', 2),
(223, 'PAGO CHICO', 2),
(224, 'PUNTA ALTA', 2),
(225, 'PUNTA ALTA', 2),
(226, 'VILLA DEL MAR', 2),
(227, 'VILLA GENERAL ARIAS', 2),
(228, 'APARICIO', 2),
(229, 'BALNEARIO MARISOL', 2),
(230, 'CORONEL DORREGO', 2),
(231, 'EL PERDIDO', 2),
(232, 'FARO', 2),
(233, 'IRENE', 2),
(234, 'ORIENTE', 2),
(235, 'LA RUTA', 2),
(236, 'SAN ROMAN', 2),
(237, 'CORONEL PRINGLES', 2),
(238, 'EL DIVISORIO', 2),
(239, 'EL PENSAMIENTO', 2),
(240, 'INDIO RICO', 2),
(241, 'LARTIGAU', 2),
(242, 'CASCADAS', 2),
(243, 'CORONEL SUAREZ', 2),
(244, 'CURA MALAL', 2),
(245, 'D\'ORBIGNY', 2),
(246, 'HUANGUELEN', 2),
(247, 'PASMAN', 2),
(248, 'SAN JOSE', 2),
(249, 'SANTA MARIA', 2),
(250, 'SANTA TRINIDAD', 2),
(251, 'VILLA LA ARCADIA', 2),
(252, 'CASTILLA', 2),
(253, 'CHACABUCO', 2),
(254, 'LOS ANGELES', 2),
(255, 'O\'HIGGINS', 2),
(256, 'RAWSON', 2),
(257, 'BARRIO LOMAS ALTAS', 2),
(258, 'CHASCOMUS', 2),
(259, 'BARRIO SAN CAYETANO', 2),
(260, 'LAGUNA VITEL', 2),
(261, 'MANUEL J. COBO', 2),
(262, 'VILLA PARQUE GIRADO', 2),
(263, 'BENITEZ', 2),
(264, 'CHIVILCOY', 2),
(265, 'EMILIO AYARZA', 2),
(266, 'GOROSTIAGA', 2),
(267, 'LA RICA', 2),
(268, 'MOQUEHUA', 2),
(269, 'RAMON BIAUS', 2),
(270, 'SAN SEBASTIAN', 2),
(271, 'ANDANT', 2),
(272, 'ARBOLEDAS', 2),
(273, 'DAIREAUX', 2),
(274, 'LA LARGA', 2),
(275, 'SALAZAR', 2),
(276, 'DOLORES', 2),
(277, 'SEVIGNE', 2),
(278, 'DIQUE Nº 1', 2),
(279, 'ENSENADA', 2),
(280, 'ISLA SANTIAGO (OESTE)', 2),
(281, 'PUNTA LARA', 2),
(282, 'VILLA CATELA', 2),
(283, 'BELEN DE ESCOBAR', 2),
(284, 'EL CAZADOR', 2),
(285, 'GARIN', 2),
(286, 'INGENIERO MASCHWITZ', 2),
(287, 'LOMA VERDE', 2),
(288, 'MATHEU', 2),
(289, 'MAQUINISTA F. SAVIO ESTE', 2),
(290, 'CANNING', 2),
(291, 'EL JAGÜEL', 2),
(292, 'LUIS GUILLON', 2),
(293, 'MONTE GRANDE', 2),
(294, '9 DE ABRIL', 2),
(295, 'ARROYO DE LA CRUZ', 2),
(296, 'CAPILLA DEL SE¥OR', 2),
(297, 'DIEGO GAYNOR', 2),
(298, 'LOS CARDALES', 2),
(299, 'PARADA ORLANDO', 2),
(300, 'EL REMANSO', 2),
(301, 'PARADA ROBLES', 2),
(302, 'PAVON', 2),
(303, 'AEROPUERTO INTERNACIONAL EZEIZA', 2),
(304, 'CANNING', 2),
(305, 'CARLOS SPEGAZZINI', 2),
(306, 'JOSE MARIA EZEIZA', 2),
(307, 'LA UNION', 2),
(308, 'TRISTAN SUAREZ', 2),
(309, 'BOSQUES', 2),
(310, 'ESTANISLAO SEVERO ZEBALLOS', 2),
(311, 'FLORENCIO VARELA', 2),
(312, 'GOBERNADOR JULIO A. COSTA', 2),
(313, 'INGENIERO JUAN ALLAN', 2),
(314, 'VILLA BROWN', 2),
(315, 'VILLA SAN LUIS', 2),
(316, 'VILLA SANTA ROSA', 2),
(317, 'VILLA VATTEONE', 2),
(318, 'EL TROPEZON', 2),
(319, 'LA CAPILLA', 2),
(320, 'BLAQUIER', 2),
(321, 'FLORENTINO AMEGHINO', 2),
(322, 'PORVENIR', 2),
(323, 'CENTINELA DEL MAR', 2),
(324, 'COMANDANTE NICANOR OTAMENDI', 2),
(325, 'MAR DEL SUR', 2),
(326, 'MECHONGUE', 2),
(327, 'MIRAMAR', 2),
(328, 'GENERAL ALVEAR', 2),
(329, 'ARRIBE¥OS', 2),
(330, 'ASCENSION', 2),
(331, 'ESTACION ARENALES', 2),
(332, 'FERRE', 2),
(333, 'GENERAL ARENALES', 2),
(334, 'LA ANGELITA', 2),
(335, 'LA TRINIDAD', 2),
(336, 'GENERAL BELGRANO', 2),
(337, 'GORCHS', 2),
(338, 'GENERAL GUIDO', 2),
(339, 'LABARDEN', 2),
(340, 'BARRIO KENNEDY', 2),
(341, 'GENERAL JUAN MADARIAGA', 2),
(342, 'GENERAL LA MADRID', 2),
(343, 'LA COLINA', 2),
(344, 'LAS MARTINETAS', 2),
(345, 'LIBANO', 2),
(346, 'PONTAUT', 2),
(347, 'GENERAL HORNOS', 2),
(348, 'GENERAL LAS HERAS', 2),
(349, 'LA CHOZA', 2),
(350, 'PLOMER', 2),
(351, 'VILLARS', 2),
(352, 'GENERAL LAVALLE', 2),
(353, 'PAVON', 2),
(354, 'BARRIO RIO SALADO', 2),
(355, 'LOMA VERDE', 2),
(356, 'RANCHOS', 2),
(357, 'VILLANUEVA', 2),
(358, 'COLONIA SAN RICARDO', 2),
(359, 'GENERAL PINTO', 2),
(360, 'GERMANIA', 2),
(361, 'GUNTHER', 2),
(362, 'VILLA FRANCIA', 2),
(363, 'VILLA ROTH', 2),
(364, 'BARRIO EL BOQUERON', 2),
(365, 'BARRIO LA GLORIA', 2),
(366, 'BARRIO SANTA PAULA', 2),
(367, 'BATAN', 2),
(368, 'CHAPADMALAL', 2),
(369, 'EL MARQUESADO', 2),
(370, 'ESTACION CHAPADMALAL', 2),
(371, 'CAMET', 2),
(372, 'ESTACION CAMET', 2),
(373, 'MAR DEL PLATA', 2),
(374, 'PUNTA MOGOTES', 2),
(375, 'BARRIO EL CASAL', 2),
(376, 'SIERRA DE LOS PADRES', 2),
(377, 'BARRIO COLINAS VERDES', 2),
(378, 'BARRIO EL COYUNCO', 2),
(379, 'SIERRA DE LOS PADRES', 2),
(380, 'GENERAL RODRIGUEZ', 2),
(381, 'BARRIO MORABO', 2),
(382, 'BARRIO RUTA 24 KM. 10', 2),
(383, 'C.C. BOSQUE REAL', 2),
(384, 'GENERAL RODRGUEZ', 2),
(385, 'BARRIO PARQUE GENERAL SAN MARTIN', 2),
(386, 'BILLINGHURST', 2),
(387, 'CIUDAD DEL LIBERTADOR GENERAL SAN MARTIN', 2),
(388, 'CIUDAD JARDIN EL LIBERTADOR', 2),
(389, 'VILLA AYACUCHO', 2),
(390, 'VILLA BALLESTER', 2),
(391, 'VILLA BERNARDO MONTEAGUDO', 2),
(392, 'VILLA CHACABUCO', 2),
(393, 'VILLA CORONEL JOSE M. ZAPIOLA', 2),
(394, 'VILLA GENERAL ANTONIO J. DE SUCRE', 2),
(395, 'VILLA GENERAL EUGENIO NECOCHEA', 2),
(396, 'VILLA GENERAL JOSE TOMAS GUIDO', 2),
(397, 'VILLA GENERAL JUAN G. LAS HERAS', 2),
(398, 'VILLA GODOY CRUZ', 2),
(399, 'VILLA GRANADEROS DE SAN MARTIN', 2),
(400, 'VILLA GREGORIA MATORRAS', 2),
(401, 'VILLA JOSE LEON SUAREZ', 2),
(402, 'VILLA JUAN MARTIN DE PUEYRREDON', 2),
(403, 'VILLA LIBERTAD', 2),
(404, 'VILLA LYNCH', 2),
(405, 'VILLA MAIPU', 2),
(406, 'VILLA MARIA IRENE DE LOS REMEDIOS DE ESCALADA', 2),
(407, 'VILLA MARQUES ALEJANDRO MARIA DE AGUADO', 2),
(408, 'VILLA PARQUE PRESIDENTE FIGUEROA ALCORTA', 2),
(409, 'VILLA PARQUE SAN LORENZO', 2),
(410, 'VILLA SAN ANDRES', 2),
(411, 'VILLA YAPEYU', 2),
(412, 'BAIGORRITA', 2),
(413, 'LA DELFINA', 2),
(414, 'LOS TOLDOS', 2),
(415, 'SAN EMILIO', 2),
(416, 'ZAVALIA', 2),
(417, 'BANDERALO', 2),
(418, 'CA¥ADA SECA', 2),
(419, 'CORONEL CHARLONE', 2),
(420, 'EMILIO V. BUNGE', 2),
(421, 'GENERAL VILLEGAS', 2),
(422, 'MASSEY', 2),
(423, 'PICHINCHA', 2),
(424, 'PIEDRITAS', 2),
(425, 'SANTA ELEODORA', 2),
(426, 'SANTA REGINA', 2),
(427, 'VILLA SABOYA', 2),
(428, 'VILLA SAUZE', 2),
(429, 'ARROYO VENADO', 2),
(430, 'CASBAS', 2),
(431, 'GARRE', 2),
(432, 'GUAMINI', 2),
(433, 'LAGUNA ALSINA', 2),
(434, 'HENDERSON', 2),
(435, 'HERRERA VEGAS', 2),
(436, 'HURLINGHAM', 2),
(437, 'VILLA SANTOS TESEI', 2),
(438, 'WILLIAM C. MORRIS', 2),
(439, 'ITUZAINGO CENTRO', 2),
(440, 'ITUZAINGO SUR', 2),
(441, 'VILLA GOBERNADOR UDAONDO', 2),
(442, 'DEL VISO', 2),
(443, 'JOSE C. PAZ', 2),
(444, 'TORTUGUITAS', 2),
(445, 'AGUSTIN ROCA', 2),
(446, 'AGUSTINA', 2),
(447, 'BALNEARIO LAGUNA DE GOMEZ', 2),
(448, 'FORTIN TIBURCIO', 2),
(449, 'JUNIN', 2),
(450, 'LA AGRARIA', 2),
(451, 'LAPLACETTE', 2),
(452, 'MORSE', 2),
(453, 'SAFORCADA', 2),
(454, 'LAS TONINAS', 2),
(455, 'AGUAS VERDES', 2),
(456, 'LUCILA DEL MAR', 2),
(457, 'MAR DE AJO', 2),
(458, 'MAR DE AJO NORTE', 2),
(459, 'SAN BERNARDO', 2),
(460, 'SAN CLEMENTE DEL TUYU', 2),
(461, 'MAR DEL TUYU', 2),
(462, 'SANTA TERESITA', 2),
(463, 'ALDO BONZI', 2),
(464, 'CIUDAD EVITA', 2),
(465, 'GONZALEZ CATAN', 2),
(466, 'GREGORIO DE LAFERRERE', 2),
(467, 'ISIDRO CASANOVA', 2),
(468, 'LA TABLADA', 2),
(469, 'LOMAS DEL MIRADOR', 2),
(470, 'RAFAEL CASTILLO', 2),
(471, 'RAMOS MEJIA', 2),
(472, 'SAN JUSTO', 2),
(473, 'TAPIALES', 2),
(474, '20 DE JUNIO', 2),
(475, 'VILLA EDUARDO MADERO', 2),
(476, 'VILLA LUZURIAGA', 2),
(477, 'VIRREY DEL PINO', 2),
(478, 'GERLI', 2),
(479, 'LANUS ESTE', 2),
(480, 'LANUS OESTE', 2),
(481, 'MONTE CHINGOLO', 2),
(482, 'REMEDIOS ESCALADA DE SAN MARTIN', 2),
(483, 'VALENTIN ALSINA', 2),
(484, 'COUNTRY CLUB EL RODEO', 2),
(485, 'IGNACIO CORREAS', 2),
(486, 'ABASTO', 2),
(487, 'ANGEL ETCHEVERRY', 2),
(488, 'ARANA', 2),
(489, 'ARTURO SEGUI', 2),
(490, 'BARRIO EL CARMEN (OESTE)', 2),
(491, 'BARRIO GAMBIER', 2),
(492, 'BARRIO LAS MALVINAS', 2),
(493, 'BARRIO LAS QUINTAS', 2),
(494, 'CITY BELL', 2),
(495, 'EL RETIRO', 2),
(496, 'JOAQUIN GORINA', 2),
(497, 'JOSE HERNANDEZ', 2),
(498, 'JOSE MELCHOR ROMERO', 2),
(499, 'LA CUMBRE', 2),
(500, 'LA PLATA', 2),
(501, 'LISANDRO OLMOS', 2),
(502, 'LOS HORNOS', 2),
(503, 'MANUEL B. GONNET', 2),
(504, 'RINGUELET', 2),
(505, 'RUFINO DE ELIZALDE', 2),
(506, 'TOLOSA', 2),
(507, 'TRANSRADIO', 2),
(508, 'VILLA ELISA', 2),
(509, 'VILLA ELVIRA', 2),
(510, 'VILLA GARIBALDI', 2),
(511, 'VILLA MONTORO', 2),
(512, 'VILLA PARQUE SICARDI', 2),
(513, 'LOMAS DE COPELLO', 2),
(514, 'BARRIO RUTA SOL', 2),
(515, 'LAPRIDA', 2),
(516, 'PUEBLO NUEVO', 2),
(517, 'PUEBLO SAN JORGE', 2),
(518, 'CORONEL BOERR', 2),
(519, 'EL TRIGO', 2),
(520, 'LAS FLORES', 2),
(521, 'PARDO', 2),
(522, 'ALBERDI VIEJO', 2),
(523, 'EL DORADO', 2),
(524, 'FORTIN ACHA', 2),
(525, 'JUAN BAUTISTA ALBERDI', 2),
(526, 'LEANDRO N. ALEM', 2),
(527, 'VEDIA', 2),
(528, 'ARENAZA', 2),
(529, 'BAYAUCA', 2),
(530, 'BERMUDEZ', 2),
(531, 'CARLOS SALAS', 2),
(532, 'CORONEL MARTINEZ DE HOZ', 2),
(533, 'EL TRIUNFO', 2),
(534, 'LAS TOSCAS', 2),
(535, 'LINCOLN', 2),
(536, 'PASTEUR', 2),
(537, 'ROBERTS', 2),
(538, 'TRIUNVIRATO', 2),
(539, 'ARENAS VERDES', 2),
(540, 'LICENCIADO MATIENZO', 2),
(541, 'LOBERIA', 2),
(542, 'PIERES', 2),
(543, 'SAN MANUEL', 2),
(544, 'TAMANGUEYU', 2),
(545, 'ANTONIO CARBONI', 2),
(546, 'ELVIRA', 2),
(547, 'LAGUNA DE LOBOS', 2),
(548, 'LOBOS', 2),
(549, 'SALVADOR MARIA', 2),
(550, 'BANFIELD', 2),
(551, 'LLAVALLOL', 2),
(552, 'LOMAS DE ZAMORA', 2),
(553, 'TEMPERLEY', 2),
(554, 'TURDERA', 2),
(555, 'VILLA CENTENARIO', 2),
(556, 'VILLA FIORITO', 2),
(557, 'CARLOS KEEN', 2),
(558, 'CLUB DE CAMPO LOS PUENTES', 2),
(559, 'LUJAN', 2),
(560, 'BARRIO LAS CASUARINAS', 2),
(561, 'CORTINES', 2),
(562, 'LEZICA Y TORREZURI', 2),
(563, 'LUJAN', 2),
(564, 'VILLA FLANDRIA NORTE (PUEBLO NUEVO)', 2),
(565, 'VILLA FLANDRIA SUR (EST. JAUREGUI)', 2),
(566, 'COUNTRY CLUB LAS PRADERAS', 2),
(567, 'OPEN DOOR', 2),
(568, 'OLIVERA', 2),
(569, 'TORRES', 2),
(570, 'ATALAYA', 2),
(571, 'GENERAL MANSILLA', 2),
(572, 'LOS NARANJOS', 2),
(573, 'MAGDALENA', 2),
(574, 'ROBERTO J. PAYRO', 2),
(575, 'VIEYTES', 2),
(576, 'LAS ARMAS', 2),
(577, 'MAIPU', 2),
(578, 'SANTO DOMINGO', 2),
(579, 'AREA DE PROMOCION EL TRIANGULO', 2),
(580, 'GRAND BOURG', 2),
(581, 'INGENIERO ADOLFO SOURDEAUX', 2),
(582, 'INGENIERO PABLO NOGUES', 2),
(583, 'LOS POLVORINES', 2),
(584, 'TORTUGUITAS', 2),
(585, 'VILLA DE MAYO', 2),
(586, 'CORONEL VIDAL', 2),
(587, 'GENERAL PIRAN', 2),
(588, 'LA ARMONIA', 2),
(589, 'MAR CHIQUITA', 2),
(590, 'LA BALIZA', 2),
(591, 'LA CALETA', 2),
(592, 'MAR DE COBO', 2),
(593, 'ATLANTIDA', 2),
(594, 'CAMET NORTE', 2),
(595, 'FRENTE MAR', 2),
(596, 'PLAYA DORADA', 2),
(597, 'SANTA CLARA DEL MAR', 2),
(598, 'SANTA ELENA', 2),
(599, 'VIVORATA', 2),
(600, 'BARRIO SANTA ROSA', 2),
(601, 'BARRIOS LISANDRO DE LA TORRE Y SANTA MARTA', 2),
(602, 'MARCOS PAZ', 2),
(603, 'GOLDNEY', 2),
(604, 'GOWLAND', 2),
(605, 'MERCEDES', 2),
(606, 'TOMAS JOFRE', 2),
(607, 'LIBERTAD', 2),
(608, 'MARIANO ACOSTA', 2),
(609, 'MERLO', 2),
(610, 'PONTEVEDRA', 2),
(611, 'SAN ANTONIO DE PADUA', 2),
(612, 'ABBOTT', 2),
(613, 'SAN MIGUEL DEL MONTE', 2),
(614, 'ZENON VIDELA DORNA', 2),
(615, 'BALNEARIO SAUCE GRANDE', 2),
(616, 'MONTE HERMOSO', 2),
(617, 'CUARTEL V', 2),
(618, 'FRANCISCO ALVAREZ', 2),
(619, 'LA REJA', 2),
(620, 'MORENO', 2),
(621, 'PASO DEL REY', 2),
(622, 'TRUJUI', 2),
(623, 'CASTELAR', 2),
(624, 'EL PALOMAR', 2),
(625, 'HAEDO', 2),
(626, 'MORON', 2),
(627, 'VILLA SARMIENTO', 2),
(628, 'JOSE JUAN ALMEYRA', 2),
(629, 'LAS MARIANAS', 2),
(630, 'NAVARRO', 2),
(631, 'VILLA MOLL', 2),
(632, 'CLARAZ', 2),
(633, 'ENERGIA', 2),
(634, 'JUAN N. FERNANDEZ', 2),
(635, 'NECOCHEA', 2),
(636, 'QUEQUEN', 2),
(637, 'COSTA BONITA', 2),
(638, 'NICANOR OLIVERA', 2),
(639, 'RAMON SANTAMARINA', 2),
(640, 'ALFREDO DEMARCHI', 2),
(641, 'CARLOS MARIA NAON', 2),
(642, '12 DE OCTUBRE', 2),
(643, 'DUDIGNAC', 2),
(644, 'LA AURORA', 2),
(645, 'MANUEL B. GONNET', 2),
(646, 'MARCELINO UGARTE', 2),
(647, 'MOREA', 2),
(648, 'NORUMBEGA', 2),
(649, '9 DE JULIO', 2),
(650, 'PATRICIOS', 2),
(651, 'VILLA GENERAL FOURNIER', 2),
(652, 'BLANCAGRANDE', 2),
(653, 'COLONIA NIEVAS', 2),
(654, 'COLONIA SAN MIGUEL', 2),
(655, 'ESPIGAS', 2),
(656, 'HINOJO', 2),
(657, 'COLONIA HINOJO', 2),
(658, 'HINOJO', 2),
(659, 'OLAVARRIA', 2),
(660, 'RECALDE', 2),
(661, 'SANTA LUISA', 2),
(662, 'SIERRA CHICA', 2),
(663, 'SIERRAS BAYAS', 2),
(664, 'VILLA ARRIETA', 2),
(665, 'VILLA ALFREDO FORTABAT', 2),
(666, 'VILLA LA SERRANIA', 2),
(667, 'BAHIA SAN BLAS', 2),
(668, 'CARDENAL CAGLIERO', 2),
(669, 'CARMEN DE PATAGONES', 2),
(670, 'JOSE B. CASAS', 2),
(671, 'JUAN A. PRADERE', 2),
(672, 'STROEDER', 2),
(673, 'VILLALONGA', 2),
(674, 'CAPITAN CASTRO', 2),
(675, 'CHICLANA', 2),
(676, 'FRANCISCO MADERO', 2),
(677, 'INOCENCIO SOSA', 2),
(678, 'JUAN JOSE PASO', 2),
(679, 'MAGDALA', 2),
(680, 'MONES CAZON', 2),
(681, 'NUEVA PLATA', 2),
(682, 'PEHUAJO', 2),
(683, 'SAN BERNARDO', 2),
(684, 'BOCAYUVA', 2),
(685, 'DE BARY', 2),
(686, 'PELLEGRINI', 2),
(687, 'ACEVEDO', 2),
(688, 'FONTEZUELA', 2),
(689, 'GUERRICO', 2),
(690, 'JUAN A. DE LA PE¥A', 2),
(691, 'JUAN ANCHORENA', 2),
(692, 'LA VIOLETA', 2),
(693, 'MANUEL OCAMPO', 2),
(694, 'MARIANO BENITEZ', 2),
(695, 'MARIANO H. ALFONZO', 2),
(696, 'PERGAMINO', 2),
(697, 'PINZON', 2),
(698, 'RANCAGUA', 2),
(699, 'VILLA ANGELICA', 2),
(700, 'VILLA SAN JOSE', 2),
(701, 'CASALINS', 2),
(702, 'PILA', 2),
(703, 'DEL VISO', 2),
(704, 'FATIMA', 2),
(705, 'LA LONJA', 2),
(706, 'LOS CACHORROS', 2),
(707, 'MANZANARES', 2),
(708, 'MANZONE', 2),
(709, 'MAQUINISTA F. SAVIO (OESTE)', 2),
(710, 'PILAR', 2),
(711, 'PRESIDENTE DERQUI', 2),
(712, 'ROBERTO DE VICENZO', 2),
(713, 'SANTA TERESA', 2),
(714, 'TORTUGUITAS', 2),
(715, 'VILLA ASTOLFI', 2),
(716, 'VILLA ROSA', 2),
(717, 'ZELAYA', 2),
(718, 'CARILO', 2),
(719, 'OSTENDE', 2),
(720, 'PINAMAR', 2),
(721, 'VALERIA DEL MAR', 2),
(722, 'BARRIO AMERICA UNIDA', 2),
(723, 'GUERNICA', 2),
(724, 'AZOPARDO', 2),
(725, 'BORDENAVE', 2),
(726, 'DARREGUEIRA', 2),
(727, '17 DE AGOSTO', 2),
(728, 'ESTELA', 2),
(729, 'FELIPE SOLA', 2),
(730, 'LOPEZ LECUBE', 2),
(731, 'PUAN', 2),
(732, 'SAN GERMAN', 2),
(733, 'VILLA CASTELAR', 2),
(734, 'VILLA IRIS', 2),
(735, 'ALVAREZ JONTE', 2),
(736, 'PIPINAS', 2),
(737, 'PUNTA INDIO', 2),
(738, 'VERONICA', 2),
(739, 'BERNAL', 2),
(740, 'BERNAL OESTE', 2),
(741, 'DON BOSCO', 2),
(742, 'EZPELETA', 2),
(743, 'EZPELETA OESTE', 2),
(744, 'QUILMES', 2),
(745, 'QUILMES OESTE', 2),
(746, 'SAN FRANCISCO SOLANO', 2),
(747, 'VILLA LA FLORIDA', 2),
(748, 'EL PARAISO', 2),
(749, 'LAS BAHAMAS', 2),
(750, 'PEREZ MILLAN', 2),
(751, 'RAMALLO', 2),
(752, 'VILLA GENERAL SAVIO', 2),
(753, 'VILLA RAMALLO', 2),
(754, 'RAUCH', 2),
(755, 'AMERICA', 2),
(756, 'FORTIN OLAVARRIA', 2),
(757, 'GONZALEZ MORENO', 2),
(758, 'MIRA PAMPA', 2),
(759, 'ROOSEVELT', 2),
(760, 'SAN MAURICIO', 2),
(761, 'SANSINENA', 2),
(762, 'SUNDBLAD', 2),
(763, 'LA BEBA', 2),
(764, 'LAS CARABELAS', 2),
(765, 'LOS INDIOS', 2),
(766, 'RAFAEL OBLIGADO', 2),
(767, 'ROBERTO CANO', 2),
(768, 'ROJAS', 2),
(769, 'BARRIO LAS MARGARITAS', 2),
(770, 'ROJAS', 2),
(771, 'VILLA PARQUE CECIR', 2),
(772, 'ESTACION SOL DE MAYO', 2),
(773, 'VILLA MANUEL POMAR', 2),
(774, 'CARLOS BEGUERIE', 2),
(775, 'ROQUE PEREZ', 2),
(776, 'ARROYO CORTO', 2),
(777, 'COLONIA SAN MARTIN', 2),
(778, 'DUFAUR', 2),
(779, 'ESPARTILLAR (E)', 2),
(780, 'GOYENA', 2),
(781, 'LAS ENCADENADAS', 2),
(782, 'PIGUE', 2),
(783, 'SAAVEDRA', 2),
(784, 'ALVAREZ DE TOLEDO', 2),
(785, 'CAZON', 2),
(786, 'DEL CARRIL', 2),
(787, 'POLVAREDAS', 2),
(788, 'SALADILLO', 2),
(789, 'ARROYO DULCE', 2),
(790, 'BERDIER', 2),
(791, 'GAHAN', 2),
(792, 'INES INDART', 2),
(793, 'LA INVENCIBLE', 2),
(794, 'SALTO', 2),
(795, 'QUENUMA', 2),
(796, 'SALLIQUELO', 2),
(797, 'AZCUENAGA', 2),
(798, 'CULULLU', 2),
(799, 'FRANKLIN', 2),
(800, 'SAN ANDRES DE GILES', 2),
(801, 'SOLIS', 2),
(802, 'VILLA ESPIL', 2),
(803, 'VILLA RUIZ', 2),
(804, 'DUGGAN', 2),
(805, 'SAN ANTONIO DE ARECO', 2),
(806, 'VILLA LIA', 2),
(807, 'BALNEARIO SAN CAYETANO', 2),
(808, 'OCHANDIO', 2),
(809, 'SAN CAYETANO', 2),
(810, 'SAN FERNANDO', 2),
(811, 'VICTORIA', 2),
(812, 'VIRREYES', 2),
(813, 'ACASSUSO', 2),
(814, 'BECCAR', 2),
(815, 'BOULOGNE SUR MER', 2),
(816, 'MARTINEZ', 2),
(817, 'SAN ISIDRO', 2),
(818, 'VILLA ADELINA', 2),
(819, 'BELLA VISTA', 2),
(820, 'CAMPO DE MAYO', 2),
(821, 'MUÑIZ', 2),
(822, 'SAN MIGUEL', 2),
(823, 'CONESA', 2),
(824, 'EREZCANO', 2),
(825, 'GENERAL ROJO', 2),
(826, 'LA EMILIA', 2),
(827, 'VILLA CAMPI', 2),
(828, 'VILLA CANTO', 2),
(829, 'VILLA RICCIO', 2),
(830, 'CAMPOS SALLES', 2),
(831, 'SAN NICOLAS DE LOS ARROYOS', 2),
(832, 'VILLA ESPERANZA', 2),
(833, 'GOBERNADOR CASTRO', 2),
(834, 'INGENIERO MONETA', 2),
(835, 'OBLIGADO', 2),
(836, 'PUEBLO DOYLE', 2),
(837, 'RIO TALA', 2),
(838, 'SAN PEDRO', 2),
(839, 'SANTA LUCIA', 2),
(840, 'ALEJANDRO KORN', 2),
(841, 'SAN VICENTE', 2),
(842, 'DOMSELAAR', 2),
(843, 'GENERAL RIVAS', 2),
(844, 'SUIPACHA', 2),
(845, 'DE LA CANAL', 2),
(846, 'GARDEY', 2),
(847, 'MARIA IGNACIA', 2),
(848, 'TANDIL', 2),
(849, 'CROTTO', 2),
(850, 'TAPALQUE', 2),
(851, 'VELLOSO', 2),
(852, 'BENAVIDEZ', 2),
(853, 'DIQUE LUJAN', 2),
(854, 'DON TORCUATO ESTE', 2),
(855, 'DON TORCUATO OESTE', 2),
(856, 'EL TALAR', 2),
(857, 'GENERAL PACHECO', 2),
(858, 'LOS TRONCOS DEL TALAR', 2),
(859, 'RICARDO ROJAS', 2),
(860, 'RINCON DE MILBERG', 2),
(861, 'TIGRE', 2),
(862, 'GENERAL CONESA', 2),
(863, 'CHASICO', 2),
(864, 'SALDUNGARAY', 2),
(865, 'SIERRA DE LA VENTANA', 2),
(866, 'TORNQUIST', 2),
(867, 'TRES PICOS', 2),
(868, 'VILLA SERRANA LA GRUTA', 2),
(869, 'VILLA VENTANA', 2),
(870, 'BERUTTI', 2),
(871, 'GIRODIAS', 2),
(872, 'LA CARRETA', 2),
(873, '30 DE AGOSTO', 2),
(874, 'TRENQUE LAUQUEN', 2),
(875, 'TRONGE', 2),
(876, 'BALNEARIO ORENSE', 2),
(877, 'CLAROMECO', 2),
(878, 'DUNAMAR', 2),
(879, 'COPETONAS', 2),
(880, 'LIN CALEL', 2),
(881, 'MICAELA CASCALLARES', 2),
(882, 'ORENSE', 2),
(883, 'RETA', 2),
(884, 'SAN FRANCISCO DE BELLOCQ', 2),
(885, 'SAN MAYOL', 2),
(886, 'TRES ARROYOS', 2),
(887, 'VILLA RODRIGUEZ', 2),
(888, 'CASEROS', 2),
(889, 'CHURRUCA', 2),
(890, 'CIUDAD JARDIN LOMAS DEL PALOMAR', 2),
(891, 'CIUDADELA', 2),
(892, 'EL LIBERTADOR', 2),
(893, 'JOSE INGENIEROS', 2),
(894, 'LOMA HERMOSA', 2),
(895, 'MARTIN CORONADO', 2),
(896, '11 DE SEPTIEMBRE', 2),
(897, 'PABLO PODESTA', 2),
(898, 'REMEDIOS DE ESCALADA', 2),
(899, 'SAENZ PEÑA', 2),
(900, 'SANTOS LUGARES', 2),
(901, 'VILLA BOSCH (EST. JUAN MARIA BOSCH)', 2),
(902, 'VILLA RAFFO', 2),
(903, 'INGENIERO THOMPSON', 2),
(904, 'TRES LOMAS', 2),
(905, 'AGUSTIN MOSCONI', 2),
(906, 'DEL VALLE', 2),
(907, 'ERNESTINA', 2),
(908, 'GOBERNADOR UGARTE', 2),
(909, 'LUCAS MONTEVERDE', 2),
(910, 'NORBERTO DE LA RIESTRA', 2),
(911, 'PEDERNALES', 2),
(912, 'SAN ENRIQUE', 2),
(913, 'VALDES', 2),
(914, '25 DE MAYO', 2),
(915, 'CARAPACHAY', 2),
(916, 'FLORIDA', 2),
(917, 'FLORIDA OESTE', 2),
(918, 'LA LUCILA', 2),
(919, 'MUNRO', 2),
(920, 'OLIVOS', 2),
(921, 'VICENTE LOPEZ', 2),
(922, 'VILLA ADELINA', 2),
(923, 'VILLA MARTELLI', 2),
(924, 'MAR AZUL', 2),
(925, 'MAR DE LAS PAMPAS', 2),
(926, 'VILLA GESELL', 2),
(927, 'ARGERICH', 2),
(928, 'COLONIA SAN ADOLFO', 2),
(929, 'COUNTRY LOS MEDANOS', 2),
(930, 'HILARIO ASCASUBI', 2),
(931, 'JUAN COUSTE', 2),
(932, 'MAYOR BURATOVICH', 2),
(933, 'MEDANOS', 2),
(934, 'PEDRO LURO', 2),
(935, 'TENIENTE ORIGONE', 2),
(936, 'COUNTRY CLUB EL CASCO', 2),
(937, 'ESCALADA', 2),
(938, 'LIMA', 2),
(939, 'ZARATE', 2),
(940, 'BARRIO SAAVEDRA', 2),
(941, 'ZARATE', 2),
(942, 'BARRIO RUTA 24 KILOMETRO 10', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_modules`
--

CREATE TABLE `tb_modules` (
  `idModule` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_modules`
--

INSERT INTO `tb_modules` (`idModule`, `name`) VALUES
(1, 'monitor'),
(2, 'llaveros'),
(3, 'edificios'),
(4, 'configuracion'),
(5, 'perfil de usuario'),
(6, 'cliente'),
(7, 'servicio'),
(8, 'producto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_monitor_company`
--

CREATE TABLE `tb_monitor_company` (
  `idMonitorCompany` int(11) UNSIGNED NOT NULL,
  `monitorCompany` varchar(100) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_monitor_company`
--

INSERT INTO `tb_monitor_company` (`idMonitorCompany`, `monitorCompany`) VALUES
(1, 'RAM'),
(2, 'SPS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_opcion_low`
--

CREATE TABLE `tb_opcion_low` (
  `idOpcionLowTicket` int(11) UNSIGNED NOT NULL,
  `opcionLowTicket` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_opcion_low`
--

INSERT INTO `tb_opcion_low` (`idOpcionLowTicket`, `opcionLowTicket`) VALUES
(1, 'LLaveros a dar de baja'),
(2, 'LLaveros en mi poder');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_personas_para_dar_aviso_alarmas`
--

CREATE TABLE `tb_personas_para_dar_aviso_alarmas` (
  `idPersona_aviso` int(11) NOT NULL,
  `fk_idUserSystema` int(11) DEFAULT NULL COMMENT 'puede ser null',
  `vinculo` varchar(255) DEFAULT NULL,
  `palabra_clave` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `numero_del_usuario` varchar(255) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL,
  `nombre_apellido` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_personas_para_dar_aviso_alarmas`
--

INSERT INTO `tb_personas_para_dar_aviso_alarmas` (`idPersona_aviso`, `fk_idUserSystema`, `vinculo`, `palabra_clave`, `telefono`, `numero_del_usuario`, `fk_idDatoAdicionalAlarma`, `nombre_apellido`) VALUES
(142, 88, 'Hijo', 'Auto', '11223544564356346', '123123123', 176, 'Gabriel Gonzalez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_personas_para_verificar_en_lugar`
--

CREATE TABLE `tb_personas_para_verificar_en_lugar` (
  `idPersona_aviso_lugar` int(11) NOT NULL,
  `fk_idUserSystema` int(11) DEFAULT NULL COMMENT 'puede ser null',
  `vinculo` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `numero_del_usuario` varchar(255) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL,
  `nombre_apellido` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_personas_para_verificar_en_lugar`
--

INSERT INTO `tb_personas_para_verificar_en_lugar` (`idPersona_aviso_lugar`, `fk_idUserSystema`, `vinculo`, `telefono`, `numero_del_usuario`, `fk_idDatoAdicionalAlarma`, `nombre_apellido`) VALUES
(97, 88, 'Hijo', '11223544564356346', '123123123', 176, 'Gabriel Gonzalez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_pick_receive`
--

CREATE TABLE `tb_pick_receive` (
  `idWhoPickUp` int(11) DEFAULT NULL,
  `nameWhoPickUp` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_pick_receive`
--

INSERT INTO `tb_pick_receive` (`idWhoPickUp`, `nameWhoPickUp`) VALUES
(1, 'Titular'),
(2, 'Encargado'),
(3, 'Tercera persona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_products`
--

CREATE TABLE `tb_products` (
  `idProduct` int(11) NOT NULL,
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
  `idStatusFk` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_products`
--

INSERT INTO `tb_products` (`idProduct`, `descriptionProduct`, `codigoFabric`, `brand`, `model`, `idProductClassificationFk`, `isNumberSerieFabric`, `isNumberSerieInternal`, `isDateExpiration`, `isControlSchedule`, `priceFabric`, `idStatusFk`) VALUES
(6, 'Cerradura Multilock', '234324322352', 'Multilock', 'Multilock-500', '2', 1, 1, 0, 0, '4500.00', 1),
(7, 'Control de Acceso con huella y horario', '32324324324', 'Libertech', 'FCM052', '1', 1, 1, 0, 1, '3200.00', 1),
(8, 'Fuente Alimentación Auxiliar', '23123214124', 'X-28', 'FU 1A MPXH', '4', 1, 1, 1, NULL, '7150.00', 1),
(9, 'Bateria Alarma 12v 7ah 7a Recargable', '234324324324', 'Kaise', '12V7AH', '5', 1, 1, 1, NULL, '1250.00', 1),
(10, 'Lector entrada/salida v1000', '0234230L23432', 'SecOps', 'LecV1000', '3', 1, 1, 0, 0, '20000.00', 1),
(11, 'Pulsador Emergencia Golpe De Puño Por Giro C/ Retencion', '286036/286032/1', 'BAW', 'B5bs542', '6', 1, 1, 0, NULL, '400.00', -1),
(12, 'Boton Pulsador Tecla De Salida Metalico', '213213214214', 'Zuden', 'ZD-BT-801A-METAL', '6', 1, 1, 0, NULL, '500.00', 1),
(13, 'Teclado de Apagado', '234324325325', 'TEBAS', 'M-M', '7', 1, 1, 0, NULL, '4000.00', 1),
(14, 'Bateria Alarma Ups Leds Gel 12v 7ah', 'asdsad234324324', 'Ultracell', 'UL7-12', '5', 1, 1, 1, NULL, '1200.00', 1),
(15, 'Control Accesos Autonomo', '12323224233', 'LTC Electronics', 'A210KIT', '1', 1, 1, 0, 1, '1300.00', 1),
(16, 'Dvr Seguridad 8ch Hikvision P2p Hdmi', '12312321432432', 'Hikvision', 'DS7208HGHI', '8', 1, 1, 0, NULL, '6700.00', 1),
(17, 'Ups Estabilizador Lyonn 800va', '111232423g', 'Lyonn', 'CTB-800V', '10', 1, 1, 0, NULL, '7400.00', 1),
(18, 'Camara Seguridad Hikvision 2mp Full Hd 1080p', '12345454FGHYT', 'Hikvision', 'DS-2CE16D0T-IPF', '11', 1, 1, 0, NULL, '1800.00', 1),
(19, 'TP-Link Archer AX50', 'AX-501232324', 'TP-Link', 'AX50', '18', 1, 1, 0, NULL, '10400.00', 1),
(20, 'Router TP-Link Archer C60', 'Archer-3242344234', 'TP-Link', 'Archer C60', '17', 1, 1, 0, NULL, '3600.00', 1),
(21, 'Boton De Salida Pulsador Control Acceso', '21312323ADR', 'Disbyte', 'EXMET', '20', 1, 1, 0, NULL, '400.00', 1),
(22, 'Boton Pulsador De Salida Cerraduras Electricas', '123123RRR', 'Cygnus', 'EX-905', '20', 1, 1, 0, NULL, '1400.00', 1),
(23, 'Panel Alarma Casa Domiciliaria Inalambrica Wifi', '1237sdb23h4234', 'Security Factory', 'Marshall IP', '12', 1, 1, 0, NULL, '17895.00', 1),
(24, 'Teclado Panel Remoto Pantalla cristal Liquido', '12312434tgv345', 'X-28', 'TLCD-MPXH', '13', 1, 1, 0, NULL, '8955.00', 1),
(25, 'Sensor Detector De Movimiento Exterior', '1232134tgert345', 'Geneve', '79.06.92', '14', 1, 1, 0, NULL, '750.00', 1),
(26, 'Modulo Ip Wifi Universal', '123134535654', 'Dx Control', 'Dx Full Wifi', '15', 1, 1, 0, NULL, '9500.00', 1),
(27, 'Modulo Lan Y Gprs Para Alarmas Doble Tarjeta Sim Ant Externa', '1111111111111', 'Intelbras', 'XEG4000', '16', 1, 1, 0, NULL, '8.43', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_products_classification`
--

CREATE TABLE `tb_products_classification` (
  `idProductClassification` int(11) NOT NULL,
  `classification` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_products_classification`
--

INSERT INTO `tb_products_classification` (`idProductClassification`, `classification`) VALUES
(1, 'CONTROL DE ACCESOS'),
(2, 'CERRADURA'),
(3, 'LECTOR'),
(4, 'FUENTE'),
(5, 'BATERIA'),
(6, 'PULSADOR DE EMERGENCIA'),
(7, 'TECLA DE APAGADO'),
(8, 'DVR'),
(9, 'NVR'),
(10, 'UPS'),
(11, 'CAMARA'),
(12, 'PANEL DE ALARMA'),
(13, 'TECLADO DE ALARMA'),
(14, 'SENSOR DE ALARMA'),
(15, 'MODULO IP DE ALARMA'),
(16, 'MODULO GPRS DE ALARMA'),
(17, 'ROUTER'),
(18, 'MODEM'),
(19, 'DISPOSITIVO DE APERTURA'),
(20, 'PULSADOR DE SALIDA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_products_divice_opening`
--

CREATE TABLE `tb_products_divice_opening` (
  `idProductsDiviceOpening` int(11) UNSIGNED NOT NULL,
  `idDiviceOpeningFk` int(11) DEFAULT NULL,
  `idProductFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_products_divice_opening`
--

INSERT INTO `tb_products_divice_opening` (`idProductsDiviceOpening`, `idDiviceOpeningFk`, `idProductFk`) VALUES
(5, 2, 2),
(6, 3, 2),
(7, 4, 2),
(8, 5, 2),
(9, 2, 3),
(10, 3, 3),
(11, 4, 3),
(12, 5, 3),
(13, 2, 4),
(14, 3, 4),
(15, 4, 4),
(16, 5, 4),
(21, 2, 1),
(22, 3, 1),
(23, 4, 1),
(24, 5, 1),
(25, 2, 5),
(26, 3, 5),
(27, 4, 5),
(28, 5, 5),
(29, 2, 6),
(30, 3, 6),
(31, 4, 6),
(32, 5, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_profile`
--

CREATE TABLE `tb_profile` (
  `idProfile` int(11) UNSIGNED NOT NULL,
  `nameProfile` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_profile`
--

INSERT INTO `tb_profile` (`idProfile`, `nameProfile`) VALUES
(1, 'TASS'),
(2, 'Empresa'),
(3, 'Propietario'),
(4, 'Admin Consorsio'),
(5, 'Inquilino'),
(6, 'Encargado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_profiles`
--

CREATE TABLE `tb_profiles` (
  `idProfiles` int(11) UNSIGNED NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `idStatus` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_profiles`
--

INSERT INTO `tb_profiles` (`idProfiles`, `name`, `idStatus`) VALUES
(8, 'Admin', 1),
(9, 'PERFIL UNo', 1),
(10, 'PERFIL dos', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_profiles_modules`
--

CREATE TABLE `tb_profiles_modules` (
  `idProfileModule` int(11) UNSIGNED NOT NULL,
  `idProfilesFk` int(11) DEFAULT NULL,
  `idModuleFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_profiles_modules`
--

INSERT INTO `tb_profiles_modules` (`idProfileModule`, `idProfilesFk`, `idModuleFk`) VALUES
(35, 10, 1),
(36, 10, 2),
(77, 8, 1),
(78, 8, 2),
(79, 8, 3),
(80, 8, 4),
(81, 8, 5),
(82, 8, 6),
(83, 8, 7),
(84, 8, 8),
(85, 9, 1),
(86, 9, 2),
(87, 9, 3),
(88, 9, 4),
(89, 9, 5),
(90, 9, 6),
(91, 9, 7),
(92, 9, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_province`
--

CREATE TABLE `tb_province` (
  `idProvince` int(11) UNSIGNED NOT NULL,
  `province` varchar(200) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_province`
--

INSERT INTO `tb_province` (`idProvince`, `province`, `idLocationFk`) VALUES
(1, 'Ciudad Autonoma de Buenos Aires', NULL),
(2, 'Buenos Aires', NULL),
(3, 'Misiones', NULL),
(4, 'San Luis', NULL),
(5, 'San Juan', NULL),
(6, 'Entre Rios', NULL),
(7, 'Santa Cruz', NULL),
(8, 'Rio Negro', NULL),
(9, 'Chubut', NULL),
(10, 'Cordoba', NULL),
(11, 'Mendoza', NULL),
(12, 'La Rioja', NULL),
(13, 'Catamarca', NULL),
(14, 'La Pampa', NULL),
(15, 'Santiago del Estero', NULL),
(16, 'Corrientes', NULL),
(17, 'Santa Fe', NULL),
(18, 'Tucuman', NULL),
(19, 'Neuquen', NULL),
(20, 'Salta', NULL),
(21, 'Chaco', NULL),
(22, 'Formosa', NULL),
(23, 'Jujuy', NULL),
(24, 'Tierra del Fuego, Antartida e Islas del Atlántico Sur', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_reason_disabled_item`
--

CREATE TABLE `tb_reason_disabled_item` (
  `idReasonDisabledItem` int(11) NOT NULL,
  `reasonDisabledItem` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_reason_disabled_item`
--

INSERT INTO `tb_reason_disabled_item` (`idReasonDisabledItem`, `reasonDisabledItem`) VALUES
(1, 'ROBO'),
(2, 'EXTRAVIO'),
(3, 'FALLA DEL LLAVERO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_request`
--

CREATE TABLE `tb_request` (
  `idRequest` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `RequestName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_router_internet`
--

CREATE TABLE `tb_router_internet` (
  `idRouterInternet` int(11) UNSIGNED NOT NULL,
  `numberSeriaInternal` text DEFAULT NULL,
  `numberSeriaFrabic` text DEFAULT NULL,
  `titulo` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_sensors_alarm`
--

CREATE TABLE `tb_sensors_alarm` (
  `idSensorsAlarm` int(11) UNSIGNED NOT NULL,
  `idSensorProduct` int(11) DEFAULT NULL,
  `numberZoneSensor` varchar(200) DEFAULT NULL,
  `area` text DEFAULT NULL,
  `nroZoneTamper` varchar(200) DEFAULT NULL,
  `locationLon` varchar(200) DEFAULT NULL,
  `idDvr` int(11) DEFAULT NULL,
  `idCameraFk` int(11) DEFAULT NULL,
  `nroInterno` varchar(200) DEFAULT NULL,
  `nroFrabric` varchar(200) DEFAULT NULL,
  `fkidClientServicesAlarms` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_sensors_alarm`
--

INSERT INTO `tb_sensors_alarm` (`idSensorsAlarm`, `idSensorProduct`, `numberZoneSensor`, `area`, `nroZoneTamper`, `locationLon`, `idDvr`, `idCameraFk`, `nroInterno`, `nroFrabric`, `fkidClientServicesAlarms`) VALUES
(79, 25, '1', 'Prueba de Sensor en Zona 1', '1', 'Entrada', 16, 86, '11111111111111111', '11111111111111111', 55),
(80, 25, '2', 'Prueba de Sensor en Zona 2', '2', 'Salida', 16, 87, '22222222222222222', '222222222222222', 55),
(81, 25, '3', 'Prueba agregar nuevo sensor en zona 3 en la edicion del servicio.', '3', 'Pasillo', 16, 86, '1231231234254665476', '65786845352323432423', 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_services`
--

CREATE TABLE `tb_services` (
  `idService` int(11) UNSIGNED NOT NULL,
  `service` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_services`
--

INSERT INTO `tb_services` (`idService`, `service`) VALUES
(1, 'INSTALACION'),
(2, 'MANTENIMIENTO'),
(3, 'REPARACION');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_services_camera_users`
--

CREATE TABLE `tb_services_camera_users` (
  `idServicesCameraUsers` int(11) UNSIGNED NOT NULL,
  `idUserFk` int(11) DEFAULT NULL,
  `idClientServicesCamera` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_servicios_del_contrato_cabecera`
--

CREATE TABLE `tb_servicios_del_contrato_cabecera` (
  `idServiciosDelContrato` int(10) UNSIGNED NOT NULL,
  `idServiceType` int(11) DEFAULT NULL,
  `serviceName` varchar(255) DEFAULT NULL,
  `idContratoFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_servicios_del_contrato_cabecera`
--

INSERT INTO `tb_servicios_del_contrato_cabecera` (`idServiciosDelContrato`, `idServiceType`, `serviceName`, `idContratoFk`) VALUES
(55, 1, 'CONTROL DE ACCESO', 6),
(56, 2, 'INTERNET', 6),
(57, 3, 'TOTEM', 6),
(58, 4, 'CAMARAS', 6),
(59, 5, 'ALARMAS', 6),
(60, 6, 'APP MONITOREO', 6),
(61, 1, 'CONTROL DE ACCESO', 7),
(62, 2, 'INTERNET', 7),
(63, 3, 'TOTEM', 7),
(64, 4, 'CAMARAS', 7),
(65, 5, 'ALARMAS', 7),
(66, 6, 'APP MONITOREO', 7),
(67, 1, 'CONTROL DE ACCESO', 8),
(68, 2, 'INTERNET', 8),
(69, 3, 'TOTEM', 8),
(70, 4, 'CAMARAS', 8),
(71, 5, 'ALARMAS', 8),
(72, 6, 'APP MONITOREO', 8),
(73, 1, 'CONTROL DE ACCESO', 9),
(74, 2, 'INTERNET', 9),
(75, 3, 'TOTEM', 9),
(76, 4, 'CAMARAS', 9),
(77, 5, 'ALARMAS', 9),
(78, 6, 'APP MONITOREO', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_servicios_del_contrato_cuerpo`
--

CREATE TABLE `tb_servicios_del_contrato_cuerpo` (
  `idServiciosDelContratoCuerpo` int(10) UNSIGNED NOT NULL,
  `idServiciosDelContratoFk` int(11) DEFAULT NULL,
  `qtty` varchar(255) DEFAULT NULL,
  `idAccCrtlDoor` int(11) DEFAULT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `itemAclaracion` varchar(255) DEFAULT NULL,
  `idServiceTypeFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_servicios_del_contrato_cuerpo`
--

INSERT INTO `tb_servicios_del_contrato_cuerpo` (`idServiciosDelContratoCuerpo`, `idServiciosDelContratoFk`, `qtty`, `idAccCrtlDoor`, `itemName`, `itemAclaracion`, `idServiceTypeFk`) VALUES
(81, 55, NULL, 1, 'Principal', NULL, 1),
(82, 55, NULL, 2, 'Cochera', NULL, 1),
(83, 56, NULL, 1, 'Cable Modem - TASS', NULL, 2),
(84, 56, NULL, 4, '3G/LTE', NULL, 2),
(85, 57, '4', NULL, 'CAMARAS', NULL, 3),
(86, 58, '8', NULL, 'CAMARAS', NULL, 4),
(87, 59, NULL, NULL, 'ALARMAS', NULL, 5),
(88, 60, NULL, NULL, 'APP MONITOREO', NULL, 6),
(89, 61, NULL, 1, 'Principal', NULL, 1),
(90, 61, NULL, 2, 'Cochera', NULL, 1),
(91, 61, NULL, 3, 'Servicio', NULL, 1),
(92, 61, NULL, 4, 'Terraza', NULL, 1),
(93, 62, NULL, 1, 'Cable Modem - TASS', NULL, 2),
(94, 62, NULL, 4, '3G/LTE', NULL, 2),
(95, 63, '2', NULL, 'CAMARAS', NULL, 3),
(96, 64, '8', NULL, 'CAMARAS', NULL, 4),
(97, 65, NULL, NULL, 'ALARMAS', NULL, 5),
(98, 66, NULL, NULL, 'APP MONITOREO', NULL, 6),
(99, 67, NULL, 1, 'Principal', NULL, 1),
(100, 67, NULL, 2, 'Cochera', NULL, 1),
(101, 67, NULL, 4, 'Terraza', NULL, 1),
(102, 68, NULL, 1, 'Cable Modem - TASS', NULL, 2),
(103, 68, NULL, 4, '3G/LTE', NULL, 2),
(104, 69, '4', NULL, 'CAMARAS', NULL, 3),
(105, 70, '8', NULL, 'CAMARAS', NULL, 4),
(106, 71, NULL, NULL, 'ALARMAS', NULL, 5),
(107, 72, NULL, NULL, 'APP MONITOREO', NULL, 6),
(294, 73, NULL, 1, 'Principal', NULL, 1),
(295, 73, NULL, 2, 'Cochera', NULL, 1),
(296, 73, NULL, 7, 'Otros', 'Prueba', 1),
(297, 74, NULL, 1, 'Cable Modem - TASS', NULL, 2),
(298, 74, NULL, 2, 'Cable Modem - CLIENTE', NULL, 2),
(299, 74, NULL, 3, 'GPRS', NULL, 2),
(300, 75, '4', NULL, 'CAMARAS', NULL, 3),
(301, 76, '8', NULL, 'CAMARAS', NULL, 4),
(302, 77, NULL, NULL, 'ALARMAS', NULL, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_sesores_alarmas`
--

CREATE TABLE `tb_sesores_alarmas` (
  `idSensorAlarma` int(11) NOT NULL,
  `fk_idServicesAlarma` int(11) DEFAULT NULL,
  `n_zona_sensor` int(11) DEFAULT NULL,
  `area_cubierta` text DEFAULT NULL,
  `n_zona_tamper` int(11) DEFAULT NULL,
  `ubicacion` text DEFAULT NULL,
  `idDvr` int(11) DEFAULT NULL,
  `idCamara` int(11) DEFAULT NULL,
  `n_serie_interno` text DEFAULT NULL,
  `n_serie_fabricante` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_shutdown_key`
--

CREATE TABLE `tb_shutdown_key` (
  `idShutdownKey` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_shutdown_key`
--

INSERT INTO `tb_shutdown_key` (`idShutdownKey`, `titulo`) VALUES
(1, 'TECLA DE APAGADO 1'),
(2, 'TECLA DE APAGADO 2'),
(3, 'TECLA DE APAGADO 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_sistemas_operativos`
--

CREATE TABLE `tb_sistemas_operativos` (
  `idSistemaOperativo` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_sistemas_operativos`
--

INSERT INTO `tb_sistemas_operativos` (`idSistemaOperativo`, `descripcion`) VALUES
(1, 'IOS'),
(2, 'ANDROID');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_smart_panic_license_pivote`
--

CREATE TABLE `tb_smart_panic_license_pivote` (
  `idPivoteLicense` int(11) NOT NULL,
  `idClientServicesSmartPanicFk` int(11) NOT NULL,
  `idUserLinceseFk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_status`
--

CREATE TABLE `tb_status` (
  `idStatusTenant` int(255) NOT NULL,
  `statusTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `tb_status`
--

INSERT INTO `tb_status` (`idStatusTenant`, `statusTenantName`) VALUES
(-1, 'Eliminado'),
(0, 'Inactivo'),
(1, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_statusticket`
--

CREATE TABLE `tb_statusticket` (
  `idStatus` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `statusName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `tb_statusticket`
--

INSERT INTO `tb_statusticket` (`idStatus`, `statusName`, `idTypeTicketKf`) VALUES
('-1', 'Rechazado', '100'),
('1', 'Finalizado', '101'),
('10', 'Programado', '3'),
('2', 'Autorizacion Pendiente', '100'),
('3', 'Aprobado', '100'),
('4', 'Pendiente de envio ', '1'),
('5', 'En Ruta', '103'),
('6', 'Cancelado', '101'),
('7', 'Listo para Retirar', '2'),
('8', 'Solicitado', '3'),
('9', 'Pendiente', '102');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_sys_code`
--

CREATE TABLE `tb_sys_code` (
  `idCode` int(11) DEFAULT NULL,
  `code` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `description` varchar(3) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_sys_code`
--

INSERT INTO `tb_sys_code` (`idCode`, `code`, `description`) VALUES
(1, '279', 'TK');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_sys_param`
--

CREATE TABLE `tb_sys_param` (
  `idParam` int(11) UNSIGNED NOT NULL,
  `value` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_sys_param`
--

INSERT INTO `tb_sys_param` (`idParam`, `value`, `description`) VALUES
(1, 'sistemaonline@coferba.com.ar', 'USUARIO SMT MAIL'),
(2, 'Sistema2018Online', 'CLAVE SMT MAIL'),
(6, '20:00', 'HORA DE MAIL DE VERIFICACION DE MAIL PARA ADMINISTRADORES DE CONSORCIO'),
(7, 'ventas@coferba.com.ar', 'MAIL DE VENTAS'),
(8, 'tecnica@coferba.com.ar', 'MAIL SERVICO TECNICO'),
(9, 'cobranzas@coferba.com.ar', 'MAIL FACTURACION'),
(10, 'administracion@coferba.com.ar', 'MAIL ADMINISTRATIVO'),
(11, 'ULTIMA CONEXION SISTEMA ADMIN', '00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tax`
--

CREATE TABLE `tb_tax` (
  `idTypeTax` int(11) UNSIGNED NOT NULL,
  `typeTax` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_tax`
--

INSERT INTO `tb_tax` (`idTypeTax`, `typeTax`) VALUES
(1, 'CONSUMIDOR FINAL'),
(2, 'RESP. INSCRIPTO'),
(3, 'MONOTRIBUTO'),
(4, 'EXENTO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tickets`
--

CREATE TABLE `tb_tickets` (
  `idTicket` int(11) NOT NULL,
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
  `urlToken` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'URL TOKEN UTILIZADO PARA APROBAR O RECHAZAR UN PEDIDO'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_tickets`
--

INSERT INTO `tb_tickets` (`idTicket`, `dateCreated`, `dateRecibeCompany`, `idStatusTicketKf`, `codTicket`, `idTypeTicketKf`, `idRequestKf`, `idUserTenantKf`, `idOWnerKf`, `idUserAdminKf`, `idUserCompany`, `idUserEnterpriceKf`, `idUserAttendantKf`, `numberItemes`, `idTypeOfKeysKf`, `itemToDisabled`, `idReasonDisabledItemKf`, `idTypeOuther`, `mailContactConsult`, `SA_NRO_ORDER`, `descriptionComment`, `descriptionOrder`, `isCommentOrDesccriptionChange`, `idTypeServicesKf`, `totalService`, `addressConsul`, `idProfileKf`, `idOpcionLowTicketKf`, `idTypeOfOptionKf`, `idCompanyKf`, `idAdressKf`, `idDepartmentKf`, `idUserCancelTicket`, `isCancelRequested`, `reasonForCancelTicket`, `dateCancel`, `idUserApprovedTicket`, `dateRecibedAdmin`, `idOtherKf`, `isChangeDeliverylRequested`, `idUserHasChangeTicket`, `idTypeDeliveryKf`, `idWhoPickUp`, `idUserAttendantKfDelivery`, `thirdPersonNames`, `thirdPersonPhone`, `thirdPersonId`, `isNew`, `isAplicate`, `idStatusTicketKfOld`, `sendUserNotification`, `totalGestion`, `totalLlave`, `totalEnvio`, `urlToken`) VALUES
(131, '2019-09-10 01:48:42', NULL, 2, 'TK-00000264', 1, 0, 82, 0, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '270.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', 'VWMWNeeu2oIFapiJnXpb'),
(132, '2019-09-10 02:00:40', NULL, 2, 'TK-00000265', 1, 0, 74, 71, 0, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '320.99', NULL, 3, NULL, NULL, 5, 12, 120, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 2, 77, NULL, NULL, NULL, 1, NULL, NULL, NULL, '0.00', '10.99', '310.00', 'AgYvWzRJ.BioZdKAZ6-h'),
(133, '2019-09-10 16:45:28', NULL, 2, 'TK-00000266', 1, 0, 0, 71, 0, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '451.98', NULL, 3, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 3, NULL, 'Carolina Vasquez', '112243242344', 95929321, 1, NULL, NULL, NULL, '260.00', '21.98', '170.00', 'mWGfB0Zck4.mGJStLnol'),
(134, '2019-09-10 17:05:14', NULL, 2, 'TK-00000267', 1, 0, 0, 0, 31, NULL, 0, 84, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, '', NULL, 1, NULL, '281.98', NULL, 1, NULL, 1, 5, 11, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '0.00', 'hUAAX:216vPAKcA0lZgP'),
(135, '2019-09-10 17:11:52', NULL, 2, 'TK-00000268', 1, 0, 0, 0, 31, NULL, 0, 76, 1, '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '320.99', NULL, 1, NULL, 1, 5, 12, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 2, 77, NULL, NULL, NULL, 1, NULL, NULL, 1, '0.00', '10.99', '310.00', '6.g3DR0TYX54F8jubqWa'),
(136, '2019-09-11 01:18:35', NULL, 2, 'TK-00000269', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '270.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', 'Qv4eEcdelsCe97BZAEx8'),
(137, '2019-09-11 01:20:51', NULL, 3, 'TK-00000270', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '270.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 1, '2020-07-30 04:41:48', 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', '9IVjBWqHs.O1qjeP1k8V'),
(138, '2019-09-11 01:25:05', NULL, 3, 'TK-00000271', 1, 0, 0, 71, 31, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '451.98', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 1, '2020-07-30 04:41:44', 0, NULL, NULL, 2, 2, 89, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '170.00', 'T7M3fmxLYARN-LuMz0v1'),
(139, '2019-09-11 01:26:43', NULL, 3, 'TK-00000272', 1, 0, 0, 71, 31, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '451.98', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 31, '2019-09-11 03:30:03', 0, NULL, NULL, 2, 2, 84, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '170.00', '5OK79n3RuzsjDbHIJ1QI'),
(140, '2019-09-11 01:27:36', NULL, 3, 'TK-00000273', 1, 0, 0, 71, 31, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '281.98', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 31, '2019-09-11 03:30:00', 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '0.00', 'VayOcRo.yvAxwjEw647H'),
(141, '2019-09-11 01:29:14', NULL, 3, 'TK-00000274', 1, 0, 0, 71, 31, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '451.98', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 31, '2019-09-11 03:29:58', 0, NULL, NULL, 2, 2, 78, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '170.00', 'cDQsHZraOMIjwFfyObvo'),
(142, '2019-09-11 01:31:06', NULL, 3, 'TK-00000275', 1, 0, 0, 71, 31, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '451.98', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 1, '2020-07-30 04:41:38', 0, NULL, NULL, 2, 2, 84, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '170.00', 'ZQhaJab_lapt3T:4r9gf'),
(143, '2019-09-11 02:34:58', NULL, 3, 'TK-00000276', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '270.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 1, '2020-07-30 04:41:32', 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', 'sxN1zFdxa47GUjVtvZj3'),
(144, '2019-09-11 02:41:02', NULL, 3, 'TK-00000277', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '440.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 1, '2020-07-30 04:41:27', 0, NULL, 1, 2, 2, 89, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '170.00', '--RfxK.mYUf7DrK21_kn'),
(145, '2019-09-11 02:42:50', NULL, 6, 'TK-00000278', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '100.99', NULL, 1, NULL, NULL, 5, 11, 100, 71, NULL, 'prueba', '2021-02-27 12:55:57', 1, '2020-03-19 03:36:58', 0, NULL, 1, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', 'fQKigD_OB1WbFX4ohqe.'),
(146, '2019-09-11 02:54:26', NULL, 6, 'TK-00000279', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, 'asdsadas', NULL, 1, NULL, '100.99', NULL, 1, NULL, NULL, 5, 11, 100, 1, NULL, 'ghfghf', '2020-03-19 03:37:53', NULL, NULL, 0, NULL, 1, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', 'h5RgaRWBPbxSsdGq:73g'),
(129, '2019-09-07 02:56:49', NULL, 3, 'TK-00000262', 1, 0, 0, 71, 0, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '281.98', NULL, 3, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 31, '2019-09-07 05:19:56', 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, '260.00', '21.98', '0.00', 'tRHY0xO-xpP7ozeu1FJg'),
(130, '2019-09-07 03:35:58', NULL, 2, 'TK-00000263', 1, 0, 0, 0, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '440.99', NULL, 1, NULL, 2, 5, 11, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 2, 89, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '170.00', 'l7:LyXlS9ksUfLmp7y6E');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipos_servicios_internet`
--

CREATE TABLE `tb_tipos_servicios_internet` (
  `idTipoServicioInternet` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipos_servicios_internet`
--

INSERT INTO `tb_tipos_servicios_internet` (`idTipoServicioInternet`, `nombre`) VALUES
(1, 'Cable Modem - TASS'),
(2, 'Cable Modem - CLIENTE'),
(3, 'GPRS'),
(4, '3G/LTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_conexion_remoto`
--

CREATE TABLE `tb_tipo_conexion_remoto` (
  `idTipoConexionRemoto` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `tabla` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipo_conexion_remoto`
--

INSERT INTO `tb_tipo_conexion_remoto` (`idTipoConexionRemoto`, `descripcion`, `tabla`) VALUES
(1, 'Línea Telefónica', 'tb_alarm_line_phone'),
(2, 'Módulo IP', 'tb_alarm_module_ip'),
(3, 'Módulo GPRS', 'tb_alarm_module_gps');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_inmueble`
--

CREATE TABLE `tb_tipo_inmueble` (
  `idTipoInmueble` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipo_inmueble`
--

INSERT INTO `tb_tipo_inmueble` (`idTipoInmueble`, `descripcion`) VALUES
(1, 'Departamento'),
(2, 'Casa'),
(3, 'Local');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_mails`
--

CREATE TABLE `tb_tipo_mails` (
  `idTipoMail` int(10) UNSIGNED NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_tipo_mails`
--

INSERT INTO `tb_tipo_mails` (`idTipoMail`, `descripcion`) VALUES
(1, 'LLAVEROS'),
(2, 'SERVICIOS'),
(3, 'COBRANZA'),
(4, 'ADMINISTRATIVO'),
(5, 'GUARDIA'),
(6, 'EMERGENCIA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tmp_delivery_data`
--

CREATE TABLE `tb_tmp_delivery_data` (
  `idTmpDeliveryData` int(11) NOT NULL COMMENT 'ID DE LA INFO TEMPORAL ASOCIADO A UN TICKET',
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
  `dateOfRequestByUser` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_totem_model`
--

CREATE TABLE `tb_totem_model` (
  `idTotenModel` int(11) UNSIGNED NOT NULL,
  `totenModel` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_totem_model`
--

INSERT INTO `tb_totem_model` (`idTotenModel`, `totenModel`) VALUES
(1, 'DE PIE'),
(2, 'DE PARED');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_typetenant`
--

CREATE TABLE `tb_typetenant` (
  `idTypeTenant` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `typeTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_typetenant`
--

INSERT INTO `tb_typetenant` (`idTypeTenant`, `typeTenantName`) VALUES
('1', 'Propietario'),
('2', 'Inquilino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_typeticket`
--

CREATE TABLE `tb_typeticket` (
  `idTypeTicket` int(11) NOT NULL,
  `TypeTicketName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_typeticket`
--

INSERT INTO `tb_typeticket` (`idTypeTicket`, `TypeTicketName`) VALUES
(1, 'ALTA DE LLAVEROS'),
(2, 'BAJA DE LLAVEROS'),
(3, 'SERVICIO TECNICO'),
(4, 'OTRAS SOLICITUDES O CONSULTAS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_attendant`
--

CREATE TABLE `tb_type_attendant` (
  `idTyepeAttendant` int(11) UNSIGNED NOT NULL,
  `nameTypeAttendant` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_type_attendant`
--

INSERT INTO `tb_type_attendant` (`idTyepeAttendant`, `nameTypeAttendant`) VALUES
(1, 'Otro'),
(2, 'Titular'),
(3, 'Suplente'),
(4, 'Ayudante'),
(5, 'Intendente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_contrato`
--

CREATE TABLE `tb_type_contrato` (
  `idTypeContrato` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_type_contrato`
--

INSERT INTO `tb_type_contrato` (`idTypeContrato`, `description`) VALUES
(1, 'VENTA'),
(2, 'COMODATO'),
(3, 'INTEGRA 3.0 – COMODATO'),
(4, 'INTEGRA 2.0 – VENTA'),
(5, 'INTEGRA 2.0 – COMODATO'),
(6, 'MANTENIMIENTO EQUIPO INSTALADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_delivery`
--

CREATE TABLE `tb_type_delivery` (
  `idTypeDelivery` int(11) DEFAULT NULL,
  `typeDelivery` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_type_delivery`
--

INSERT INTO `tb_type_delivery` (`idTypeDelivery`, `typeDelivery`, `amount`) VALUES
(1, 'RETIRO POR OFICINA', NULL),
(2, 'ENTREGA EN EL EDIFICIO', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_gps`
--

CREATE TABLE `tb_type_gps` (
  `idTypeGps` int(11) NOT NULL,
  `typeGps` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_type_gps`
--

INSERT INTO `tb_type_gps` (`idTypeGps`, `typeGps`) VALUES
(1, 'GPS 1'),
(2, 'GPS 2'),
(3, 'GPS 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_internet`
--

CREATE TABLE `tb_type_internet` (
  `idTypeInternet` int(50) UNSIGNED NOT NULL,
  `typeInternet` varchar(50) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_type_internet`
--

INSERT INTO `tb_type_internet` (`idTypeInternet`, `typeInternet`) VALUES
(1, 'M2M - 10Mbps'),
(2, 'M2M - 25Mbps'),
(3, '500Mbps'),
(4, '10/1 Mbps'),
(5, '50/1 Mbps');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_maintenance`
--

CREATE TABLE `tb_type_maintenance` (
  `idTypeMaintenance` int(11) NOT NULL,
  `typeMaintenance` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_type_maintenance`
--

INSERT INTO `tb_type_maintenance` (`idTypeMaintenance`, `typeMaintenance`) VALUES
(1, 'MANO DE OBRA Y MATERIALES'),
(2, 'SOLO MANO DE OBRA'),
(3, 'MIXTO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_outher`
--

CREATE TABLE `tb_type_outher` (
  `idTypeOuther` int(11) NOT NULL,
  `TypeOuther` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_type_outher`
--

INSERT INTO `tb_type_outher` (`idTypeOuther`, `TypeOuther`) VALUES
(1, 'VENTA'),
(2, 'LLAVEROS'),
(3, 'SERVICIOS TECNICOS'),
(4, 'FACTURACION'),
(5, 'ADMINISTRATIVAS'),
(6, 'SEGURIDAD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_services`
--

CREATE TABLE `tb_type_services` (
  `idTypeServices` int(11) NOT NULL,
  `typeServices` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `SA_ID_TYPE` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_type_services`
--

INSERT INTO `tb_type_services` (`idTypeServices`, `typeServices`, `SA_ID_TYPE`) VALUES
(1, 'Cambio de Camara', NULL),
(2, 'Cambio de Lector de llave HID', NULL),
(3, 'Cambio de Cerradura Electromagnetica', NULL),
(4, 'Cambio de Lector de llave HID', NULL),
(5, 'Cambio de Molinete', NULL),
(6, 'Cambio de Control de Acceso', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_user`
--

CREATE TABLE `tb_user` (
  `idUser` int(11) NOT NULL,
  `fullNameUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `emailUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneNumberUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneLocalNumberUser` varchar(25) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `passwordUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) UNSIGNED DEFAULT NULL,
  `dateCreated` timestamp NULL DEFAULT current_timestamp(),
  `idCompanyKf` int(11) DEFAULT NULL,
  `resetPasword` tinyint(4) DEFAULT 0,
  `idAddresKf` int(11) DEFAULT NULL,
  `idTyepeAttendantKf` int(11) UNSIGNED DEFAULT NULL COMMENT 'TIPO DE ENCARGADO',
  `descOther` text COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'ENCARGADO DE TIPO OTRO',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'DEPARTAMENTO DE EL INQUILINO O PROPIETARIO',
  `isDepartmentApproved` tinyint(4) DEFAULT NULL COMMENT 'APROBADO O NO  EL DEPARTAMENTO DEL INQUILINO',
  `isEdit` tinyint(11) DEFAULT 0,
  `requireAuthentication` tinyint(11) DEFAULT 1,
  `idTypeTenantKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) UNSIGNED DEFAULT NULL,
  `tokenMail` varchar(300) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `isConfirmatedMail` tinyint(4) DEFAULT 0,
  `SA_ID` int(11) DEFAULT NULL,
  `idSysProfileFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_user`
--

INSERT INTO `tb_user` (`idUser`, `fullNameUser`, `emailUser`, `phoneNumberUser`, `phoneLocalNumberUser`, `passwordUser`, `idProfileKf`, `dateCreated`, `idCompanyKf`, `resetPasword`, `idAddresKf`, `idTyepeAttendantKf`, `descOther`, `idDepartmentKf`, `isDepartmentApproved`, `isEdit`, `requireAuthentication`, `idTypeTenantKf`, `idStatusKf`, `tokenMail`, `isConfirmatedMail`, `SA_ID`, `idSysProfileFk`) VALUES
(1, 'admin sistema', 'soporte@coferba.com.ar', '(054) 9 11 2323-2323', '91124759596', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 1, '2018-02-16 12:01:22', NULL, 0, NULL, NULL, '', NULL, NULL, 1, NULL, NULL, 1, '', 1, NULL, 8),
(71, 'David Eduardo Rincon', 'davideduardo.luengo@hotmail.com', '1122333444555666', '1122333444555666', '870e8768d555d80e0aeb44870c081f5563d90bd3', 1, '2018-10-22 02:33:22', 5, 0, 11, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, '3Jh0NuqLHa', 1, 3833, 8),
(72, 'leandro figueroa', 'lean.figueroa@gmail.com', '123213213213213', '123213213213213', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 5, '2018-10-29 16:27:43', 5, 0, 12, NULL, NULL, 117, 1, 0, NULL, 2, 1, 'JbuVXny0Jr', 1, NULL, NULL),
(73, 'leandro2 figueroa2', 'leandro.figueroa@coferba.com.ar', '1122356388', '123213213213213', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, '2018-10-29 16:48:52', 5, 0, 12, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, 'OLtCaObFgO', 1, NULL, NULL),
(74, 'inquilino prueba Modificado', 'rexx84@gmail.com', '123213213213213', '123213213213213', '03dedf914b5841220b31eee857d94a03974553fb', 5, '2018-10-29 16:58:23', 5, 1, 12, NULL, NULL, 120, 1, 1, NULL, 2, 1, 'XTrpLMkZiG', 1, NULL, NULL),
(75, 'Encargado Prueba', 'encargadoprueba@asdasda', '123213213213213', '1123232434333423', 'c4f9fcd7be6b041073f1b23a2bf80bd1d831292e', 6, '2018-12-19 17:30:57', 5, 1, 11, 4, NULL, 103, 1, 1, 1, 2, 1, 'gQuGxR2Zoo', 1, NULL, NULL),
(76, 'Roberto Higuera', 'rhiguera@fffff.com', '123213213213214', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 6, '2019-01-18 04:10:24', 5, 0, 12, 2, NULL, NULL, NULL, 1, NULL, 1, 1, 'ZWsfbNEEXB', 1, NULL, NULL),
(77, 'Esteban Moreli', 'emoreli@akjsdsadas.com', '123213213213213', '11233243253243', '44b07ccf74fd8a488be0b4aa0593beff5ac6f3ef', 6, '2019-01-18 04:31:36', 5, 1, 12, 3, NULL, NULL, NULL, 1, 0, 0, 1, 'uQzz412uH5', 1, NULL, NULL),
(78, 'Victor Gonzalez', 'vgonzalez@asdadsadwq.com', '77788787878', '', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 6, '2019-01-18 04:33:07', 5, 0, 11, 2, NULL, NULL, NULL, 1, 1, 1, 1, '69bMxpjXQ8', 1, NULL, NULL),
(79, 'Sofia Rincon', 'sofia.rincon@asdasdsad.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 4, '2019-01-22 04:06:32', 5, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, 1, 'NaUwCkVwH4', 1, NULL, NULL),
(80, 'Daniela Becerra', 'daniela.becerra@hoasdsad.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2019-02-11 01:23:37', 5, 0, 12, NULL, NULL, 128, 1, 1, NULL, 2, 1, 'hXLcQRwWGn', 1, NULL, NULL),
(81, 'probando', 'probando@probando.com', '123213123213', '', 'f11131b2bcdf821dc9ff69b38e2712541439b9f8', 5, '2019-07-27 17:29:15', 5, 1, 11, NULL, NULL, 108, 1, 1, NULL, 2, 1, 'lxUXCkdgnZ', 1, NULL, NULL),
(82, 'asdsadas', 'asdsad@asdsad.com', '', '12321311312', 'b9f4327bafdb162ed16fe0d6d4a50bde306ee08e', 5, '2019-07-27 17:51:24', 5, 1, 11, NULL, NULL, 100, 1, 1, NULL, 2, 1, 'HCU6UgT88X', 1, NULL, NULL),
(83, 'erewrrewrew', 'wqewqew@asdsad.com', '', '121321321', '7be5fac0585900a65effd04d887cc62022b16a20', 5, '2019-07-27 18:38:43', NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, 2, 1, 'yZAGdjTOLv', 1, NULL, NULL),
(84, 'Arturo Michelena', 'amichelena@asdas.com', '', '11232142132132', 'fc604011dbac13b0f6f0b89c81c0efe0271530c1', 6, '2019-07-27 18:59:58', 5, 1, 11, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'WuYJFO1DZD', 1, NULL, NULL),
(85, 'Fernando Angulo', 'david.rincon.oracle@gmail.com', '', '123213213', '78d16ced1eedb4f436c83a861c91e052aaf3699f', 3, '2019-07-28 00:43:16', 5, 1, 12, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '7gVmCe4f3J', 1, NULL, NULL),
(86, 'David Eduardo Rincon', 'davideduardo.luengo2@hotmail.com', '', '01122356388', 'fa399d74e61282062d50aaf7eb6a9afc1b21f314', 5, '2019-08-21 03:20:44', 1, 1, 1, NULL, NULL, 2, 1, 1, NULL, 2, 1, 'K67aipTQu2', 1, NULL, NULL),
(87, 'Ernesto Araujo', 'earaujo@asdsad.com', '', '111232324324324', '5365642294a7a05378e5e13cd44fa91c5f9b546a', 6, '2019-08-29 23:12:26', 1, 1, 1, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'FLTvvGz5wZ', 1, NULL, NULL),
(88, 'Gabriel Gonzalez', 'ggonzalez@hotmail.com', '11223544564356346', '112322424233', 'e47ed8dab1b69a560435c3f4bff9d2679ab12233', 6, '2019-08-29 23:13:21', 1, 1, 2, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'WM7HECe4EL', 1, NULL, NULL),
(89, 'Dionisio Machado', 'dmachado@asdasd.com', '121232132134', '112143435556', '80662a250c92f9c05b965cbff69785fdc404d0c4', 6, '2019-08-29 23:22:06', 5, 1, 11, 1, 'Plomero', NULL, NULL, 1, 0, NULL, 1, 'YJh6f8Gxb0', 1, NULL, NULL),
(90, 'tester', 'tester@seguridadtass.com.ar', '', '1134343242423', 'c4bfc8777fbb8f54e03f4d5bcd1ff28fe347da3a', 1, '2019-11-09 19:25:55', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'fxvMqFzwGK', 1, NULL, 8),
(91, 'prueba', 'sfsdfdsfdfds', 'prueba', NULL, '13a6d4daa92304298f07df965a8e71a42a6d2047', 1, '2019-11-09 19:26:53', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 'FAMIVpMRxv', 0, NULL, 8),
(92, 'German Malaver', 'german.malaver@asdasd.com', '1123432432444', '1123423432432', '6956aa2ea365aa0cf67ba52265436016d751bd3e', 6, '2020-07-10 23:32:47', 1, 1, 2, 2, NULL, NULL, NULL, 1, NULL, 1, 1, '8S3z3UtLlR', 1, NULL, NULL),
(93, 'David Eduardo Rincon Luengo', 'rexx85@gmail.com', '1122333334', '1122356388', '29474f7249c08b13cf44a0dce3c819183fc031d4', 3, '2020-08-21 08:57:06', 5, 1, 12, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, 'RNqMUvoiqi', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_user_license`
--

CREATE TABLE `tb_user_license` (
  `idUserLicense` int(11) NOT NULL,
  `fullName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `keyword` varchar(100) DEFAULT NULL,
  `idOS` tinyint(1) DEFAULT 1,
  `profileUser` varchar(100) DEFAULT '',
  `idClientServicesSmartPanicFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_user_license`
--

INSERT INTO `tb_user_license` (`idUserLicense`, `fullName`, `email`, `phone`, `keyword`, `idOS`, `profileUser`, `idClientServicesSmartPanicFk`) VALUES
(67, 'German Malaver', 'german.malaver@asdasd.com', '1123432432444', 'Patata', 1, 'admin', 24),
(68, 'Gabriel Gonzalez', 'ggonzalez@hotmail.com', '11223544564356346', 'pelota', 1, 'admin', 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_zonas`
--

CREATE TABLE `tb_zonas` (
  `idZona` int(11) NOT NULL,
  `n_zona` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `costo_envio` float DEFAULT NULL,
  `valor_envio` float DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_zonas`
--

INSERT INTO `tb_zonas` (`idZona`, `n_zona`, `descripcion`, `costo_envio`, `valor_envio`, `status`) VALUES
(1, 1, 'zona este', 450, 1003, 1),
(2, 2, 'zona norte', 300, 14003, 1),
(3, 3, 'zona oeste', 200, 13093, 1),
(11, 4, 'zona sur', 9993, 9983, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_access_control`
--
ALTER TABLE `tb_access_control`
  ADD PRIMARY KEY (`idAccessControl`);

--
-- Indices de la tabla `tb_access_control_door`
--
ALTER TABLE `tb_access_control_door`
  ADD PRIMARY KEY (`idAccessControlDoor`);

--
-- Indices de la tabla `tb_addres`
--
ALTER TABLE `tb_addres`
  ADD PRIMARY KEY (`idAdress`);

--
-- Indices de la tabla `tb_agents`
--
ALTER TABLE `tb_agents`
  ADD PRIMARY KEY (`idAgent`);

--
-- Indices de la tabla `tb_alarm_batery`
--
ALTER TABLE `tb_alarm_batery`
  ADD PRIMARY KEY (`idAlarmBatery`);

--
-- Indices de la tabla `tb_alarm_line_phone`
--
ALTER TABLE `tb_alarm_line_phone`
  ADD PRIMARY KEY (`idAlarmLinePhone`);

--
-- Indices de la tabla `tb_alarm_module_gps`
--
ALTER TABLE `tb_alarm_module_gps`
  ADD PRIMARY KEY (`idAlarmModuleGps`);

--
-- Indices de la tabla `tb_alarm_module_ip`
--
ALTER TABLE `tb_alarm_module_ip`
  ADD PRIMARY KEY (`idAlarmModuleIp`);

--
-- Indices de la tabla `tb_alarm_person_alert`
--
ALTER TABLE `tb_alarm_person_alert`
  ADD PRIMARY KEY (`idPersonAlert`);

--
-- Indices de la tabla `tb_alarm_person_verific`
--
ALTER TABLE `tb_alarm_person_verific`
  ADD PRIMARY KEY (`idPersonVerific`);

--
-- Indices de la tabla `tb_alarm_services_aditionals`
--
ALTER TABLE `tb_alarm_services_aditionals`
  ADD PRIMARY KEY (`idAlarmServicesAditionals`);

--
-- Indices de la tabla `tb_alarm_type_client`
--
ALTER TABLE `tb_alarm_type_client`
  ADD PRIMARY KEY (`idTypeClientAlarm`);

--
-- Indices de la tabla `tb_backup_energy`
--
ALTER TABLE `tb_backup_energy`
  ADD PRIMARY KEY (`idBackupEnergy`),
  ADD KEY `idClientServicesCameraFk` (`idClientServicesFk`),
  ADD KEY `idBatteryFk` (`idBatteryFk`);

--
-- Indices de la tabla `tb_backup_energy_totem`
--
ALTER TABLE `tb_backup_energy_totem`
  ADD PRIMARY KEY (`idBackupEnergyTotem`),
  ADD KEY `idClientServicesCameraFk` (`idClientServicesTotemFk`),
  ADD KEY `idBatteryFk` (`idBatteryFk`);

--
-- Indices de la tabla `tb_bakups_order`
--
ALTER TABLE `tb_bakups_order`
  ADD PRIMARY KEY (`idBakupsOrder`);

--
-- Indices de la tabla `tb_battery_install_access_control`
--
ALTER TABLE `tb_battery_install_access_control`
  ADD PRIMARY KEY (`idBatteryInstallAccessControl`),
  ADD KEY `idClientServicesAccessControlFk` (`idClientServicesAccessControlFk`),
  ADD KEY `idBatteryFk` (`idBatteryFk`);

--
-- Indices de la tabla `tb_battery_install_alarm`
--
ALTER TABLE `tb_battery_install_alarm`
  ADD PRIMARY KEY (`idBatteryInstallAlarm`);

--
-- Indices de la tabla `tb_cameras`
--
ALTER TABLE `tb_cameras`
  ADD PRIMARY KEY (`idCamera`),
  ADD KEY `idClientServicesCameraFk` (`idClientServicesCameraFk`);

--
-- Indices de la tabla `tb_cameras_totem`
--
ALTER TABLE `tb_cameras_totem`
  ADD PRIMARY KEY (`idCameraTotem`),
  ADD KEY `idClientServicesCameraFk` (`idClientServicesCameraTotemFk`);

--
-- Indices de la tabla `tb_category_departament`
--
ALTER TABLE `tb_category_departament`
  ADD PRIMARY KEY (`idCategoryDepartament`);

--
-- Indices de la tabla `tb_clients`
--
ALTER TABLE `tb_clients`
  ADD PRIMARY KEY (`idClient`);

--
-- Indices de la tabla `tb_clients_phones`
--
ALTER TABLE `tb_clients_phones`
  ADD PRIMARY KEY (`idClientPhones`);

--
-- Indices de la tabla `tb_clients_tickets`
--
ALTER TABLE `tb_clients_tickets`
  ADD PRIMARY KEY (`idTicketsCliets`);

--
-- Indices de la tabla `tb_client_address_particular`
--
ALTER TABLE `tb_client_address_particular`
  ADD PRIMARY KEY (`idAddressParticular`);

--
-- Indices de la tabla `tb_client_authorizing`
--
ALTER TABLE `tb_client_authorizing`
  ADD PRIMARY KEY (`idClientAuthorizing`);

--
-- Indices de la tabla `tb_client_billing_information`
--
ALTER TABLE `tb_client_billing_information`
  ADD PRIMARY KEY (`idBillingInfo`);

--
-- Indices de la tabla `tb_client_camera`
--
ALTER TABLE `tb_client_camera`
  ADD PRIMARY KEY (`idClientCamera`),
  ADD KEY `idClientServicesCameraFk` (`idClientServicesCameraFk`);

--
-- Indices de la tabla `tb_client_departament`
--
ALTER TABLE `tb_client_departament`
  ADD PRIMARY KEY (`idClientDepartament`);

--
-- Indices de la tabla `tb_client_files_list`
--
ALTER TABLE `tb_client_files_list`
  ADD PRIMARY KEY (`idClientFiles`);

--
-- Indices de la tabla `tb_client_functional_units`
--
ALTER TABLE `tb_client_functional_units`
  ADD PRIMARY KEY (`idFunctionalUnits`);

--
-- Indices de la tabla `tb_client_mails`
--
ALTER TABLE `tb_client_mails`
  ADD PRIMARY KEY (`idClientMail`);

--
-- Indices de la tabla `tb_client_phone_contact`
--
ALTER TABLE `tb_client_phone_contact`
  ADD PRIMARY KEY (`idClientPhoneFk`);

--
-- Indices de la tabla `tb_client_schedule_atention`
--
ALTER TABLE `tb_client_schedule_atention`
  ADD PRIMARY KEY (`idScheduleAtention`);

--
-- Indices de la tabla `tb_client_services`
--
ALTER TABLE `tb_client_services`
  ADD PRIMARY KEY (`idClientServices`),
  ADD KEY `idTipeServiceFk` (`idTipeServiceFk`);

--
-- Indices de la tabla `tb_client_services_access_control`
--
ALTER TABLE `tb_client_services_access_control`
  ADD PRIMARY KEY (`idClientServicesAccessControl`),
  ADD KEY `idDoorFk` (`idDoorFk`),
  ADD KEY `idAccessControlFk` (`idAccessControlFk`),
  ADD KEY `idInputReaderFk` (`idInputReaderFk`),
  ADD KEY `idFontFk` (`idFontFk`),
  ADD KEY `idTypeMaintenanceFk` (`idTypeMaintenanceFk`),
  ADD KEY `idEmergencyButtonFk` (`idEmergencyButtonFk`),
  ADD KEY `tb_client_services_access_control_ibfk_7` (`idShutdownKeyFk`);

--
-- Indices de la tabla `tb_client_services_alarms`
--
ALTER TABLE `tb_client_services_alarms`
  ADD PRIMARY KEY (`idClientServicesAlarms`);

--
-- Indices de la tabla `tb_client_services_alarms_aditional`
--
ALTER TABLE `tb_client_services_alarms_aditional`
  ADD PRIMARY KEY (`idClientServicesAlarmsAditionals`);

--
-- Indices de la tabla `tb_client_services_camera`
--
ALTER TABLE `tb_client_services_camera`
  ADD PRIMARY KEY (`idClientServicesCamera`),
  ADD KEY `idClientServicesFk` (`idClientServicesFk`),
  ADD KEY `idTypeMaintenanceFk` (`idTypeMaintenanceFk`),
  ADD KEY `idDvrNvr_tb_prod_classFk` (`idDvr_nvrFk`);

--
-- Indices de la tabla `tb_client_services_gps`
--
ALTER TABLE `tb_client_services_gps`
  ADD PRIMARY KEY (`idClientServicesGps`);

--
-- Indices de la tabla `tb_client_services_internet`
--
ALTER TABLE `tb_client_services_internet`
  ADD PRIMARY KEY (`idClientServicesInternet`);

--
-- Indices de la tabla `tb_client_services_smart_panic`
--
ALTER TABLE `tb_client_services_smart_panic`
  ADD PRIMARY KEY (`idClientServicesSmartPanic`),
  ADD KEY `idDetinationOfLicenseFk` (`idDetinationOfLicenseFk`),
  ADD KEY `idDepartmentFk` (`idDepartmentFk`),
  ADD KEY `idParticularAddressFk` (`idParticularAddressFk`);

--
-- Indices de la tabla `tb_client_services_totem`
--
ALTER TABLE `tb_client_services_totem`
  ADD PRIMARY KEY (`idClientServicesTotem`);

--
-- Indices de la tabla `tb_client_totem`
--
ALTER TABLE `tb_client_totem`
  ADD PRIMARY KEY (`idClientTotem`);

--
-- Indices de la tabla `tb_client_type`
--
ALTER TABLE `tb_client_type`
  ADD PRIMARY KEY (`idClientType`);

--
-- Indices de la tabla `tb_client_type_services`
--
ALTER TABLE `tb_client_type_services`
  ADD PRIMARY KEY (`idClientTypeServices`);

--
-- Indices de la tabla `tb_client_ufc`
--
ALTER TABLE `tb_client_ufc`
  ADD PRIMARY KEY (`idUfd`);

--
-- Indices de la tabla `tb_client_users`
--
ALTER TABLE `tb_client_users`
  ADD PRIMARY KEY (`idClientUsers`);

--
-- Indices de la tabla `tb_company`
--
ALTER TABLE `tb_company`
  ADD PRIMARY KEY (`idCompany`);

--
-- Indices de la tabla `tb_company_type_keychains`
--
ALTER TABLE `tb_company_type_keychains`
  ADD PRIMARY KEY (`idKey`);

--
-- Indices de la tabla `tb_contratos`
--
ALTER TABLE `tb_contratos`
  ADD PRIMARY KEY (`idContrato`);

--
-- Indices de la tabla `tb_datos_adicionales_alarmas`
--
ALTER TABLE `tb_datos_adicionales_alarmas`
  ADD PRIMARY KEY (`idDatoAdicionalAlarma`);

--
-- Indices de la tabla `tb_department`
--
ALTER TABLE `tb_department`
  ADD PRIMARY KEY (`idDepartment`);

--
-- Indices de la tabla `tb_detalles_control_acceso`
--
ALTER TABLE `tb_detalles_control_acceso`
  ADD PRIMARY KEY (`idControlAcceso`);

--
-- Indices de la tabla `tb_detination_of_license`
--
ALTER TABLE `tb_detination_of_license`
  ADD PRIMARY KEY (`idDetinationOfLicense`);

--
-- Indices de la tabla `tb_divice_opening`
--
ALTER TABLE `tb_divice_opening`
  ADD PRIMARY KEY (`idDiviceOpening`);

--
-- Indices de la tabla `tb_emergency_button`
--
ALTER TABLE `tb_emergency_button`
  ADD PRIMARY KEY (`idEmergencyButton`);

--
-- Indices de la tabla `tb_font`
--
ALTER TABLE `tb_font`
  ADD PRIMARY KEY (`idFonf`);

--
-- Indices de la tabla `tb_formato_transmision`
--
ALTER TABLE `tb_formato_transmision`
  ADD PRIMARY KEY (`idFormatoTransmision`);

--
-- Indices de la tabla `tb_format_tramitio`
--
ALTER TABLE `tb_format_tramitio`
  ADD PRIMARY KEY (`idFormatTramitio`);

--
-- Indices de la tabla `tb_franja_horaria_alarmas`
--
ALTER TABLE `tb_franja_horaria_alarmas`
  ADD PRIMARY KEY (`id_franja_horaria`);

--
-- Indices de la tabla `tb_input_reader`
--
ALTER TABLE `tb_input_reader`
  ADD PRIMARY KEY (`idInputReader`);

--
-- Indices de la tabla `tb_internet_company`
--
ALTER TABLE `tb_internet_company`
  ADD PRIMARY KEY (`idInternetCompany`);

--
-- Indices de la tabla `tb_location`
--
ALTER TABLE `tb_location`
  ADD PRIMARY KEY (`idLocation`);

--
-- Indices de la tabla `tb_modules`
--
ALTER TABLE `tb_modules`
  ADD PRIMARY KEY (`idModule`);

--
-- Indices de la tabla `tb_monitor_company`
--
ALTER TABLE `tb_monitor_company`
  ADD PRIMARY KEY (`idMonitorCompany`);

--
-- Indices de la tabla `tb_opcion_low`
--
ALTER TABLE `tb_opcion_low`
  ADD PRIMARY KEY (`idOpcionLowTicket`);

--
-- Indices de la tabla `tb_personas_para_dar_aviso_alarmas`
--
ALTER TABLE `tb_personas_para_dar_aviso_alarmas`
  ADD PRIMARY KEY (`idPersona_aviso`);

--
-- Indices de la tabla `tb_personas_para_verificar_en_lugar`
--
ALTER TABLE `tb_personas_para_verificar_en_lugar`
  ADD PRIMARY KEY (`idPersona_aviso_lugar`);

--
-- Indices de la tabla `tb_products`
--
ALTER TABLE `tb_products`
  ADD PRIMARY KEY (`idProduct`);

--
-- Indices de la tabla `tb_products_classification`
--
ALTER TABLE `tb_products_classification`
  ADD PRIMARY KEY (`idProductClassification`);

--
-- Indices de la tabla `tb_products_divice_opening`
--
ALTER TABLE `tb_products_divice_opening`
  ADD PRIMARY KEY (`idProductsDiviceOpening`);

--
-- Indices de la tabla `tb_profile`
--
ALTER TABLE `tb_profile`
  ADD PRIMARY KEY (`idProfile`);

--
-- Indices de la tabla `tb_profiles`
--
ALTER TABLE `tb_profiles`
  ADD PRIMARY KEY (`idProfiles`);

--
-- Indices de la tabla `tb_profiles_modules`
--
ALTER TABLE `tb_profiles_modules`
  ADD PRIMARY KEY (`idProfileModule`);

--
-- Indices de la tabla `tb_province`
--
ALTER TABLE `tb_province`
  ADD PRIMARY KEY (`idProvince`);

--
-- Indices de la tabla `tb_reason_disabled_item`
--
ALTER TABLE `tb_reason_disabled_item`
  ADD PRIMARY KEY (`idReasonDisabledItem`);

--
-- Indices de la tabla `tb_request`
--
ALTER TABLE `tb_request`
  ADD PRIMARY KEY (`idRequest`);

--
-- Indices de la tabla `tb_router_internet`
--
ALTER TABLE `tb_router_internet`
  ADD PRIMARY KEY (`idRouterInternet`);

--
-- Indices de la tabla `tb_sensors_alarm`
--
ALTER TABLE `tb_sensors_alarm`
  ADD PRIMARY KEY (`idSensorsAlarm`);

--
-- Indices de la tabla `tb_services`
--
ALTER TABLE `tb_services`
  ADD PRIMARY KEY (`idService`);

--
-- Indices de la tabla `tb_services_camera_users`
--
ALTER TABLE `tb_services_camera_users`
  ADD PRIMARY KEY (`idServicesCameraUsers`);

--
-- Indices de la tabla `tb_servicios_del_contrato_cabecera`
--
ALTER TABLE `tb_servicios_del_contrato_cabecera`
  ADD PRIMARY KEY (`idServiciosDelContrato`);

--
-- Indices de la tabla `tb_servicios_del_contrato_cuerpo`
--
ALTER TABLE `tb_servicios_del_contrato_cuerpo`
  ADD PRIMARY KEY (`idServiciosDelContratoCuerpo`);

--
-- Indices de la tabla `tb_sesores_alarmas`
--
ALTER TABLE `tb_sesores_alarmas`
  ADD PRIMARY KEY (`idSensorAlarma`);

--
-- Indices de la tabla `tb_shutdown_key`
--
ALTER TABLE `tb_shutdown_key`
  ADD PRIMARY KEY (`idShutdownKey`);

--
-- Indices de la tabla `tb_sistemas_operativos`
--
ALTER TABLE `tb_sistemas_operativos`
  ADD PRIMARY KEY (`idSistemaOperativo`);

--
-- Indices de la tabla `tb_smart_panic_license_pivote`
--
ALTER TABLE `tb_smart_panic_license_pivote`
  ADD PRIMARY KEY (`idPivoteLicense`),
  ADD KEY `idClientServicesSmartPanicFk` (`idClientServicesSmartPanicFk`),
  ADD KEY `idUserLinceseFk` (`idUserLinceseFk`);

--
-- Indices de la tabla `tb_status`
--
ALTER TABLE `tb_status`
  ADD PRIMARY KEY (`idStatusTenant`);

--
-- Indices de la tabla `tb_statusticket`
--
ALTER TABLE `tb_statusticket`
  ADD PRIMARY KEY (`idStatus`);

--
-- Indices de la tabla `tb_sys_param`
--
ALTER TABLE `tb_sys_param`
  ADD PRIMARY KEY (`idParam`);

--
-- Indices de la tabla `tb_tax`
--
ALTER TABLE `tb_tax`
  ADD PRIMARY KEY (`idTypeTax`);

--
-- Indices de la tabla `tb_tickets`
--
ALTER TABLE `tb_tickets`
  ADD PRIMARY KEY (`idTicket`);

--
-- Indices de la tabla `tb_tipos_servicios_internet`
--
ALTER TABLE `tb_tipos_servicios_internet`
  ADD PRIMARY KEY (`idTipoServicioInternet`);

--
-- Indices de la tabla `tb_tipo_conexion_remoto`
--
ALTER TABLE `tb_tipo_conexion_remoto`
  ADD PRIMARY KEY (`idTipoConexionRemoto`);

--
-- Indices de la tabla `tb_tipo_inmueble`
--
ALTER TABLE `tb_tipo_inmueble`
  ADD PRIMARY KEY (`idTipoInmueble`);

--
-- Indices de la tabla `tb_tipo_mails`
--
ALTER TABLE `tb_tipo_mails`
  ADD PRIMARY KEY (`idTipoMail`);

--
-- Indices de la tabla `tb_tmp_delivery_data`
--
ALTER TABLE `tb_tmp_delivery_data`
  ADD PRIMARY KEY (`idTmpDeliveryData`);

--
-- Indices de la tabla `tb_totem_model`
--
ALTER TABLE `tb_totem_model`
  ADD PRIMARY KEY (`idTotenModel`);

--
-- Indices de la tabla `tb_typetenant`
--
ALTER TABLE `tb_typetenant`
  ADD PRIMARY KEY (`idTypeTenant`);

--
-- Indices de la tabla `tb_typeticket`
--
ALTER TABLE `tb_typeticket`
  ADD PRIMARY KEY (`idTypeTicket`);

--
-- Indices de la tabla `tb_type_attendant`
--
ALTER TABLE `tb_type_attendant`
  ADD PRIMARY KEY (`idTyepeAttendant`);

--
-- Indices de la tabla `tb_type_contrato`
--
ALTER TABLE `tb_type_contrato`
  ADD PRIMARY KEY (`idTypeContrato`);

--
-- Indices de la tabla `tb_type_gps`
--
ALTER TABLE `tb_type_gps`
  ADD PRIMARY KEY (`idTypeGps`);

--
-- Indices de la tabla `tb_type_internet`
--
ALTER TABLE `tb_type_internet`
  ADD PRIMARY KEY (`idTypeInternet`);

--
-- Indices de la tabla `tb_type_maintenance`
--
ALTER TABLE `tb_type_maintenance`
  ADD PRIMARY KEY (`idTypeMaintenance`);

--
-- Indices de la tabla `tb_type_outher`
--
ALTER TABLE `tb_type_outher`
  ADD PRIMARY KEY (`idTypeOuther`);

--
-- Indices de la tabla `tb_type_services`
--
ALTER TABLE `tb_type_services`
  ADD PRIMARY KEY (`idTypeServices`);

--
-- Indices de la tabla `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`idUser`),
  ADD KEY `idProfileKf` (`idProfileKf`),
  ADD KEY `idAddresKf` (`idAddresKf`),
  ADD KEY `idCompanyKf` (`idCompanyKf`);

--
-- Indices de la tabla `tb_user_license`
--
ALTER TABLE `tb_user_license`
  ADD PRIMARY KEY (`idUserLicense`);

--
-- Indices de la tabla `tb_zonas`
--
ALTER TABLE `tb_zonas`
  ADD PRIMARY KEY (`idZona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_access_control`
--
ALTER TABLE `tb_access_control`
  MODIFY `idAccessControl` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_access_control_door`
--
ALTER TABLE `tb_access_control_door`
  MODIFY `idAccessControlDoor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_addres`
--
ALTER TABLE `tb_addres`
  MODIFY `idAdress` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tb_agents`
--
ALTER TABLE `tb_agents`
  MODIFY `idAgent` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_batery`
--
ALTER TABLE `tb_alarm_batery`
  MODIFY `idAlarmBatery` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_line_phone`
--
ALTER TABLE `tb_alarm_line_phone`
  MODIFY `idAlarmLinePhone` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_module_gps`
--
ALTER TABLE `tb_alarm_module_gps`
  MODIFY `idAlarmModuleGps` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_module_ip`
--
ALTER TABLE `tb_alarm_module_ip`
  MODIFY `idAlarmModuleIp` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_person_alert`
--
ALTER TABLE `tb_alarm_person_alert`
  MODIFY `idPersonAlert` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_person_verific`
--
ALTER TABLE `tb_alarm_person_verific`
  MODIFY `idPersonVerific` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_services_aditionals`
--
ALTER TABLE `tb_alarm_services_aditionals`
  MODIFY `idAlarmServicesAditionals` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_type_client`
--
ALTER TABLE `tb_alarm_type_client`
  MODIFY `idTypeClientAlarm` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_backup_energy`
--
ALTER TABLE `tb_backup_energy`
  MODIFY `idBackupEnergy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `tb_backup_energy_totem`
--
ALTER TABLE `tb_backup_energy_totem`
  MODIFY `idBackupEnergyTotem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT de la tabla `tb_bakups_order`
--
ALTER TABLE `tb_bakups_order`
  MODIFY `idBakupsOrder` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_battery_install_access_control`
--
ALTER TABLE `tb_battery_install_access_control`
  MODIFY `idBatteryInstallAccessControl` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT de la tabla `tb_battery_install_alarm`
--
ALTER TABLE `tb_battery_install_alarm`
  MODIFY `idBatteryInstallAlarm` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_cameras`
--
ALTER TABLE `tb_cameras`
  MODIFY `idCamera` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT de la tabla `tb_cameras_totem`
--
ALTER TABLE `tb_cameras_totem`
  MODIFY `idCameraTotem` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=224;

--
-- AUTO_INCREMENT de la tabla `tb_category_departament`
--
ALTER TABLE `tb_category_departament`
  MODIFY `idCategoryDepartament` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_clients`
--
ALTER TABLE `tb_clients`
  MODIFY `idClient` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `tb_clients_phones`
--
ALTER TABLE `tb_clients_phones`
  MODIFY `idClientPhones` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_clients_tickets`
--
ALTER TABLE `tb_clients_tickets`
  MODIFY `idTicketsCliets` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tb_client_address_particular`
--
ALTER TABLE `tb_client_address_particular`
  MODIFY `idAddressParticular` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `tb_client_authorizing`
--
ALTER TABLE `tb_client_authorizing`
  MODIFY `idClientAuthorizing` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_billing_information`
--
ALTER TABLE `tb_client_billing_information`
  MODIFY `idBillingInfo` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `tb_client_camera`
--
ALTER TABLE `tb_client_camera`
  MODIFY `idClientCamera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `tb_client_departament`
--
ALTER TABLE `tb_client_departament`
  MODIFY `idClientDepartament` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=988;

--
-- AUTO_INCREMENT de la tabla `tb_client_files_list`
--
ALTER TABLE `tb_client_files_list`
  MODIFY `idClientFiles` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `tb_client_functional_units`
--
ALTER TABLE `tb_client_functional_units`
  MODIFY `idFunctionalUnits` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_mails`
--
ALTER TABLE `tb_client_mails`
  MODIFY `idClientMail` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=421;

--
-- AUTO_INCREMENT de la tabla `tb_client_phone_contact`
--
ALTER TABLE `tb_client_phone_contact`
  MODIFY `idClientPhoneFk` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de la tabla `tb_client_schedule_atention`
--
ALTER TABLE `tb_client_schedule_atention`
  MODIFY `idScheduleAtention` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=339;

--
-- AUTO_INCREMENT de la tabla `tb_client_services`
--
ALTER TABLE `tb_client_services`
  MODIFY `idClientServices` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=289;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_access_control`
--
ALTER TABLE `tb_client_services_access_control`
  MODIFY `idClientServicesAccessControl` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_alarms`
--
ALTER TABLE `tb_client_services_alarms`
  MODIFY `idClientServicesAlarms` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_alarms_aditional`
--
ALTER TABLE `tb_client_services_alarms_aditional`
  MODIFY `idClientServicesAlarmsAditionals` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_camera`
--
ALTER TABLE `tb_client_services_camera`
  MODIFY `idClientServicesCamera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_gps`
--
ALTER TABLE `tb_client_services_gps`
  MODIFY `idClientServicesGps` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_internet`
--
ALTER TABLE `tb_client_services_internet`
  MODIFY `idClientServicesInternet` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_smart_panic`
--
ALTER TABLE `tb_client_services_smart_panic`
  MODIFY `idClientServicesSmartPanic` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_totem`
--
ALTER TABLE `tb_client_services_totem`
  MODIFY `idClientServicesTotem` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tb_client_totem`
--
ALTER TABLE `tb_client_totem`
  MODIFY `idClientTotem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT de la tabla `tb_client_type`
--
ALTER TABLE `tb_client_type`
  MODIFY `idClientType` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_client_type_services`
--
ALTER TABLE `tb_client_type_services`
  MODIFY `idClientTypeServices` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_client_ufc`
--
ALTER TABLE `tb_client_ufc`
  MODIFY `idUfd` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `tb_client_users`
--
ALTER TABLE `tb_client_users`
  MODIFY `idClientUsers` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de la tabla `tb_company`
--
ALTER TABLE `tb_company`
  MODIFY `idCompany` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_company_type_keychains`
--
ALTER TABLE `tb_company_type_keychains`
  MODIFY `idKey` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_contratos`
--
ALTER TABLE `tb_contratos`
  MODIFY `idContrato` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `tb_datos_adicionales_alarmas`
--
ALTER TABLE `tb_datos_adicionales_alarmas`
  MODIFY `idDatoAdicionalAlarma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT de la tabla `tb_department`
--
ALTER TABLE `tb_department`
  MODIFY `idDepartment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT de la tabla `tb_detalles_control_acceso`
--
ALTER TABLE `tb_detalles_control_acceso`
  MODIFY `idControlAcceso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=910;

--
-- AUTO_INCREMENT de la tabla `tb_detination_of_license`
--
ALTER TABLE `tb_detination_of_license`
  MODIFY `idDetinationOfLicense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_divice_opening`
--
ALTER TABLE `tb_divice_opening`
  MODIFY `idDiviceOpening` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_emergency_button`
--
ALTER TABLE `tb_emergency_button`
  MODIFY `idEmergencyButton` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_font`
--
ALTER TABLE `tb_font`
  MODIFY `idFonf` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_formato_transmision`
--
ALTER TABLE `tb_formato_transmision`
  MODIFY `idFormatoTransmision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_format_tramitio`
--
ALTER TABLE `tb_format_tramitio`
  MODIFY `idFormatTramitio` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_franja_horaria_alarmas`
--
ALTER TABLE `tb_franja_horaria_alarmas`
  MODIFY `id_franja_horaria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=665;

--
-- AUTO_INCREMENT de la tabla `tb_input_reader`
--
ALTER TABLE `tb_input_reader`
  MODIFY `idInputReader` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_internet_company`
--
ALTER TABLE `tb_internet_company`
  MODIFY `idInternetCompany` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_location`
--
ALTER TABLE `tb_location`
  MODIFY `idLocation` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=943;

--
-- AUTO_INCREMENT de la tabla `tb_modules`
--
ALTER TABLE `tb_modules`
  MODIFY `idModule` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tb_monitor_company`
--
ALTER TABLE `tb_monitor_company`
  MODIFY `idMonitorCompany` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_opcion_low`
--
ALTER TABLE `tb_opcion_low`
  MODIFY `idOpcionLowTicket` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_personas_para_dar_aviso_alarmas`
--
ALTER TABLE `tb_personas_para_dar_aviso_alarmas`
  MODIFY `idPersona_aviso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT de la tabla `tb_personas_para_verificar_en_lugar`
--
ALTER TABLE `tb_personas_para_verificar_en_lugar`
  MODIFY `idPersona_aviso_lugar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT de la tabla `tb_products`
--
ALTER TABLE `tb_products`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `tb_products_classification`
--
ALTER TABLE `tb_products_classification`
  MODIFY `idProductClassification` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `tb_products_divice_opening`
--
ALTER TABLE `tb_products_divice_opening`
  MODIFY `idProductsDiviceOpening` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `tb_profiles`
--
ALTER TABLE `tb_profiles`
  MODIFY `idProfiles` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tb_profiles_modules`
--
ALTER TABLE `tb_profiles_modules`
  MODIFY `idProfileModule` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de la tabla `tb_province`
--
ALTER TABLE `tb_province`
  MODIFY `idProvince` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `tb_reason_disabled_item`
--
ALTER TABLE `tb_reason_disabled_item`
  MODIFY `idReasonDisabledItem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_router_internet`
--
ALTER TABLE `tb_router_internet`
  MODIFY `idRouterInternet` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_sensors_alarm`
--
ALTER TABLE `tb_sensors_alarm`
  MODIFY `idSensorsAlarm` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `tb_services`
--
ALTER TABLE `tb_services`
  MODIFY `idService` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_services_camera_users`
--
ALTER TABLE `tb_services_camera_users`
  MODIFY `idServicesCameraUsers` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_servicios_del_contrato_cabecera`
--
ALTER TABLE `tb_servicios_del_contrato_cabecera`
  MODIFY `idServiciosDelContrato` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `tb_servicios_del_contrato_cuerpo`
--
ALTER TABLE `tb_servicios_del_contrato_cuerpo`
  MODIFY `idServiciosDelContratoCuerpo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;

--
-- AUTO_INCREMENT de la tabla `tb_sesores_alarmas`
--
ALTER TABLE `tb_sesores_alarmas`
  MODIFY `idSensorAlarma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_shutdown_key`
--
ALTER TABLE `tb_shutdown_key`
  MODIFY `idShutdownKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_sistemas_operativos`
--
ALTER TABLE `tb_sistemas_operativos`
  MODIFY `idSistemaOperativo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_smart_panic_license_pivote`
--
ALTER TABLE `tb_smart_panic_license_pivote`
  MODIFY `idPivoteLicense` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_sys_param`
--
ALTER TABLE `tb_sys_param`
  MODIFY `idParam` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `tb_tax`
--
ALTER TABLE `tb_tax`
  MODIFY `idTypeTax` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_tickets`
--
ALTER TABLE `tb_tickets`
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT de la tabla `tb_tipos_servicios_internet`
--
ALTER TABLE `tb_tipos_servicios_internet`
  MODIFY `idTipoServicioInternet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_conexion_remoto`
--
ALTER TABLE `tb_tipo_conexion_remoto`
  MODIFY `idTipoConexionRemoto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_inmueble`
--
ALTER TABLE `tb_tipo_inmueble`
  MODIFY `idTipoInmueble` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_mails`
--
ALTER TABLE `tb_tipo_mails`
  MODIFY `idTipoMail` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_tmp_delivery_data`
--
ALTER TABLE `tb_tmp_delivery_data`
  MODIFY `idTmpDeliveryData` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID DE LA INFO TEMPORAL ASOCIADO A UN TICKET';

--
-- AUTO_INCREMENT de la tabla `tb_totem_model`
--
ALTER TABLE `tb_totem_model`
  MODIFY `idTotenModel` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_typeticket`
--
ALTER TABLE `tb_typeticket`
  MODIFY `idTypeTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_type_attendant`
--
ALTER TABLE `tb_type_attendant`
  MODIFY `idTyepeAttendant` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_type_contrato`
--
ALTER TABLE `tb_type_contrato`
  MODIFY `idTypeContrato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_type_gps`
--
ALTER TABLE `tb_type_gps`
  MODIFY `idTypeGps` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_type_internet`
--
ALTER TABLE `tb_type_internet`
  MODIFY `idTypeInternet` int(50) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_type_maintenance`
--
ALTER TABLE `tb_type_maintenance`
  MODIFY `idTypeMaintenance` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_type_services`
--
ALTER TABLE `tb_type_services`
  MODIFY `idTypeServices` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT de la tabla `tb_user_license`
--
ALTER TABLE `tb_user_license`
  MODIFY `idUserLicense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `tb_zonas`
--
ALTER TABLE `tb_zonas`
  MODIFY `idZona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_backup_energy_totem`
--
ALTER TABLE `tb_backup_energy_totem`
  ADD CONSTRAINT `tb_backup_energy_totem_ibfk_3` FOREIGN KEY (`idBatteryFk`) REFERENCES `tb_products` (`idProduct`);

--
-- Filtros para la tabla `tb_battery_install_access_control`
--
ALTER TABLE `tb_battery_install_access_control`
  ADD CONSTRAINT `tb_battery_install_access_control_ibfk_1` FOREIGN KEY (`idClientServicesAccessControlFk`) REFERENCES `tb_client_services_access_control` (`idClientServicesAccessControl`),
  ADD CONSTRAINT `tb_battery_install_access_control_ibfk_2` FOREIGN KEY (`idBatteryFk`) REFERENCES `tb_products` (`idProduct`);

--
-- Filtros para la tabla `tb_client_camera`
--
ALTER TABLE `tb_client_camera`
  ADD CONSTRAINT `tb_client_camera_ibfk_1` FOREIGN KEY (`idClientServicesCameraFk`) REFERENCES `tb_client_services_camera` (`idClientServicesCamera`);

--
-- Filtros para la tabla `tb_client_services`
--
ALTER TABLE `tb_client_services`
  ADD CONSTRAINT `tb_client_services_ibfk_1` FOREIGN KEY (`idTipeServiceFk`) REFERENCES `tb_type_services` (`idTypeServices`);

--
-- Filtros para la tabla `tb_client_services_access_control`
--
ALTER TABLE `tb_client_services_access_control`
  ADD CONSTRAINT `tb_client_services_access_control_ibfk_1` FOREIGN KEY (`idDoorFk`) REFERENCES `tb_access_control_door` (`idAccessControlDoor`),
  ADD CONSTRAINT `tb_client_services_access_control_ibfk_2` FOREIGN KEY (`idAccessControlFk`) REFERENCES `tb_products` (`idProduct`),
  ADD CONSTRAINT `tb_client_services_access_control_ibfk_3` FOREIGN KEY (`idInputReaderFk`) REFERENCES `tb_products` (`idProduct`),
  ADD CONSTRAINT `tb_client_services_access_control_ibfk_4` FOREIGN KEY (`idFontFk`) REFERENCES `tb_products` (`idProduct`),
  ADD CONSTRAINT `tb_client_services_access_control_ibfk_6` FOREIGN KEY (`idEmergencyButtonFk`) REFERENCES `tb_products` (`idProduct`),
  ADD CONSTRAINT `tb_client_services_access_control_ibfk_7` FOREIGN KEY (`idShutdownKeyFk`) REFERENCES `tb_products` (`idProduct`);

--
-- Filtros para la tabla `tb_client_services_camera`
--
ALTER TABLE `tb_client_services_camera`
  ADD CONSTRAINT `tb_client_services_camera_ibfk_1` FOREIGN KEY (`idClientServicesFk`) REFERENCES `tb_client_services` (`idClientServices`),
  ADD CONSTRAINT `tb_client_services_camera_ibfk_2` FOREIGN KEY (`idTypeMaintenanceFk`) REFERENCES `tb_type_maintenance` (`idTypeMaintenance`),
  ADD CONSTRAINT `tb_client_services_camera_ibfk_3` FOREIGN KEY (`idDvr_nvrFk`) REFERENCES `tb_products_classification` (`idProductClassification`);

--
-- Filtros para la tabla `tb_client_services_smart_panic`
--
ALTER TABLE `tb_client_services_smart_panic`
  ADD CONSTRAINT `tb_client_services_smart_panic_ibfk_1` FOREIGN KEY (`idDetinationOfLicenseFk`) REFERENCES `tb_detination_of_license` (`idDetinationOfLicense`),
  ADD CONSTRAINT `tb_client_services_smart_panic_ibfk_2` FOREIGN KEY (`idDepartmentFk`) REFERENCES `tb_client_departament` (`idClientDepartament`),
  ADD CONSTRAINT `tb_client_services_smart_panic_ibfk_3` FOREIGN KEY (`idParticularAddressFk`) REFERENCES `tb_client_address_particular` (`idAddressParticular`);

--
-- Filtros para la tabla `tb_smart_panic_license_pivote`
--
ALTER TABLE `tb_smart_panic_license_pivote`
  ADD CONSTRAINT `tb_smart_panic_license_pivote_ibfk_1` FOREIGN KEY (`idClientServicesSmartPanicFk`) REFERENCES `tb_client_services_smart_panic` (`idClientServicesSmartPanic`),
  ADD CONSTRAINT `tb_smart_panic_license_pivote_ibfk_2` FOREIGN KEY (`idUserLinceseFk`) REFERENCES `tb_user_license` (`idUserLicense`);

--
-- Filtros para la tabla `tb_user`
--
ALTER TABLE `tb_user`
  ADD CONSTRAINT `tb_user_ibfk_1` FOREIGN KEY (`idProfileKf`) REFERENCES `tb_profile` (`idProfile`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `tb_user_ibfk_2` FOREIGN KEY (`idAddresKf`) REFERENCES `tb_addres` (`idAdress`),
  ADD CONSTRAINT `tb_user_ibfk_3` FOREIGN KEY (`idCompanyKf`) REFERENCES `tb_company` (`idCompany`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
