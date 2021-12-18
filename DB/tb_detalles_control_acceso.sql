/*
Navicat MySQL Data Transfer

Source Server         : Localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : db_coferba

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-11-06 02:05:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_detalles_control_acceso
-- ----------------------------
DROP TABLE IF EXISTS `tb_detalles_control_acceso`;
CREATE TABLE `tb_detalles_control_acceso` (
  `idDetallesProducto` int(11) NOT NULL AUTO_INCREMENT,
  `numberSerieFabric` varchar(255) DEFAULT NULL,
  `numberSerieInternal` varchar(255) DEFAULT NULL,
  `dateExpiration` varchar(255) DEFAULT NULL,
  `idProductoFk` int(11) DEFAULT NULL,
  `idServicesFk` int(11) DEFAULT NULL,
  `isHasTimeControl` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`idDetallesProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_detalles_control_acceso
-- ----------------------------
INSERT INTO `tb_detalles_control_acceso` VALUES ('2', '645fghgfh', '34456hgfh5', '', '8', '14', null);
INSERT INTO `tb_detalles_control_acceso` VALUES ('3', '45fghgfh', '834456hgfh5', '', '5', '14', null);
INSERT INTO `tb_detalles_control_acceso` VALUES ('4', 'ttt645fghgfh', '677734456hgfh5', '', '8', '12', null);
INSERT INTO `tb_detalles_control_acceso` VALUES ('5', '9oo45fghgfh', '834456hgfh5', '', '5', '12', null);
INSERT INTO `tb_detalles_control_acceso` VALUES ('6', '645fghgfh', '34456hgfh5', '', '8', '26', null);
INSERT INTO `tb_detalles_control_acceso` VALUES ('7', '45fghgfh', '834456hgfh5', '', '5', '26', null);
INSERT INTO `tb_detalles_control_acceso` VALUES ('8', '645fghgfh', '34456hgfh5', '', '8', '17', null);
INSERT INTO `tb_detalles_control_acceso` VALUES ('9', '45fghgfh', '834456hgfh5', '', '5', '17', null);
INSERT INTO `tb_detalles_control_acceso` VALUES ('10', '645fghgfh', '34456hgfh5', '', '8', '10', null);
INSERT INTO `tb_detalles_control_acceso` VALUES ('11', '45fghgfh', '834456hgfh5', '', '5', '10', null);
