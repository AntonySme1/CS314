-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: cs314
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.21-MariaDB

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
-- Table structure for table `colorado`
--

DROP TABLE IF EXISTS `colorado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colorado` (
  `index` int(11) NOT NULL,
  `id` varchar(30) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `latitude` varchar(1000) DEFAULT NULL,
  `longitude` varchar(1000) DEFAULT NULL,
  `altitude` varchar(1000) DEFAULT NULL,
  `continent` varchar(1000) DEFAULT NULL,
  `iso_country` varchar(1000) DEFAULT NULL,
  `iso_region` varchar(1000) DEFAULT NULL,
  `municipality` varchar(1000) DEFAULT NULL,
  `scheduled_service` varchar(1000) DEFAULT NULL,
  `gps_code` varchar(1000) DEFAULT NULL,
  `iata_code` varchar(1000) DEFAULT NULL,
  `local_code` varchar(1000) DEFAULT NULL,
  `home_link` varchar(1000) DEFAULT NULL,
  `wikipedia_link` varchar(1000) DEFAULT NULL,
  `keywords` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `airports_name_idx` (`name`),
  FULLTEXT KEY `airpots_municipality_idx` (`municipality`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colorado`
--
-- WHERE:  municipality like '%fort%' or municipality like '%sugar%'

LOCK TABLES `colorado` WRITE;
/*!40000 ALTER TABLE `colorado` DISABLE KEYS */;
INSERT INTO `colorado` VALUES (7118,'0CD1','heliport','Colorado Plains Medical Center Heliport','40.2610917','-103.7963389','4356','NA','US','US-CO','Fort Morgan','no','0CD1',NULL,'0CD1',NULL,NULL,NULL),(7141,'0CO4','heliport','Geo-Seis Helicopters Heliport','40.5899009705','-105.04599762','4935','NA','US','US-CO','Fort Collins','no','0CO4',NULL,'0CO4',NULL,NULL,NULL),(7144,'0CO7','heliport','Century Helicopters Heliport','40.5854988098','-105.040000916','4935','NA','US','US-CO','Fort Collins','no','0CO7',NULL,'0CO7',NULL,NULL,NULL),(9355,'2CO0','heliport','Heli-Support Ii Heliport','40.58359909057617','-106.98500061035156','4935','NA','US','US-CO','Fort Collins','no','2CO0',NULL,'2CO0',NULL,NULL,NULL),(11826,'50CO','heliport','William T Browder Heliport','40.65829849243164','-104.95099639892578','5200','NA','US','US-CO','Fort Collins','no','50CO',NULL,'50CO',NULL,NULL,NULL),(12985,'65CO','small_airport','Wkr Airport','40.52080154418945','-104.96700286865234','4840','NA','US','US-CO','Fort Collins','no','65CO',NULL,'65CO',NULL,NULL,NULL),(13228,'6CO4','small_airport','Hat-Field STOLport','40.51029968261719','-105.0009994506836','4885','NA','US','US-CO','Fort Collins','no','6CO4',NULL,'6CO4',NULL,NULL,NULL),(16638,'CD07','heliport','Poudre Valley Hospital Heliport','40.57160186767578','-105.05599975585938','4960','NA','US','US-CO','Fort Collins','no','CD07',NULL,'CD07',NULL,NULL,NULL),(16677,'CD46','heliport','North Arrow Heliport','40.59109878540039','-105.0479965209961','4935','NA','US','US-CO','Fort Collins','no','CD46',NULL,'CD46',NULL,NULL,NULL),(16907,'CO53','small_airport','Yankee Field','40.634700775146484','-104.99099731445312','5050','NA','US','US-CO','Fort Collins','no','CO53',NULL,'CO53',NULL,NULL,NULL),(16909,'CO55','small_airport','Christman Field','40.597198486328125','-105.14399719238281','5160','NA','US','US-CO','Fort Collins','no','CO55',NULL,'CO55',NULL,NULL,NULL),(16944,'CO91','heliport','Heli-Support Heliport','40.583900451660156','-105.03500366210938','4935','NA','US','US-CO','Fort Collins','no','CO91',NULL,'CO91',NULL,NULL,NULL),(19851,'KFCS','medium_airport','Butts AAF (Fort Carson) Air Field','38.67839813','-104.7570038','5838','NA','US','US-CO','Fort Carson','no','KFCS','FCS','FCS',NULL,NULL,NULL),(19880,'KFMM','small_airport','Fort Morgan Municipal Airport','40.33359909057617','-103.80400085449219','4569','NA','US','US-CO','Fort Morgan','no','KFMM',NULL,'FMM',NULL,NULL,'3V4'),(19885,'KFNL','small_airport','Fort Collins Loveland Municipal Airport','40.4518013','-105.011001587','5016','NA','US','US-CO','Fort Collins/Loveland','no','KFNL','FNL','FNL','http://fortloveair.com','http://en.wikipedia.org/wiki/Fort_Collins-Loveland_Municipal_Airport',NULL),(45990,'US-0077','small_airport','Sand Arroya Airport','38.45280075','-103.5299988','4570','NA','US','US-CO','Sugar City','no',NULL,NULL,NULL,NULL,NULL,'6CO6');
/*!40000 ALTER TABLE `colorado` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-22 20:11:59
