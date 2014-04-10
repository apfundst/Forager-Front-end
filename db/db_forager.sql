SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE db_forager;
USE db_forager;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(25) NOT NULL,
  `fname` varchar(25) NOT NULL,
  `lname` varchar(25) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

INSERT INTO `user` (`user_id`, `user_name`, `fname`, `lname`, `password`) VALUES
(1, 'admin', 'Mr.', 'Test', 'password'),
(2, 'jcathcar', 'Justin', 'Cathcart', 'derp'),
(3, 'apfundst', 'Drew', 'Pfundstein', 'yerp');

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
  `is_running` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`scan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `url` (
  `url_id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(1000) NOT NULL,
  `domain` varchar(1000) NOT NULL,
  `link` varchar(1000) NOT NULL,
  `source` varchar(1000) NOT NULL,
  `status_code` int(11) NOT NULL,
  `status_code_type` varchar(1000) NOT NULL,
  `state` tinyint(1) NOT NULL,
  PRIMARY KEY (`url_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `link_rel` (
  `url_id` int(11) NOT NULL,
  `dest_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;