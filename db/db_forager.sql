-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 15, 2014 at 08:52 PM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db_forager`
--
CREATE DATABASE IF NOT EXISTS `db_forager` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `db_forager`;

-- --------------------------------------------------------

--
-- Table structure for table `link_rel`
--

CREATE TABLE IF NOT EXISTS `link_rel` (
  `url_id` int(11) NOT NULL,
  `dest_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `link_rel1`
--

CREATE TABLE IF NOT EXISTS `link_rel1` (
  `url_id` int(11) NOT NULL,
  `dest_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `scan`
--

CREATE TABLE IF NOT EXISTS `scan` (
  `scan_id` int(11) NOT NULL AUTO_INCREMENT,
  `scan_name` varchar(25) DEFAULT NULL,
  `started_by` varchar(25) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `stop_time` time DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pages_scanned` int(11) DEFAULT NULL,
  `number_errors` int(11) DEFAULT NULL,
  `max_pages` int(11) DEFAULT NULL,
  `is_started` tinyint(4) NOT NULL DEFAULT '1',
  `is_running` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`scan_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `scan`
--

INSERT INTO `scan` (`scan_id`, `scan_name`, `started_by`, `start_time`, `stop_time`, `date`, `pages_scanned`, `number_errors`, `max_pages`, `is_started`, `is_running`) VALUES
(1, 'Test', 'J', NULL, NULL, '2014-04-15 20:23:55', NULL, NULL, NULL, 0, 0),
(2, 'test_scan', NULL, NULL, NULL, '2014-04-15 20:26:20', NULL, NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `url`
--

CREATE TABLE IF NOT EXISTS `url` (
  `url_id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(1000) NOT NULL,
  `domain` varchar(1000) NOT NULL,
  `link` varchar(1000) NOT NULL,
  `source` varchar(1000) NOT NULL,
  `status_code` int(11) DEFAULT NULL,
  `status_code_type` varchar(1000) DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`url_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `url`
--

INSERT INTO `url` (`url_id`, `url`, `domain`, `link`, `source`, `status_code`, `status_code_type`, `state`) VALUES
(1, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.ed', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, 1),
(2, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', 200, 'Connection success', 1),
(3, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, 1),
(4, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, 1),
(5, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, 1),
(6, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, 1),
(7, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, NULL),
(8, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, NULL),
(9, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, NULL),
(10, 'spsu.edu', 'spsu.edu', 'spsu.edu', 'spsu.edu', 200, 'Good Connection', 1),
(11, 'spsu.edu/academics', 'spsu.edu', '/academics', 'spsu.edu', 200, 'Good Connection', 1),
(12, 'spsu.edu/schedule', 'spsu.edu', '/schedule', 'spsu.edu', 200, 'Good Connection', 1),
(13, 'spsu.edu/derp', 'spsu.edu', '/derp', 'spsu.edu', 404, 'Bad Connection', 0),
(14, 'spsu.edu/aboutus', 'spsu.edu', '/aboutus', 'spsu.edu', 200, 'Good Connection', 1),
(15, 'spsu.edu/I have no idea', 'spsu.edu', '/I have no idea', 'spsu.edu', 404, 'Bad Connection', 1),
(16, 'cse.spsu.edu', 'cse.spsu.edu', 'cse.spsu.edu', 'cse.spsu.edu', 200, 'Good Connection', 1),
(17, 'cse.spsu.edu/CS', 'cse.spsu.edu', '/CS', 'cse.spsu.edu', 200, 'Good Connection', 1),
(18, 'cse.spsu.edu/CGDD', 'cse.spsu.edu', '/CGDD', 'cse.spsu.edu', 200, 'Good Connection', 1),
(19, 'cse.spsu.edu/SWE', 'cse.spsu.edu', '/SWE', 'cse.spsu.edu', 200, 'Good Connection', 1),
(20, 'cse.spsu.edu/GoodTimes', 'cse.spsu.edu', '/GoodTimes', 'cse.spsu.edu', 404, 'Bad Connection', 0),
(21, 'cse.spsu.edu/GreatOldies', 'cse.spsu.edu', '/GreatOldies', 'cse.spsu.edu', 404, 'Bad Connection', 0),
(22, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, NULL),
(23, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, NULL),
(24, 'http://spsu.edu/schoolcse//index.htm', 'http://spsu.edu', '/index.htm', 'http://spsu.edu/schoolcse/', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `url1`
--

CREATE TABLE IF NOT EXISTS `url1` (
  `url_id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(1000) NOT NULL,
  `domain` varchar(1000) NOT NULL,
  `link` varchar(1000) NOT NULL,
  `source` varchar(1000) NOT NULL,
  `status_code` int(11) NOT NULL,
  `status_code_type` varchar(1000) NOT NULL,
  `state` tinyint(1) NOT NULL,
  PRIMARY KEY (`url_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(25) NOT NULL,
  `fname` varchar(25) NOT NULL,
  `lname` varchar(25) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `fname`, `lname`, `password`) VALUES
(1, 'admin', 'Mr.', 'Test', 'password'),
(2, 'jcathcar', 'Justin', 'Cathcart', 'derp'),
(3, 'apfundst', 'Drew', 'Pfundstein', 'yerp');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
