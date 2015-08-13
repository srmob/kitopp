New Database select query

//1
// Get all Sellers Associated with Buyer
select distinct tc.uid_seller,ud.uid,tc.buyer_uid,ud.first_name,last_name,user_type,regd_status from user_details ud , trans_connect tc where 
tc.buyer_uid=201
and tc.uid_seller = ud.uid 
and ud.user_type="Seller";


//Buyer Order Queries start

// Get Buyer Details
select uid,first_name,last_name,gender,email_id,user_type,st_num,cst_num,pan_num,tin_num,phone_num,shipping_address from user_details where uid=201 and user_type="Buyer"

//Get Buyer Orders:


//Get products and sub products
select uid_seller,product_catg_id,product_sub_catg_id,product_catg_name,product_sub_catg_name from product_category where uid_seller=101 order by product_catg_id,product_sub_catg_id

//Get Products to choose

select  pd.product_id,pd.product_catg_id,product_sub_catg_id,pd.product_name,product_desc,product_min_qty,product_price,pd.price_id ,pd.product_exp_date, pd.product_color,pd.product_weight , pd.product_height from product_details  pd , price_detail prd where pd.uid_seller=101 and pd.product_sub_catg_id=10001 and pd.product_catg_id=5001 and pd.product_id  = prd.product_id and pd.price_id  = prd.price_id

//Buyer Order Queries end


Add Order:
insert into order_detail_temp (uid_buyer,product_id,price_id,order_qty,order_date,order_price,order_tot_amount,order_status,uid_seller) values (201,9001,2,22,'08-Jun-2015',220,220,"new",101)


select od.order_id,od.product_id,pd.product_name,pd.product_desc,od.order_qty, od.order_price from order_detail_temp od , product_detail pd where pd.product_id = od.product_id and uid_buyer=201 order by od.order_id



//Seller Related 

//Insert into order_detail

INSERT INTO "order_detail" ( "uid_buyer","uid_seller","product_id","price_id","order_qty","order_date","order_price","order_tot_amount","order_status","order_dispatch_date","order_track_num","order_qty_type","order_fulfil_status","order_receive_date","order_ref_id" ) VALUES ( '201','101','9001','1','3','08-Jun-2015','30','30','new','07-Jul-2015',6572,NULL,NULL,'08-Jun-2015',NULL );
INSERT INTO "order_detail" ( "uid_buyer","uid_seller","product_id","price_id","order_qty","order_date","order_price","order_tot_amount","order_status","order_dispatch_date","order_track_num","order_qty_type","order_fulfil_status","order_receive_date","order_ref_id" ) VALUES ( '201','101','9001','1','4','08-Jun-2015','40','40','new','07-Jul-2015',6572,NULL,NULL,'08-Jun-2015',NULL );



//Seller Orders
select od.order_id,od.uid_buyer,od.order_tot_amount,ud.shop_name,od.product_id from orders where order_id in (select ord_id from order_detail where uid_seller=101);

//Seller Orders - old
select od.order_id,od.order_tot_amount,ud.shop_name,od.product_id,pd.product_name,pd.product_desc,od.order_qty, od.order_price,od.order_ref_id,ud.first_name from order_detail od , product_detail pd, user_detail ud where pd.product_id = od.product_id and od.uid_seller=(?) and ud.uid=od.uid_buyer order by od.order_id

//Seller Orders Modified - 10/6/2015
select distinct ord.order_id,ord.uid_buyer,ord.order_tot_amount,ordd.uid_seller, ud.first_name, ud.shop_name , pd.product_desc , pd.product_img_id1,ord.order_qty,ord.order_price,ord.order_tot_amount
from orders ord 
inner join order_detail ordd  
on ord.order_id =ordd.ord_id and ordd.uid_seller=101
inner join user_details ud 
on ord.uid_buyer = ud.uid
inner join product_details pd
on pd.product_id = ordd.product_id and pd.uid_seller = ordd.uid_seller
order by ord.order_id;

select distinct ord.order_id,ord.uid_buyer,ord.order_tot_amount,ordd.uid_seller,ord.order_qty,ord.order_price,ord.order_tot_amount,ud.first_name, ud.shop_name
from orders ord 
inner join order_detail ordd  
on ord.order_id =ordd.ord_id and ordd.uid_seller=101
inner join user_details ud 
on ord.uid_buyer = ud.uid
order by ord.order_id;

select ordd.ord_id as order_id,ordd.product_id,ordd.product_name,ordd.order_qty,prd.product_price,pd.product_desc,pd.product_img_id1 from order_detail ordd inner join orders ord on ord.order_id=ordd.ord_id and ord_id=11 inner join price_detail prd on prd.price_id = ordd.price_id inner join product_details pd on pd.product_id = ordd.product_id 
 

select ordd.ord_id as order_id,ordd.product_id,ordd.product_name,ordd.order_qty,prd.product_price,pd.product_desc,pd.product_img_id1,ordd.uid_buyer,ordd.uid_seller from order_detail ordd inner join orders ord on ord.order_id=ordd.ord_id and ord_id=12 inner join price_detail prd on prd.price_id = ordd.price_id inner join product_details pd on pd.product_id = ordd.product_id
