DELIMITER $$
CREATE PROCEDURE url_check(IN url_table varchar(1000), IN link_rel_table varchar(1000), 
						   IN this_source varchar(1000), IN this_link varchar(1000), 
						   IN this_url varchar(1000), IN this_domain varchar(1000),
						   IN this_dest_id int(11), INOUT inserted_url_id int(11) )						    
    BEGIN
        DECLARE checked_url_id int;
        SELECT url_id INTO checked_url_id
        FROM url_table 
        WHERE source = this_source AND link = this_link;
        IF checked_url_id IS NOT NULL THEN
        	INSERT INTO link_rel_table(`url_id`,`dest_id`)
        	VALUES(checked_url_id , this_dest_id );
        ELSE 
        	INSERT INTO url_table (`url`,`domain`,`link`,`source`) 
        	VALUES(this_url , this_domain , this_link , this_source);
        	SET inserted_url_id = SELECT LAST_INSERT_ID();
        	INSERT INTO link_rel_table(`url_id`,`dest_id`)
        	VALUES(last_id_inserted , this_dest_id );
        END IF;
    END$$
DELIMITER ;


DELIMITER $$
CREATE FUNCTION url_check(IN url_table varchar(1000), IN link_rel_table varchar(1000), 
						   IN this_source varchar(1000), IN this_link varchar(1000), 
						   IN this_url varchar(1000), IN this_domain varchar(1000),
						   IN this_dest_id int(11) ) RETURNS int(11)						    
    BEGIN
        DECLARE checked_url_id int;
		DECLARE temp_id int;
        SELECT url_id INTO checked_url_id
        FROM `url_table` 
        WHERE source = this_source AND link = this_link;
        IF checked_url_id IS NOT NULL THEN
        	INSERT INTO `link_rel_table`(`url_id`,`dest_id`)
        	VALUES(checked_url_id , this_dest_id );
        	RETURN -1;
        ELSE 
        	INSERT INTO `url_table` (`url`,`domain`,`link`,`source`) 
        	VALUES(this_url , this_domain , this_link , this_source);
        	SET temp_id = LAST_INSERT_ID();
        	INSERT INTO `link_rel_table`(`url_id`,`dest_id`)
        	VALUES(temp_id , this_dest_id );
			RETURN temp_id;
        END IF;
    END$$
DELIMITER ;