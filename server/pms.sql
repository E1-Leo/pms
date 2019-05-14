/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80015
Source Host           : localhost:3306
Source Database       : pms

Target Server Type    : MYSQL
Target Server Version : 80015
File Encoding         : 65001

Date: 2019-05-14 20:58:30
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of announcement
-- ----------------------------
INSERT INTO `announcement` VALUES ('1', '国庆全体放假！', '明天国庆，全体放假。', '1556553600000', '陈霞');
INSERT INTO `announcement` VALUES ('2', '五一放假', '五一放假', '1556553600000', '叶修');
INSERT INTO `announcement` VALUES ('3', '明天体检', '明天体检', '1557763200000', '陈浩');
INSERT INTO `announcement` VALUES ('4', '后天会议室开会', '后天中午10点开会，别迟到', '1557244800000', '叶华');
INSERT INTO `announcement` VALUES ('5', '明天开会', '明天早上9点开会，准时参加', '1551628800000', '王');
INSERT INTO `announcement` VALUES ('6', '技术部明天旅游', '明天技术部旅游，请交接好工作', '1530288000000', '盛');
INSERT INTO `announcement` VALUES ('7', '明天全体高层开会', '明天中午11点，各位高层会议室开会', '1554048000000', '君莫笑');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '部门',
  `departmentinfo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '部门信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', '行政部', '综合协调、公文处理、档案管理、人事管理、后勤服务 等');
INSERT INTO `department` VALUES ('2', '销售部', '	\r\n正确掌握市场、 负责收集、整理、归纳客户资料，对客户群进行透彻的分析、管理销售活动 等');
INSERT INTO `department` VALUES ('3', '财务部', '负责公司日常财务核算、根据公司资金运作情况，合理调配资金，确保公司资金正常运转、负责企业的资产管理、债权债务的管理工作 等');
INSERT INTO `department` VALUES ('4', '技术部', '负责对新产品的设计和开发 等');
INSERT INTO `department` VALUES ('5', '运营部', '协调和监督职能');
INSERT INTO `department` VALUES ('6', '产品部', '生产、质检');
INSERT INTO `department` VALUES ('7', '企划部', '企划');
INSERT INTO `department` VALUES ('8', '安全部', '安全生产监督');

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '员工id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '姓名',
  `department` int(11) DEFAULT NULL COMMENT '部门',
  `jobname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '职位',
  `jobtime` bigint(20) DEFAULT NULL COMMENT '入职时间',
  PRIMARY KEY (`id`),
  KEY `user_department` (`department`),
  CONSTRAINT `user_department` FOREIGN KEY (`department`) REFERENCES `department` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES ('1', 'Jane', '5', '总监', '1557417600000');
INSERT INTO `staff` VALUES ('2', '吴霞', '2', '经理', '1558886400000');
INSERT INTO `staff` VALUES ('3', '吴凡', '3', '会计', '1557504000000');
INSERT INTO `staff` VALUES ('14', '陈鹏', '5', '组长', '1557663316198');
INSERT INTO `staff` VALUES ('15', '王朋', '4', '技术总监', '1557331200000');
INSERT INTO `staff` VALUES ('16', '陈述', '3', '1', '1557676800000');
INSERT INTO `staff` VALUES ('17', 'HelloKitty', '1', '1', '1557676800000');
INSERT INTO `staff` VALUES ('18', 'Green', '5', '3', '1557625075953');
INSERT INTO `staff` VALUES ('19', 'jsb', '7', 'asx', '1557106702876');
INSERT INTO `staff` VALUES ('20', '程龙', '4', '3', '1558540800000');
INSERT INTO `staff` VALUES ('21', '王生', '2', 'asd', '1556640000000');
INSERT INTO `staff` VALUES ('22', '夜神', '3', 'as', '1556467200000');
INSERT INTO `staff` VALUES ('23', '叶修', '1', 's', '1549382400000');
INSERT INTO `staff` VALUES ('24', '荒', '1', '总经理', '1557152300767');
INSERT INTO `staff` VALUES ('25', '李', '7', '总监', '1556467200000');
INSERT INTO `staff` VALUES ('26', '丁一', '6', '产品经理', '1557849600000');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '$2b$10$WcezL46MuWkUD40KJO2wouNWbwCGuYQ95qrzdWpL4hcHY8eB0vpp2');
INSERT INTO `user` VALUES ('2', 'leopoe', '$2b$10$weI8d/7ibBwwjOKWNg4j0.C2gv8NtLcQ65C0kuo4EKCWUKQ6qzGfK');
INSERT INTO `user` VALUES ('7', 'dda', '$2b$10$weI8d/7ibBwwjOKWNg4j0.C2gv8NtLcQ65C0kuo4EKCWUKQ6qzGfK');
INSERT INTO `user` VALUES ('10', 'huang1', '$2b$10$weI8d/7ibBwwjOKWNg4j0.C2gv8NtLcQ65C0kuo4EKCWUKQ6qzGfK');
INSERT INTO `user` VALUES ('11', 'Chen', '$2b$10$weI8d/7ibBwwjOKWNg4j0.C2gv8NtLcQ65C0kuo4EKCWUKQ6qzGfK');
INSERT INTO `user` VALUES ('12', 'Hu', '$2b$10$weI8d/7ibBwwjOKWNg4j0.C2gv8NtLcQ65C0kuo4EKCWUKQ6qzGfK');
INSERT INTO `user` VALUES ('13', 'GS', '$2b$10$WcezL46MuWkUD40KJO2wouNWbwCGuYQ95qrzdWpL4hcHY8eB0vpp2');
INSERT INTO `user` VALUES ('14', 'HuangChen', '123456');
INSERT INTO `user` VALUES ('15', 'Likoto', '$2b$10$r5W1Iia.nh8RhjNicSb9uOT1ra/QLP2TVFGL0Ukf083cGoReGkSAG');
INSERT INTO `user` VALUES ('17', 'wwasa', '$2b$10$6Jq395Jj4g.F81ez9URCdeHjt7o26Epmov/gISaOUmtjcFU0rfRo.');
