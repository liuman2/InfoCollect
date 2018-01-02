/*
Navicat MySQL Data Transfer

Source Server         : 127...1
Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : lexianghui

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2018-01-03 00:54:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for accesstoken
-- ----------------------------
DROP TABLE IF EXISTS `accesstoken`;
CREATE TABLE `accesstoken` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `accesstoken` varchar(50) DEFAULT NULL,
  `expired` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for profile
-- ----------------------------
DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `card_no` varchar(100) DEFAULT NULL,
  `card_front` varchar(255) DEFAULT NULL,
  `card_back` varchar(255) DEFAULT NULL,
  `card_hold` varchar(255) DEFAULT NULL,
  `self_photo` varchar(255) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `county` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact` varchar(30) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sms
-- ----------------------------
DROP TABLE IF EXISTS `sms`;
CREATE TABLE `sms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar(20) DEFAULT NULL,
  `code` varchar(8) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar(20) DEFAULT NULL,
  `nick_name` varchar(30) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `salt` varchar(6) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
