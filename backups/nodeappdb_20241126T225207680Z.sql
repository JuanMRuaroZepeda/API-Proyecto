-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: nodeappdb
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

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
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
/*!40000 ALTER TABLE `estados` DISABLE KEYS */;
INSERT INTO `estados` VALUES (1,'Activo'),(2,'Inactivo'),(3,'Suspendido'),(4,'En proceso');
/*!40000 ALTER TABLE `estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varbinary(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Super Administrador'),(2,'Trabajador'),(3,'Cliente'),(4,'Invitado');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_agua`
--

DROP TABLE IF EXISTS `tipo_agua`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_agua` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_agua` varchar(100) NOT NULL,
  `cantidad` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_agua`
--

LOCK TABLES `tipo_agua` WRITE;
/*!40000 ALTER TABLE `tipo_agua` DISABLE KEYS */;
INSERT INTO `tipo_agua` VALUES (1,'Bonafont',2000),(2,'Ciel',200);
/*!40000 ALTER TABLE `tipo_agua` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_compra`
--

DROP TABLE IF EXISTS `tipo_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_compra` varchar(100) NOT NULL,
  `mililitros` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_compra`
--

LOCK TABLES `tipo_compra` WRITE;
/*!40000 ALTER TABLE `tipo_compra` DISABLE KEYS */;
INSERT INTO `tipo_compra` VALUES (1,'8 oz',240),(2,'12 oz',360),(3,'16 oz',475),(4,'20 oz',590);
/*!40000 ALTER TABLE `tipo_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `imagen` varchar(255) NOT NULL DEFAULT '''perfil/shadow.png''',
  `id_rol` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rol` (`id_rol`),
  KEY `id_estado` (`id_estado`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan Manuel','Ruaro Zepeda','al222210649@gmail.com','$2a$08$KMnWdeXDLlifvRrFyiowPeAWJfLZWUA3QN6q4MLxxMOKnEwbblDNy','7294025400','perfil\\1727805173627.jpg',1,1),(2,'Alexis Raymundo','Almazán Gabino','AlexisRAG@gmail.com','$2a$08$bBGEzsVPrNnOgkSydYWNheQBjZNe4d8u69uyoXRW0KYMFLA7XMSby','5555555555','perfil\\1727805272939.jpg',2,1),(3,'Alan ','Ramirez Davila','AlanRD@gmail.com','$2a$08$NsSBzTxXOD83VIOSeUbUuOLLSkvWTkd9.6EpS6WBP7tO/udRgibvS','5555555555','perfil\\1727805304310.jpg',3,1),(4,'Invitado','Invitado','invitado@gmail.com','$2a$08$4E6wc4KPX6SUHJrXlGbFXub2r1P1B4XBa/aiOgwQiK2nzT4HrCmgi','5555555555','perfil\\1727805349132.jpg',4,1),(5,'php','php','php@gmail.com','$2a$08$KgN4hpAaq6b2dc.2DlHvmers4W5BEoKt8O7ushfjNawGFl.QrpKXW','7777777778','perfil\\1729057782241.jpg',1,1),(6,'php','php','php@gmail.com','$2a$08$ctgIpD70BmlhUBZOFfCOmu8flu28qtqXRmge/LV./pV0y/2EGQkuy','7777777778','perfil\\1729057931166.jpg',1,1),(7,'php','php','php@gmail.com','$2a$08$VMg.XwEvPVmXaph9X/uEB.ptnhmTsoz.CCmmnstTMfLKgrj9ZZ.C.','7777777778','perfil\\1729057946674.jpg',1,1),(8,'n','n','n@gmail.com','$2a$08$bv3NUmbMXLYc11xxEKm.EO6RKkYWUsi8Dm2DCEgvpAO5xTemL0X5u','7','perfil\\1729057983001.jpg',1,1),(12,'formulario','formulario','forr@gmail.com','$2a$08$EuykW23ZRl2r.yGjLQXQhOdSTP4ZeAtAm.YFWXTxMbC4B7mVsvFFm','1','perfil\\shadow.png',3,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` float NOT NULL,
  `id_tipoagua` int(11) NOT NULL,
  `id_tipocompra` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipoagua` (`id_tipoagua`),
  KEY `id_tipocompra` (`id_tipocompra`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_tipoagua`) REFERENCES `tipo_agua` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`id_tipocompra`) REFERENCES `tipo_compra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `venta_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (18,14,1,1,1,'2024-11-08 13:36:18');
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-26 16:52:19
