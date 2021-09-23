-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: tododb
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (2,'admin'),(1,'user');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20210621112451-create-user.js'),('20210621112557-create-todo.js'),('20210621115311-migration-todo.js'),('20210621121005-email-user.js'),('20210630073709-nickname-user.js'),('20210705135201-create-role.js'),('20210705141000-update-role.js'),('20210706082712-create-TodoUserTab.js'),('20210706130149-update-todo.js'),('20210708134220-remove-todo-column.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Todos`
--

DROP TABLE IF EXISTS `Todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Todos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Todos`
--

LOCK TABLES `Todos` WRITE;
/*!40000 ALTER TABLE `Todos` DISABLE KEYS */;
INSERT INTO `Todos` VALUES (91,'Come up with strange for task',0,'2021-06-29 09:43:09','2021-07-09 14:41:32'),(96,'To do something tomorrow ',0,'2021-06-29 13:39:37','2021-07-09 14:41:40'),(97,'Let\'s do incredible concert in San-Francisco',1,'2021-06-30 09:04:39','2021-07-09 07:57:38'),(106,'Let\'s start write on Nest.js',1,'2021-07-05 11:48:07','2021-07-06 13:20:48'),(187,'Make pizza pomidorro!',0,'2021-07-09 12:04:28','2021-07-09 12:04:28'),(188,'Vivo la France!',1,'2021-07-09 12:04:56','2021-07-09 12:04:59'),(189,'Sky is falling',0,'2021-07-09 14:40:53','2021-07-09 14:40:53');
/*!40000 ALTER TABLE `Todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `roleId` int DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `users_nickname` (`nickname`),
  KEY `Users_roleId_foreign_idx` (`roleId`),
  CONSTRAINT `Users_roleId_foreign_idx` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (19,'remlion','$2a$11$GrrPHBmIP/g5asnMmKNiTuiLvFNcgQm0Xsa0UD7cIwTey7wKhMTeC','2021-06-21 13:33:17','2021-07-06 07:53:26','damir.minib@gmail.com',2),(35,'Bones','$2a$11$nMio.dKHVicGqmsTCUyyKO.ybdtviKkD.5iRx9vZwWm7sfq6LGE7S','2021-06-30 08:51:44','2021-06-30 08:51:44','bones@gmail.com',1),(37,'SeniorPomidor','$2a$11$61d7BrJ47qhn5qFM1aaNxOnHF.Ks1l6uvDkw0YFy9p87WlUDrI/ra','2021-07-09 12:03:45','2021-07-09 12:03:45','senior.pomidor@gmail.com',1);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userTodosMaps`
--

DROP TABLE IF EXISTS `userTodosMaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userTodosMaps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `todoId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `todoId` (`todoId`),
  CONSTRAINT `userTodosMaps_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `userTodosMaps_ibfk_2` FOREIGN KEY (`todoId`) REFERENCES `Todos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userTodosMaps`
--

LOCK TABLES `userTodosMaps` WRITE;
/*!40000 ALTER TABLE `userTodosMaps` DISABLE KEYS */;
INSERT INTO `userTodosMaps` VALUES (3,19,91),(5,19,96),(6,19,97),(8,19,106),(9,35,97),(105,19,187),(106,37,187),(107,19,188),(108,37,188),(109,19,189),(110,35,189);
/*!40000 ALTER TABLE `userTodosMaps` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-13 11:22:53
