-- MySQL dump 10.13  Distrib 5.7.31, for Win64 (x86_64)
--
-- Host: localhost    Database: yumao
-- ------------------------------------------------------
-- Server version	5.7.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `buy`
--

DROP TABLE IF EXISTS `buy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uId` int(11) DEFAULT NULL,
  `gId` int(11) DEFAULT NULL,
  `des` text,
  `price` varchar(20) DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `state` int(11) DEFAULT '1',
  `extra` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=270 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buy`
--

LOCK TABLES `buy` WRITE;
/*!40000 ALTER TABLE `buy` DISABLE KEYS */;
INSERT INTO `buy` VALUES (264,1,24,'编号024,恭贺新春! 英雄联盟 兔年限定 春节皮肤','89.90','2022-12-26 23:47:24',1,NULL),(265,1,1,'编号001,艺术画稿,流光溢彩,色彩冲击感的画作','49.90','2022-12-26 23:50:13',1,NULL),(266,1,17,'编号017,恭贺新春! 英雄联盟 兔年限定 春节皮肤','99.90','2022-12-26 23:55:13',1,NULL),(267,1,21,'编号021,恭贺新春! 英雄联盟 兔年限定 春节皮肤','79.90','2022-12-27 00:01:18',1,NULL),(268,1,12,'编号012,唤水女巫，淋漓尽致，电影海报插图','42.90','2022-12-27 00:01:25',1,NULL),(269,1,15,'编号015,唤水女巫，淋漓尽致，电影海报插图','61.90','2022-12-27 00:01:28',1,NULL);
/*!40000 ALTER TABLE `buy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT '0',
  `tag` varchar(100) DEFAULT NULL,
  `des` text,
  `sort` varchar(30) DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `image` text,
  `price` varchar(20) DEFAULT NULL,
  `extra` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,0,'001,绘画,艺术品','编号001,艺术画稿,流光溢彩,色彩冲击感的画作','绘画作品','2022-12-25 15:36:02','[{\"name\":\"goods1.jpg\"}]','49.90','{\"state\":1,\"love\":228}'),(2,0,'002,绘画,艺术品','编号002,艺术画稿,流光溢彩,色彩冲击感的画作','绘画作品','2022-12-25 15:36:02','[{\"name\":\"goods2.jpg\"}]','45.90','{\"state\":1,\"love\":322}'),(3,0,'003,绘画,艺术品','编号003,艺术画稿,流光溢彩,色彩冲击感的画作','绘画作品','2022-12-25 15:36:02','[{\"name\":\"goods3.jpg\"}]','42.90','{\"state\":1,\"love\":253}'),(4,0,'004,绘画,艺术品','编号004,艺术画稿,流光溢彩,色彩冲击感的画作','绘画作品','2022-12-25 15:36:02','[{\"name\":\"goods4.jpg\"}]','41.90','{\"state\":1,\"love\":525}'),(5,0,'005,绘画,艺术品','编号005,艺术画稿,流光溢彩,色彩冲击感的画作','绘画作品','2022-12-25 15:36:02','[{\"name\":\"goods5.jpg\"}]','46.90','{\"state\":1,\"love\":826}'),(6,0,'006,绘画,艺术品','编号006,艺术画稿,流光溢彩,色彩冲击感的画作','绘画作品','2022-12-25 15:36:02','[{\"name\":\"goods6.jpg\"}]','45.90','{\"state\":1,\"love\":314}'),(7,0,'007,壁纸,二次元','编号007,二次元未来初音，高清桌面壁纸，插画场景图','桌面壁纸','2022-12-25 15:36:02','[{\"name\":\"goods7.jpg\"}]','19.90','{\"state\":1,\"love\":231}'),(8,0,'008,壁纸,二次元','编号008,二次元未来初音，高清桌面壁纸，插画场景图','桌面壁纸','2022-12-25 15:36:02','[{\"name\":\"goods8.jpg\"}]','25.90','{\"state\":1,\"love\":212}'),(9,0,'009,壁纸,二次元','编号009,二次元未来初音，高清桌面壁纸，插画场景图','桌面壁纸','2022-12-25 15:36:02','[{\"name\":\"goods9.jpg\"}]','20.90','{\"state\":1,\"love\":129}'),(10,0,'010,壁纸,二次元','编号010,二次元未来初音，高清桌面壁纸，插画场景图','桌面壁纸','2022-12-25 15:36:02','[{\"name\":\"goods10.jpg\"}]','32.90','{\"state\":1,\"love\":381}'),(11,0,'011,水,海报,少女','编号011,唤水女巫，淋漓尽致，电影海报插图','电影海报','2022-12-25 15:36:02','[{\"name\":\"goods11.jpg\"}]','31.90','{\"state\":1,\"love\":543}'),(12,0,'012,水,海报,少女','编号012,唤水女巫，淋漓尽致，电影海报插图','电影海报','2022-12-25 15:36:02','[{\"name\":\"goods12.jpg\"}]','42.90','{\"state\":1,\"love\":128}'),(13,0,'013,水,海报,少女','编号013,唤水女巫，淋漓尽致，电影海报插图','电影海报','2022-12-25 15:36:02','[{\"name\":\"goods13.jpg\"}]','21.90','{\"state\":1,\"love\":435}'),(14,0,'014,水,海报,少女','编号014,唤水女巫，淋漓尽致，电影海报插图','电影海报','2022-12-25 15:36:02','[{\"name\":\"goods14.jpg\"}]','31.90','{\"state\":1,\"love\":412}'),(15,0,'015,水,海报,少女','编号015,唤水女巫，淋漓尽致，电影海报插图','电影海报','2022-12-25 15:36:02','[{\"name\":\"goods15.jpg\"}]','61.90','{\"state\":1,\"love\":322}'),(16,0,'016,水,海报,少女','编号016,唤水女巫，淋漓尽致，电影海报插图','电影海报','2022-12-25 15:36:02','[{\"name\":\"goods16.jpg\"}]','81.90','{\"state\":1,\"love\":115}'),(17,0,'017,英雄联盟,道具','编号017,恭贺新春! 英雄联盟 兔年限定 春节皮肤','游戏道具','2022-12-25 15:36:02','[{\"name\":\"goods17.jpg\"}]','99.90','{\"state\":1,\"love\":211}'),(18,0,'018,英雄联盟,道具','编号018,恭贺新春! 英雄联盟 兔年限定 春节皮肤','游戏道具','2022-12-25 15:36:02','[{\"name\":\"goods18.jpg\"}]','69.90','{\"state\":1,\"love\":230}'),(19,0,'019,英雄联盟,道具','编号019,恭贺新春! 英雄联盟 兔年限定 春节皮肤','游戏道具','2022-12-25 15:36:02','[{\"name\":\"goods19.jpg\"}]','79.90','{\"state\":1,\"love\":310}'),(20,0,'020,英雄联盟,道具','编号020,恭贺新春! 英雄联盟 兔年限定 春节皮肤','游戏道具','2022-12-25 15:36:02','[{\"name\":\"goods20.jpg\"}]','59.90','{\"state\":1,\"love\":420}'),(21,0,'021,英雄联盟,道具','编号021,恭贺新春! 英雄联盟 兔年限定 春节皮肤','游戏道具','2022-12-25 15:36:02','[{\"name\":\"goods21.jpg\"}]','79.90','{\"state\":1,\"love\":912}'),(22,0,'022,英雄联盟,道具','编号022,恭贺新春! 英雄联盟 兔年限定 春节皮肤','游戏道具','2022-12-25 15:36:02','[{\"name\":\"goods22.jpg\"}]','89.90','{\"state\":1,\"love\":192}'),(23,0,'023,英雄联盟,道具','编号023,恭贺新春! 英雄联盟 兔年限定 春节皮肤','游戏道具','2022-12-25 15:36:02','[{\"name\":\"goods23.jpg\"}]','99.90','{\"state\":1,\"love\":321}'),(24,0,'024,英雄联盟,道具','编号024,恭贺新春! 英雄联盟 兔年限定 春节皮肤','游戏道具','2022-12-25 15:36:02','[{\"name\":\"goods24.jpg\"}]','89.90','{\"state\":1,\"love\":321}'),(39,1,'游戏,道具','双城之战 金克斯','游戏道具','2022-12-26 23:54:55','[{\"name\":\"ogizvlymsi.jpeg\"}]','89.99','{\"state\":1,\"love\":0}');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `love`
--

DROP TABLE IF EXISTS `love`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `love` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  `des` text,
  `price` text,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `extra` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `love`
--

LOCK TABLES `love` WRITE;
/*!40000 ALTER TABLE `love` DISABLE KEYS */;
INSERT INTO `love` VALUES (110,1,17,'编号017,恭贺新春! 英雄联盟 兔年限定 春节皮肤','99.90','2022-12-26 23:55:09',NULL),(108,1,23,'编号023,恭贺新春! 英雄联盟 兔年限定 春节皮肤','99.90','2022-12-26 23:52:54',NULL),(109,1,1,'编号001,艺术画稿,流光溢彩,色彩冲击感的画作','49.90','2022-12-26 23:53:13',NULL);
/*!40000 ALTER TABLE `love` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(15) DEFAULT NULL,
  `buy` text,
  `love` text,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `extra` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'阳光彩虹小白马-羽毛','123456','123456','24,1,17,21,12,15',',23,1,17','2022-12-25 19:39:29','{\"price\":575.6,\"finishOrderNum\":0,\"address\":\"火星\",\"state\":1,\"loveOrderNum\":2}');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-27 17:47:21
