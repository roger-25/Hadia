CREATE TABLE IF NOT EXISTS `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(300) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `currency` varchar(5) NOT NULL,
  `imageURL` varchar(1000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
)