const mongoose = require('mongoose');
// const User = require('./models/user');
// const Product = require('./models/product');
// const Category = require('./models/category');
var express = require('express')
var app = express()

const categoryRoute = require("./routes/cateRoute");
const productRoute = require("./routes/prodRoute");
const cartRoute = require("./routes/cartRoute");
const userRoute = require("./routes/userRoute");

// Routes which should handle requests
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/cart", cartRoute);
app.use("/user", userRoute);

// Handle Error Requests
app.get("/", (req, res) => {
  res.send('API IS NOW WORKING');
});

// Handle Error Requests
app.use((req, res, next) => {
  const error = new Error();
  error.message = "Not Found";
  error.status = 404;
  next(error);
});

module.exports = app;
// //---------------------USER

// //Register
// app.get('/user/register',(req,res)=>{
//     var email = req.query.email
//     var password = req.query.password
//     var name = req.query.name
//     const user = new User({
//       name : name,
//       email : email,
//       password : password,
//     });
//     user.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {console.log(err);});
//   });

//   //Login
//     app.get('/login-user',function(req,res){
//         var email = req.query.email
//         var password = req.query.password
//         var data;
//         if (email.length > 0 && password.length > 0) {
//             data = {
//                 email: email,
//                 password: password
//             };
//         }
//         else {
//             res.json({
//                 status: 0,
//                 message: err
//             });
//         }
//         User.findOne(data, function(err, User) {
//             if (err) {
//                 res.json({
//                     status: 0,
//                     message: err
//                 });
//             }
//             if (!User) {
//                 res.json({
//                     status: 0,
//                     msg: "not found"
//                 });
//             }
//             if (User) {
//                 res.json({
//                     status: 1,
//                     id: User._id,
//                     message: " success"
//                 });
//             }
//             else {
//                 res.json({
//                     status: 0,
//                     msg: "Invalid Fields"
//                 });
//             }
           
//         })
//     });
// // All Users
//       app.get('/all-users',(req,res)=>{
//         User.find()
//         .then((result) => {
//           res.send(result)
//         })
//         .catch((err) => {console.log(err);});
//       });

// // -----------------------------Product Curd -------------------------
// app.get('/all-products',(req,res)=>{
//     Product.find()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {console.log(err);});
//   });
//   app.get('/all-category',(req,res)=>{
//     Category.find()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {console.log(err);});
//   });
//   app.get('/product/add',(req,res)=>{
//     const name = req.query.name
//     const description = req.query.description
//     const price = req.query.price
//     const image = req.query.image
//     const weight = req.query.weight
//     const category = req.query.category
//     const ob = new Product({
//       name : name,
//       description : description,
//       price : price,
//       image : image,
//       weight : weight,
//       category : category
//     });
//     ob.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {console.log(err);});
//   });
//   app.get('/category/add',(req,res)=>{
//     const name = req.query.name
//     const image = req.query.image
//     const ob = new Product({
//       name : name,
//       image : image
//     });
//     ob.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {console.log(err);});
//   });

// app.listen(9000)