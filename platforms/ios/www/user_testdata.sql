CREATE TABLE IF NOT EXISTS `user_detail` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_num` varchar(50) NOT NULL,
  `alternate_phone_num` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(4) DEFAULT NULL,
  `email_id` varchar(100) NOT NULL,
  `manufacture_name` varchar(100) DEFAULT NULL,
  `shop_name` varchar(100) NOT NULL,
  `shipping_address` varchar(200) NOT NULL,
  `permanent_address` varchar(200) DEFAULT NULL,
  `user_type_id` int(5) NOT NULL,
  `tin_num` varchar(40) DEFAULT NULL,
  `st_num` varchar(40) DEFAULT NULL,
  `cst_num` varchar(40) DEFAULT NULL,
  `regd_status_id` int(5) NOT NULL,
  `user_img` blob,
  `shop_img` blob,
  `pan_num` varchar(100) NOT NULL,
  `created_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  KEY `regd_status_id` (`regd_status_id`),
  KEY `user_type_id` (`user_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;


INSERT INTO `user_detail` (`uid`, `first_name`, `last_name`, `phone_num`, `alternate_phone_num`, 
			   `date_of_birth`, `gender`, `email_id`, `manufacture_name`, `shop_name`,
			   `shipping_address`, `permanent_address`, `user_type_id`, `tin_num`, 
			   `st_num`, `cst_num`, `regd_status_id`, `user_img`, `shop_img`, `pan_num`, 
			   `created_ts`) 
			    VALUES
			  (101, 'kumar', 'yogesh', '8050453995', '8050453996', 
			   '1990-06-04', 'M', 'yk@gmail.com', 'yogesh and sons, 'YH shops',
			   '123 kalyan nagar bangalore', NULL, 1, '5554565', 
			   AB123, NULL,503, NULL, NULL, 'ACOPN555N', 
			   '2015-06-20 12:01:03'),
			  (102, 'kumar', 'yogesh', '89889898989', '', 
			   '2015-06-01', 'M', 'asda@jj.cpm', 'sadad', 'testa', 
			   'asdad', NULL, 1, NULL, 
			    NULL, NULL,503, NULL, NULL, '', 
			   '2015-06-20 12:00:58');
			  (103,'kumar','sainath','8877721421','8097121421','1995-06-09','M','saik@gmail.com','sainath collections',
				'SK shops','308 kalyan nagar bangalore',NULL,1,'5554567','AC123',NULL,NULL,503,NULL,NULL,'ASRPD192D','2015-06-09 12:01:01');
			(104,'sri','guru','8097121451','8096567809','1978-12-11','M','sg@gmail.com','Sri guru pvt ltd','sg pvt ltd','1278 HBR layout bangalore',
			NULL,1,'6754345','AS876',null,null,503,null,null,'QAWTR7890T','2015-06-09 11:01:09');

			(105,'N','sangam','8907124521','8765121134','1992-01-01','M','ns@gmail.com','sangam manufacturing and co','sn shops','177 palace road bangalore',NULL,
1,'768546','qw111',NULL,NULL,503,NULL,'QZWUY1987P','2015-06-09 11:10:25');


			(201,'N','ganesh','8907114521','8764121014','1992-05-02','M','ng@gmail.com','Ganesh and sons',' GS shops','10 palace road bangalore',NULL,2,'998546','qe191',
NULL,NULL,503,NULL,'QBWUY1987A','2015-06-09 1:10:25');

(202,'N','eshwari','8897014521','8964101014','1990-05-02','F','ne@gmail.com','Eshwari manufacturing',' Eshwari electronics ',
'19 MM road chennai',NULL,2,'932546','we191',NULL,NULL,503,NULL,'QBJUY1900t','2015-06-09 1:10:45');


(203,'kumari','Anitha','8977114521','8864121014','1991-08-02','F','akumari@gmail.com','vaaso furnishings',' vaaso','12 GVK ROAD bangalore',NULL,2,'998596','VV191',
NULL,NULL,503,NULL,'ARWUY1137A','2015-06-09 1:10:49');


(204,'chandra','vivek','8107414111','8064198714','1986-05-02','M','vchandra@gmail.com','Viveks',' viveks','112 kalyan nagar bangalore',NULL,2,'998546','qe191',
NULL,NULL,503,NULL,'QBWUY1987A','2015-06-09 1:10:51');


(205,'pai','ganesh','890714521','8764121014','1992-05-02','M','gpai@gmail.com','Pai stores',' pai group','987 KG ROAD bangalore',NULL,2,'872115','wz191',
NULL,NULL,503,NULL,'WSWUY1917A','2015-06-09 1:10:52');


(206,'rao','pn','7891114521','8911231909','1989-09-01','M','nrao@gmail.com','pnrao collections',' pnrao collections','63 M.G.Road bangalore',NULL,2,'998546',
'ZAe191',NULL,NULL,503,NULL,'DEQW1987E','2015-06-09 1:10:59');


(207,'kumar','aditya','76537114587','9964121044','1992-05-02','M','kaditya@gmail.com','Aditya and brothers',' AB shops','86 wheelers road bangalore',
NULL,2,'108596','NB191',NULL,NULL,503,NULL,'SEWQ1965A','2015-06-09 1:11:25');


(208,'narayan','arjun','9907145599','8877141014','1991-05-05','M','anarayan@gmail.com','Narayan manufacturers','Narayan group','15 temple street bangalore',
NULL,2,'998546','AZ121',NULL,NULL,503,NULL,'QLTUY1945A','2015-06-09 1:11:30');

(209,'Khurana','suresh','8907114521','8764121014','1992-05-02','M','ng@gmail.com','Ganesh and sons',' GS shops','10 palace road bangalore',NULL,2,'912134',
'ce191',NULL,NULL,503,NULL,'QBWUY1987A','2015-06-09 1:11:32');

(215,'anand','Ranjith','9987114521','9916121878','1987-07-15','M','ranand@gmail.com','anand and sons','My stores','15 Kalyan nagar bangalore',NULL,2,'952921',
'za009',NULL,NULL,503,NULL,'AASD7123Q','2015-06-09 1:11:38');

(210,'nambiar','vikas','9881142879','8764121015','1992-07-01','M','nv@gmail.com','vikas and sons',' vs centre','87 jaya nagar bangalore',NULL,2,'568546',
've191',NULL,NULL,503,NULL,'ADUY1905A','2015-06-09 1:11:45');


(211,'jain','rakesh','9876711451','8764112365','1993-01-31','M','rjain@gmail.com','jain marketing co','jain group ','56 NR mARKET bangalore',NULL,2,'943456',
'RG191',NULL,NULL,503,NULL,'BWUAY1999A','2015-06-09 1:11:49');


(212,'NATHAN','LATHA','9886907114','9764121919','1992-06-09','M','NATHANL@gmail.com','NATHAN manufacturing co',' nathan and sons','23 NR market bangalore',NULL,2,'9765432',
'AA100',NULL,NULL,503,NULL,'AZSDR1221A','2015-06-09 1:12:25');


(213,'xavier','charles','887774521','8764210145','1989-05-20','M','cxavier@gmail.com','xavier enterprises','xavier enterprises','112 Richards town bangalore',
NULL,3,'998546','qw911',NULL,NULL,503,NULL,'AQWTY1786A','2015-06-09 1:14:25');


(214,'goel','satish','8907114521','8922212121','1982-06-10','M','sgoel@gmail.com','Goel traders',' goel traders','10 MG road bangalore',NULL,3,'998546','qe191',
NULL,NULL,503,NULL,'QZQA1234T','2015-06-09 1:15:25');

=================================================
user_roles
====================================
insert into user_roles('role_id','role_name') values (1,'seller');(2,'buyer');(3,'both');(4,'normal');(5,'admin')

======================================
regd_status
-======================================

insert into regd_status('regd_id','regd_name') values(501,'new');(502,'pending');(503,'registered');

===================================================================
login validations
====================================================================
insert into login_validations('id','uid','role_id','pin_num','regd_status','imie_id','phone_num','user_createdtime','user_updated_time')
values(1,'101',1,1234,503,'12awe12','8050453995','2015-06-20 12:01:03',''2015-06-20 12:01:03');
(2,'102',1,1456,503,'113423','89889898989','2015-06-20 12:00:58','2015-06-20 12:00:58');
(3,103,1,1123,503,'123453','8877721421','2015-06-09 11:01:09','2015-06-09 11:01:09');
(4,104,1,1876,503,125432,'8097121451','2015-06-20 12:01:03','2015-06-20 12:01:03');
(5,105,1,1111,503,109876,'8907124521','2015-06-09 11:10:25','2015-06-09 11:10:25');
(6,201,2,9876,503,'675376,'8907114521','2015-06-09 1:10:25','2015-06-09 1:10:25');
(7,202,2,7654,503,453212,'8897014521','2015-06-09 1:10:45','2015-06-09 1:10:45');
(8,203,2,9843,503,127865,'8977114521''2015-06-09 1:10:49','2015-06-09 1:10:49');
(9,204,2,8796,503,132143,'8107414111','2015-06-09 1:10:51''2015-06-09 1:10:51');
(10,205,2,0009,503,091234,'890714521','2015-06-09 1:10:51','2015-06-09 1:10:52');
(11,206,2,0987,503,129087,'7891114521','2015-06-09 1:10:59','2015-06-09 1:10:59');
(12.207,2,0098,503,112298,'76537114587','2015-06-09 1:11:25','2015-06-09 1:11:25');
(13,208,2,1098,503,121232,'9907145599','2015-06-09 1:11:30','2015-06-09 1:11:30');
(14,209,2,1178,503,119876,'8907114521','2015-06-09 1:11:32','2015-06-09 1:11:32');
(15,215,2,1054,503,116532,'9987114521','2015-06-09 1:11:38','2015-06-09 1:11:38');
(16,210,2,1423,503,120956,'9881142879','2015-06-09 1:11:45','2015-06-09 1:11:45');
(17,211,2,7654,503,231124,'9876711451','2015-06-09 1:11:49','2015-06-09 1:11:49');
(18,212,2,1908,503,125612,'9886907114','2015-06-09 1:12:25','2015-06-09 1:12:25');
(19,213,3,2234,503,110987,'887774521','2015-06-09 1:14:25','2015-06-09 1:14:25');
(20,214,3,2256,503,187654,'8907114521','2015-06-09 1:15:25','2015-06-09 1:15:25');

==============================================================
"trans_con_id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL ,
"uid_seller" INTEGER NOT NULL , 
"user_category_id" INTEGER NOT NULL ,
"uid_buyer" INTEGER,
"val_key" VARCHAR NOT NULL ,
"trans_con_key" INTEGER NOT NULL
,"role_id"  INTEGER not null,
 user_createddate DATETIME,
user_updated DATETIME,
user_updated_by VARCHAR,
FOREIGN KEY(uid_buyer) REFERENCES user_detail(uid),
FOREIGN KEY(user_category_id) REFERENCES user_category(user_category_id),
FOREIGN KEY(role_id) REFERENCES user_roles(role_id)

insert into transconnect('trans_con_id','uid_seller','user_category_id','uid_buyer','val_key','trans_con_key','role_id','user_createddate','user_updated_date','user_updated_by')
values
(1,101,10,201,'yes',9876,2,'2015-06-09 1:10:25','2015-06-09 1:10:25','admin');
(2,101,20,202,'yes',7654,2,'2015-06-09 1:10:45','2015-06-09 1:10:45','admin');
(3,101,30,203,'yes',9843,2,'2015-06-09 1:10:49','2015-06-09 1:10:49','admin');
(4,101,40,204,'yes',8796,2,'2015-06-09 1:10:51','2015-06-09 1:10:51','admin');
(5,102,10,205,'yes',0009,2,'2015-06-09 1:10:51','2015-06-09 1:10:52','admin');
(6,102,20,206,'yes',0987,2,'2015-06-09 1:10:59','2015-06-09 1:10:59','admin');
(7,102,30,207,'yes',0098,2,'2015-06-09 1:11:25','2015-06-09 1:11:25','admin');
(8,102,40,208,'yes',1178,2,'2015-06-09 1:11:32','2015-06-09 1:11:32','admin');
(9,103,10,209,'yes',1054,2,'2015-06-09 1:11:38','2015-06-09 1:11:38','admin');
(10,103,20,210,'yes',1423,2,'2015-06-09 1:11:45','2015-06-09 1:11:45','admin');
(11,103,30,211,'yes',7654,2,'2015-06-09 1:11:49','2015-06-09 1:11:49','admin');
(12,103,40,212,'yes',1908,2,'2015-06-09 1:12:25','2015-06-09 1:12:25','admin');
(13,104,10,213,'yes',2234,3,'2015-06-09 1:14:25','2015-06-09 1:14:25','admin');
(14,104,20,214,'yes',2256,3,'2015-06-09 1:15:25','2015-06-09 1:15:25','admin');
(15,102,10,203,'yes',8876,2,'2015-06-15 1:15:30','2015-06-15 1:15:39','admin');
(16,102,20,208,'yes',3241,2,'2015-06-15 1:15:30','2015-06-15 1:15:39','admin');
(17,213,10,204,'yes',1289,2,'2015-06-18 3:15:30','2015-06-18 3:15:39','admin');
(18,213,20,207,'yes',3213,2,'2015-06-19 3:15:30','2015-06-19 3:15:39','admin');
(19,214,10,212,'yes',1121,2,'2015-06-19 3:15:35','2015-06-19 3:15:45','admin');



user_category
=================================================================
insert into user_category('user_category_id','user_category_name')
values
(10,'platinum');
(20,'gold');
(30,'silver');
(40,'normal');
====================================
