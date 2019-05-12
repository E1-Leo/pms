/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80015
Source Host           : localhost:3306
Source Database       : pms

Target Server Type    : MYSQL
Target Server Version : 80015
File Encoding         : 65001

Date: 2019-05-12 20:46:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for announcement
-- ----------------------------
DROP TABLE IF EXISTS `announcement`;
CREATE TABLE `announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告id',
  `announcementtitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '公告标题',
  `announcementinfo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '公告内容',
  `publishtime` bigint(20) DEFAULT NULL COMMENT '发布时间',
  `publishname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '发布人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of announcement
-- ----------------------------
INSERT INTO `announcement` VALUES ('1', '国庆全体放假！', '明天国庆，全体放假。', null, '陈霞');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '部门',
  `departmentinfo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '部门信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', '行政部', '综合协调、公文处理、档案管理、人事管理、后勤服务 等');
INSERT INTO `department` VALUES ('2', '销售部', '	\r\n正确掌握市场、 负责收集、整理、归纳客户资料，对客户群进行透彻的分析、管理销售活动 等');
INSERT INTO `department` VALUES ('3', '财务部', '负责公司日常财务核算、根据公司资金运作情况，合理调配资金，确保公司资金正常运转、负责企业的资产管理、债权债务的管理工作 等');
INSERT INTO `department` VALUES ('4', '技术部', '负责对新产品的设计和开发的控制及编制各类技术文件、负责产品的监视和测量控制工作 等');
INSERT INTO `department` VALUES ('5', '运营部', '协调和监督职能');

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '员工id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '姓名',
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '部门',
  `jobname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '职位',
  `jobtime` bigint(20) DEFAULT NULL COMMENT '入职时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES ('1', 'Jane', '运营部', '总监', '1557417600000');
INSERT INTO `staff` VALUES ('2', '吴霞', '销售部', '经理', '1558886400000');
INSERT INTO `staff` VALUES ('3', 'Wuyifan', '财务部', '会计', '1557504000000');
INSERT INTO `staff` VALUES ('14', '陈鹏', '运营部', '组长', '1557663316198');
INSERT INTO `staff` VALUES ('15', '王朋', '技术部', '技术总监', '1557331200000');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '密码',
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '部门',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '$2b$10$WcezL46MuWkUD40KJO2wouNWbwCGuYQ95qrzdWpL4hcHY8eB0vpp2', '技术部');
INSERT INTO `user` VALUES ('2', 'leopoe', '$2b$10$weI8d/7ibBwwjOKWNg4j0.C2gv8NtLcQ65C0kuo4EKCWUKQ6qzGfK', '行政部');
INSERT INTO `user` VALUES ('7', 'dd', null, '运营部');
INSERT INTO `user` VALUES ('8', 'Anna', null, '行政部');
