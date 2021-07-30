const mongoose = require("mongoose");
const db = "mongodb+srv://admin:qwerty123@winstoredb.p3ynv.mongodb.net/winstoredb?retryWrites=true&w=majority";
const database = mongoose.connect(db,
   {
      useNewUrlParser: true ,
       useUnifiedTopology:true 
      } )
.then((result) => console.log('Connected'))
.catch((err) => console.log(err));

module.exports = database;
