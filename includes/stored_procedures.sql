DELIMITER $$
CREATE PROCEDURE url_check(IN url_table varchar(1000), IN link_rel_table varchar(1000), 
						   IN this_source varchar(1000), IN this_link varchar(1000), 
						   IN this_url varchar(1000), IN this_domain varchar(1000),
						   IN this_dest_id int(11), INOUT inserted_url_id int(11) )						    
		BEGIN
		SET @url_table = url_table;
		SET @link_rel_table = link_rel_table;
		SET @this_source = this_source;
		SET @this_link = this_link;
		SET @this_url = this_url; 
		SET @this_url = this_domain;
		SET @this_dest_id = this_dest_id;
		SET @inserted_url_id = inserted_url_id;
		SET @temp_id = NULL;

    	SET @checked_url_id = CONCAT('SELECT url_id INTO @temp_id FROM `?` WHERE source = ? AND link = ?');
		PREPARE stmt1 FROM @checked_url_id;
		EXECUTE stmt1 USING @url_table, @this_source, @this_link;
		DEALLOCATE PREPARE stmt1;
        IF @temp_id IS NOT NULL THEN
        	SET @cs = CONCAT('INSERT INTO `?`(`url_id`,`dest_id`) VALUES(?,?)');
        	PREPARE stmt2 FROM @cs;
        	EXECUTE stmt2 USING @link_rel_table, @temp_id, @this_dest_id;
			DEALLOCATE PREPARE stmt2;
        ELSE 
        	SET @cs = CONCAT('INSERT INTO `?` (`url`,`domain`,`link`,`source`) VALUES(?,?,?,?); SET @temp_id = LAST_INSERT_ID();');
        	PREPARE stmt3 FROM @cs;					  
        	EXECUTE stmt3 USING @url_table, @this_url, @this_domain, @this_link, @this_source;
			DEALLOCATE PREPARE stmt3;
			SET @cs = CONCAT('INSERT INTO `?`(`url_id`,`dest_id`) VALUES(?,?)');
			PREPARE stmt4 FROM @cs;					  
        	EXECUTE stmt4 USING @link_rel_table, @temp_id, @this_dest_id ;
			DEALLOCATE PREPARE stmt4;
			SET inserted_url_id = @temp_id;
        END IF;
    END$$
DELIMITER ;

DROP PROCEDURE `url_check`;
DELIMITER $$
CREATE PROCEDURE url_check(IN url_table varchar(1000), IN link_rel_table varchar(1000), 
						   IN this_source varchar(1000), IN this_link varchar(1000), 
						   IN this_url varchar(1000), IN this_domain varchar(1000),
						   IN this_dest_id int(11), INOUT temp_id int(11) )							    
		BEGIN
		SET @url_table = url_table;
		SET @link_rel_table = link_rel_table;
		SET @this_source = this_source;
		SET @this_link = this_link;
		SET @this_url = this_url; 
		SET @this_domain = this_domain;
		SET @this_dest_id = this_dest_id;
		SET @temp_id = temp_id;

    	SET @checked_url_id = CONCAT('SELECT url_id INTO @temp_id FROM `?` WHERE source = ? AND link = ?');
		PREPARE stmt1 FROM @checked_url_id;
		EXECUTE stmt1 USING @url_table, @this_source, @this_link;
		DEALLOCATE PREPARE stmt1;
        IF @temp_id IS NOT NULL THEN
        	SET @cs2 = CONCAT('INSERT INTO `?`(`url_id`,`dest_id`) VALUES(?,?)');
        	PREPARE stmt2 FROM @cs2;
        	EXECUTE stmt2 USING @link_rel_table, @temp_id, @this_dest_id;
			DEALLOCATE PREPARE stmt2;
			SET @temp_id = 0;
        ELSE 
        	SET @cs3 = CONCAT('INSERT INTO `?` (`url`,`domain`,`link`,`source`) VALUES(?,?,?,?)');
        	PREPARE stmt3 FROM @cs3;					  
        	EXECUTE stmt3 USING @url_table, @this_url, @this_domain, @this_link, @this_source;
			DEALLOCATE PREPARE stmt3;
			SET @temp_id = LAST_INSERT_ID;
			SET @cs4 = CONCAT('INSERT INTO `?`(`url_id`,`dest_id`) VALUES(?,?)');
			PREPARE stmt4 FROM @cs4;					  
        	EXECUTE stmt4 USING @link_rel_table, @temp_id, @this_dest_id;
			DEALLOCATE PREPARE stmt4;
        END IF;
    END$$
DELIMITER ;