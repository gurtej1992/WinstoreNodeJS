const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name :{
        type : String,
        required : true,
    }, 
    email :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    country :{
        type : String,
        required : false,
    },
    city :{
        type : String,
        required : false,
    },
    state :{
        type : String,
        required : false,
    },
    address :{
        type : String,
        required : false,
    },
    phone :{
        type : String,
        required : false,
    },
    zip :{
        type : String,
        required : false,
    },
},{timestamps : true});

const User = mongoose.model('User',userSchema);
module.exports = User;