SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
--
-- Table structure for table `Blog`
--

CREATE TABLE IF NOT EXISTS `Blog` (
  `uid` INT AUTO_INCREMENT COMMENT 'Unique identifier for the blog',
  `title` VARCHAR(100) NOT NULL COMMENT 'Title of the blog post',
  `slug` VARCHAR(150) UNIQUE NOT NULL COMMENT 'Unique SLUG identifier for the blog',
  `shortDesc` VARCHAR(155) NOT NULL COMMENT 'A brief description of the blog post',
  `content` TEXT NOT NULL COMMENT 'Content of the blog post in Markdown format',
  `createdAt` DATETIME NOT NULL COMMENT 'DateTime when the blog was created',
  `updatedAt` DATETIME NULL COMMENT 'DateTime when the blog was last updated',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `Event`
--

CREATE TABLE IF NOT EXISTS `Event` (
  `uid` INT AUTO_INCREMENT COMMENT 'Unique identifier for the event',
  `title` VARCHAR(100) NOT NULL COMMENT 'Title of the event',
  `slug` VARCHAR(150) UNIQUE NOT NULL COMMENT 'Unique SLUG identifying for the event',
  `shortDesc` VARCHAR(155) NOT NULL COMMENT 'A brief description of the event',
  `startDateTime` DATETIME NOT NULL COMMENT 'Start date and time of the event',
  `endDateTime` DATETIME NOT NULL COMMENT 'End date and time of the event',
  `location` VARCHAR(255) NOT NULL COMMENT 'Location where the event takes place',
  `content` TEXT NOT NULL COMMENT 'Details of the event in Markdown format',
  `createdAt` DATETIME NOT NULL COMMENT 'DateTime when the event was created',
  `updatedAt` DATETIME NULL COMMENT 'DateTime when the event was last updated',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Table structure for many-to-one relationship between `Blog` and `Image`
--

CREATE TABLE IF NOT EXISTS `Blog_Image` (
  `blogID` INT NOT NULL COMMENT 'Reference to the associated blog in the blog table',
  `imageID` INT NOT NULL COMMENT 'Reference to the associated image in the image table',
  PRIMARY KEY (`blogID`, `imageID`),
  FOREIGN KEY (`blogID`) REFERENCES `Blog`(`uid`) ON DELETE CASCADE,
  FOREIGN KEY (`imageID`) REFERENCES `Image`(`uid`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `Image`
--

CREATE TABLE IF NOT EXISTS `Image` (
  `uid` INT AUTO_INCREMENT COMMENT 'Unique identifier for the image',
  `src` VARCHAR(100) UNIQUE NOT NULL COMMENT 'File path and name of the image',
  `alt` VARCHAR(50) NOT NULL COMMENT 'Alternate text for the image',
  `createdAt` DATETIME NOT NULL COMMENT 'DateTime when the image was created',
  `updatedAt` DATETIME NULL COMMENT 'DateTime when the image was last updated',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `uid` INT AUTO_INCREMENT COMMENT 'Unique identifier for the user',
  `firstName` VARCHAR(50) NOT NULL COMMENT 'User`s first name',
  `lastName` VARCHAR(50) NULL COMMENT 'User`s last name',
  `email` VARCHAR(100) UNIQUE NOT NULL COMMENT 'Unique email address for the user',
  `password` VARCHAR(100) NULL COMMENT 'Hashed password for the user',
  `createdAt` DATETIME NOT NULL COMMENT 'DateTime when the user was created',
  `updatedAt` DATETIME NULL COMMENT 'DateTime when the user was last updated',
  `loggedInAt` DATETIME NULL COMMENT 'DateTime when the user last logged in',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;
