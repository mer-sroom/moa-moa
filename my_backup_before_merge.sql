-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: moamoa
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('05ad5f20-311a-4643-9827-6b8cc0495e1a','a486365403d0f0f9dd82e3e17fc2866f5a260c86ab0990e2e23f96a9007e0718','2025-01-09 07:55:50.634','20250109075550_add_name_field',NULL,NULL,'2025-01-09 07:55:50.618',1),('24a841a0-6680-4621-b8e8-4dab86c5ad71','959d409a93a6f56b10cb4e4c1be5645512e9e36d0d6cdd22ec9259ddc7512d0f','2025-01-09 06:23:13.514','20250109062313_init',NULL,NULL,'2025-01-09 06:23:13.414',1),('5fd4775c-eb23-4ca0-a957-3f44ff210706','d1310f6d3a004e5ac054d86d9d0f898447976f1fed0fc7e20d3730934b218416','2025-01-01 07:14:06.732','20250101071406_init',NULL,NULL,'2025-01-01 07:14:06.471',1),('61ef0dc1-5fc9-46f8-8f60-363257906439','610a6bde3cab82f19a381a4112a55ce301430dd3b55dd7f337efa62c2f410ce9','2024-12-30 01:01:00.112','20241230010100_init',NULL,NULL,'2024-12-30 01:01:00.099',1),('63da7876-a08e-46f1-8c81-6f2766c598fc','6d0583e616885af6093078b69a4df4647f9b3ba8271faed6d298210a439052ad','2025-01-13 06:28:27.542','20250113062827_change_id_to_string',NULL,NULL,'2025-01-13 06:28:27.194',1),('6cdf11d8-41a3-40b9-bdf2-eff0bb160e4a','a94bc48878ef7d00cb1c7b0492f0d0d0fed266906cde59f837f0b07e8207041b','2025-01-09 08:01:10.756','20250109080110_add_name_and_emailverified',NULL,NULL,'2025-01-09 08:01:10.741',1),('82679e85-0d4e-49ad-9add-6872928deb87','f32ef38724b50d469c0c684a6265dd0496d5ccc105728f94e580645e83b93013','2025-01-24 02:01:22.338','20250124020122_fix_account_token_columns',NULL,NULL,'2025-01-24 02:01:22.315',1),('ae06e222-4d17-4843-9a18-76d0d0156068','676b80633446f9653d862e07778d35ad827e37cff2175b1e48e4a29c7ed6f92f','2025-05-01 06:11:32.463','20250210013023_add_image_tables',NULL,NULL,'2025-05-01 06:11:32.330',1),('d39fdbc4-9ee9-45fc-9213-732384dee5d9','0b7aa737f7e87fbcde29cf0e7f678f29eb04f9ef4025ef99719ad23b7cf059b2','2025-01-10 05:25:54.956','20250110052554_add_refresh_token_expires_in',NULL,NULL,'2025-01-10 05:25:54.947',1),('ed80c07c-ba7a-4d54-ae15-3c83214b4208','c76966ad70463568d1de1e7d185233d77dbea44254b4ae07ffc6f14c1efd1355','2025-01-13 01:03:29.471','20250113010329_make_access_token_text',NULL,NULL,'2025-01-13 01:03:29.447',1),('fd63e89f-971d-49aa-b585-b79aa59a1ebe','e5436bc91e972dea872bd69522f6f6558f26d9dd12793107dd3d7de364b29bda','2025-05-01 06:11:32.473','20250312101911_update_letter_model',NULL,NULL,'2025-05-01 06:11:32.464',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerAccountId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` text COLLATE utf8mb4_unicode_ci,
  `access_token` text COLLATE utf8mb4_unicode_ci,
  `expires_at` int DEFAULT NULL,
  `token_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scope` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_token` text COLLATE utf8mb4_unicode_ci,
  `session_state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token_expires_in` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  KEY `Account_userId_fkey` (`userId`),
  CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (3,'0e6c2eca-c7a6-4a4a-81ec-1761bd9c6ca4','oauth','google','116444794504373348996',NULL,'ya29.a0AXeO80SYgYce4Kh3euuyvNOOz2SgT5DdoZMPpZQ8tD9XOmVHMBqKPUi7wCC1xS7XMMAVhzv4uu_XYxmkN7bbPPgNN73MAF3MV5OQtgz3ZPVUOVojWypG-9iD-sxSqcH6B19lPwIChNXufasKugVAKdkB-sAIMggLeUl-jXTNaCgYKAboSARASFQHGX2MiiyQZy1pf5sOWBPIM-Q_k7w0175',1737687849,'Bearer','https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid','eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzMzdiZTYzNjRmMzgyNDAwOGQwZTkwMDNmNTBiYjZiNDNkNWE5YzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3MTU5Njc0NTk3OTItMWJvbmYwdWM0b3VtYzZlZnBqN2V0OGpycmw1aDMzMjEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3MTU5Njc0NTk3OTItMWJvbmYwdWM0b3VtYzZlZnBqN2V0OGpycmw1aDMzMjEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY0NDQ3OTQ1MDQzNzMzNDg5OTYiLCJlbWFpbCI6InN1bW1lcmxpZmUzNjQzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiMlh2NFNkQ1ZnanBFdnpZdXZxQ3RKZyIsIm5hbWUiOiLshJzrqLgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSXZra2FOVnU0dGh5QTVnd3M4WlA3YTBicUJWcUVFQ0ZIOTVhVk5fUnhpbEgxaks3TT1zOTYtYyIsImdpdmVuX25hbWUiOiLrqLgiLCJmYW1pbHlfbmFtZSI6IuyEnCIsImlhdCI6MTczNzY4NDI0OSwiZXhwIjoxNzM3Njg3ODQ5fQ.Ll2KGPwdMJM7Uo_q00d_nZPJMHQ6b2JORlUQV0r_tDdnIIEjqsjDwojPgAz7eC0csvw4LaKdWfbPoRh1vppTCXkU5URT-zZSM62VET2x6wGr9q3JWhOeB1KQygjT03L3SsV6fuHrANjq3cHTdQVLE1-uCtRCI319Zd3tK7jXlnY18EUKXTQIcTA-kQQ0J8lUHbxye-LNzYAqudUEA0BVe1lQhUt_tsAz2vzb8xYnBJhqLFD4Nr5-pN2WuYDn1iP31pDALFUXVIIJTOKqzyOtOsr9X4-wvJy_8BK81XFPm1zZGq1ShLB4ef_HKQ-JODLcPA52gE4hfxiKqAxVOgO3aQ',NULL,NULL),(10,'0e6c2eca-c7a6-4a4a-81ec-1761bd9c6ca4','oauth','google','105298668992080503187',NULL,'ya29.a0AZYkNZgz1riIAG6uCtF6wtxXpQ6BsqGimtdnpj_ZuvJOLFy5Kjz0TKuaLHZ8Ua_a8VN921Z6A2b4VpnnLscpcDHwOByv94vsBE8mqIvnJxjhTuOAt9ZGwun7odKbTyeD0Bq-RXxQ8wRCBe7-aH04ul7VuzLGqpLdMMSSQBSC9EQaCgYKAW0SARQSFQHGX2MiWSkp6wePTQxhIMgrs51dWA0178',1746082739,'Bearer','openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile','eyJhbGciOiJSUzI1NiIsImtpZCI6IjA3YjgwYTM2NTQyODUyNWY4YmY3Y2QwODQ2ZDc0YThlZTRlZjM2MjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3MTU5Njc0NTk3OTItMWJvbmYwdWM0b3VtYzZlZnBqN2V0OGpycmw1aDMzMjEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3MTU5Njc0NTk3OTItMWJvbmYwdWM0b3VtYzZlZnBqN2V0OGpycmw1aDMzMjEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDUyOTg2Njg5OTIwODA1MDMxODciLCJlbWFpbCI6ImdvZ285ODEwMDRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiIxMnFlZ0pXWGE2RkJQWTF3UnZpc0h3IiwibmFtZSI6IuqzoOykgOq4sCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKbzJTZEYtZUc5WDdVb2RwQklMUnJfc2x6RnhVYUE2MFpkamhMellDdWExSlZGVFE9czk2LWMiLCJnaXZlbl9uYW1lIjoi7KSA6riwIiwiZmFtaWx5X25hbWUiOiLqs6AiLCJpYXQiOjE3NDYwNzkxNDEsImV4cCI6MTc0NjA4Mjc0MX0.Aopicl3aXLUBjcYD8E__TBACseJmQ6Mx-M4QnVpDCWMarKXGcUdlwneMwo3nQ_K6RsmwP1ShKTwoa4DdNeD3hsLlqZwtdGALutF1KQpecTxEtk9m0OC2-KnYuZWBsahINubuMXzEBmS631mG88LsLSSN-Zc1LnOqku4McENbioZZP1YqLug496wKHHTr2wbRD74UN-3fYL-1U9aRikcbsTWQRsIdzq3z5vfpxvGKOjUVaCSJEbqHBhCmHNzSxaygiUyqDPbxk_Dvwxxrw_GIrRyF_cTAglVjAZWAdIMTOuOvLFR3yjUFqkKMdkVMnsGtv2-fU60tOUKKVvz3CKMf3w',NULL,NULL),(15,'9e75dabc-363d-4904-bde9-866b6e0e4af0','oauth','naver','XBFXDUOn_yT3nMXfqETPgmsEiT11FVJUXd7HzkKVDAs','j7ZrccBii6z1WIrge9A0lUTrUC90aDXPEdpbOYYPFipw62Lmzhf6MQHqOcVzdNhwEWL35hyXd8M9rTZisMdii6LiskWOb54iiOy285c686jdcqTM7thFw4s5dPggU9wC5qlvKU','AAAAO0L3hX3QeRI_40HDezZMQQy-yVFVLJnagY4SxsaVjLhLfk-4sVmyoNBi6_3paCDZTwoxjsqTqSlDrPFYUIiT9Ps',1746085001,'bearer',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backgrounddesign`
--

DROP TABLE IF EXISTS `backgrounddesign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backgrounddesign` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageURL` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backgrounddesign`
--

LOCK TABLES `backgrounddesign` WRITE;
/*!40000 ALTER TABLE `backgrounddesign` DISABLE KEYS */;
/*!40000 ALTER TABLE `backgrounddesign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userAId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userBId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACCEPTED',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Friendship_userAId_userBId_key` (`userAId`,`userBId`),
  KEY `Friendship_userBId_fkey` (`userBId`),
  CONSTRAINT `Friendship_userAId_fkey` FOREIGN KEY (`userAId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Friendship_userBId_fkey` FOREIGN KEY (`userBId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letter`
--

DROP TABLE IF EXISTS `letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `moaBoxId` int NOT NULL,
  `authorId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `theme` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isOpened` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `letterIconDesignId` int NOT NULL,
  `letterPaperDesignId` int NOT NULL,
  `trackId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Letter_moaBoxId_fkey` (`moaBoxId`),
  KEY `Letter_authorId_fkey` (`authorId`),
  KEY `Letter_letterPaperDesignId_fkey` (`letterPaperDesignId`),
  KEY `Letter_letterIconDesignId_fkey` (`letterIconDesignId`),
  CONSTRAINT `Letter_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Letter_letterIconDesignId_fkey` FOREIGN KEY (`letterIconDesignId`) REFERENCES `lettericondesign` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Letter_letterPaperDesignId_fkey` FOREIGN KEY (`letterPaperDesignId`) REFERENCES `letterpaperdesign` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Letter_moaBoxId_fkey` FOREIGN KEY (`moaBoxId`) REFERENCES `moabox` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter`
--

LOCK TABLES `letter` WRITE;
/*!40000 ALTER TABLE `letter` DISABLE KEYS */;
/*!40000 ALTER TABLE `letter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lettericondesign`
--

DROP TABLE IF EXISTS `lettericondesign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lettericondesign` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageURL` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lettericondesign`
--

LOCK TABLES `lettericondesign` WRITE;
/*!40000 ALTER TABLE `lettericondesign` DISABLE KEYS */;
/*!40000 ALTER TABLE `lettericondesign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letterpaperdesign`
--

DROP TABLE IF EXISTS `letterpaperdesign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letterpaperdesign` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageURL` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letterpaperdesign`
--

LOCK TABLES `letterpaperdesign` WRITE;
/*!40000 ALTER TABLE `letterpaperdesign` DISABLE KEYS */;
/*!40000 ALTER TABLE `letterpaperdesign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mailboxdesign`
--

DROP TABLE IF EXISTS `mailboxdesign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailboxdesign` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageURL` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mailboxdesign`
--

LOCK TABLES `mailboxdesign` WRITE;
/*!40000 ALTER TABLE `mailboxdesign` DISABLE KEYS */;
/*!40000 ALTER TABLE `mailboxdesign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moabox`
--

DROP TABLE IF EXISTS `moabox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moabox` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ownerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isGroup` tinyint(1) NOT NULL DEFAULT '0',
  `dueDate` datetime(3) DEFAULT NULL,
  `isPublic` tinyint(1) NOT NULL DEFAULT '1',
  `allowAnonymous` tinyint(1) NOT NULL DEFAULT '1',
  `shareLink` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `letterCountPublic` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `backgroundDesignId` int NOT NULL,
  `mailBoxDesignId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `MoaBox_ownerId_fkey` (`ownerId`),
  KEY `MoaBox_backgroundDesignId_fkey` (`backgroundDesignId`),
  KEY `MoaBox_mailBoxDesignId_fkey` (`mailBoxDesignId`),
  CONSTRAINT `MoaBox_backgroundDesignId_fkey` FOREIGN KEY (`backgroundDesignId`) REFERENCES `backgrounddesign` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `MoaBox_mailBoxDesignId_fkey` FOREIGN KEY (`mailBoxDesignId`) REFERENCES `mailboxdesign` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `MoaBox_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moabox`
--

LOCK TABLES `moabox` WRITE;
/*!40000 ALTER TABLE `moabox` DISABLE KEYS */;
/*!40000 ALTER TABLE `moabox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moaboxparticipant`
--

DROP TABLE IF EXISTS `moaboxparticipant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moaboxparticipant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moaBoxId` int NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OWNER',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'INVITED',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `MoaBoxParticipant_userId_moaBoxId_key` (`userId`,`moaBoxId`),
  KEY `MoaBoxParticipant_moaBoxId_fkey` (`moaBoxId`),
  CONSTRAINT `MoaBoxParticipant_moaBoxId_fkey` FOREIGN KEY (`moaBoxId`) REFERENCES `moabox` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `MoaBoxParticipant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moaboxparticipant`
--

LOCK TABLES `moaboxparticipant` WRITE;
/*!40000 ALTER TABLE `moaboxparticipant` DISABLE KEYS */;
/*!40000 ALTER TABLE `moaboxparticipant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` json DEFAULT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Notification_userId_fkey` (`userId`),
  CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sessionToken` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `nickname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profileImage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('USER','SUPER_ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('0e6c2eca-c7a6-4a4a-81ec-1761bd9c6ca4','summerlife3643@gmail.com','2025-01-24 02:04:11.151','?쒕㉧','https://lh3.googleusercontent.com/a/ACg8ocIvkkaNVu4thyA5gws8ZP7a0bqBVqEECFH95aVN_RxilH1jK7M=s96-c','USER','2025-01-24 02:04:11.151','?쒕㉧',NULL),('27c90271-93f3-4034-8877-8590fcd61bde','gogo981004@gmail.com','2025-01-24 01:59:23.147','怨좎?湲?,'https://lh3.googleusercontent.com/a/ACg8ocJo2SdF-eG9X7UodpBILRr_slzFxUaA60ZdjhLzYCua1JVFTQ=s96-c','USER','2025-01-24 01:59:23.147','怨좎?湲?,NULL),('9e75dabc-363d-4904-bde9-866b6e0e4af0','gogo981004@naver.com','2025-05-01 06:36:41.878','Freshman','https://phinf.pstatic.net/contact/20210513_74/1620915151149fnok9_GIF/KakaoTalk_20210503_003848951.gif','USER','2025-05-01 06:36:41.878','Freshman',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verificationtoken`
--

DROP TABLE IF EXISTS `verificationtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verificationtoken` (
  `identifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`identifier`,`token`),
  UNIQUE KEY `VerificationToken_token_key` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verificationtoken`
--

LOCK TABLES `verificationtoken` WRITE;
/*!40000 ALTER TABLE `verificationtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `verificationtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-20  9:55:34
