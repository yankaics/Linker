-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: 192.168.221.130    Database: link
-- ------------------------------------------------------
-- Server version	5.5.43-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `link_table`
--

DROP TABLE IF EXISTS `link_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_table` (
  `short_url` varchar(4) NOT NULL,
  `url` text,
  PRIMARY KEY (`short_url`),
  UNIQUE KEY `short_url_UNIQUE` (`short_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_table`
--

LOCK TABLES `link_table` WRITE;
/*!40000 ALTER TABLE `link_table` DISABLE KEYS */;
INSERT INTO `link_table` VALUES ('42ha','http://www.baidu.com'),('4w2M','http://tv.youku.com/hk/indextvb'),('bGrR','https://github.com/3rd-Eden/memcached'),('CG65','http://git.oschina.net/zhs/Linker'),('ep2c','http://www.google.com'),('f0C0','http://subject.tmall.com/subject/subject.htm?spm=1.7274553.771.1.wctGZz&id=1784711&abbucket=&acm=tt-1097039-36355-1.1003.8.273160&aldid=273160&gccpm=2475468.600.2.subject-0&abtest=&scm=1003.8.tt-1097039-36355-1.OTHER_1433166658069_273160&pos=1'),('Hncd','http://blog.csdn.net/iamzp2008/article/details/41827189'),('IR0I','http://36kr.com/p/533006.html'),('qIN6','http://www.bing.com/'),('svt9','http://goodui.org/'),('t99W','http://cn.bing.com/'),('U8o8','http://v.youku.com/v_show/id_XMzExOTM4OTAw.html?from=y1.2-2.2'),('YSfL','http://undefined');
/*!40000 ALTER TABLE `link_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'haha','123456'),(2,'hehe','123456'),(3,'123456','123456');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-05-20  7:57:50
