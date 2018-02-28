# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.35)
# Database: symfony
# Generation Time: 2018-02-28 04:04:24 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table tasks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(25) NOT NULL DEFAULT '',
  `description` varchar(100) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `users_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  KEY `fk_task_users_idx` (`users_id`),
  CONSTRAINT `fk_task_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='`id` int(11) unsigned NOT NULL AUTO_INCREMENT,';

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;

INSERT INTO `tasks` (`id`, `title`, `description`, `status`, `created_at`, `updated_at`, `users_id`)
VALUES
	(1,'title2','description2','new','2018-01-24 17:00:56','2018-01-25 16:20:42',1),
	(2,'title1','description1','todo','2018-01-25 16:05:32','2018-01-25 16:05:32',1),
	(4,'titlee3','description2','new','2018-01-25 16:21:02','2018-01-25 16:21:02',1),
	(5,'test task','des','finished','2018-02-08 04:32:44','2018-02-08 04:32:44',1),
	(6,'test1 task','task2','finished','2018-02-08 04:36:38','2018-02-08 04:36:38',1),
	(7,'task test prueba','descr test','todo','2018-02-08 04:39:35','2018-02-10 16:20:10',1),
	(8,'9 feb task','todo','new','2018-02-10 03:18:28','2018-02-10 03:18:28',9);

/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(25) NOT NULL DEFAULT '',
  `name` varchar(50) NOT NULL DEFAULT '',
  `surname` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `password` char(255) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `role`, `name`, `surname`, `email`, `password`, `created_at`)
VALUES
	(1,'user','admin111','admin111','admin@admin.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','2018-02-06 16:28:21'),
	(2,'user1','user1','user1','user1@user1.com','null','0000-00-00 00:00:00'),
	(3,'user2','user2','user2','user2@user2.com','null','0000-00-00 00:00:00'),
	(4,'user','juan','lopez','juan@juan.com','','2018-01-23 17:18:03'),
	(5,'user','admin1','admin1','admin1@juan.com','ed08c290d7e22f7bb324b15cbadce35b','2018-01-24 14:50:19'),
	(6,'user','Steve','Smith','steve@mail.com','f148389d080cfe85952998a8a367e2f7eaf35f2d72d2599a5b0412fe4094d65c','2018-02-06 04:52:27'),
	(7,'user','Charlie','Smith','c@da.com','b9dd960c1753459a78115d3cb845a57d924b6877e805b08bd01086ccdf34433c','2018-02-06 04:57:38'),
	(8,'user','memo','smith','m@asd.com','9c225a950b92172f8c2afe8b682b7b86ce8f835578b546f9b8070cba309ad314','2018-02-06 05:00:20'),
	(9,'user','admin1','admin1','admin1@admin1.com','25f43b1486ad95a1398e3eeb3d83bc4010015fcc9bedb35b432e00298d5021f7','2018-02-10 04:18:32'),
	(10,'user','admin55','admin55','admin55@admin55.com','ed08c290d7e22f7bb324b15cbadce35b0b348564fd2d5f95752388d86d71bcca','2018-02-21 03:19:28');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

