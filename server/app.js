const express = require('express');
const path = require('path');
const mysql = require("mysql");
const myParser = require("body-parser");
const crypto = require("crypto");
const session = require("express-session");

const app = express();
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Cache-Control');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Json Encode
app.use(myParser.json());

// Set session
app.use(session({
	secret: 'my-Secret-Key-558df2d3',
	resave: true,
	saveUninitialized: true,
    domain: 'localhost:3000'
}));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Database Connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "baekadan"
});

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
	console.log("test sessionss: ");
	console.log(req.session);
  if (req.session && req.session.status === true)
    return next();
  else {
  	// res.redirect('/');
    return res.sendStatus(401);
    // return "Please Login";
  }
};

// Check Login
app.post('/login', function (req, res) {
	let pw = req.body.user_password;
	let hash = crypto.createHash('md5').update(pw).digest("hex");
	let post = {
			user_email: 		req.body.user_email, 
			user_password: 		hash
	};
	con.query("SELECT * FROM tbl_user WHERE user_email = ? AND user_password = ?", [post.user_email, post.user_password], function(err,rows){
	  if(err) throw err;
	  if(rows.length == 1) {
	  	req.session.user_id = rows[0].user_id;
	  	req.session.first_name = rows[0].user_firstname;
	  	req.session.last_name = rows[0].user_lastname;
	  	req.session.status = true;
	  	console.log(req.session);
	  	return res.send({checker: true});
	  } else {
	  	return res.send({checker: false});
	  }
	});
});

// Register's Validation
app.post('/validating', function (req, res) {
	var count = 0;
	con.query('SELECT COUNT(*) AS count FROM tbl_user WHERE user_email = ?', req.body.user_email,function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(tbl_user):\n');
		console.log(rows);
		count = rows[0].count;
		if(count == 0) {
			return res.send({checker: true});
		} else {
	  		return res.send({checker: false});
		}
	});
});

// Registration
app.post('/register', function (req, res) {
	let pw = req.body.user_password;
	let hash = crypto.createHash('md5').update(pw).digest("hex");
	let post = {
			// user_fbid: 			0, 
			user_email: 		req.body.user_email, 
			user_firstname: 	req.body.user_firstname, 
			user_lastname: 		req.body.user_lastname,
			user_type: 			req.body.user_type, 
			user_password: 		hash
	};
	con.query('INSERT INTO tbl_user SET ?', post,function(err,rows){
	  if(err) throw err;
	  console.log('Data received from Db(tbl_user):\n');
	  console.log(rows);
	});
	console.log(post);
  return res.send({status: "200"});
});

// Check User Login Status
app.post('/getUserAuth', auth, function (req, res) {
	con.query('SELECT user_id, user_firstname, user_lastname FROM tbl_user WHERE user_id = ?', req.session.user_id,function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(tbl_user):\n');
		console.log(rows);
		return res.send(rows[0]);
	});
});

// Get User Info
app.post('/getUser', auth, function (req, res) {
	con.query('SELECT * FROM tbl_user WHERE user_id = ?', req.session.user_id,function(err,rows){
		if(err) throw err;

		console.log('Data received from Db(tbl_user):\n');
		console.log(rows);
		return res.send(rows[0]);
	});
});

// User Logout 
app.post('/logout', function (req, res) {
	req.session.destroy();
	return res.send("logout success!");
});

// Get Categories
app.post('/getCategories', function (req, res) {
	con.query("SELECT * FROM tbl_category", function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(tbl_category):\n');
		console.log(rows)
		return res.send(rows);
	});
});

// Get Banner
app.post('/getBanner', function (req, res) {
	con.query("SELECT * FROM tbl_banner", function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(tbl_banner):\n');
		console.log(rows)
		return res.send(rows);
	});
});

// Get Product
app.post('/getProducts', function (req, res) {
	con.query("SELECT * FROM view_product", function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(view_product):\n');
		console.log(rows)
		return res.send(rows);
	});
	// Product distinct
	// SELECT DISTINCT prod_id, prod_catid, cat_name, prod_name, 
	// prod_price, prod_description, gal_path, prod_createon 
	// FROM `tbl_product` JOIN tbl_category ON prod_catid = cat_id JOIN tbl_gallery 
	// ON prod_id = gal_prodid GROUP BY prod_id
});

// Get Product By Id
app.post('/getProductById', function (req, res) {
	con.query("SELECT * FROM view_product WHERE prod_id = ?", req.body.prod_id, function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(view_product):\n');
		console.log(rows)
		return res.send(rows);
	});
});

// // Get Product By Category Id
// app.post('/getProductByCatId', function (req, res) {
// 	if(req.body.limit !== 0) {
// 		con.query("SELECT * FROM view_product WHERE prod_catid = ?", req.body.prod_catid, function(err,rows){
// 			if(err) throw err;
// 			console.log(rows)
// 			return res.send(rows);
// 		});
// 	} else {
// 		con.query("SELECT * FROM view_product WHERE prod_catid = ? LIMIT ?", [req.body.prod_catid, req.body.limit], function(err,rows){
// 			if(err) throw err;
// 			console.log(rows)
// 			return res.send(rows);
// 		});
// 	}
// });

// Get Gallery By Product Id
app.post('/getGalleryByProdId', function (req, res) {
	con.query("SELECT * FROM tbl_gallery WHERE gal_prodid = ?", req.body.prod_id, function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(tbl_gallery):\n');
		console.log(rows)
		return res.send(rows);
	});
});

// Get Quantity By Product Id
app.post('/getQuantityByProdId', function (req, res) {
	con.query("SELECT * FROM tbl_quantity WHERE quan_prodid = ?", req.body.prod_id, function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(tbl_quantity):\n');
		console.log(rows)
		return res.send(rows);
	});
});


// Add Cart
app.post('/addUserCart', auth, function(req, res, next){
	let post = {
		cart_userid: 	  req.session.user_id,
		cart_prodid: 	  req.body.prod_id,
		cart_quanid: 	  req.body.quan_id,
		cart_no: 		  req.body.cart_no
	}

	let isHave = false;
	let cart_id = '';

	con.query('SELECT COUNT(*) AS count, cart_id FROM tbl_cart WHERE cart_userid = ? AND cart_prodid = ? AND cart_quanid = ?', 
	[req.session.user_id, req.body.prod_id, req.body.quan_id],function(err,rows){
		if(err) throw err;
		let count = rows[0].count;
		if(count == 0) {
			isHave = false;
		} else {
	  		isHave = true;
	  		cart_id = rows[0].cart_id;
		}

		if(isHave) {
			con.query('UPDATE tbl_cart SET cart_no = cart_no + ? WHERE cart_id = ?', [req.body.cart_no, cart_id],function(err,rows){
			    if(err) throw err;
			    console.log(rows);
				return res.send({Status: 200});
			});
		} else {
			con.query('INSERT INTO tbl_cart SET ?', post,function(err,rows){
			    if(err) throw err;
			    console.log(rows);
				return res.send({prod_id: rows.insertId});
			});
		}

	});
	
});

// get Cart
app.post('/getUserCart', auth, function (req, res) {
	con.query("SELECT * FROM view_cart WHERE cart_userid = ?", req.session.user_id, function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(view_cart):\n');
		console.log(rows)
		return res.send(rows);
	});
	// SELECT cart_id, cart_userid, prod_id, quan_id, quan_no, 
	// quan_size, cat_name, prod_name, prod_price, prod_description, 
	// gal_path, cart_no, cart_createon FROM `tbl_cart` JOIN view_product 
	// ON cart_prodid = prod_id JOIN tbl_quantity ON cart_quanid = quan_id
});

// Update Cart Status 0
app.post('/updateUserCartStatus0', auth, function (req, res) {
	con.query('UPDATE tbl_cart SET cart_status = 0 WHERE cart_userid IN(?)', req.session.user_id,function(err,rows){
	    if(err) throw err; 
	    // console.log(rows);
	    con.query('SELECT cart_quanid, cart_no FROM tbl_cart WHERE cart_userid = ?', req.session.user_id,function(err,rows){
	    	if(err) throw err;
	    	
	    	let quans_id = "";
	    	let sql = "(CASE ";
	    	for (var i = 0; i < rows.length; i++) {
	    		quans_id += rows[i].cart_quanid + ",";
	    		sql += "WHEN quan_id = "+rows[i].cart_quanid+" THEN quan_no+"+rows[i].cart_no+" ";
	    	}
	    	quans_id = quans_id.substring(0, quans_id.length - 1);
	    	sql += "END)"

	    	con.query('UPDATE tbl_quantity SET quan_no = '+sql+' WHERE quan_id IN('+quans_id+')', function(err,rows){
	    	if(err) throw err;
	    		req.session.order_status = false;
	    		req.session.orderInfo = "";
				return res.send({Status: 200});
			});
		});
	});
});

// Update Cart Status 1
app.post('/updateUserCartStatus1', auth, function (req, res) {
	if(err) throw err;
	if(req.session.order_status) {
		return res.send({Status: 200});
	} else {
		con.query('UPDATE tbl_cart SET cart_status = ?, cart_no = '+req.body.sql_cart+' WHERE cart_id IN('+req.body.carts_id+')', req.body.cart_status,function(err,rows){
		    if(err) throw err;
		    // console.log(rows);
		    con.query('UPDATE tbl_quantity SET quan_no = '+req.body.sql_quan+' WHERE quan_id IN('+req.body.quans_id+')',function(err,rows){
		    	if(err) throw err;
		    	req.session.order_status = true;
				return res.send({Status: 200});
			});
		});
	}
});

// Update Cart Status 2
app.post('/updateUserCartStatus2', auth, function (req, res) {
	if(err) throw err;
	if(req.session.order_status) {
		con.query('UPDATE tbl_cart SET cart_status = 2 WHERE cart_id = ? AND cart_status = 1', req.session.user_id,function(err,rows){
		    if(err) throw err;
		    return res.send({Status: 200});
		});
	}
});


// Remove Cart
app.post('/removeUserCart', auth, function (req, res) {
	con.query("DELETE FROM tbl_cart WHERE cart_id = ?", req.body.cart_id, function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(tbl_cart):\n');
		console.log(rows)
		return res.send({Status: 200});
		
	});
});

// get WishList
app.post('/getUserWish', auth, function (req, res) {
	con.query("SELECT * FROM view_wishlist WHERE wish_userid = ?", req.session.user_id, function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(view_wishlist):\n');
		console.log(rows)
		return res.send(rows);
	});
	// SELECT DISTINCT wish_id, wish_userid, prod_id, prod_catid, prod_name, 
	// prod_description, prod_price, gal_path, wish_createon, prod_createon 
	// FROM `tbl_wishlist` JOIN tbl_product on wish_prodid = prod_id JOIN tbl_gallery 
	// ON gal_prodid = wish_prodid GROUP BY wish_prodid
});

// Remove Cart
app.post('/removeUserWish', auth, function (req, res) {
	con.query("DELETE FROM tbl_wishlist WHERE wish_id = ?", req.body.wish_id, function(err,rows){
		if(err) throw err;
		console.log('Data received from Db(tbl_wishlist):\n');
		console.log(rows)
		return res.send({Status: 200});
	});
});

// Add WishList
app.post('/addUserWish', auth, function(req, res, next){
	con.query('SELECT COUNT(*) AS count FROM tbl_wishlist WHERE wish_userid = ? AND wish_prodid = ?', [req.session.user_id, req.body.prod_id], function(err,rows){
		if(err) throw err;
		let count = rows[0].count;
		// console.log("test" , count);
		if(count == 0) {
			let post = {
				wish_userid: req.session.user_id,
				wish_prodid: req.body.prod_id
			};
			con.query('INSERT INTO tbl_wishlist SET ?', post, function(err,rows){
			    if(err) throw err;
			    console.log('Data received from Db(tbl_wishlist):\n');
			    console.log(rows);
				// return res.send({prod_id: rows.insertId});
			});
		}
	  	return res.send({Status: 200});
		

	});
});

// Get user order status
app.post('/getUserOrderStatus', auth, function(req, res, next){
	// console.log("check getUserOrderStatus")
	if(req.session.order_status) {
		return res.send(true);
	} else {
		return res.send(false);
	}
});

// Create user order information
app.post('/createOrderInfo', auth, function(req, res, next){
	console.log("Data Order Info(createOrderInfo)\n");
	req.session.orderInfo = req.body.orderInfo;
	console.log(req.session.orderInfo);
	return res.send(req.session.orderInfo);
});

// Get user order information
app.post('/getOrderInfo', auth, function(req, res, next){
	console.log("Data Order Info(getOrderInfo)\n");
	console.log(req.session.orderInfo);
	return res.send(req.session.orderInfo);
});

// Get user order total price
app.post('/getOrderTotalPrice', auth, function(req, res, next){
	con.query('SELECT SUM(prod_price*cart_no) as totalPrice FROM tbl_product JOIN tbl_cart ON prod_id = cart_prodid WHERE cart_userid = ? AND cart_status <> 2', 
		req.session.user_id, function(err,rows){
	    if(err) throw err;
		console.log("Data Order Info(getOrderTotalPrice)\n");
	    console.log(rows[0].totalPrice);
		return res.send({totalPrice: rows[0].totalPrice});
	});
});


module.exports = app;
